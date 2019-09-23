<template>
  <div>
    <div class="filter-container">
      <div v-loading="listLoading">
        <el-form ref="form" :model="form">
          <el-form-item label="url地址">
            <el-input
              @keyup.enter.native="save" clearable
              placeholder="请输入url地址"
              v-model="form.configValue">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="filter-container" style="margin-top: 20px">
        <el-button style="float:right" :loading="listLoading" class="filter-item" type="success" icon="el-icon-check" @click="save">保存</el-button>
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
        listLoading: false,
        form: {
          configValue: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      init() {
        this.info()
      },
      info() {
        this.listLoading = true
        info({key:'VIP_DETAIL'}).then(res => {
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
