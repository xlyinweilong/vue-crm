<template>
  <div>
    <sticky class-name="sub-navbar draft">
      <el-button style="margin-left: 10px;" type="success" @click="saveData" :loading="loading">保存</el-button>
    </sticky>

    <div class="tab-container">
      <el-form ref="configForm" :model="form" :rules="rules" v-loading="loading">
        <el-tabs v-model="tabName" style="margin-top:15px;" type="border-card">
          <el-tab-pane label="开发者信息" name="BASE">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="小程序开发者AppId" prop="weChatAppId">
                  <el-input v-model.trim="form.weChatAppId" @keyup.enter.native="saveData"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="小程序开发者AppSecret" prop="weChatAppSecret">
                  <el-input v-model.trim="form.weChatAppSecret" @keyup.enter.native="saveData"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="公众号开发者AppId" prop="weChatCode">
                  <el-input v-model.trim="form.weChatCode" @keyup.enter.native="saveData"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公众号开发者AppSecret" prop="weChatCode">
                  <el-input v-model.trim="form.weChatCode" @keyup.enter.native="saveData"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!--<el-tab-pane label="设置" name="CONF">-->

          <!--</el-tab-pane>-->
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {save, get} from '@/api/manager/wechat/parameter_settings'
  import Sticky from '@/components/Sticky'

  export default {
    name: 'parameter_settings',
    components: {Sticky},
    data() {
      return {
        form: {
          weChatCode: '',
          weChatAppId: '',
          weChatAppSecret: ''
        },
        rules: {
          weChatCode: [{required: true, message: '必填字段', trigger: 'blur'}],
          weChatAppId: [{required: true, message: '必填字段', trigger: 'blur'}],
          weChatAppSecret: [{required: true, message: '必填字段', trigger: 'blur'}]
        },
        loading: false,
        tabName: 'BASE'
      }
    },
    created() {
      this.loading = true
      get().then(response => {
        this.loading = false
        if (response.data != null) {
          this.form = response.data
        }
      }).catch(() => this.loading = false)
    },
    methods: {
      saveData() {
        this.$refs['configForm'].validate((valid) => {
          if (valid) {
            this.loading = true
            save(this.form).then(response => {
              this.$message({message: response.message, type: 'success'})
            }).finally(() => this.loading = false)
          }
        })
      }
    }
  }
</script>
