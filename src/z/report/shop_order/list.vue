<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker class="filter-item" v-model="listQuery.startDate" type="date" value-format="yyyy-MM-dd" placeholder="开始时间"/>
      <el-date-picker class="filter-item" v-model="listQuery.endDate" type="date" value-format="yyyy-MM-dd" placeholder="结束时间"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">查询</el-button>
      <el-button :disabled="total==0" :loading="listLoading" class="filter-item" icon="el-icon-download" type="warning" plain @click="exportExcel">导出</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="pageList"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
      show-summary
      :summary-method="getSummaries"
    >
      <el-table-column label="交易时间" align="center">
        <template slot-scope="scope">
          {{ scope.row[0] | formatTime}}
        </template>
      </el-table-column>
      <el-table-column label="单号" align="center">
        <template slot-scope="scope">
          {{ scope.row[1] }}
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          {{ scope.row[3] }}
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          {{ scope.row[4] }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize"/>
    <exportExcel ref="exportExcel"/>
  </div>
</template>

<script>
  import {getList} from '@/api/report/shop/order'
  import Pagination from '@/components/Pagination'
  import exportExcel from './exportExcel'
  import dateFormat from '@/utils/dateUtils'


  export default {
    components: {
      Pagination,exportExcel
    },
    directives: {},
    data() {
      return {
        listQuery: {
          pageIndex: 1,
          pageSize: 10,
          startDate: dateFormat("YYYY-mm-dd", new Date()),
          endDate: dateFormat("YYYY-mm-dd", new Date())
        },
        list: [],
        total: 0,
        listLoading: false
      }
    },
    computed: {
      pageList() {
        return this.list.slice((this.listQuery.pageIndex - 1) * this.listQuery.pageSize, this.listQuery.pageIndex * this.listQuery.pageSize)
      }
    },
    mounted() {
      this.getList()
    },
    filters: {
      formatTime(value) {
        let unixTimestamp = new Date(value)
        let commonTime = unixTimestamp.toLocaleString('chinese', {
          hour12: false
        })
        return commonTime
      }
    },
    methods: {
      isOk() {
        if (this.listQuery.startDate == null) {
          this.$message({
            message: '请选择开始时间',
            type: 'warning'
          })
          return false
        }
        if (this.listQuery.endDate == null) {
          this.$message({
            message: '请选择结束时间',
            type: 'warning'
          })
          return false
        }
        return true
      },
      exportExcel() {
        if (!this.isOk()) {
          return
        }
        this.$refs.exportExcel.onOpen(this.listQuery)
      },
      // 获取列表
      getList() {
        if (!this.isOk()) {
          return
        }
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.list = res.data
          this.total = res.data.length
        }).finally(() => this.listLoading = false)
      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index === 2) {
            sums[2] = this.list.reduce((t, a) => t.add(a[3]), 0) + '元'
            return;
          }
        })
        return sums;
      }
    }
  }
</script>

<style scoped>

</style>
