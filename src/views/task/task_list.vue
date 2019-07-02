<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <!--<el-table-column align="center" label="任务ID" width="95">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.id }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="任务名称">
        <template slot-scope="scope">
          {{ scope.row.taskName }}
        </template>
      </el-table-column>
      <el-table-column label="执行时间" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.taskTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上次成功时间" width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.taskLastSuccessDate }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="ERP业务数据库" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.taskErpDb }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="DW数据仓库" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.taskDwDb }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import { getTaskList } from '@/api/task'
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
      getTaskList(this.listQuery).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements;
        this.listLoading = false
      })
    }
  }
}
</script>
