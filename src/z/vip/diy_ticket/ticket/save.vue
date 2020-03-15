<template>
  <div>
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="编号" prop="code">
            <el-input :disabled="true" v-model="form.code" placeholder="自动生成"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="卡类型" prop="cardType">
            <el-select style="width: 100%" v-model="form.cardType" placeholder="请选择">
              <el-option key="CASH" label="代金券" value="CASH"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="form.cardType === 'CASH'">
          <el-form-item label="减免金额" prop="reduceCost">
            <el-input-number style="width: 100%" v-model="form.reduceCost" :min="1" :max="99999999" :step="1"
                             step-strictly @keyup.enter.native="save"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="form.cardType === 'CASH' || form.cardType === 'GIFT'">
          <el-form-item label="使用门槛" prop="leastCost">
            <el-input-number style="width: 100%" v-model="form.leastCost" :min="0" :max="99999999" :step="1"
                             step-strictly @keyup.enter.native="save"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="券标题" prop="title">
            <el-input v-model.trim="form.title" placeholder="例如：100元套餐兑换券" @keyup.enter.native="save"
                      :maxlength="27"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="券库存数量" prop="quantity">
            <el-input-number style="width: 100%" v-model="form.quantity" :min="1" :max="100000000" :step="1"
                             step-strictly @keyup.enter.native="save"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上/下架" prop="onShelf">
            <el-select style="width: 100%" v-model="form.onShelf" placeholder="请选择">
              <el-option :key="true" label="上架" :value="true"/>
              <el-option :key="false" label="下架" :value="false"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="卡卷类型" prop="onShelfType">
            <el-select style="width: 100%" v-model="form.onShelfType" placeholder="请选择卡卷类型">
              <el-option label="全场券" value="FULL_COURT"></el-option>
              <el-option label="品类券" value="CATEGORY"></el-option>
            </el-select>
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
            <el-select style="width: 100%" v-model="form.dateInfoType" placeholder="请选择">
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
            <el-input-number style="width: 100%" v-model="form.fixedTerm" :min="1" :max="90" :step="1" step-strictly
                             @keyup.enter.native="save"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结束时间" prop="endTime" v-if="form.dateInfoType === 'DATE_TYPE_FIX_TIME_RANGE'">
            <el-date-picker style="width: 100%" v-model="form.endTime" type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
          </el-form-item>
          <el-form-item label="领取后多少天开始生效" prop="fixedBeginTerm" v-if="form.dateInfoType === 'DATE_TYPE_FIX_TERM'">
            <el-input-number style="width: 100%" v-model="form.fixedBeginTerm" :min="0" :max="90" :step="1"
                             step-strictly @keyup.enter.native="save"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="form.dateInfoType === 'DATE_TYPE_FIX_TERM'">
          <el-form-item label="结束时间" prop="fixedEndTime">
            <el-date-picker style="width: 100%" v-model="form.fixedEndTime" type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"/>
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
      </el-row>
    </el-form>
    <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    <el-button :loading="loading" @click="onClose">返回</el-button>
  </div>
</template>

<script>
  import {save, info} from '@/api/vip/ticket/ticket'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    computed: {},
    data() {
      return {
        show: false,
        loading: false,
        title: '',
        form: {},
        rules: {
          onShelf: [{required: true, message: '必填字段', trigger: 'blur'}],
          onShelfType: [{required: true, message: '必填字段', trigger: 'blur'}],
          title: [{required: true, message: '必填字段', trigger: 'blur'}],
          cardType: [{required: true, message: '必填字段', trigger: 'blur'}],
          reduceCost: [{required: true, message: '必填字段', trigger: 'blur'}],
          quantity: [{required: true, message: '必填字段', trigger: 'blur'}],
          dateInfoType: [{required: true, message: '必填字段', trigger: 'blur'}],
          getLimit: [{required: true, message: '必填字段', trigger: 'blur'}],
          description: [{required: true, message: '必填字段', trigger: 'blur'}],
          startTime: [{required: true, message: '必填字段', trigger: 'blur'}],
          fixedTerm: [{required: true, message: '必填字段', trigger: 'blur'}],
          endTime: [{required: true, message: '必填字段', trigger: 'blur'}],
          fixedBeginTerm: [{required: true, message: '必填字段', trigger: 'blur'}],
          fixedEndTime: [{required: true, message: '必填字段', trigger: 'blur'}]
        }
      }
    },
    mounted() {

    },
    methods: {
      getInfo(id) {
        if (id == null || id == '') {
          this.form = {
            cardType: 'CASH',
            onShelfType:'FULL_COURT',
            onShelf: false,
            usePlatform: "ONLINE",
            type: 'INDEPENDENT',
            dateInfoType: 'DATE_TYPE_FIX_TIME_RANGE',
            getLimit: 1,
            quantity: 10000
          }
        } else {
          this.loading = true
          info({id: id}).then(res => {
            this.form = res.data
          }).finally(() => this.loading = false)
        }
      },
      onClose() {
        this.$emit("changeStatus", {status: 'list'})
      },
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            save(this.form).then(res => {
              this.$message({message: '保存成功', type: 'success'})
              this.onClose()
            }).finally(() => this.loading = false)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
