<template>
  <el-dialog
    title="批量上传商品图片"
    :close-on-click-modal="false"
    :visible="show"
    width="850px"
    @close="onClose">
    <div style="text-align: center">
      <el-upload
        :data="uploadData"
        drag
        :action="importAction" accept=".png,.jpg"
        :on-preview="handlePreview"
        :limit="200"
        :file-list="importFileList" :headers="importHeaders"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
        <div class="el-upload__tip" slot="tip">文件命名：货号+下划线(英文的)+操作字符+正整数排序(从1开始)</div>
        <div class="el-upload__tip" slot="tip">操作字符d表示明细图片，g表示介绍图片(介绍图最多12张)</div>
        <div class="el-upload__tip" slot="tip">命名例如：KJ8662_g1.png</div>
        <div class="el-upload__tip" slot="tip">单次最多上传/保存200张图片</div>
        <div slot="tip" class="el-upload__tip" v-show="importStatus.status > -2">
          <span v-show="importStatus.status != -1 && importStatus.status != 1">文件上传成功，正在处理数据，请稍后...<br/></span>
          <span v-show="importStatus.totalRowCount > 0">总计行数：{{importStatus.totalRowCount}}，当前进度：{{importStatus.nowRowCount}}<br/></span>
          <span v-show="importStatus.status === 0 && importStatus.totalRowCount > 0 && importStatus.nowRowCount === importStatus.totalRowCount">正在尝试写入数据库，请稍等<br/></span>
          <span v-show="importStatus.status === -1">处理失败，用时：{{importUseTime.useTime}}秒</span>
          <span v-show="importStatus.status === 1">处理完成，用时：{{importUseTime.useTime}}秒</span>
        </div>
      </el-upload>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save" :loading="importStatus.status === 0">保存数据到服务器</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getToken} from '@/utils/auth'
  import {getStatus} from '@/api/common/upload'
  import {saveGoodsImage} from '@/api/shop/config/goods/goods'
  import Pagination from '@/components/Pagination'

  export default {
    components: {Pagination},
    filters: {},
    directives: {},
    props: {},
    computed: {},
    data() {
      return {
        importAction: process.env.BASE_API + '/api/upload/upload?parent=temp',
        show: false,
        importFileList: [],
        importHeaders: {'X-Token': getToken()},
        importStatus: {totalRowCount: 0, nowRowCount: 0, status: -2},
        importUseTime: {start: new Date(), useTime: 0},
        uploadData: {}
      }
    },
    mounted() {
    },
    methods: {
      uploadStatus() {
        getStatus({key: 'save_goods_image'}).then(response => {
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
            this.$message({message: "操作成功", type: 'success'})
            this.$emit('getList', {})
          } else if (data.status === -1) {
            this.importUseTime.useTime = (new Date().getTime() - this.importUseTime.start.getTime()) / 1000
            this.$message.error("操作失败，请查看错误文件")
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
        this.importUseTime.start = new Date()
        this.uploadStatus()
      },
      save() {
        this.importFileList.forEach(f => f.imageUrl = f.response.data)
        saveGoodsImage(this.importFileList).then(res => {
          //监控上传进度
          this.importFileBack()
        })
      },
      onClose() {
        this.show = false
      },
      onOpen() {
        this.importFileList = []
        this.show = true
      },
      handlePreview(file) {
      },
      handleRemove(file, fileList) {
        this.importFileList = fileList
      },
      handleSuccess(res, file, fileList) {
        this.importFileList = fileList
      }
    }
  }
</script>

<style scoped>

</style>
