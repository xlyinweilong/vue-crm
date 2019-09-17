<template>
  <div>
    <div class="tab-container">
      <el-tabs v-model="tabName" style="margin-top:15px;" type="border-card">
        <el-tab-pane label="主体信息" name="BASE">
          <el-form ref="form" :model="form" :rules="rules" v-loading="loading" label-width="120px">
            <el-form-item label="公司logo" prop="logo">
              <imageUpload :imageUrl.sync="form.logoUrl" :status.sync="logoUrlStatus" :baseUrl="baseUrl" :type="'logo'"/>
              <div>只支持png/jpg格式，大小不能超过1M;建议像素为300*300</div>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="公司名称" prop="name">
                    <el-input v-model.trim="form.name" @keyup.enter.native="saveData"></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="12">-->
                <!--<el-form-item label="公众号开发者AppSecret" prop="weChatPlatformAppSecret">-->
                  <!--<el-input v-model.trim="form.weChatPlatformAppSecret" @keyup.enter.native="saveData"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="saveData">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!--<el-tab-pane label="设置" name="CONF">-->

        <!--</el-tab-pane>-->
      </el-tabs>

    </div>
  </div>
</template>

<script>
  import imageUpload from '@/z/components/imageUpload/index'
  import {getBaseUrl} from '@/api/upload/upload'
  import {save, info} from '@/api/manager/platform/companyInfo'

  export default {
    components: {imageUpload},
    data() {
      return {
        baseUrl: '',
        logoUrlStatus: 'NO_FILE',
        form: {
          logoUrl: '',
          name:''
        },
        rules: {
          // logo: [{required: true, message: '必填字段', trigger: 'blur'}]
        },
        loading: false,
        tabName: 'BASE'
      }
    },
    created() {
      this.getBaseUrl()
      this.info()
    },
    methods: {
      async getBaseUrl() {
        await getBaseUrl().then(res => this.baseUrl = res.data)
      },
      info() {
        this.loading = true
        info().then(res => {
          if (res.data != null) {
            this.form = res.data
            if (res.data.logoUrl != null && res.data.logoUrl != '') {
              this.logoUrlStatus = 'HAS_IMAGE'
            }
          }
        }).finally(() => this.loading = false)
      },
      saveData() {
        this.$refs['form'].validate((valid) => {
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
