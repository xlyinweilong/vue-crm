<template>
  <el-dialog
    title="绑定员工"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="600px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-form-item label="员工编号" prop="code">
        <el-input v-model.trim="form.employCode" @keyup.enter.native="save"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {bindEmploy} from '@/api/user/user'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {
      show: {
        default: false
      }
    },
    data() {
      return {
        eleId: '',
        rules: {
          code: [
            {required: true, trigger: 'blur', message: '必填字段'}
          ],
        },
        loading: false,
        form: {
          employCode: ''
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
        this.loading = true
        bindEmploy(this.form).then(res => {
          this.$message({message: '保存成功', type: 'success'})
          setTimeout(() => {
            this.onClose()
            this.$emit("getList", {})
          }, 600)
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
