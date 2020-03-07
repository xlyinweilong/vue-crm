<template>
  <el-dialog
    title="明细"
    :close-on-click-modal="false"
    :visible="show"
    top="1vh"
    @close="onClose"
    width="800px">
    <!--商品明细-->
    <div v-loading="loading">
      <h4>单号：{{form.code}}
        <el-tooltip class="item" effect="dark" content="提示：本操作不可逆，请谨慎使用。距离支付时间不能超过半年，次数不能超过10次（次数与其他退款方式共用次数）" placement="top">
          <i class="el-icon-question" style="margin-left: 8px;cursor: pointer;"></i>
        </el-tooltip>
        <span v-show="totalRefundAmount > 0">本次将退款金额：{{totalRefundAmount}}元</span>
      </h4>
      <div>
        <p>快速设置：
          <el-button type="text" @click="setAll">全额退款</el-button>
          <el-button type="text" @click="setAllGoods">只退货品</el-button>
        </p>
        <el-form ref="form" :model="form" :rules="rules">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="退款原因" prop="refundReason">
                <el-input v-model="form.refundReason" placeholder="退款原因" :maxlength="200"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="退款备注" prop="refundRemarks">
                <el-tooltip class="item" effect="dark" content="备注客户看不见，原因客户可见" placement="top">
                  <el-input v-model="form.refundRemarks" placeholder="退款备注" :maxlength="200"></el-input>
                </el-tooltip>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="支付快递费用" prop="expressFee">
                <el-input :value="form.expressFee" disabled placeholder="支付快递费用"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="已退回的快递费用" prop="expressFee">
                <el-input :value="form.totalRefundExpressFee" disabled placeholder="已退回的快递费用"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="本次退回快递费用" prop="refundExpressAmount">
                <el-input-number style="width: 100%" v-model="form.refundExpressAmount" step-strictly :precision="2" :step="0.01" :min="0" :max="form.expressFee - form.totalRefundExpressFee" :controls="false"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" v-if="form.status == 'PENDING_RECEIVE' || form.status == 'EVALUATED' || form.status == 'PENDING_EVALUATE'">
            <el-col :span="8">
              <el-form-item label="寄回的快递公司" prop="refundExpressCompanyName">
                <el-input v-model="form.refundExpressCompanyName" placeholder="寄回的快递公司"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="寄回的快递单号" prop="refundExpressCode">
                <el-input v-model="form.refundExpressCode" placeholder="寄回的快递单号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="寄回的快递费用" prop="refundExpressFee">
                <el-input-number style="width: 100%" v-model="form.refundExpressFee" step-strictly :precision="2" :step="0.01" :min="0" :max="99999" :controls="false"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div>
        <el-table
          class="el-table"
          :data="goodsList"
          :row-class-name="tableRowClassName"
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
          <el-table-column label="单价" align="center">
            <template slot-scope="scope">
              {{ scope.row.price}}
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center">
            <template slot-scope="scope">
              {{ scope.row.quantity }}
            </template>
          </el-table-column>
          <el-table-column label="已退数" align="center">
            <template slot-scope="scope">
              {{ scope.row.totalRefundQuantity }}
            </template>
          </el-table-column>
          <el-table-column label="已退金额" align="center">
            <template slot-scope="scope">
              {{ scope.row.totalRefundAmount }}
            </template>
          </el-table-column>
          <el-table-column label="退款单价" align="center" fixed="right" width="120">
            <template slot-scope="scope">
              <el-input-number style="width: 100%" v-model="scope.row.refundPrice" step-strictly :precision="2" :step="0.01" :min="0.01" :max="scope.row.price" :controls="false"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="退回数量" align="center" fixed="right" width="120">
            <template slot-scope="scope">
              <el-input-number style="width: 100%" v-model="scope.row.refundQuantity" step-strictly :precision="0" :step="1" :min="0" :max="scope.row.quantity - scope.row.totalRefundQuantity" :controls="false"></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">关闭</el-button>
      <el-button type="primary" :loading="loading" @click="doRefund" :disabled="totalRefundAmount == 0">确定退款</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {info, createRefundOrder} from '@/api/shop/business/order/order'

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
          status: '',
          refundExpressAmount:''
        },
        goodsList: [],
        rules: {
          refundExpressAmount: [{required: true, trigger: 'blur', message: '必填字段'}]
        }
      }
    },
    computed: {
      totalRefundAmount() {
        let refundExpressAmount = this.form.refundExpressAmount > 0 ? this.form.refundExpressAmount : 0
        if (this.goodsList.filter(g => g.refundQuantity > 0).length == 0) {
          return refundExpressAmount
        }
        return refundExpressAmount.add(this.goodsList.filter(g => g.refundQuantity > 0).reduce((t, a) => t.add(a.refundQuantity.mul(a.refundPrice)), 0))
      }
    },
    mounted() {
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (row.refundPrice < row.price && row.refundQuantity > 0) {
          return 'danger-row'
        }
        if (row.refundQuantity > 0) {
          return 'warnning-row'
        }
        return ''
      },
      setAll() {
        this.goodsList.forEach(g => {
          g.refundPrice = g.price
          g.refundQuantity = g.quantity - g.totalRefundQuantity
        })
        this.form.refundExpressAmount = this.form.expressFee - this.form.totalRefundExpressFee
      },
      setAllGoods() {
        this.goodsList.forEach(g => {
          g.refundPrice = g.price
          g.refundQuantity = g.quantity - g.totalRefundQuantity
        })
        this.form.refundExpressAmount = 0
      },
      onClose() {
        this.show = false
      },
      onOpen(ele) {
        ele.refundReason = ''
        ele.refundRemarks = ''
        ele.refundExpressAmount = 0
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
      doRefund() {
        if (this.goodsList.filter(g => g.refundQuantity > 0).length == 0 || this.goodsList.filter(g => g.refundQuantity > 0 && g.refundPrice < g.price).length > 0
          || this.form.refundRemarks == '') {
          let message = ''
          if (this.goodsList.filter(g => g.refundQuantity > 0).length == 0) {
            message = '您没有选择退任何商品, 确实只退运费吗?'
          } else if (this.goodsList.filter(g => g.refundQuantity > 0 && g.refundPrice < g.price).length > 0) {
            message = '退款商品含有修改单价，这样可能有风险，确定要操作吗?'
          } else if (this.form.refundRemarks == '') {
            message = '不写退款备注吗?'
          }
          this.$confirm(message, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.createRefundOrder()
          }).catch(() => {
          })
        } else {
          this.createRefundOrder()
        }
      },
      createRefundOrder() {
        let ele = this.form
        ele.goodsList = this.goodsList
        this.loading = true
        createRefundOrder(ele).then(res => {
          this.$message({message: '保存成功', type: 'success'})
          this.onClose()
          this.$emit("getList", {})
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style>
  .el-table .danger-row {
    background: #F56C6C;
  }

  .el-table .warnning-row {
    background: #E6A23C;
  }
</style>
