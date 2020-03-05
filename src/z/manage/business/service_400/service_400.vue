<template>
  <div>
    <sticky class-name="sub-navbar draft">
      <el-button style="margin-left: 10px;" type="success" @click="saveData" :loading="loading">保存</el-button>
    </sticky>

    <div class="tab-container">
      <el-form ref="form" :model="form" :rules="rules" v-loading="loading">
        <el-tabs v-model="tabName" style="margin-top:15px;" type="border-card">
          <el-tab-pane label="400客服电话" name="BASE">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="400客服电话" prop="service400">
                  <el-input v-model.trim="form.service400" @keyup.enter.native="saveData"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {save, info} from '@/api/config/sysconfig'
  import Sticky from '@/components/Sticky'

  export default {
    name: 'service_400',
    components: {Sticky},
    data() {
      return {
        form: {
          service400: ''
        },
        rules: {
        },
        loading: false,
        tabName: 'BASE'
      }
    },
    created() {
      this.info()
    },
    methods: {
      info() {
        this.loading = true
        this.getInfo('SERVICE_PHONE_400', 'service400')
        this.loading = false
      },
      saveData() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            this.saveConfig('SERVICE_PHONE_400', 'service400')
            this.$message({message: '保存成功', type: 'success'})
            this.loading = false
          }
        })
      },
      async getInfo(key, rs) {
        await info({key: key}).then(res => {
          this.form[rs] = res.data.configValue
        }).catch(() => this.loading = false)
      },
      async saveConfig(key, rs) {
        await save({configKey: key, configValue: this.form[rs]}).then(response => {
        }).catch(() => this.loading = false)
      }
    }
  }
</script>
