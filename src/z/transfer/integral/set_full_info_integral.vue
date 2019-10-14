<template>
  <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="完善用户资料获取的积分数量" prop="setUserInfoGiveIntegral">
          <el-tooltip class="item" effect="dark" content="0表示不获得积分" placement="top-start">
            <el-input-number style="width: 100%" v-model="form.setUserInfoGiveIntegral" :min="0" :max="10000000" :step="1" step-strictly label="积分数量"></el-input-number>
          </el-tooltip>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="评价单据赠送积分数量" prop="evaluationGiveIntegral">
          <el-tooltip class="item" effect="dark" content="0表示不获得积分" placement="top-start">
            <el-input-number style="width: 100%" v-model="form.evaluationGiveIntegral" :min="0" :max="10000000" :step="1" step-strictly label="积分数量"></el-input-number>
          </el-tooltip>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="save" :loading="loading">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {saveConfig, infoConfig} from '@/api/transfer/integral'

  export default {
    components: {},
    filters: {},
    directives: {},
    data() {
      return {
        rules: {
          setUserInfoGiveIntegral: [{required: true, trigger: 'blur', message: '必填字段'}],
          evaluationGiveIntegral: [{required: true, trigger: 'blur', message: '必填字段'}]
        },
        loading: false,
        title: '',
        form: {
          setUserInfoGiveIntegral: 0,
          evaluationGiveIntegral: 0
        }
      }
    },
    mounted() {
      this.info()
    },
    methods: {
      info() {
        this.loading = true
        infoConfig().then(res => {
          this.form = res.data
        }).finally(() => this.loading = false)
      },
      save() {
        this.$refs.form.validate(valid => {
          if (valid && !this.loading) {
            this.loading = true
            saveConfig(this.form).then(res => {
              this.$message({message: '保存成功', type: 'success'})
              this.info()
            }).finally(() => this.loading = false)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
