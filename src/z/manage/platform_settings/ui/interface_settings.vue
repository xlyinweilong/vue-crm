<template>
  <div class="app-container">
    <el-form v-loading="loading" ref="form" :model="form" label-width="120px">
      <el-form-item label="上端背景图">
        <imageUpload :imageUrl.sync="form.infoBackImageUrl" :status.sync="infoBackImageUrlStatus" :baseUrl="baseUrl" :type="'info'"/>
        <div>不上传使用默认图片</div>
      </el-form-item>
      <el-form-item label="轮播图">
        <imageUploadMultiple :fileList="form.fileList" :baseUrl="baseUrl" :type="'info'"/>
      </el-form-item>
      <el-form-item label="轮播图连接">
        <el-tooltip class="item" effect="dark" content="多个使用英文的逗号分隔" placement="top">
        <el-input
          :maxlength="2000"
          type="textarea"
          autosize
          placeholder="请输入轮播图链接url"
          v-model="form.fileListUrls">
        </el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="底部图">
        <imageUpload :imageUrl.sync="form.infoFooterImageUrl" :status.sync="infoFooterImageUrlStatus" :baseUrl="baseUrl" :type="'info'"/>
        <div>不上传使用默认图片</div>
      </el-form-item>
      <el-form-item label="底部图链接">
        <el-input
          :maxlength="2000"
          placeholder="请输入url"
          v-model="form.infoFooterImageUrlGoUrl"
          clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {info, save} from '@/api/manager/platform/interface'
  import {getBaseUrl} from '@/api/upload/upload'
  import imageUpload from '@/z/components/imageUpload/index'
  import imageUploadMultiple from '@/z/components/imageUploadMultiple/index'

  export default {
    components: {imageUpload, imageUploadMultiple},
    filters: {},
    directives: {},
    data() {
      return {
        baseUrl: '',
        infoBackImageUrlStatus: 'NO_FILE',
        infoFooterImageUrlStatus: 'NO_FILE',
        loading: false,
        form: {
          infoBackImageUrl: '',
          infoFooterImageUrl: '',
          infoFooterImageUrlGoUrl: '',
          fileList: [],
          fileListUrls: ''
        }
      }
    },
    mounted() {
      this.getBaseUrl()
      this.getInfo()
    },
    methods: {
      onSubmit() {
        this.loading = true
        let form = this.form
        form.fileList = this.form.fileList.map(f => f.imageUrl)
        save(form).then(res => {
          this.$message({message: '保存成功', type: 'success'})
          this.getInfo()
        }).finally(() => this.loading = false)
      },
      async getBaseUrl() {
        await getBaseUrl().then(res => this.baseUrl = res.data)
      },
      getInfo() {
        this.loading = true
        info().then(res => {
          this.form = res.data
          if (this.form.infoBackImageUrl != '' && this.form.infoBackImageUrl != null) {
            this.infoBackImageUrlStatus = 'HAS_IMAGE'
          }
          if (this.form.infoFooterImageUrl != '' && this.form.infoFooterImageUrl != null) {
            this.infoFooterImageUrlStatus = 'HAS_IMAGE'
          }
          this.form.fileList = this.form.fileList.map(f => ({uid:f,imageUrl: f, url: this.baseUrl + f}))
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
