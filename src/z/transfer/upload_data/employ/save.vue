<template>
  <el-dialog
    :title="form.id == '' ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="650px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules" label-width="80px">
      <el-form-item label="编号" prop="code">
        <el-input v-model.trim="form.code" :maxlength="20" placeholder="请输入编号"
                  @keyup.enter.native="save"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="form.name" :maxlength="100" placeholder="请输入名称"
                  @keyup.enter.native="save"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select style="width: 100%" v-model="form.sex" placeholder="请选择">
          <el-option :key="0" label="女" :value="0"/>
          <el-option :key="1" label="男" :value="1"/>
        </el-select>
      </el-form-item>
      <el-form-item label="启用" prop="disabled">
        <el-select style="width: 100%" v-model="form.disabled" placeholder="请选择">
          <el-option :key="0" label="启用" :value="0"/>
          <el-option :key="1" label="失效" :value="1"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {save} from '@/api/manager/business/employ'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    data() {
      return {
        loading: false,
        show: false,
        form: {
          id: ''
        },
        rules: {
          code: [{required: true, trigger: 'blur', message: '必填字段'}],
          name: [{required: true, trigger: 'blur', message: '必填字段'}],
          sex: [{required: true, trigger: 'blur', message: '必填字段'}],
          disabled: [{required: true, trigger: 'blur', message: '必填字段'}]
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
