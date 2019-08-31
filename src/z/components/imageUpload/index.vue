<template>
  <div class="imageUpload">
    <div v-if="status === 'HAS_IMAGE' && imageUrl != ''" class="imageDiv">
      <el-image class="image" :src="baseUrl + imageUrl" fit="fit"/>
      <div class="hoverDiv">
        <i class="el-icon-zoom-in icon" @click="showImage"/>
        <i class="el-icon-delete icon" @click="removeImage" style="margin-left: 35px;"/>
      </div>
    </div>
    <div class="uploading" v-show="status === 'UPLOADING'">
      <el-progress type="circle" :percentage="percent"/>
    </div>
    <el-upload
      v-show="status === 'NO_FILE'"
      :style="'width:' + width+'px;height:'+ height+'px'"
      class="avatar-uploader"
      drag
      :show-file-list="false"
      :on-success="onSuccess"
      :multiple="false"
      :before-upload="beforeUpload"
      :on-progress="onProgress"
      :action="baseApi + '/api/upload/upload?parent='+type">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="baseUrl + imageUrl" alt="图片"/>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {
      imageUrl: {
        default: ''
      },
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
      status: {
        default: 'NO_FILE'
      }
    },
    data() {
      return {
        baseApi: process.env.BASE_API,
        percent: 0,
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
        this.$emit('update:status', 'HAS_IMAGE')
        this.$emit('update:imageUrl', response.data)
      },
      onProgress(event, file, fileList) {
        this.$emit('update:status', 'UPLOADING')
        this.percent = event.percent
      },
      removeImage() {
        this.$emit('update:status', 'NO_FILE')
        this.$emit('update:imageUrl', '')
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
