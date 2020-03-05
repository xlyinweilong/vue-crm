<template>
  <div>
    <div class="tab-container" style="max-width: 600px">
      <el-tabs v-model="tabName" style="margin-top:15px;" type="border-card">
        <el-tab-pane label="证书上传" name="BASE">
          <div v-loading="loading" style="text-align: center;margin: auto">
            <el-upload
              drag
              :action="importAction" accept=".p12"
              :on-preview="handlePreview"
              :limit="1"
              :file-list="importFileList" :headers="importHeaders"
              :on-remove="handleRemove"
              :on-success="handleSuccess">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将证书到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传p12文件</div>
            </el-upload>
          </div>
          <div class="filter-container" style="margin-top: 20px">
            <el-tag v-if="hasCert" type="success">当前有证书</el-tag>
            <el-tag v-if="!hasCert" type="warning">当前没有证书</el-tag>
            <el-button style="float:right" :loading="loading" class="filter-item" type="success" icon="el-icon-check" @click="save">保存</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import {save, info} from '@/api/config/sysconfig'
  import {getToken} from '@/utils/auth'

  export default {
    components: {},
    data() {
      return {
        importAction: process.env.BASE_API + '/api/upload/upload?parent=certificate',
        importFileList: [],
        importHeaders: {'X-Token': getToken()},
        certificateUrl: '',
        loading: false,
        tabName: 'BASE',
        hasCert: false
      }
    },
    created() {
      this.info()
    },
    methods: {
      info() {
        this.loading = true
        info({key: 'WE_CHAT_PAY_CERT_PATH'}).then(res => {
          this.hasCert = (res.data.configValue != null && res.data.configValue != '')
        }).finally(() => this.loading = false)
      },
      handlePreview(file) {
        this.certificateUrl = ''
      },
      handleRemove(file, fileList) {
        this.certificateUrl = ''
        this.importFileList = fileList
      },
      handleSuccess(res, file, fileList) {
        if (res.code != 0) {
          this.$message.error(res.message)
          return
        }
        this.certificateUrl = res.data
        this.importFileList = fileList
      },
      save() {
        if (this.certificateUrl == null || this.certificateUrl == '') {
          this.$message({message: '请先上传证书文件', type: 'warning'})
          return
        }
        this.loading = true
        save({configKey: 'WE_CHAT_PAY_CERT_PATH', configValue: this.certificateUrl}).then(response => {
          this.info()
          this.$message({message: '保存成功', type: 'success'})
        }).finally(() => this.loading = false)
      },
    }
  }
</script>
