<template>
  <el-dialog
    title="发货"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="800px">
    <!--商品明细-->
    <div v-loading="loading">
      <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;">
        <h5>发货商品明细</h5>
        <el-table
          :data="goodsList"
          tooltip-effect="dark"
          style="width: 100%"
          highlight-current-row
          fit
          border
        >
          <el-table-column label="货号" align="center">
            <template slot-scope="scope">
              {{ scope.row.goodsCode }}
            </template>
          </el-table-column>
          <el-table-column label="颜色" align="center">
            <template slot-scope="scope">
              {{scope.row.colorName}}
            </template>
          </el-table-column>
          <el-table-column label="尺码" align="center">
            <template slot-scope="scope">
              {{ scope.row.sizeName }}
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center">
            <template slot-scope="scope">
              {{ scope.row.quantity }}
            </template>
          </el-table-column>
          <el-table-column label="退货数量" align="center">
            <template slot-scope="scope">
              <span :style="{'color':scope.row.totalRefundQuantity > 0 ? '#F56C6C':''}">{{ scope.row.totalRefundQuantity }}</span>
            </template>
          </el-table-column>
          <el-table-column label="净数量" align="center">
            <template slot-scope="scope">
              {{ scope.row.quantity - scope.row.totalRefundQuantity }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin-top:10px;">
        <h5>发货地址</h5>
        <p><span>收货人：<b>{{form.locationReceiver}}</b></span>
          <span style="margin-left: 20px">联系电话：<b>{{form.locationMobile}}</b></span></p>
        <p>省市区：<b>{{form.locationProvinceName}} - {{form.locationCityName}} - {{form.locationStationName}}</b></p>
        <p>详细地址：<b>{{form.locationAddress}}</b></p>
      </div>
      <h5>快递单据</h5>
      <el-form ref="form" :model="form" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="快递公司" prop="expressCompanyCode">
              <el-select :disabled="form.status != 'PENDING_SEND' && form.status != 'PENDING_RECEIVE'" style="width: 100%" v-model="form.expressCompanyCode" placeholder="请选择快递公司">
                <el-option key="SHUN_FENG" label="顺丰" value="SHUN_FENG"/>
                <el-option key="YUAN_TONG" label="圆通" value="YUAN_TONG"/>
                <el-option key="ZHAI_JI_SONG" label="宅急送" value="ZHAI_JI_SONG"/>
                <el-option key="SHEN_TONG" label="申通" value="SHEN_TONG"/>
                <el-option key="YUN_DA" label="韵达" value="YUN_DA"/>
                <el-option key="EMS" label="EMS" value="EMS"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="快递单号" prop="expressCode">
              <el-input :disabled="form.status != 'PENDING_SEND' && form.status != 'PENDING_RECEIVE'" v-model.trim="form.expressCode" placeholder="请输入快递单号" @keyup.enter.native="save" :maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">关闭</el-button>
      <el-button :loading="loading" type="primary" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {saveExpressCode, info} from '@/api/shop/business/order/order'

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
        goodsList: [],
        rules: {
          expressCompanyCode: [{required: true, trigger: 'blur', message: '必填字段'}],
          expressCode: [{required: true, trigger: 'blur', message: '必填字段'}]
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
        this.loading = true
        info({id: this.form.id}).then(res => {
          this.goodsList = res.data.goodsList
        }).finally(() => this.loading = false)
      },
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            saveExpressCode(this.form).then(res => {
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
