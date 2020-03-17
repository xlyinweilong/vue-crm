<template>
  <el-dialog
    title="修改收货"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="800px">
    <el-form ref="form" :model="form" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="取件时间" prop="senderCreateTime">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm:ss"
              style="width: 100%"
              v-model="form.senderCreateTime"
              type="datetime"
              placeholder="选择取件时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发货人姓名" prop="senderLocationSender">
            <el-input
              placeholder="请输入发货人姓名"
              v-model="form.senderLocationSender"
              :maxlength="30"
              clearable>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="发货人电话" prop="senderLocationMobile">
            <el-input
              placeholder="请输入发货人电话"
              v-model="form.senderLocationMobile"
              :maxlength="30"
              clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发货省份" prop="senderLocationProvinceName">
            <el-input
              placeholder="请输入发货省份"
              v-model="form.senderLocationProvinceName"
              :maxlength="30"
              clearable>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="发货城市" prop="senderLocationCityName">
            <el-input
              placeholder="请输入发货城市"
              v-model="form.senderLocationCityName"
              :maxlength="30"
              clearable>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发货地区" prop="senderLocationStationName">
            <el-input
              placeholder="请输入发货地区"
              v-model="form.senderLocationStationName"
              :maxlength="30"
              clearable>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="发货地址" prop="senderLocationAddress">
        <el-input
          type="textarea"
          :rows="2"
          :maxlength="200"
          placeholder="请输入发货地址"
          v-model="form.senderLocationAddress">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">关闭</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {changeRefundSenderLocation} from '@/api/shop/business/refund/refund'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    data() {
      return {
        loading: false,
        show: false,
        form: {
          status: ''
        },
        rules: {
          senderCreateTime: [{required: true, message: '必填字段', trigger: 'blur'}],
          senderLocationSender: [{required: true, message: '必填字段', trigger: 'blur'}],
          senderLocationMobile: [{required: true, message: '必填字段', trigger: 'blur'}],
          senderLocationProvinceName: [{required: true, message: '必填字段', trigger: 'blur'}],
          senderLocationCityName: [{required: true, message: '必填字段', trigger: 'blur'}],
          senderLocationStationName: [{required: true, message: '必填字段', trigger: 'blur'}],
          senderLocationAddress: [{required: true, message: '必填字段', trigger: 'blur'}]
        }
      }
    },
    mounted() {
    },
    methods: {
      save() {
        this.loading = true
        changeRefundSenderLocation(this.form).then(res => {
          this.$message({message: '保存成功', type: 'success'})
          this.onClose()
          this.$emit("getList", {})
        }).finally(() => this.loading = false)
      },
      onClose() {
        this.show = false
      },
      onOpen(ele) {
        this.form = JSON.parse(JSON.stringify(ele))
        this.show = true
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
      }
    }
  }
</script>

<style scoped>

</style>
