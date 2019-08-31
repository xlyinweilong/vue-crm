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
          <imageUpload  :imageUrl.sync="form.imageUrl" :status.sync="status" :baseUrl="baseUrl" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取消</el-button>
      <el-button type="primary" @click="save" :loading="loading">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {save} from '@/api/manager/business/channel'
  import imageUpload from '@/z/components/imageUpload/index'

  export default {
    name: 'channelEdit',
    components: {imageUpload},
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
        loading: false,
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

</style>
