<template>
  <el-dialog
    title="券架指定用户领取"
    :close-on-click-modal="false"
    :visible="show"
    width="850px"
    @close="onClose">
    <el-form>
      <el-form-item :label="importStatus.status != 0 ? '请选择文件' : '正在处理'">
        <el-upload class="upload-demo" ref="upload" :data="uploadData" :action="importAction" accept=".xlsx" :auto-upload="false" :limit="1" :file-list="importFileList" :headers="importHeaders" :on-success="importFileBack">
          <el-button v-show="importStatus.status != 0" slot="trigger" size="small" type="success">选取文件</el-button>
          <div v-show="importStatus.status != 0" slot="tip" class="el-upload__tip">
            <el-button type="text" @click="downloadTemplate">点击这里</el-button>
            下载上传文件模板
          </div>
          <div slot="tip" class="el-upload__tip" v-show="importStatus.status > -2">
            <span v-show="importStatus.status != -1 && importStatus.status != 1">文件上传成功，正在处理数据，请稍后...<br/></span>
            <span v-show="importStatus.totalRowCount > 0">总计行数：{{importStatus.totalRowCount}}，当前进度：{{importStatus.nowRowCount}}<br/></span>
            <span v-show="importStatus.status === 0 && importStatus.totalRowCount > 0 && importStatus.nowRowCount === importStatus.totalRowCount">正在尝试写入数据库，请稍等<br/></span>
            <span v-show="importStatus.status === -1">处理失败，用时：{{importUseTime.useTime}}秒，请<el-button type="text" @click="downloadImportErrorFile">点击这里</el-button>下载失败文件</span>
            <span v-show="importStatus.status === 1">处理完成，用时：{{importUseTime.useTime}}秒</span>
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div v-show="showUsers">
      <el-table
        v-loading="listLoading"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        highlight-current-row
        fit
        border
      >
        <el-table-column label="微信昵称" align="center">
          <template slot-scope="scope">
            {{ scope.row.weChatUserPo.nickName }}
          </template>
        </el-table-column>
        <el-table-column label="默认手机号" align="center">
          <template slot-scope="scope">
            {{ scope.row.weChatUserPo.defaultVipMobile }}
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                  :limit.sync="listQuery.pageSize" @pagination="getList"/>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showUsers = !showUsers" :disabled="importStatus.status === 0 && total > 0" v-text="showUsers ? '隐藏用户' : '查看用户'"></el-button>
      <el-button @click="onClose" :disabled="importStatus.status === 0">取消</el-button>
      <el-button type="primary" @click="submitUpload" :loading="importStatus.status === 0">导入</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {upShelf} from '@/api/vip/ticket/ticket'
  import {getAll} from '@/api/vip/grade/grade'
  import {getToken} from '@/utils/auth'
  import {getStatus} from '@/api/common/upload'
  import {getList} from '@/api/vip/ticket/ticketSettleUser'
  import Pagination from '@/components/Pagination'

  export default {
    components: {Pagination},
    filters: {},
    directives: {},
    props: {},
    computed: {},
    data() {
      return {
        importAction: process.env.BASE_API + '/api/vip/ticket/import_shelf_user_excel',
        show: false,
        importFileList: [],
        importHeaders: {'X-Token': getToken()},
        importStatus: {totalRowCount: 0, nowRowCount: 0, status: -2},
        importUseTime: {start: new Date(), useTime: 0},
        downloadTemplateUrl: '/static/templates/ticket/user.xlsx',
        uploadData: {
          ticketId: ''
        },
        list: [],
        listLoading: false,
        showUsers: false,
        total: 0,
        listQuery: {
          ticketId: '',
          pageIndex: 1,
          pageSize: 10,
          mobile: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      },
      //下载模板
      downloadTemplate() {
        window.open(this.downloadTemplateUrl)
      },
      submitUpload() {
        this.importStatus = {totalRowCount: 0, nowRowCount: 0, status: -2}
        this.$refs.upload.submit()
        this.importUseTime.start = new Date()
      },
      uploadStatus() {
        getStatus({key: 'shelf_user'}).then(response => {
          let data = response.data
          if (data == null) {
            this.importStatus.status = 0
            setTimeout(() => this.uploadStatus(), 2000)
            return
          }
          this.importStatus = data
          if (data.status === 0) {
            setTimeout(() => this.uploadStatus(), 2000);
          } else if (data.status === 1) {
            this.importUseTime.useTime = (new Date().getTime() - this.importUseTime.start.getTime()) / 1000
            this.$message({message: "上传成功", type: 'success'})
            this.getList()
            this.showUsers = true
          } else if (data.status === -1) {
            this.importUseTime.useTime = (new Date().getTime() - this.importUseTime.start.getTime()) / 1000
            this.$message.error("上传失败，请查看错误文件")
          } else {
            data.status === -1
            this.$message.error("系统异常")
          }
        }).catch(e => {
          this.importStatus = {totalRowCount: 0, nowRowCount: 0, status: -2}
        })
      },
      importFileBack() {
        this.importStatus.status = 0
        this.importFileList = []
        this.uploadStatus()
      },
      downloadImportErrorFile() {
        window.open("/download/temp/" + getToken() + ".xlsx")
      },
      onClose() {
        this.show = false
      },
      onOpen(ele) {
        this.uploadData.ticketId = ele.id
        this.listQuery.ticketId = ele.id
        this.showUsers = false
        this.getList()
        this.importFileList = []
        if (this.importStatus.status == 1) {
          this.importStatus = {totalRowCount: 0, nowRowCount: 0, status: -2}
        }
        this.show = true
      }
    }
  }
</script>

<style scoped>

</style>
