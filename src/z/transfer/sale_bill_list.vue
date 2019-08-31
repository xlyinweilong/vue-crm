<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="单号/货号/货名/会员编号" clearable v-model.trim="listQuery.searchKey" style="width: 250px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-select v-model="listQuery.type" class="filter-item" clearable placeholder="请选择单据类型">
        <el-option key="SALE" label="销售" value="SALE" />
        <el-option key="RETURN" label="退货" value="RETURN" />
      </el-select>
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
          {{ scope.row.billDate }}
        </template>
      </el-table-column>
      <el-table-column label="单号" align="center">
        <template slot-scope="scope">
          {{ scope.row.billCode }}
        </template>
      </el-table-column>
      <el-table-column label="货号" align="center">
        <template slot-scope="scope">
          {{ scope.row.goodsCode }}
        </template>
      </el-table-column>
      <el-table-column label="货名" align="center">
        <template slot-scope="scope">
          {{ scope.row.goodsName }}
        </template>
      </el-table-column>
      <el-table-column label="颜色" align="center">
        <template slot-scope="scope">
          {{ scope.row.colorName }}
        </template>
      </el-table-column>
      <el-table-column label="尺码" align="center">
        <template slot-scope="scope">
          {{ scope.row.sizeName }}
        </template>
      </el-table-column>
      <el-table-column label="会员" align="center">
        <template slot-scope="scope">
          {{ scope.row.vipCode }}
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.billCount }}
        </template>
      </el-table-column>
      <el-table-column label="折扣" align="center">
        <template slot-scope="scope">
          {{ scope.row.discount }}
        </template>
      </el-table-column>
      <el-table-column label="单价" align="center">
        <template slot-scope="scope">
          {{ scope.row.billPrice }}
        </template>
      </el-table-column>
      <el-table-column label="总金额" align="center">
        <template slot-scope="scope">
          {{ scope.row.billAmount }}
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type == 'SALE' ? 'success':'danger'" v-text="scope.row.type == 'SALE' ? '销售':'退货'"/>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList} from '@/api/transfer/saleBill'
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
          searchKey: '',
          type:''
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
