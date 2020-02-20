<template>
  <el-dialog
    title="修改收货地址"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="800px">
    <!--商品明细-->
    <div v-loading="loading">
      <el-form ref="form" :model="form" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="收货人" prop="locationReceiver">
              <el-input v-model.trim="form.locationReceiver" placeholder="请输入快递单号" @keyup.enter.native="save" :maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="locationMobile">
              <el-input v-model.trim="form.locationMobile" placeholder="请输入快递单号" @keyup.enter.native="save" :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="省份" prop="locationProvinceName">
              <el-input v-model.trim="form.locationProvinceName" placeholder="请输入快递单号" @keyup.enter.native="save" :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="城市" prop="locationCityName">
              <el-input v-model.trim="form.locationCityName" placeholder="请输入快递单号" @keyup.enter.native="save" :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域" prop="locationStationName">
              <el-input v-model.trim="form.locationStationName" placeholder="请输入快递单号" @keyup.enter.native="save" :maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="地址" prop="locationAddress">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入详细地址"
            v-model="form.locationAddress" :maxlength="250">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">关闭</el-button>
      <el-button type="primary" :loading="loading" @click="save">修改</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {changeLocation} from '@/api/shop/business/order/order'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    data() {
      return {
        loading: false,
        show: false,
        form: {},
        rules: {
          locationReceiver: [{required: true, trigger: 'blur', message: '必填字段'}],
          locationMobile: [{required: true, trigger: 'blur', message: '必填字段'}],
          locationProvinceName: [{required: true, trigger: 'blur', message: '必填字段'}],
          locationCityName: [{required: true, trigger: 'blur', message: '必填字段'}],
          locationStationName: [{required: true, trigger: 'blur', message: '必填字段'}],
          locationAddress: [{required: true, trigger: 'blur', message: '必填字段'}]
        }
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.show = false
      },
      onOpen(ele) {
        this.form = JSON.parse(JSON.stringify(ele))
        this.show = true
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
      },
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            changeLocation(this.form).then(res => {
              this.$message({message: '保存成功', type: 'success'})
              this.onClose()
              this.$emit("getList", {})
            }).finally(() => this.loading = false)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
