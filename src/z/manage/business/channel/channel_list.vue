<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="编号或者名称" clearable v-model.trim="listQuery.searchKey" style="width: 200px;" class="filter-item" @keyup.enter.native="getList"/>
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
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="禁用" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.disabled == 1 ? 'danger':'success'" v-text="scope.row.disabled == 1 ? '禁用':'启用'"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
import { getList} from '@/api/manager/business/channel'
import Pagination from '@/components/Pagination'

export default {
  name: 'channelList',
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
