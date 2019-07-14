<template>
  <el-dialog title="导入货品" :visible="show" width="50%" @close="onClose" @open="onOpen">
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="importAction"
      :headers="importHeaders"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :limit="1"
      :multiple="false"
      :on-success="uploadSuccess" :on-error="setLoading(false)"
      :auto-upload="false">
      <el-button slot="trigger" type="success" :loading="loading">选取文件</el-button>
      <div slot="tip" class="el-upload__tip">请上传xls/xlsm文件</div>
    </el-upload>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose" :loading="loading">取消</el-button>
      <el-button type="primary" @click="save" :loading="loading">导入</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {save, info} from '@/api/kuyun/plan'
  import {getToken} from '@/utils/auth'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'plan_save',
    components: {
      Pagination,
    },
    filters: {},
    directives: {},
    data() {
      return {
        importAction: process.env.BASE_API + '/api/kuyunshang/plan_goods/upload?planId=' + this.planId,
        importHeaders: {'X-Token': getToken()},
        fileList: [],
        loading: false
      }
    },
    props: {
      planId: {default: ''},
      show: {default: false},
    },
    created() {
    },
    methods: {
      onOpen() {
        this.load()
      },
      onClose() {
        this.$emit('update:show', false)
      },
      load() {
      },
      save() {
        this.$refs.upload.submit()
      },
      beforeUpload(){
        this.loading = true
      },
      uploadSuccess(){
        this.loading = false
        this.$message({message: "上传成功", type: 'success'})
        this.$emit('reload', {})
        setTimeout(() => this.onClose(), 3000)
        this.$refs.upload.clearFiles()
      },
      setLoading(rs) {
        this.loading = rs
      }
    }
  }
</script>

<style scoped>

</style>
