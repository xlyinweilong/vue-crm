<template>
  <el-dialog
    :title="form.id == null ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    width="650px"
    @close="onClose">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-form-item label="编号" prop="code">
        <el-input style="width: 100%" :disabled="form.id != null" v-model="form.code" :maxlength="20" @keyup.enter.native="save" placeholder="请输入编号"></el-input>
      </el-form-item>
      <el-form-item label="二维码宽度" prop="width">
        <el-input-number style="width: 100%" v-model="form.width" :step="1" :min="280" :max="1280" @keyup.enter.native="save" step-strictly placeholder="请输入二维码宽度"></el-input-number>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="form.remarks" type="textarea" :rows="2" placeholder="请输入备注" :maxlength="2000"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
      <el-button :loading="loading" @click="onClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {save} from '@/api/vip/vip_manager/recommend'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    computed: {},
    data() {
      return {
        show: false,
        loading: false,
        title: '',
        form: {},
        rules: {
          code: [{required: true, message: '必填字段', trigger: 'blur'}],
          width: [{required: true, message: '必填字段', trigger: 'blur'}],
          remarks: [{required: true, message: '必填字段', trigger: 'blur'}]
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
