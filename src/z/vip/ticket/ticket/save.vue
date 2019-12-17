<template>
  <el-dialog
    :fullscreen="true"
    :title="form.id == null ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="唯一编号" prop="code">
            <el-input :disabled="form.isPush" v-model="form.code" placeholder="例如：123456789" :maxlength="20"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="卡类型" prop="cardType">
            <el-select :disabled="form.isPush" style="width: 100%" v-model="form.cardType" placeholder="请选择">
              <el-option key="CASH" label="代金券" value="CASH"/>
              <el-option key="DISCOUNT" label="折扣券" value="DISCOUNT"/>
              <el-option disabled key="GIFT" label="兑换券" value="GIFT"/>
              <el-option disabled key="GROUPON" label="团购券" value="GROUPON"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="form.cardType === 'CASH'">
          <el-form-item label="减免金额" prop="reduceCost">
            <el-input-number :disabled="form.isPush" style="width: 100%" v-model="form.reduceCost" :min="1" :max="99999999" :step="1"
                             step-strictly @keyup.enter.native="save"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="form.cardType === 'CASH' || form.cardType === 'GIFT'">
          <el-form-item  label="使用门槛" prop="leastCost">
            <el-input-number :disabled="form.isPush" style="width: 100%" v-model="form.leastCost" :min="0" :max="99999999" :step="1"
                             step-strictly @keyup.enter.native="save"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="form.cardType === 'DISCOUNT'">
          <el-form-item label="折扣" prop="discount">
            <el-input-number :disabled="form.isPush" style="width: 100%" v-model="form.discount" :min="0" :max="1" :step="0.01" step-strictly
                             @keyup.enter.native="save"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="兑换内容" prop="gift" v-if="form.cardType === 'GIFT'">
        <el-input :disabled="form.isPush" v-model="form.gift" type="textarea" :rows="2" placeholder="例如：可兑换音乐木盒一个。"
                  :maxlength="3000"></el-input>
      </el-form-item>
      <el-form-item label="团购详情" prop="dealDetail" v-if="form.cardType === 'GROUPON'">
        <el-input :disabled="form.isPush" v-model="form.dealDetail" type="textarea" :rows="2" placeholder="例如：双人套餐 -进口红酒一支。孜然牛肉一份。"
                  :maxlength="3000"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="卡券名" prop="title">
            <el-input :disabled="form.isPush" v-model.trim="form.title" placeholder="例如：100元套餐兑换券" @keyup.enter.native="save"
                      :maxlength="27"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="券颜色" prop="color">
            <el-select style="width: 100%" v-model="form.color" placeholder="请选择">
              <i slot="prefix" class="el-input__icon el-icon-s-opportunity" :style="{ 'color': selectedColor}"></i>
              <el-option v-for="item in colorList" :key="item.name" :label="item.name" :value="item.name">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right;font-size: 13px;width: 30px"
                      :style="{ 'background-color': item.color}">&nbsp;</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="使用提醒" prop="notice">
            <el-input v-model.trim="form.notice" placeholder="例如：请出示二维码" @keyup.enter.native="save"
                      :maxlength="16"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="卡券库存数量" prop="quantity">
            <el-input-number :disabled="form.isPush" style="width: 100%" v-model="form.quantity" :min="1" :max="100000000" :step="1"
                             step-strictly @keyup.enter.native="save"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="使用说明" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="2" placeholder="例如：不可与其他优惠同享"
                  :maxlength="1024"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="使用时间类型" prop="dateInfoType">
            <el-select :disabled="form.isPush" style="width: 100%" v-model="form.dateInfoType" placeholder="请选择">
              <el-option key="DATE_TYPE_FIX_TIME_RANGE" label="固定日期区间" value="DATE_TYPE_FIX_TIME_RANGE"/>
              <el-option key="DATE_TYPE_FIX_TERM" label="固定时长" value="DATE_TYPE_FIX_TERM"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="起用时间" prop="startTime" v-if="form.dateInfoType === 'DATE_TYPE_FIX_TIME_RANGE'">
            <el-date-picker style="width: 100%" v-model="form.startTime" type="datetime" :disabled="form.isPush"
                            value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
          </el-form-item>
          <el-form-item label="领取后多少天内有效" prop="fixedTerm" v-if="form.dateInfoType === 'DATE_TYPE_FIX_TERM'">
            <el-input-number :disabled="form.isPush" style="width: 100%" v-model="form.fixedTerm" :min="1" :max="90" :step="1" step-strictly
                             @keyup.enter.native="save"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结束时间" prop="endTime" v-if="form.dateInfoType === 'DATE_TYPE_FIX_TIME_RANGE'">
            <el-date-picker style="width: 100%" v-model="form.endTime" type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
          </el-form-item>
          <el-form-item label="领取后多少天开始生效" prop="fixedBeginTerm" v-if="form.dateInfoType === 'DATE_TYPE_FIX_TERM'">
            <el-input-number :disabled="form.isPush" style="width: 100%" v-model="form.fixedBeginTerm" :min="0" :max="90" :step="1"
                             step-strictly @keyup.enter.native="save"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="form.dateInfoType === 'DATE_TYPE_FIX_TERM'">
          <el-form-item label="结束时间" prop="fixedEndTime">
            <el-date-picker :disabled="form.isPush" style="width: 100%" v-model="form.fixedEndTime" type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="指定用户领取" prop="bindOpenid">
            <el-select style="width: 100%" v-model="form.bindOpenid" placeholder="请选择">
              <el-option disabled key="true" label="指定" :value="true"/>
              <el-option key="false" label="非指定" :value="false"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="客服电话" prop="servicePhone">
            <el-input v-model="form.servicePhone" placeholder="例如：40012234" :maxlength="24"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="支持全部门店" prop="useAllLocations">
            <el-select style="width: 100%" v-model="form.useAllLocations" placeholder="请选择">
              <el-option key="true" label="是" :value="true"/>
              <el-option disabled key="false" label="否" :value="false"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="门店" prop="locationIdList" v-show="!form.useAllLocations">
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="每人可领券的数量" prop="getLimit">
            <el-input-number style="width: 100%" v-model="form.getLimit" :min="1" :max="10000" :step="1" step-strictly
                             @keyup.enter.native="save"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="每人可核销的数量" prop="useLimit">
            <el-input-number style="width: 100%" v-model="form.useLimit" :min="1" :max="10000" :step="1" step-strictly :disabled="form.isPush"
                             @keyup.enter.native="save"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="卡券领取页面是否可分享" prop="canShare">
            <el-select style="width: 100%" v-model="form.canShare" placeholder="请选择">
              <el-option key="true" label="是" :value="true"/>
              <el-option key="false" label="否" :value="false"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="卡券是否可转赠" prop="canGiveFriend">
            <el-select style="width: 100%" v-model="form.canGiveFriend" placeholder="请选择">
              <el-option disabled key="true" label="是" :value="true"/>
              <el-option key="false" label="否" :value="false"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-show="form.cardType === 'CASH'">
        <el-col :span="12">
          <el-form-item label="指定可用的商品类目" prop="acceptCategory">
            <el-input v-model="form.acceptCategory" type="textarea" :rows="2" placeholder="填入后将在券面拼写适用于xxx"
                      :maxlength="512"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="指定不可用的商品类目" prop="rejectCategory">
            <el-input v-model="form.rejectCategory" type="textarea" :rows="2" placeholder="填入后将在券面拼写不适用于xxxx"
                      :maxlength="512"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
