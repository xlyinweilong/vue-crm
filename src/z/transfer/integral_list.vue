<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="会员编号/名称" clearable v-model.trim="listQuery.searchKey" style="width: 250px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">查询</el-button>
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
          {{ scope.row.operationDate }}
        </template>
      </el-table-column>
      <el-table-column label="会员编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.vipCode }}
        </template>
      </el-table-column>
      <el-table-column label="会员名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.vipName }}
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.billCount }}
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column label="积分" align="center">
        <template slot-scope="scope">
          {{ scope.row.integral }}
        </template>
      </el-table-column>
      <el-table-column label="相关单号" align="center">
        <template slot-scope="scope">
          {{ scope.row.erpSaleBillCode }}
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.operationName }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList} from '@/api/transfer/integral'
  import Pagination from '@/components/Pagination'

  export default {
    components: {
      Pagination
    },
    filters: {},
    directives: {},
    data() {
      return {
        listQuery: {
          pageIndex: 1,
          pageSize: 10,
          searchKey: ''
        },
        list: [],
        total: 0,
        listLoading: false
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      // 获取列表
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.content
          this.total = response.data.totalElements
        }).finally(() => {
          this.listLoading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
