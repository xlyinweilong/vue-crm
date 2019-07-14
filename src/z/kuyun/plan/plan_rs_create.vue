<template>
  <el-dialog title="生成结果" :visible="show" width="50%" @close="onClose" @open="onOpen">
    <el-form ref="form" :model="form" :rules="rules" v-loading="loading">
      <el-form-item label="jessionId" prop="jessionId">
        <el-input v-model="form.jessionId" placeholder="8D0DF9CB592437A4CE13C555A5CDB09F"></el-input>
      </el-form-item>
      <el-form-item label="dtid" prop="dtid">
        <el-input v-model="form.dtid" placeholder="z_6xk"></el-input>
      </el-form-item>
      <el-form-item label="uuid_0" prop="uuid_0">
        <el-input v-model="form.uuid_0" placeholder="oNEPk7"></el-input>
      </el-form-item>
      <el-form-item label="uuid_1" prop="uuid_1">
        <el-input v-model="form.uuid_1" placeholder="oNEPa2"></el-input>
      </el-form-item>
    </el-form>
    <el-progress v-if="loading && loadingProgress.nowCount > 0" :percentage="Math.floor(loadingProgress.nowCount / loadingProgress.totalCount * 100)"></el-progress>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose" :loading="loading">取消</el-button>
      <el-button type="primary" @click="create" :loading="loading">生成</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {createRs, progress} from '@/api/kuyun/planRs'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'plan_rs_create',
    components: {
      Pagination,
    },
    filters: {},
    directives: {},
    data() {
      return {
        form: {planId: '', jessionId: '', dtid: '', uuid_1: '', uuid_0: ''},
        rules: {
          jessionId: [{required: true, trigger: 'blur', message: '必填字段'}],
          dtid: [{required: true, trigger: 'blur', message: '必填字段'}],
          uuid_0: [{required: true, trigger: 'blur', message: '必填字段'}],
          uuid_1: [{required: true, trigger: 'blur', message: '必填字段'}]
        },
        loading: false,
        loadingProgress: {}
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
        this.form.planId = this.planId
        this.form.jessionId = this.form.dtid = this.form.uuid_1 = ''
        this.load()
      },
      onClose() {
        if (!this.loading) {
          this.$emit('update:show', false)
        }
      },
      load() {
      },
      create() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true
            createRs(this.form).then(response => {
              this.progress()
            }).catch(() => this.loading = false)
          }
        })
      },
      progress() {
        this.loading = true
        progress({}).then(response => {
          this.loadingProgress = response.data
          if (this.loadingProgress.totalCount > this.loadingProgress.nowCount) {
            setTimeout(() => this.progress(), 3000)
          } else if (this.loadingProgress.totalCount == this.loadingProgress.nowCount) {
            this.loading = false
            this.$message({message: '操作成功', type: 'success'})
            setTimeout(() => this.$emit('reload', {}), 1000)
            setTimeout(() => this.onClose(), 3000)
          }
        }).catch(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
