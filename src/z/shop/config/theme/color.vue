<template>
  <el-dialog
    title="颜色配置"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="480px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules" label-width="80px">
      <el-form-item label="主题色" prop="colorPrimary">
        <el-color-picker v-model="form.colorPrimary"></el-color-picker>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="成功颜色" prop="colorSuccess">
            <el-color-picker v-model="form.colorSuccess"></el-color-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="危险颜色" prop="colorDanger">
            <el-color-picker v-model="form.colorDanger"></el-color-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="警告颜色" prop="colorWarning">
            <el-color-picker v-model="form.colorWarning"></el-color-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="信息颜色" prop="colorInfo">
            <el-color-picker v-model="form.colorInfo"></el-color-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>

  import {save} from '@/api/shop/config/theme/theme'

  export default {
    components: {},
    filters: {},
    directives: {},
    data() {
      return {
        loading: false,
        show: false,
        form: {},
        rules: {
          colorPrimary: [{required: true, trigger: 'blur', message: '必填字段'}],
          colorSuccess: [{required: true, trigger: 'blur', message: '必填字段'}],
          colorDanger: [{required: true, trigger: 'blur', message: '必填字段'}],
          colorWarning: [{required: true, trigger: 'blur', message: '必填字段'}],
          colorInfo: [{required: true, trigger: 'blur', message: '必填字段'}]
        }
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.show = false
      },
      onOpen(ele) {
        this.form = JSON.parse(JSON.stringify(ele))
        this.show = true
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
      },
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            save(this.form).then(res => {
              this.$message({message: '保存成功', type: 'success'})
              this.onClose()
              this.$emit("getList", {})
            }).finally(() => this.loading = false)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
