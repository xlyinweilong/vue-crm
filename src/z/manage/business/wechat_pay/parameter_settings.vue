<template>
  <div>
    <sticky class-name="sub-navbar draft">
      <el-button style="margin-left: 10px;" type="success" @click="saveData" :loading="loading">保存</el-button>
    </sticky>

    <div class="tab-container">
      <el-form ref="form" :model="form" :rules="rules" v-loading="loading">
        <el-tabs v-model="tabName" style="margin-top:15px;" type="border-card">
          <el-tab-pane label="开发者信息" name="BASE">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="微信支付商户号" prop="appId">
                  <el-input v-model.trim="form.appId" @keyup.enter.native="saveData"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="微信支付秘钥" prop="secret">
                  <el-input v-model.trim="form.secret" @keyup.enter.native="saveData"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="微信支付秘钥V3" prop="secretV3">
                  <el-input v-model.trim="form.secretV3" @keyup.enter.native="saveData"></el-input>
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
    name: 'parameter_settings',
    components: {Sticky},
    data() {
      return {
        form: {
          appId: '',
          secret: '',
          secretV3: ''
        },
        rules: {
          appId: [{required: true, message: '必填字段', trigger: 'blur'}],
          secret: [{required: true, message: '必填字段', trigger: 'blur'}],
          secretV3: [{required: true, message: '必填字段', trigger: 'blur'}]
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
        this.getInfo('WE_CHAT_PAY_MCH_ID', 'appId')
        this.getInfo('WE_CHAT_PAY_SECRET', 'secret')
        this.getInfo('WE_CHAT_PAY_SECRET_V3', 'secretV3')
        this.loading = false
      },
      saveData() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            this.saveConfig('WE_CHAT_PAY_MCH_ID', 'appId')
            this.saveConfig('WE_CHAT_PAY_SECRET', 'secret')
            this.saveConfig('WE_CHAT_PAY_SECRET_V3', 'secretV3')
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
