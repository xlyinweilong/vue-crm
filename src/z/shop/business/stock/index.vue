<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="货号" clearable v-model.trim="listQuery.goodsCode" style="width: 150px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-input placeholder="颜色" clearable v-model.trim="listQuery.colorName" style="width: 150px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-input placeholder="尺码" clearable v-model.trim="listQuery.sizeName" style="width: 150px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">
        查询
      </el-button>
      <el-button :disabled="total==0" :loading="listLoading" class="filter-item" icon="el-icon-download" type="warning" plain @click="exportExcel">导出</el-button>
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
      <el-table-column label="库存数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.stockCount }}
        </template>
      </el-table-column>
      <el-table-column label="被锁定数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.lockCount }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList,exportExcel} from '@/api/shop/business/stock/stock'
  import Pagination from '@/components/Pagination'


  export default {
    components: {
      Pagination,
    },
    filters: {},
    directives: {},
    data() {
      return {
        listQuery: {
          pageIndex: 1,
          pageSize: 10,
          goodsCode: '',
          sizeName: '',
          colorName: ''
        },
        list: [],
        total: 0,
        listLoading: false
      }
    },
    created() {
      if (sessionStorage.shop_stock_listQuery != null) {
        this.listQuery = JSON.parse(sessionStorage.shop_stock_listQuery)
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
          sessionStorage.shop_stock_listQuery = JSON.stringify(this.listQuery)
          this.list = response.data.content
          this.total = response.data.totalElements
        }).finally(() => this.listLoading = false)
      },
      exportExcel() {
        this.listLoading = true
        exportExcel(this.listQuery).then(res => {
        }).finally(() => this.listLoading = false)
      }
    }
  }
</script>

<style scoped>

</style>
