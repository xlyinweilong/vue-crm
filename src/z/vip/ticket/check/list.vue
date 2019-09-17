<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker class="filter-item" v-model="listQuery.startDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="核销开始日期"/>
      <el-date-picker class="filter-item" v-model="listQuery.endDate" value-format="yyyy-MM-dd" format="yyyy-MM-dd" type="date" placeholder="核销结束日期"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">查询</el-button>
      <el-button :disabled="total==0" :loading="listLoading" class="filter-item" icon="el-icon-download" type="warning" plain @click="exportExcel">导出</el-button>
    </div>
    <div class="filter-container">
      <!--<el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增</el-button>-->
      <!--<el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="deleteElement" :disabled="listLoading || selectedIds.length == 0">删除</el-button>-->
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
      <el-table-column label="领取时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="核销时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.checkedDate }}
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 'CASH'" type="success">代金券</el-tag>
          <el-tag v-if="scope.row.type === 'DISCOUNT'" type="danger">折扣券</el-tag>
          <el-tag v-if="scope.row.type === 'GIFT'" type="warning">兑换券</el-tag>
          <el-tag v-if="scope.row.type === 'GROUPON'" type="info">团购券</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="额度" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column label="折扣" align="center">
        <template slot-scope="scope">
          {{ scope.row.discount }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="优惠码" align="center">
        <template slot-scope="scope">
          {{ scope.row.userCardCode }}
        </template>
      </el-table-column>
      <el-table-column label="启用时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.startDate }}
        </template>
      </el-table-column>
      <el-table-column label="失效时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.endDate }}
        </template>
      </el-table-column>
      <el-table-column label="销售单据编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.billCode }}
        </template>
      </el-table-column>
      <el-table-column label="销售POS小票" align="center">
        <template slot-scope="scope">
          {{ scope.row.posCode }}
        </template>
      </el-table-column>
      <el-table-column label="核销员工" align="center">
        <template slot-scope="scope">
          {{ scope.row.employNames }}
        </template>
      </el-table-column>
      <el-table-column label="卡卷拥有人" align="center">
        <template slot-scope="scope">
          {{ scope.row.userNickName }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <!--<saveEle ref="saveEle" @getList="getList"/>-->
    <!--<qrCode ref="qrCode"/>-->
  </div>
</template>

<script>
  import {getList,exportExcel} from '@/api/vip/ticket/ticketDetail'
  // import saveEle from './save'
  // import qrCode from './qrCode'
  import Pagination from '@/components/Pagination'

  export default {
    components: {Pagination},
    filters: {},
    directives: {},
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        selectedIds: [],
        listQuery: {
          checked: true,
          pageIndex: 1,
          pageSize: 10,
          startDate: null,
          endDate: null
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      exportExcel(){
        this.listLoading = true
        exportExcel(this.listQuery).then(res => {
        }).finally(() => this.listLoading = false)
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      }
    }
  }
</script>

<style scoped>

</style>
