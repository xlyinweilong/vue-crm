<template>
  <el-dialog title="导入" :visible="show" width="35%" @close="onClose">
    <el-form>
      <el-form-item :label="importStatus.status != 0 ? '请选择文件' : '正在处理'">
        <el-upload class="upload-demo" ref="upload" :action="importAction" accept=".xlsx" :auto-upload="false" :limit="1" :file-list="importFileList" :headers="importHeaders" :on-success="importFileBack">
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose" :disabled="importStatus.status === 0">取消</el-button>
      <el-button type="primary" @click="submitUpload" :loading="importStatus.status === 0">导入</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getToken} from '@/utils/auth'
  import {getStatus} from '@/api/common/upload'

  export default {
    computed: {},
    data() {
      return {
        importFileList: [],
        importHeaders: {'X-Token': getToken()},
        importStatus: {totalRowCount: 0, nowRowCount: 0, status: -2},
        importUseTime: {start: new Date(), useTime: 0}
      };
    },
    props: {
      importAction: {default: '',required: false},
      downloadTemplateUrl: {default: '',required: false},
      show: {default: false,required: false},
      typeKey:{default: '',required: false}
    },
    methods: {
      //下载模板
      downloadTemplate() {
        window.open(process.env.BASE_API + this.downloadTemplateUrl)
      },
      showImport() {
        this.importFileList = []
        if (this.importStatus.status == 1) {
          this.importStatus = {totalRowCount: 0, nowRowCount: 0, status: -2}
        }
        this.importDialogVisible = true
      },
      submitUpload() {
        this.importStatus = {totalRowCount: 0, nowRowCount: 0, status: -2}
        this.$refs.upload.submit()
        this.importUseTime.start = new Date()
      },
      uploadStatus() {
        getStatus({key: this.typeKey}).then(response => {
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
            this.$emit('get-list', {data: data.data})
            setTimeout(() => this.importDialogVisible = false, 3000)
          } else if (data.status === -1) {
            this.importUseTime.useTime = (new Date().getTime() - this.importUseTime.start.getTime()) / 1000
            this.$message.error("上传失败，请查看错误文件")
          } else {
            this.$message.error("系统异常")
          }
        })
      },
      importFileBack() {
        this.importStatus.status = 0
        this.importFileList = []
        this.uploadStatus()
      },
      downloadImportErrorFile() {
        window.open(process.env.BASE_API + "/download/" + getToken() + ".xlsx")
      },
      onClose() {
        this.$emit('update:show', false)
      }
    }
  }
</script>
