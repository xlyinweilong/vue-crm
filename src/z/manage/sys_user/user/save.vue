<template>
  <el-dialog
    :title="eleId == '' ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="60%">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="账号" prop="account">
            <el-input v-model.trim="form.account" :maxlength="20" placeholder="请输入账号" @keyup.enter.native="save"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model.trim="form.password" :maxlength="20" placeholder="请输入密码" @keyup.enter.native="save"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model.trim="form.name" :maxlength="20" placeholder="请输入姓名" @keyup.enter.native="save"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="禁用">
            <el-select :disabled="form.type == 'root'" style="width: 100%" v-model="form.disabled" placeholder="请选择">
              <el-option :key="0" label="启用" :value="false"/>
              <el-option :key="1" label="禁用" :value="true"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="角色">
            <el-select :disabled="form.type == 'root'" style="width: 100%" v-model="form.roles" placeholder="请选择角色" multiple>
              <el-option v-for="role in roleList" :key="role.id" :label="role.roleName" :value="role.id"/>
            </el-select>
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
  import {info, save} from '@/api/manager/sys_user/user'
  import {all as allRole} from '@/api/manager/sys_user/role'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    data() {
      return {
        show: false,
        eleId: '',
        rules: {
          account: [{required: true, trigger: 'blur', message: '必填字段'}],
          name: [{required: true, trigger: 'blur', message: '必填字段'}]
        },
        loading: false,
        title: '',
        form: {},
        roleList: []
      }
    },
    mounted() {
    },
    methods: {
      async getRoleList() {
        if (this.roleList.length == 0) {
          this.loading = true
          await allRole().then(res => {
            this.roleList = res.data
          }).finally(() => this.loading = false)
        }
      },
      onClose() {
        this.show = false
      },
      onOpen(eleId) {
        this.show = true
        this.eleId = eleId
        this.getRoleList()
        if (eleId != '') {
          this.loading = true
          info({id: eleId}).then((res) => {
            this.form = res.data
            this.form.password = ''
          }).finally(() => this.loading = false)
        } else {
          this.form = {
            type: 'manual',
            account: '',
            name: '',
            disabled: false,
            password: '',
            roles: []
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
