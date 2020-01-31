<template>
  <el-dialog
    :title="form.id == null ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="600px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-form-item label="搜索内容" prop="searchText">
        <el-input v-model.trim="form.searchText" placeholder="请输入名称" @keyup.enter.native="save" :maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sortIndex">
        <el-tooltip class="item" effect="dark" content="数字越小越排在前面" placement="top">
          <el-input-number style="width: 100%" v-model="form.sortIndex" :min="0" :max="9999" :step="1" :controls="false"
                           step-strictly></el-input-number>
        </el-tooltip>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>

  import {save} from '@/api/shop/config/search/recommend'

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
          searchText: [{required: true, trigger: 'blur', message: '必填字段'}],
          sortIndex: [{required: true, trigger: 'blur', message: '必填字段'}]
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
