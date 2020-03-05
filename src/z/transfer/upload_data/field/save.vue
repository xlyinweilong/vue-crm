<template>
  <el-dialog
    :title="form.id == '' ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="650px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="form.name" :maxlength="100" placeholder="请输入名称"
                  @keyup.enter.native="save"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {saveBrand, saveCategory, saveCategory2, saveSeason, saveYear} from '@/api/transfer/goods'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {
      type: ''
    },
    data() {
      return {
        loading: false,
        show: false,
        form: {
          id: '',
          name: ''
        },
        rules: {
          name: [{required: true, trigger: 'blur', message: '必填字段'}]
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
            let fun = null
            switch (this.type) {
              case 'brand':
                fun = saveBrand
                break;
              case 'category':
                fun = saveCategory
                break;
              case 'category2':
                fun = saveCategory2
                break;
              case 'season':
                fun = saveSeason
                break;
              case 'year':
                fun = saveYear
                break;
            }
            fun(this.form).then(res => {
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
