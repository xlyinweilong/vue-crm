<template>
  <el-dialog
    :title="form.id == '' ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    top="1vh"
    @close="onClose"
    width="850px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="form.name" placeholder="请输入名称" @keyup.enter.native="save" :maxlength="50"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="发件人姓名" prop="locationSender">
            <el-input v-model.trim="form.locationSender" placeholder="请输入发件人姓名" @keyup.enter.native="save" :maxlength="20"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发件人手机号码" prop="locationMobile">
            <el-input v-model.trim="form.locationMobile" placeholder="请输入发件人手机号码" @keyup.enter.native="save" :maxlength="20"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="发件人省份" prop="locationProvinceName">
            <el-input v-model.trim="form.locationProvinceName" placeholder="请输入发件人省份" @keyup.enter.native="save" :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发件人市/地区" prop="locationCityName">
            <el-input v-model.trim="form.locationCityName" placeholder="请输入发件人市/地区" @keyup.enter.native="save" :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="发件人区/县" prop="locationStationName">
        <el-input v-model.trim="form.locationStationName" placeholder="请输入发件人区/县" @keyup.enter.native="save" :maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="发件人详细地址" prop="locationAddress">
        <el-input v-model.trim="form.locationAddress" placeholder="请输入发件人详细地址" @keyup.enter.native="save" :maxlength="170"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>

  import {save, deleteEle} from '@/api/shop/config/sender/sender'

  export default {
    components: {},
    filters: {},
    directives: {},
    data() {
      return {
        loading: false,
        show: false,
        form: {},
        rules: {
          name: [{required: true, trigger: 'blur', message: '必填字段'}],
          locationSender: [{required: true, trigger: 'blur', message: '必填字段'}],
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
            save(this.form).then(res => {
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
