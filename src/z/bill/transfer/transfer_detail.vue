<template>
  <div>
    <div class="tab-container">
      <el-form v-loading="loading">
        <el-tabs v-model="tabName" style="margin-top:15px;" type="border-card" @tab-click="handleTagPaneClick">
          <el-tab-pane label="基本资料" name="BASE">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-input v-model="ele.name" placeholder="请输入名称"/>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="参与方" name="JOIN_TARGET" :disabled="step > 1">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-button type="primary" @click="showWarehouseListSelect = true">选择仓库</el-button>
                <el-button type="primary" @click="showChannelListSelect = true">选择渠道</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="24" style="margin-top: 10px;">
              <span v-show="warehouseList.length > 0">选择仓库数量：{{warehouseList.length}}</span>
              <span v-show="channelList.length > 0">选择渠道数量：{{channelList.length}}</span>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="参与货品" name="JOIN_GOODS" :disabled="step > 1">
            <el-row :gutter="20">
              <el-col :span="24">
                <span class="filter-item">选择模式：</span>
                <el-select style="width: 200px;" class="filter-item" v-model="joinGoodsType" placeholder="模式">
                  <el-option value="ALL" label="全部货品"/>
                  <el-option value="SALE" label="有销售的货品"/>
                  <el-option value="GAP" label="缺口货品"/>
                </el-select>
                <el-button :loading="loading" class="filter-item" icon="el-icon-search" type="primary" @click="showGoodsListSelect = true">筛选货品</el-button>
              </el-col>
              <el-col :span="24" style="padding-left: 10px;padding-right: 10px;margin-top: 12px;margin-bottom: 12px;">
                <span class="filter-item">选择销售时间段：</span>
                <el-date-picker class="filter-item"
                                v-model="saleDate"
                                type="daterange"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"/>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 10px;" v-show="goodsList.length > 0">
              <el-col :span="24">
                <span class="filter-item">总计选择货品数量：{{goodsList.length}}</span>
                <el-button style="margin-left: 10px;" :loading="loading" class="filter-item" type="primary" plain @click="goodsList = []">清空已选货品</el-button>
              </el-col>
            </el-row>
            <!--<el-button type="primary" @click="showGoodsListSelect = true">组合货品</el-button>-->
          </el-tab-pane>
          <el-tab-pane label="操作表" name="OPERATION" :disabled="goodsList.length === 0 || (warehouseList.length === 0 && channelList.length === 0)">
            <operation ref="operationRef" :diyConfig="diyConfig" :goodsList.sync="goodsList" :channelList.sync="channelList" :warehouseList.sync="warehouseList" :saleDate="saleDate" :eleId.sync="ele.id" :eleName="ele.name" :step.sync="step" :goodsIndex.sync="goodsIndex"/>
          </el-tab-pane>
          <el-tab-pane label="记录表" name="RECORD">
            <operationLog ref="operationLogRef" :eleId="ele.id"/>
          </el-tab-pane>
          <el-tab-pane label="调拨后明细" name="COMPLETE_DETAIL">
            <operationResult ref="operationResultRef" :eleId="ele.id"/>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
    <goodsListSelect :show.sync="showGoodsListSelect" :goodsList.sync="goodsList" :selectType="joinGoodsType" :saleDate="saleDate"/>
    <channelListSelect :show.sync="showChannelListSelect" :channelList.sync="channelList"/>
    <warehouseListSelect :show.sync="showWarehouseListSelect" :warehouseList.sync="warehouseList"/>
  </div>
</template>

<script>
  import goodsListSelect from '@/z/bill/components/goodsListSelect'
  import channelListSelect from '@/z/bill/components/channelListSelect'
  import warehouseListSelect from '@/z/bill/components/warehouseListSelect'
  import operation from '@/z/bill/components/operation'
  import operationLog from '@/z/bill/components/operationLog'
  import operationResult from '@/z/bill/components/operationResult'
  import {getInfo, getDiy} from '@/api/bill/transfer'


  export default {
    name: 'transfer',
    components: {goodsListSelect, operation, channelListSelect, warehouseListSelect, operationLog,operationResult},
    data() {
      return {
        loading: false,
        tabName: 'BASE',
        props: {
          key: 'id',
          label: 'showName'
        },
        //货品
        joinGoodsType: 'ALL',
        showGoodsListSelect: false,
        goodsList: [],
        saleDate: null,
        //渠道
        showChannelListSelect: false,
        channelList: [],
        //仓库
        showWarehouseListSelect: false,
        warehouseList: [],
        //数据
        ele: {id: '', name: ''},
        step: 1,
        goodsIndex: 0,
        diyConfig: []
      }
    },
    created() {
      const id = this.$route.params && this.$route.params.id
      if (id != null) {
        this.loading = true
        getInfo({id: id}).then(response => {
          this.warehouseList = response.data.warehouseList
          this.channelList = response.data.channelList
          this.goodsList = response.data.goodsList
          this.ele = response.data.po
          if (response.data.progress == null) {
            this.step = 3
            this.goodsIndex = this.goodsList.length
          } else {
            this.goodsIndex = this.goodsList.findIndex(g => g === response.data.progress.goodsCode)
            if (this.goodsIndex > 0) {
              this.step = 2
            }
          }
        }).finally(() => this.loading = false)
      }
      getDiy({}).then(response => this.diyConfig = response.data)
    },
    methods: {
      handleTagPaneClick(tab, event) {
        if (tab.name === 'OPERATION') {
          this.$refs.operationRef.init()
        } else if (tab.name === 'RECORD') {
          this.$refs.operationLogRef.init()
        } else if(tab.name === 'COMPLETE_DETAIL'){
          this.$refs.operationResultRef.init()
        }
      }
    }
  }
</script>

<style scoped>
  .transfer /deep/ .el-transfer-panel {
    width: 350px;
  }

  .transfer /deep/ .el-transfer-panel__body {
    height: 425px;
  }

  .transfer /deep/ .el-transfer-panel__list {
    height: 380px;
  }
</style>

<style>
  .option-warning {
    background: #E6A23C;
  }

</style>
