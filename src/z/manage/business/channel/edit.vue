<template>
  <el-dialog
    :title="'编辑：'+ele.name"
    :visible.sync="show"
    :before-close="onClose"
    @open="onOpen"
    top="3vh"
    width="650px">
    <div v-loading="loading">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="别名：">
          <el-input v-model="form.aliasName" :maxlength="100">
            <el-tooltip slot="append" class="item" effect="dark" content="没有别名显示店铺的名称" placement="top">
              <el-button icon="el-icon-question"></el-button>
            </el-tooltip>
          </el-input>

        </el-form-item>
        <el-form-item label="地址：">
          <el-input v-model="form.address" :maxlength="200"></el-input>
        </el-form-item>
        <el-form-item label="介绍图：">
          <div v-if="status === 'HAS_IMAGE'" class="imageDiv">
            <el-image class="image" :src="baseUrl + form.imageUrl" fit="fit"/>
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
            style="width: 200px;height: 200px"
            class="avatar-uploader"
            drag
            :show-file-list="false"
            :on-success="onSuccess"
            :multiple="false"
            :before-upload="beforeUpload"
            :on-progress="onProgress"
            :action="baseApi + '/api/upload/upload?parent=channel'">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="save" :loading="loading">确定</el-button>
    </span>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="baseUrl + form.imageUrl" alt="图片"/>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import {save} from '@/api/manager/business/channel'

  export default {
    name: 'channelEdit',
    components: {},
    filters: {},
    directives: {},
    props: {
      show: {
        default: false
      },
      ele: {
        default: {}
      },
      baseUrl: {
        default: ''
      }
    },
    data() {
      return {
        baseApi: process.env.BASE_API,
        loading: false,
        dialogVisible: false,
        percent: 0,
        status: 'NO_FILE',
        form: {
          aliasName: '',
          address: '',
          imageUrl: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      onOpen() {
        this.form.aliasName = this.ele.aliasName
        this.form.address = this.ele.address
        if (this.ele.imageUrl == null || this.ele.imageUrl == '') {
          this.form.imageUrl = ''
          this.status = 'NO_FILE'
        } else {
          this.form.imageUrl = this.ele.imageUrl
          this.status = 'HAS_IMAGE'
        }
      },
      onClose() {
        this.$emit('update:show', false)
      },
      beforeUpload(file) {
        return true
      },
      onSuccess(response, file, fileList) {
        this.status = 'HAS_IMAGE'
        this.form.imageUrl = response.data
      },
      onProgress(event, file, fileList) {
        this.status = 'UPLOADING'
        this.percent = event.percent
      },
      removeImage() {
        this.status = 'NO_FILE'
        this.form.imageUrl = ''
      },
      showImage() {
        this.dialogVisible = true
      },
      save() {
        this.loading = true
        this.form.id = this.ele.id
        save(this.form).then(res => {
          this.$message({type: 'success', message: '保存成功!'})
          this.onClose()
          this.$emit('getList', {})
        }).finally(() => this.loading = false)
      }
    }
  }
</script>


<style scoped>
  .uploading {
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

  .uploading:hover {
    border-color: #409EFF;
  }

  .image {
    width: 200px;
    height: 200px;
  }

  .icon {
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

  .hoverDiv:hover {
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
</style>
<style>
  .avatar-uploader .el-upload {
    width: 200px;
    height: 200px;
  }

  .avatar-uploader .el-upload-dragger {
    width: 200px;
    height: 200px
  }
</style>
