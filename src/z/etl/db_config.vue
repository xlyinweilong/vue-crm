<template>
  <div>
    <sticky class-name="sub-navbar draft">
      <el-button style="margin-left: 10px;" type="success" @click="saveData" :loading="loading">保存</el-button>
    </sticky>

    <div class="tab-container">
      <el-form ref="configForm" :model="form" :rules="rules" v-loading="loading">
        <el-tabs v-model="tabName" style="margin-top:15px;" type="border-card">
          <el-tab-pane label="基本资料" name="BASE">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="数据库URL" prop="erpDbUrl">
                  <el-input v-model.trim="form.erpDbUrl" @keyup.enter.native="saveData"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="数据库驱动" prop="erpDbDriverClassName">
                  <el-select style="width: 100%" v-model="form.erpDbDriverClassName" placeholder="请选择">
                    <el-option label="com.microsoft.sqlserver.jdbc.SQLServerDriver" value="com.microsoft.sqlserver.jdbc.SQLServerDriver" />
                    <el-option label=" com.mysql.jdbc.Driverr" value=" com.mysql.jdbc.Driver" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="数据库账号" prop="erpDbUsername">
                  <el-input v-model.trim="form.erpDbUsername" @keyup.enter.native="saveData"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="数据库密码" prop="erpDbPassword">
                  <el-input v-model.trim="form.erpDbPassword" @keyup.enter.native="saveData"></el-input>
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
  import {save, get} from '@/api/etl/config'
  import Sticky from '@/components/Sticky'

  export default {
    name: 'barCode_detail',
    components: {Sticky},
    data() {
      return {
        form: {
          id: null,
          erpDbUrl: '',
          erpDbDriverClassName: '',
          erpDbUsername: '',
          erpDbPassword: ''
        },
        rules: {
          erpDbUrl: [{required: true, message: '必填字段', trigger: 'blur'}],
          erpDbDriverClassName: [{required: true, message: '必填字段', trigger: 'blur'}],
          erpDbUsername: [{required: true, message: '必填字段', trigger: 'blur'}],
          erpDbPassword: [{required: true, message: '必填字段', trigger: 'blur'}]
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
