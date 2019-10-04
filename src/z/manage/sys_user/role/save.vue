<template>
  <el-dialog
    :title="form.id == '' ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="650px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model.trim="form.roleName" :maxlength="20" placeholder="请输入角色名称" @keyup.enter.native="save"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {info,save} from '@/api/manager/sys_user/role'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    data() {
      return {
        show: false,
        rules: {
          roleName: [{required: true, trigger: 'blur', message: '必填字段'}]
        },
        loading: false,
        title: '',
        form: {}
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.show = false
      },
      onOpen(ele) {
        this.show = true
        if (ele.id != '') {
          this.form = JSON.parse(JSON.stringify(ele))
        } else {
          this.form = {
            id: '',
            roleName: ''
          }
        }
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
              setTimeout(() => {
                this.onClose()
                this.$emit("getList", {})
              }, 600)
            }).finally(() => this.loading = false)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
