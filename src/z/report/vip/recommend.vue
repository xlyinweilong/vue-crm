<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select class="filter-item" v-model="listQuery.type" placeholder="请选择类型">
        <el-option label="店铺" value="channel"/>
        <el-option label="员工" value="employ"/>
        <el-option label="活动码" value="diy"/>
      </el-select>
      <el-input v-show="listQuery.type == 'diy'" placeholder="活动码" clearable v-model.trim="listQuery.code" style="width: 200px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-date-picker class="filter-item" v-model="listQuery.startDate" clearable type="date" value-format="yyyy-MM-dd" placeholder="开始时间"/>
      <el-date-picker class="filter-item" v-model="listQuery.endDate" clearable type="date" value-format="yyyy-MM-dd" placeholder="结束时间"/>
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
      <el-table-column v-if="listQuery.type != 'diy'" label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row[0] }}
        </template>
      </el-table-column>
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          <span v-if="listQuery.type != 'diy'">{{ scope.row[1] }}</span>
          <span v-if="listQuery.type == 'diy'">{{ scope.row[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center">
        <template slot-scope="scope">
          <span v-if="listQuery.type != 'diy'">{{ scope.row[2] }}</span>
          <span v-if="listQuery.type == 'diy'">{{ scope.row[1] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!--<pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>-->
  </div>
</template>

<script>
  import {recommendList} from '@/api/report/vip/recommend'
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
          type: 'channel',
          pageIndex: 1,
          pageSize: 10,
          searchKey: '',
          startDate: new Date(),
          endDate: new Date(),
          code: ''
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
        recommendList(this.listQuery).then(response => {
          this.list = response.data
          this.total = 100
        }).finally(() => {
          this.listLoading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
