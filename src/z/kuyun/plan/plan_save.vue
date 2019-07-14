<template>
  <el-dialog :title="form.id == '' ? '新增' : '修改'" :visible="show" width="50%" @close="onClose" @open="onOpen">
    <el-form ref="form" :model="form" :rules="rules" v-loading="loading" auto-complete="off">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" @keyup.enter.native="save"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose" :loading="loading">取消</el-button>
      <el-button type="primary" @click="save" :loading="loading">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {save, info} from '@/api/kuyun/plan'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'plan_save',
    components: {
      Pagination,
    },
    filters: {},
    directives: {},
    data() {
      return {
        form: {id: '', name: ''},
        rules: {
          name: [{required: true, trigger: 'blur', message: '必填字段'}]
        },
        loading: false
      }
    },
    props: {
      planId: {default: ''},
      show: {default: false},
    },
    created() {
    },
    methods: {
      onOpen() {
        this.form.id = this.planId
        this.form.name = ''
        this.load()
      },
      onClose() {
        this.$emit('update:show', false)
      },
      load() {
        if (this.form.id != '') {
          this.loading = true
          info({id: this.form.id}).then(response => {
            this.form = response.data
          }).finally(() => this.loading = false)
        }
      },
      save() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true
            save(this.form).then(response => {
              this.$message({message: '保存成功', type: 'success'})
              this.$emit('reload', {})
              this.onClose()
            }).finally(() => this.loading = false)
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
