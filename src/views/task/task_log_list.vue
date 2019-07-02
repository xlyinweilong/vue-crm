<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="日志ID" width="110" align="center">
        <template slot-scope="scope">
          <router-link :to="'/task/taskLogDetailList/'+scope.row.id" class="link-type">
            <span>{{ scope.row.id }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="任务名称">
        <template slot-scope="scope">
          {{ scope.row.task.taskName }}
        </template>
      </el-table-column>
      <el-table-column label="设置执行时间" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.task.taskTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行结果" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.taskLog }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务开始时间" width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.taskStartTime }}
        </template>
      </el-table-column>
      <el-table-column label="任务结束时间" width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.taskEndTime }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import { getTaskLogList } from '@/api/task'
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
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getTaskLogList(this.listQuery).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements;
        this.listLoading = false
      })
    }
  }
}
</script>
