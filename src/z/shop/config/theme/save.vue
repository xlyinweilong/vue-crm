<template>
  <el-dialog
    :title="form.id == null ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="600px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="form.name" placeholder="请输入名称" @keyup.enter.native="save" :maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="激活" prop="active">
        <el-select style="width: 100%" v-model="form.active" placeholder="请选择是否激活">
          <el-option key="true" label="激活" :value="true"/>
          <el-option key="false" label="不激活" :value="false"/>
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
          name: [{required: true, trigger: 'blur', message: '必填字段'}],
          active: [{required: true, trigger: 'blur', message: '必填字段'}]
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
