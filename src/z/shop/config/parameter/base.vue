<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" v-loading="loading">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="消费每元获得多少积分" prop="consumeGotIntegral">
            <el-tooltip class="item" effect="dark" content="0表示不获得" placement="top">
              <el-input-number style="width: 100%" v-model="form.consumeGotIntegral" :precision="0" :step="1" :min="0" :max="999999" label="消费获得积分"></el-input-number>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评价获得积分" prop="evaluateGotIntegral">
            <el-tooltip class="item" effect="dark" content="0表示不获得" placement="top">
              <el-input-number style="width: 100%" v-model="form.evaluateGotIntegral" :precision="0" :step="1" :min="0" :max="999999" label="评价获得积分"></el-input-number>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="快递费用(元)" prop="expressFee">
            <el-input-number style="width: 100%" v-model="form.expressFee" :precision="0" :step="1" :min="0" :max="999999" label="快递费用"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单满多少元免邮费" prop="expressAmountFree">
            <el-tooltip class="item" effect="dark" content="-1表示不存在免邮费金额" placement="top">
              <el-input-number style="width: 100%" v-model="form.expressAmountFree" :precision="0" :step="1" :min="-1" :max="999999" label="订单满多少元免邮费"></el-input-number>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="单笔单据最大购买数量" prop="orderMaxCount">
            <el-tooltip class="item" effect="dark" content="0表示不限制（建议设置一个大于5的数）" placement="top">
              <el-input-number style="width: 100%" v-model="form.orderMaxCount" :precision="0" :step="1" :min="-1" :max="999999" label="单笔单据最大购买数量"></el-input-number>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最多待支付单据数量" prop="orderMaxInPayment">
            <el-tooltip class="item" effect="dark" content="0表示不限制（建议3）" placement="top">
              <el-input-number style="width: 100%" v-model="form.orderMaxInPayment" :precision="0" :step="1" :min="0" :max="999999" label="最多待支付单据数量"></el-input-number>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="单据支付/库存锁定时间（分钟）" prop="stockLockMinute">
            <el-tooltip class="item" effect="dark" content="唯品会为15分钟，12306为45分钟，京东为24小时（建议设置为60分钟）" placement="top">
              <el-input-number style="width: 100%" v-model="form.stockLockMinute" :precision="0" :step="1" :min="5" :max="999999" label="库存锁定时间"></el-input-number>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发货后多少天自动确认收货(天)" prop="orderAutoReceive">
            <el-tooltip class="item" effect="dark" content="建议14" placement="top">
              <el-input-number style="width: 100%" v-model="form.orderAutoReceive" :precision="0" :step="1" :min="1" :max="999999" label="发货后多少天自动确认收货"></el-input-number>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否开启自提业务" prop="stockLockMinute">
            <el-select v-model="form.shopOrderSelf" style="width: 100%" placeholder="是否开启自提业务">
              <el-option :key="0" label="关闭" value="0" />
              <el-option :key="1" label="开启" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="购物车话术(显示在购物车货品列表下方)" prop="cardTips">
        <el-input type="textarea" :rows="2" placeholder="例如：温馨提示：订单满99包邮，吊牌毁坏不能退换货等" :maxlength="250" v-model="form.cardTips"></el-input>
      </el-form-item>
      <el-form-item label="回寄地址" prop="receivedLocation">
        <el-input type="textarea" :rows="3" placeholder="省市区和明细地址等信息" :maxlength="250" v-model="form.receivedLocation"></el-input>
      </el-form-item>
    </el-form>
    <div class="filter-container" style="margin-top: 20px">
      <el-button style="float:right" :loading="loading" class="filter-item" type="success" icon="el-icon-check" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {save, info} from '@/api/config/sysconfig'

  export default {
    components: {},
    data() {
      return {
        form: {
          consumeGotIntegral: '',
          evaluateGotIntegral: '',
          expressFee: '',
          expressAmountFree: '',
          orderMaxCount: '',
          orderMaxInPayment: '',
          stockLockMinute: '',
          orderAutoReceive: '',
          cardTips: '',
          receivedLocation:'',
          shopOrderSelf:'0'
        },
        rules: {
          consumeGotIntegral: [{required: true, message: '必填字段', trigger: 'blur'}],
          evaluateGotIntegral: [{required: true, message: '必填字段', trigger: 'blur'}],
          expressFee: [{required: true, message: '必填字段', trigger: 'blur'}],
          expressAmountFree: [{required: true, message: '必填字段', trigger: 'blur'}],
          orderMaxCount: [{required: true, message: '必填字段', trigger: 'blur'}],
          orderMaxInPayment: [{required: true, message: '必填字段', trigger: 'blur'}],
          stockLockMinute: [{required: true, message: '必填字段', trigger: 'blur'}],
          orderAutoReceive: [{required: true, message: '必填字段', trigger: 'blur'}]
        },
        loading: false,
        tabName: 'BASE'
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.loading = true
        this.getInfo('SHOP_CONFIG_consume_got_integral', 'consumeGotIntegral')
        this.getInfo('SHOP_CONFIG_evaluate_got_integral', 'evaluateGotIntegral')
        this.getInfo('SHOP_CONFIG_express_fee', 'expressFee')
        this.getInfo('SHOP_CONFIG_express_amount_free', 'expressAmountFree')
        this.getInfo('SHOP_CONFIG_order_max_count', 'orderMaxCount')
        this.getInfo('SHOP_CONFIG_order_max_payment', 'orderMaxInPayment')
        this.getInfo('SHOP_CONFIG_stock_lock_minute', 'stockLockMinute')
        this.getInfo('SHOP_CONFIG_order_auto_receive', 'orderAutoReceive')
        this.getInfo('SHOW_ORDER_SELF', 'shopOrderSelf')
        this.getInfo('SHOP_CONFIG_card_tips', 'cardTips')
        this.getInfo('SHOP_CONFIG_received_location', 'receivedLocation')
        this.loading = false
      },
      tabClick() {
        if (this.tabName == 'KEY') {
          this.$refs.replyList.getList()
        }
      },
      async getInfo(key, rs) {
        await info({key: key}).then(res => {
          this.form[rs] = res.data.configValue
        }).catch(() => this.loading = false)
      },
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            this.saveConfig('SHOP_CONFIG_consume_got_integral', 'consumeGotIntegral')
            this.saveConfig('SHOP_CONFIG_evaluate_got_integral', 'evaluateGotIntegral')
            this.saveConfig('SHOP_CONFIG_express_fee', 'expressFee')
            this.saveConfig('SHOP_CONFIG_express_amount_free', 'expressAmountFree')
            this.saveConfig('SHOP_CONFIG_order_max_count', 'orderMaxCount')
            this.saveConfig('SHOP_CONFIG_order_max_payment', 'orderMaxInPayment')
            this.saveConfig('SHOP_CONFIG_stock_lock_minute', 'stockLockMinute')
            this.saveConfig('SHOW_ORDER_SELF', 'shopOrderSelf')
            this.saveConfig('SHOP_CONFIG_order_auto_receive', 'orderAutoReceive')
            this.saveConfig('SHOP_CONFIG_card_tips', 'cardTips')
            this.saveConfig('SHOP_CONFIG_received_location', 'receivedLocation')
            this.$message({message: '保存成功', type: 'success'})
            this.loading = false
          }
        })
      },
      async saveConfig(key, rs) {
        await save({configKey: key, configValue: this.form[rs]}).then(response => {
        }).catch(() => this.loading = false)
      }
    }
  }
</script>
