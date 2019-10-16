<template>
  <el-dialog
    :title="form.id == null ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    width="650px"
    @close="onClose">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-form-item label="关键字" prop="keyword">
        <el-input style="width: 100%" v-model="form.keyword" :maxlength="250" @keyup.enter.native="save" placeholder="请输入识别的关键字"></el-input>
      </el-form-item>
      <el-form-item label="回复内容" prop="reply">
        <el-input v-model="form.reply" type="textarea" :rows="2" placeholder="请输入要回复的内容" :maxlength="2000"></el-input>
      </el-form-item>
      <el-form-item label="禁用" prop="disabled">
        <el-select style="width: 100%" v-model="form.disabled" placeholder="请选择">
          <el-option :key="false" label="启用" :value="false" />
          <el-option :key="true" label="禁用" :value="true" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
      <el-button :loading="loading" @click="onClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {save} from '@/api/manager/wechat/reply'

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
          keyword: [{required: true, message: '必填字段', trigger: 'blur'}],
          reply: [{required: true, message: '必填字段', trigger: 'blur'}]
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
