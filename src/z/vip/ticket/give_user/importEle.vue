<template>
  <el-dialog title="导入" :visible="show" :close-on-click-modal="false" width="600px" @close="onClose">
    <el-form>
      <el-form-item :label="importStatus.status != 0 ? '请选择文件' : '正在处理'">
        <el-upload class="upload-demo" ref="upload"
                   :action="importAction"
                   :disabled="loading"
                   accept=".xlsx" :auto-upload="false" :limit="1" :file-list="importFileList" :with-credentials="true"
                   :headers="importHeaders" :on-success="uploadSuccess" :on-error="uploadError">
          <el-button v-show="importStatus.status != 0" slot="trigger" size="small" type="success">选取文件</el-button>
          <div v-show="importStatus.status != 0" slot="tip" class="el-upload__tip">
            <el-button type="text" @click="downloadTemplate">点击这里</el-button>
            下载上传文件模板
          </div>
          <!--<div slot="tip" class="el-upload__tip" v-show="importStatus.status > -2">-->
          <!--<span v-show="importStatus.status != -1 && importStatus.status != 1">文件上传成功，正在处理数据，请稍后...<br/></span>-->
          <!--<span v-show="importStatus.totalRowCount > 0">总计行数：{{importStatus.totalRowCount}}，当前进度：{{importStatus.nowRowCount}}<br/></span>-->
          <!--<span v-show="importStatus.status === 0 && importStatus.totalRowCount > 0 && importStatus.nowRowCount === importStatus.totalRowCount">正在尝试写入数据库，请稍等<br/></span>-->
          <!--<span v-show="importStatus.status === -1">处理失败，用时：{{importStatus.useTime}}<span v-show="importStatus.errorUrl != null">，请<el-button type="text" @click="downloadImportErrorFile">点击这里</el-button>下载失败文件</span></span>-->
          <!--<span v-show="importStatus.status === 1">处理完成，用时：{{importStatus.useTime}}</span>-->
          <!--</div>-->
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose" :disabled="importStatus.status === 0">取消</el-button>
      <el-tooltip :loading="loading" class="item" effect="dark" content="每天发送数量受微信限制，默认每天10万条（具体登录公众号查看）" placement="top">
        <el-button type="primary" @click="submitUpload" :loading="loading || importStatus.status === 0">导入并发送</el-button>
      </el-tooltip>
    </div>
  </el-dialog>
</template>

<script>
  import {getToken} from '@/utils/auth'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    computed: {},
    data() {
      return {
        show: false,
        loading: false,
        importAction: process.env.BASE_API + '/api/vip/ticket/send_log/import_excel',
        importFileList: [],
        importHeaders: {'X-Token': getToken()},
        importStatus: {totalRowCount: 0, nowRowCount: 0, status: -2, useTime: '', errorUrl: null},
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.show = false
      },
      onOpen() {
        this.show = true
      },
      submitUpload() {
        this.loading = true
        this.$refs.upload.submit();
      },
      //下载模板
      downloadTemplate() {
        window.open("/static/templates/send_ticket.xlsx")
      },
      uploadSuccess() {
        this.loading = false
      },
      uploadError() {
        this.loading = false
      }
    }
  }
</script>

<style scoped>

</style>