<!--      <el-row :gutter="20">-->
<!--        <el-col :span="6">-->
<!--          <el-form-item label="按钮文字" prop="centerTitle">-->
<!--            <el-input v-model="form.centerTitle" placeholder="立即使用" :maxlength="18"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <el-form-item label="副标题" prop="centerSubTitle">-->
<!--            <el-input v-model="form.centerSubTitle" placeholder="立即享受优惠" :maxlength="24"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
        <!--        <el-col :span="6">-->
        <!--          <el-form-item label="跳转到小程序" prop="centerSubTitle">-->
        <!--            <el-select style="width: 100%" v-model="form.canGiveFriend" placeholder="请选择">-->
        <!--              <el-option disabled key="true" label="是" :value="true"/>-->
        <!--              <el-option key="false" label="否" :value="false"/>-->
        <!--            </el-select>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
<!--      </el-row>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="save" v-text="form.isPush ? '保存&同步到腾讯' : '保存'"></el-button>
      <el-button :loading="loading" @click="onClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import {save} from '@/api/vip/ticket/ticket'

    export default {
        components: {},
        filters: {},
        directives: {},
        props: {},
        computed: {
            selectedColor() {
                if (this.form.color == null) {
                    return ''
                }
                return this.colorList.find(c => c.name === this.form.color).color
            }
        },
        data() {
            return {
                show: false,
                baseUrl: process.env.BASE_API + "/static/images/icon/",
                loading: false,
                title: '',
                colorList: [{name: 'Color010', color: '#63b359'}, {
                    name: 'Color020',
                    color: '#2c9f67'
                }, {name: 'Color030', color: '#509fc9'},
                    {name: 'Color040', color: '#5885cf'}, {name: 'Color050', color: '#9062c0'}, {
                        name: 'Color060',
                        color: '#d09a45'
                    },
                    {name: 'Color070', color: '#e4b138'}, {name: 'Color080', color: '#ee903c'}, {
                        name: 'Color081',
                        color: '#f08500'
                    },
                    {name: 'Color082', color: '#a9d92d'}, {name: 'Color090', color: '#dd6549'}, {
                        name: 'Color100',
                        color: '#cc463d'
                    },
                    {name: 'Color101', color: '#cf3e36'}, {name: 'Color102', color: '#5E6671'}],
                form: {},
                rules: {
                    code: [{required: true, message: '必填字段', trigger: 'blur'}],
                    cardType: [{required: true, message: '必填字段', trigger: 'blur'}],
                    title: [{required: true, message: '必填字段', trigger: 'blur'}],
                    color: [{required: true, message: '必填字段', trigger: 'blur'}],
                    notice: [{required: true, message: '必填字段', trigger: 'blur'}],
                    description: [{required: true, message: '必填字段', trigger: 'blur'}],
                    quantity: [{required: true, message: '必填字段', trigger: 'blur'}],
                    dateInfoType: [{required: true, message: '必填字段', trigger: 'blur'}],
                    startTime: [{required: true, message: '必填字段', trigger: 'blur'}],
                    endTime: [{required: true, message: '必填字段', trigger: 'blur'}],
                    fixedTerm: [{required: true, message: '必填字段', trigger: 'blur'}],
                    fixedBeginTerm: [{required: true, message: '必填字段', trigger: 'blur'}],
                    fixedEndTime: [{required: true, message: '必填字段', trigger: 'blur'}],
                    bindOpenid: [{required: true, message: '必填字段', trigger: 'blur'}],
                    useAllLocations: [{required: true, message: '必填字段', trigger: 'blur'}],
                    reduceCost: [{required: true, message: '必填字段', trigger: 'blur'}],
                    dealDetail: [{required: true, message: '必填字段', trigger: 'blur'}],
                    discount: [{required: true, message: '必填字段', trigger: 'blur'}],
                    gift: [{required: true, message: '必填字段', trigger: 'blur'}],
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
                if (ele.id == '') {
                    this.form = {
                        code: '',
                        cardType: 'CASH',
                        title: '',
                        color: 'Color010',
                        notice: '请出示二维码',
                        description: '',
                        quantity: 2000,
                        dateInfoType: 'DATE_TYPE_FIX_TIME_RANGE',
                        fixedTerm: 30,
                        fixedBeginTerm: 0,
                        bindOpenid: false,
                        servicePhone: '',
                        useAllLocations: true,
                        getLimit: 1,
                        useLimit: 1,
                        canShare: false,
                        canGiveFriend: false,
                        leastCost: null,
                        acceptCategory: '',
                        rejectCategory: '',
                        centerTitle: '立即使用',
                        centerSubTitle: '',
                        endTime: null,
                        startTime: null,
                        fixedEndTime: null,
                        reduceCost: 100,
                        dealDetail: '',
                        discount: 0.9,
                        gift: ''
                    }
                } else {
                    this.form = JSON.parse(JSON.stringify(ele))
                }
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
