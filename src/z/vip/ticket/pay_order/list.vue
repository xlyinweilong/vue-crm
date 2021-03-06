<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="支付流水号" clearable v-model.trim="listQuery.payCode" style="width: 200px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-input placeholder="卡券编号" clearable v-model.trim="listQuery.code" style="width: 200px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-input placeholder="具体券号" clearable v-model.trim="listQuery.detailCode" style="width: 200px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-input placeholder="用户默认手机号" clearable v-model.trim="listQuery.defaultVipMobile" style="width: 200px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-date-picker class="filter-item" clearable
                      v-model="listQuery.startDate"
                      type="date"
                      placeholder="开始日期">
      </el-date-picker>
      <el-date-picker class="filter-item" clearable
                      v-model="listQuery.endDate"
                      type="date"
                      placeholder="结束日期">
      </el-date-picker>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">
        查询
      </el-button>
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
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="商品内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.payBody }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 'PENDING_PAYMENT'">待支付</span>
          <span v-if="scope.row.status == 'SUCCESS'">支付成功</span>
          <span v-if="scope.row.status == 'REFUND'">已退款</span>
          <span v-if="scope.row.status == 'CLOSED'">支付关闭</span>
        </template>
      </el-table-column>
      <el-table-column label="单据流水号" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column label="卡券编号" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.ticket != null">{{ scope.row.ticket.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="卡券标题" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.ticket != null">{{ scope.row.ticket.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.user != null">{{ scope.row.user.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户默认手机号" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.user != null">{{ scope.row.user.defaultVipMobile }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 'SUCCESS'" type="text" @click="refund(scope.row)">退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <Refund ref="refund" @getList="getList"/>
  </div>
</template>

<script>
  import {getList} from '@/api/vip/ticket/payOrder'
  import Pagination from '@/components/Pagination'
  import Refund from "./refund";

  export default {
    components: {
      Refund,
      Pagination
    },
    filters: {},
    directives: {},
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          detailCode: '',
          defaultVipMobile: '',
          pageIndex: 1,
          pageSize: 10,
          code: '',
          payCode: '',
          startDate: null,
          endDate: null
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      },
      refund(row) {
        this.$refs.refund.onOpen(row, this.listQuery.detailCode)
      }
    }
  }
</script>

<style scoped>

</style>
