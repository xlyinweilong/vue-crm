<template>
  <el-dialog
    :title="eleId == '' ? '新增' : '修改'"
    :visible="show"
    @close="onClose"
    width="60%">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="编号" prop="code">
            <el-input :disabled="form.erpId != null" v-model.trim="form.code" @keyup.enter.native="save"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input :disabled="form.erpId != null" v-model.trim="form.name" @keyup.enter.native="save"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="性别">
            <el-select :disabled="form.erpId != null" style="width: 100%" v-model="form.sex" placeholder="请选择">
              <el-option :key="1" label="男" :value="1"/>
              <el-option :key="0" label="女" :value="0"/>
              <el-option :key="-1" label="未知" :value="-1"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="禁用">
            <el-select :disabled="form.erpId != null" style="width: 100%" v-model="form.disabled" placeholder="请选择">
              <el-option :key="0" label="启用" :value="0"/>
              <el-option :key="1" label="禁用" :value="1"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="昵称">
            <el-input v-model.trim="form.nickname" @keyup.enter.native="save"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话">
            <el-input v-model.trim="form.mobile" @keyup.enter.native="save"></el-input>
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
  import {info, save} from '@/api/manager/business/employ'

  export default {
    name: 'user_add_edit',
    components: {
    },
    filters: {},
    directives: {},
    props: {
      show: {
        default: false
      }
    },
    data() {
      return {
        eleId:'',
        rules: {
          code: [
            {required: true, trigger: 'blur', message: '必填字段'},
            {type: 'string', max: 20, message: '最大长度为20', trigger: 'blur'}
          ],
          name: [{required: true, trigger: 'blur', message: '必填字段'}],
          sex: [{required: true, trigger: 'blur', message: '必填字段'}]
        },
        loading: false,
        title: '',
        form: {
          code: '',
          name: '',
          sex: 1,
          disabled: 0,
          nickname: '',
          mobile: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.$emit("update:show", false)
      },
      onOpen(eleId) {
        this.eleId = eleId
        if (eleId != '') {
          this.loading = true
          info({id: eleId}).then((res) => {
            this.form = res.data
          }).finally(() => this.loading = false)
        } else {
          this.form = {
            code: '',
            name: '',
            sex: 1,
            disabled: 0,
            nickname: ''
          }
        }
        if(this.$refs['form'] != null){
          this.$refs['form'].resetFields()
        }
      },
      save() {
        this.loading = true
        save(this.form).then(res => {
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
