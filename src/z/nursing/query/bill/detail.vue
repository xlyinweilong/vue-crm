<template>
  <div>
    <div class="tab-container">
      <el-form ref="billForm" :model="form" :rules="rules" v-loading="loading">
        <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="handleTagPaneClick">
          <el-tab-pane label="基本资料" name="BASE">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="单据编号" prop="billCode">
                  <el-input v-model="form.code" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="单据时间" prop="billDate">
                  <el-date-picker class="full_with_date" v-model="form.billDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" :picker-options="pickerOptions"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="手工单号" prop="manualCode">
                  <el-input v-model="form.manualCode" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="渠道调出" prop="parentBillId">
                  <el-select v-model="form.parentBillId" filterable clearable remote default-first-option placeholder="请输入渠道调出单号" :loading="loadingOptionParentBillList" style="width: 100%" :remote-method="searchParentBillOption" @change="changeOptionParentBill">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    <el-option v-for="item in optionParentBillList" :value="item.id" :label="item.code"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="调出渠道">
                  <el-input :value="form.parentBillId == '' ? '' : form.channelName + '-' + form.channelCode" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="调入渠道">
                  <el-input :value="form.parentBillId == '' ? '' : form.toChannelName + '-' + form.toChannelCode" :disabled="true"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="货品信息" name="GOODS" :disabled="form.toChannelId == ''">
          </el-tab-pane>
          <el-tab-pane label="差异数" name="DIFF" :disabled="form.parentBillId == ''">
          </el-tab-pane>
        </el-tabs>
      </el-form>

    </div>


  </div>
</template>

<script>
  // import {save, get, getParentBill, getParentBillGoods} from '@/api/bill/channel2channelIn'

  export default {
    components: {
    },
    data() {
      return {
        form: {
          id: '',
          parentBillId: '',
          code: '',
          status: 'PENDING',
          manualCode:''
        },
        //明细列表
        list: [],
        listLoading: false,
        rules: {
          billDate: [{required: true, message: '必填字段', trigger: 'blur'}],
          toChannelId: [{required: true, message: '必填字段', trigger: 'blur'}],
          channelId: [{required: true, message: '必填字段', trigger: 'blur'}]
        },
        loading: false,
        activeName: 'BASE',
        //搜索上游单据
        loadingOptionParentBillList: false,
        optionParentBillList: [],
        parentList:[]
      }
    },
    created() {
      const id = this.$route.params && this.$route.params.id
      if (id != null) {
        // this.loading = true
        // get({id: id}).then(response => {
        //   this.form = response.data
        //   if (this.form.status !== 'DRAFT') {
        //     this.form.status = 'PENDING'
        //   }
        //   this.optionParentBillList.push({
        //     id: this.form.parentBillId, code: this.form.parentBillCode,
        //     channelName: this.form.channelName, channelCode: this.form.channelCode, channelId: this.form.channelId
        //     , toChannelName: this.form.toChannelName, toChannelCode: this.form.toChannelCode, toChannelId: this.form.toChannelId
        //   })
        //   this.list = response.data.goodsList
        //   getParentBillGoods({id: this.form.parentBillId}).then(response => {
        //     this.parentList = response.data
        //   }).finally(() => this.loading = false)
        // }).catch(() => this.loading = false)
      }
    },
    methods: {
      //修改tag pane
      handleTagPaneClick(tab, event) {
        if (tab.name === 'GOODS') {
          this.$refs.detailGoods.initFocus()
        }else if (tab.name === 'DIFF') {
          this.$refs.diffGoods.init()
        }
      },
      //保存
      saveData() {
        this.$refs['billForm'].validate((valid) => {
          if (valid) {
            //判断list
            if (this.list.filter(r => r.goodsId === '').length > 0 || this.list.length === 0) {
              this.activeName = 'GOODS'
              this.$message.error('请输入货品')
              return
            }
            if (!this.list.every(r => r.price !== '' && r.price >= 0 && r.price <= 999999999)) {
              this.activeName = 'GOODS'
              this.$message.error('货品价格必须大于等于0')
              return
            }
            if (this.list.filter(r => r.detail.filter(d => d.billCount > 0).reduce((t, d) => t + parseInt(d.billCount), 0) === 0).length > 0) {
              this.activeName = 'GOODS'
              this.$message.error('请输入货品数量')
              return
            }
            this.loading = true
            this.form.goodsList = this.list
            save(this.form).then(response => {
              this.loading = false
              this.$message({message: response.message, type: 'success'})
              backUrl(this, '/bill/channel/channel2channel_in')
            }).catch((err) => this.loading = false)
          } else {
            this.activeName = 'BASE'
          }
        })
      },
      //搜索上游单据
      searchParentBillOption(query) {
        if (query !== '') {
          this.loadingOptionParentBillList = true
          getParentBill({pageIndex: 1, pageSize: 10, code: query}).then(response => {
            this.loadingOptionParentBillList = false
            this.optionParentBillList = response.data.content
          })
        } else {
          this.optionParentBillList = []
        }
      },
      changeOptionParentBill(id) {
        this.form.parentBillCode = this.form.channelId = this.form.channelName = this.form.channelCode = ''
        this.form.toChannelId = this.form.toChannelName = this.form.toChannelCode = ''
        if (id != '') {
          let ele = this.optionParentBillList.find(r => r.id === id)
          this.form.parentBillCode = ele.code
          this.form.channelId = ele.channelId
          this.form.channelName = ele.channelName
          this.form.channelCode = ele.channelCode
          this.form.toChannelId = ele.toChannelId
          this.form.toChannelName = ele.toChannelName
          this.form.toChannelCode = ele.toChannelCode
          this.loading = true
          getParentBillGoods({id: id}).then(response => {
            this.parentList = JSON.parse(JSON.stringify(response.data))
            this.list = response.data
            this.list.forEach(g => g.detail.forEach(s => s.billCount = ''))
          }).finally(() => this.loading = false)
        }
      }


    }
  }
</script>


