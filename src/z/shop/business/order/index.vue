<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select class="filter-item" style="width: 110px;" v-model="listQuery.receiveType" placeholder="发货方式" clearable>
        <el-option key="express" label="快递" value="express"/>
        <el-option key="self" label="自提" value="self"/>
      </el-select>
      <el-select class="filter-item" style="width: 150px;" v-model="listQuery.statusList" placeholder="单据状态" clearable multiple collapse-tags>
        <el-option-group label="快递">
          <el-option key="PENDING_SEND" label="待发货" value="PENDING_SEND"/>
          <el-option key="PENDING_RECEIVE" label="待收货" value="PENDING_RECEIVE"/>
        </el-option-group>
        <el-option-group label="自提">
          <el-option key="PENDING_DELIVERY" label="待提货" value="PENDING_DELIVERY"/>
        </el-option-group>
        <el-option-group label="其他">
          <el-option key="PENDING_EVALUATE" label="待评价" value="PENDING_EVALUATE"/>
          <el-option key="EVALUATED" label="已评价" value="EVALUATED"/>
          <el-option key="PENDING_PAYMENT" label="待支付" value="PENDING_PAYMENT"/>
          <el-option key="INVALID" label="已失效" value="INVALID"/>
          <el-option key="REFUND_ALL" label="全退款" value="REFUND_ALL"/>
        </el-option-group>
      </el-select>
      <el-input placeholder="订单号" clearable v-model.trim="listQuery.code" style="width: 150px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-input placeholder="下单人电话" clearable v-model.trim="listQuery.defaultVipMobile" style="width: 150px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                      class="filter-item"
                      v-model="listQuery.startDate"
                      type="datetime"
                      placeholder="下单开始时间">
      </el-date-picker>
      <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                      class="filter-item"
                      v-model="listQuery.endDate"
                      type="datetime"
                      placeholder="下单结束时间">
      </el-date-picker>
      <el-input placeholder="收货人姓名" clearable v-model.trim="listQuery.locationReceiver" style="width: 150px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-input placeholder="收货人电话" clearable v-model.trim="listQuery.locationMobile" style="width: 150px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">
        查询
      </el-button>
      <el-button :disabled="total==0" :loading="listLoading" class="filter-item" icon="el-icon-download" type="warning" plain @click="exportExcel">导出</el-button>
    </div>
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="warning" icon="el-icon-upload2" plain @click="updateExpress">上传修改快递</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
    >
      <el-table-column label="下单时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{scope.row.statusMean}}
        </template>
      </el-table-column>
      <el-table-column label="订单号" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="发货方式" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.receiveType == 'express'" type="success">快递</el-tag>
          <el-tag v-if="scope.row.receiveType == 'self'">自提</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="订单金额" align="center">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column label="货品数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.quantity }}
        </template>
      </el-table-column>
      <el-table-column label="创建人微信名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.userNickName }}
        </template>
      </el-table-column>
      <el-table-column label="创建人手机号" align="center">
        <template slot-scope="scope">
          {{ scope.row.defaultVipMobile }}
        </template>
      </el-table-column>
      <el-table-column label="自提店铺" align="center">
        <template slot-scope="scope">
          {{ scope.row.quantity }}
        </template>
      </el-table-column>
      <el-table-column label="收货人姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationReceiver }}
        </template>
      </el-table-column>
      <el-table-column label="收货人电话" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationMobile }}
        </template>
      </el-table-column>
      <el-table-column label="收货人地区" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.receiveType == 'express'">
          {{ scope.row.locationProvinceName }} -
          {{ scope.row.locationCityName }} -
          {{ scope.row.locationStationName }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="收货地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationAddress }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="260">>
        <template slot-scope="scope">
          <el-button type="text" @click="detail(scope.row)">单据商品</el-button>
          <el-button v-if="scope.row.status == 'PENDING_SEND' || (scope.row.expressCode == null && scope.row.status == 'REFUND_PART')" type="text" @click="showRefund(scope.row)">退款</el-button>
          <el-button v-if="scope.row.status == 'PENDING_SEND'" type="text" @click="send(scope.row)">发货</el-button>
          <el-button v-if="scope.row.status == 'PENDING_SEND'" type="text" @click="editAdress(scope.row)">修改地址</el-button>
          <el-button v-if="scope.row.receiveType == 'express' && (scope.row.status == 'PENDING_RECEIVE' || scope.row.status == 'PENDING_EVALUATE' || scope.row.status == 'EVALUATED')" type="text" @click="send(scope.row)">发货信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <send ref="send" @getList="getList"/>
    <detail ref="detail" @getList="getList"/>
    <exportExcel ref="exportExcel" @getList="getList"/>
    <updateExpress ref="updateExpress" @getList="getList"/>
    <editAdress ref="editAdress" @getList="getList" />
    <refund ref="refund" @getList="getList"/>
  </div>
</template>

<script>
  import {getList} from '@/api/shop/business/order/order'
  import Pagination from '@/components/Pagination'
  import send from "./send"
  import detail from "./detail"
  import refund from "./refund"
  import exportExcel from "./exportExcel"
  import updateExpress from "./updateExpress"
  import editAdress from "./editAdress"

  export default {
    components: {
      Pagination,
      send,
      detail,
      exportExcel,
      updateExpress,
      editAdress,
      refund
    },
    filters: {},
    directives: {},
    data() {
      return {
        listQuery: {
          receiveType: 'express',
          statusList: ['PENDING_SEND'],
          startDate: '',
          endDate: '',
          pageIndex: 1,
          pageSize: 10,
          code: '',
          defaultVipMobile: '',
          locationReceiver: '',
          locationMobile: ''
        },
        list: [],
        total: 0,
        listLoading: false
      }
    },
    created() {
      if (sessionStorage.shop_order_listQuery != null) {
        this.listQuery = JSON.parse(sessionStorage.shop_order_listQuery)
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      detail(ele) {
        this.$refs.detail.onOpen(ele)
      },
      // 获取列表
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          sessionStorage.shop_order_listQuery = JSON.stringify(this.listQuery)
          this.list = response.data.content
          this.total = response.data.totalElements
        }).finally(() => this.listLoading = false)
      },
      send(ele) {
        this.$refs.send.onOpen(ele)
      },
      exportExcel() {
        this.$refs.exportExcel.onOpen(this.listQuery)
      },
      updateExpress() {
        this.$refs.updateExpress.onOpen()
      },
      editAdress(ele){
        this.$refs.editAdress.onOpen(ele)
      },
      showRefund(ele){
        this.$refs.refund.onOpen(ele)
      }
    }
  }
</script>

<style scoped>

</style>
