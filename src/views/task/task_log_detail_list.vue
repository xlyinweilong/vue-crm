<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="日志详情ID" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="日志ID">
        <template slot-scope="scope">
          {{ scope.row.taskLogId }}
        </template>
      </el-table-column>
      <el-table-column label="执行内容" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.logDetail }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行结果" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.logStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结果数量" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.logCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.startTime }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.endTime }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import { getTaskLogDetailList } from '@/api/task'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      listQuery:{
        pageIndex:1,
        pageSize:10
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.listQuery.taskLogId = id
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getTaskLogDetailList(this.listQuery).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements;
        this.listLoading = false
      })
    }
  }
}
</script>
