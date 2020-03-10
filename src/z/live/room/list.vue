<template>
  <div class="app-container">
    <!--<div class="filter-container">-->
    <!--<el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">-->
    <!--查询-->
    <!--</el-button>-->
    <!--</div>-->
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-s-order" plain @click="loadByApi">同步数据</el-button>
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
      <el-table-column label="直播开始时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.startTime }}
        </template>
      </el-table-column>
      <el-table-column label="直播结束时间" align="center">
        <template slot-scope="scope">
          {{scope.row.endTime}}
        </template>
      </el-table-column>
      <el-table-column label="直播房间名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="直播状态" align="center">
        <template slot-scope="scope">
          {{scope.row.liveStatusMean}}
        </template>
      </el-table-column>
      <el-table-column label="主播名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.anchorName }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList, loadByApi} from '@/api/live/room'
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
          pageSize: 10
        },
        list: [],
        total: 0,
        listLoading: false
      }
    },
    created() {
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
        }).finally(() => this.listLoading = false)
      },
      loadByApi() {
        this.$confirm('接口只能调用500次/天，每次调用次数为数据总数/100，确定要同步吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          loadByApi().then(res => {
            this.$message({type: 'success', message: '操作成功!'})
            this.getList()
          }).finally(() => this.listLoading = false)
        }).catch(() => {
        })

      }
    }
  }
</script>

<style scoped>

</style>
