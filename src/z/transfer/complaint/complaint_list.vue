<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker class="filter-item" value-format="yyyy-MM-dd" clearable v-model="listQuery.startDate" type="date" placeholder="开始时间"/>
      <el-date-picker class="filter-item" value-format="yyyy-MM-dd" clearable v-model="listQuery.endDate" type="date" placeholder="结束时间"/>
      <el-input placeholder="用户昵称" clearable v-model.trim="listQuery.nickName" style="width: 150px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-input placeholder="店铺名称" clearable v-model.trim="listQuery.channelName" style="width: 150px;" class="filter-item" @keyup.enter.native="getList"/>
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
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.channelName }}
        </template>
      </el-table-column>
      <el-table-column label="内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.message }}
        </template>
      </el-table-column>
      <el-table-column label="评价昵称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userNickName }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList} from '@/api/transfer/complaint'
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
          evaluateScore:'',
          channelName: '',
          channelCode: '',
          startDate: '',
          endDate: '',
          employName: '',
          disabled: '',
          pageIndex: 1,
          pageSize: 10,
          nickName: '',
          employCode: ''
        },
        list: [],
        total: 0,
        listLoading: false
      }
    },
    mounted() {
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
