<template>
  <el-dialog
    :title="form.id == null ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="600px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-form-item label="名称" prop="templateName">
        <el-input v-model.trim="form.templateName" placeholder="例如：会员日双倍积分" @keyup.enter.native="save"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="templateType">
        <el-select style="width: 100%" v-model="form.templateType" placeholder="请选择类型">
          <el-option key="BOOLEAN" label="布尔型" value="BOOLEAN"/>
          <el-option key="STRING" label="字符串" value="STRING"/>
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="templateIndex">
        <el-input-number style="width: 100%" v-model="form.templateIndex" :min="0" :max="999999" :step="1" step-strictly @keyup.enter.native="save"></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {info, save} from '@/api/vip/power/template'

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
        rules: {
          templateName: [
            {required: true, trigger: 'blur', message: '必填字段'},
            {type: 'string', max: 200, message: '最大长度为200', trigger: 'blur'}
          ],
          templateType: [{required: true, trigger: 'blur', message: '必填字段'}],
          templateIndex: [{required: true, trigger: 'blur', message: '必填字段'}]
        },
        loading: false,
        title: '',
        form: {
          templateName: '',
          templateType: 'STRING',
          templateIndex: 0
        }
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.$emit("update:show", false)
      },
      onOpen(ele) {
        this.form = JSON.parse(JSON.stringify(ele))
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
      },
      save() {
        this.loading = true
        save(this.form).then(res => {
          this.$message({message: '保存成功', type: 'success'})
          this.onClose()
          this.$emit("getList", {})
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
