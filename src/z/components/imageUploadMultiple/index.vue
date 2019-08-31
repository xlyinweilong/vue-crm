<template>
  <div class="imageUploadMultiple">
    <el-upload
      :action="baseApi + '/api/upload/upload?parent='+type"
      list-type="picture-card"
      :on-success="onSuccess"
      :multiple="false"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :before-upload="beforeUpload"
      :on-remove="removeImage"
      :limit="9"
      :on-progress="onProgress">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="baseUrl + dialogImageUrl" alt="图片"/>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {
      type: {
        default: 'channel'
      },
      width: {
        default: 200
      },
      height: {
        default: 200
      },
      baseUrl: {
        default: ''
      },
      fileList: {
        default: []
      }
    },
    data() {
      return {
        baseApi: process.env.BASE_API,
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    mounted() {
    },
    methods: {
      beforeUpload(file) {
        return true
      },
      onSuccess(response, file, fileList) {
        this.fileList.push({uid:file.uid,name: file.name, url: file.url, imageUrl: response.data})
      },
      onProgress(event, file, fileList) {
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.imageUrl;
        this.dialogVisible = true;
      },
      removeImage(file, fileList) {
        let index = this.fileList.findIndex(f => f.imageUrl === file.imageUrl)
        this.fileList.splice(index, 1)
      },
      showImage() {
        this.dialogVisible = true
      }
    }
  }
</script>

<style>
  .imageUpload .uploading {
    border: 1px dashed #d9d9d9;
    height: 200px;
    width: 200px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .imageUpload .uploading:hover {
    border-color: #409EFF;
  }

  .imageUpload .image {
    width: 200px;
    height: 200px;
  }

  .imageUpload .icon {
    font-size: 40px;
    color: white;
    cursor: pointer;
  }

  .hoverDiv {
    position: absolute;
    height: 200px;
    width: 200px;
    top: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: alpha(Opacity=0);
    -moz-opacity: 0.0;
    opacity: 0.0;
  }

  .imageUpload .hoverDiv:hover {
    position: absolute;
    height: 200px;
    width: 200px;
    top: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: alpha(Opacity=60);
    -moz-opacity: 0.6;
    opacity: 0.6;
    background-color: #000000;
  }

  .avatar-uploader .el-upload {
    width: 200px;
    height: 200px;
  }

  .avatar-uploader .el-upload-dragger {
    width: 200px;
    height: 200px
  }
</style>
