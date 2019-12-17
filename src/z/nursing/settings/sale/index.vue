<template>
  <div class="app-container">
    <div class="filter-container">
      <div v-loading="loading">
        <el-form ref="form" :model="form">
          <el-form-item label="每消费N元得1换新币">
            <el-input-number style="width: 100%" v-model="form.configValue" :min="1" :max="9999999" :step="1" step-strictly></el-input-number>
          </el-form-item>
        </el-form>
      </div>
      <div class="filter-container" style="margin-top: 20px">
        <el-button style="float:right" :loading="loading" class="filter-item" type="success" icon="el-icon-check"
                   @click="save">保存
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
    import {save, info} from '@/api/config/sysconfig'

    export default {
        components: {},
        filters: {},
        directives: {},
        data() {
            return {
                form: {
                    configValue: 1
                },
                loading: false
            }
        },
        mounted() {
            this.info()
        },
        methods: {
            info() {
                this.listLoading = true
                info({key: 'NURSING_SALE'}).then(res => {
                    this.form = res.data
                }).finally(() => this.listLoading = false)
            },
            // 获取列表
            save() {
                this.listLoading = true
                save(this.form).then(res => {
                    this.$message({message: res.message, type: 'success'})
                    this.info()
                }).catch(() => this.listLoading = false)
            }
        }
    }
</script>

<style scoped>

</style>
