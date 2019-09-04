<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="会员编号" clearable v-model.trim="listQuery.vipCode" style="width: 250px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-input placeholder="员工编号" clearable v-model.trim="listQuery.employCode" style="width: 250px;" class="filter-item" @keyup.enter.native="getList"/>
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
      <el-table-column label="服务员工编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.employCode }}
        </template>
      </el-table-column>
      <el-table-column label="服务员工姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.employName }}
        </template>
      </el-table-column>
      <el-table-column label="店铺编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.channelCode }}
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.channelName }}
        </template>
      </el-table-column>
      <el-table-column label="评分" align="center">
        <template slot-scope="scope">
          {{ scope.row.evaluateScore }}
        </template>
      </el-table-column>
      <el-table-column label="是否匿名" align="center">
        <template slot-scope="scope">
          {{ scope.row.evaluateAnonymous }}
        </template>
      </el-table-column>
      <el-table-column label="意见" align="center">
        <template slot-scope="scope">
          {{ scope.row.evaluateText }}
        </template>
      </el-table-column>
      <el-table-column label="单据" align="center">
        <template slot-scope="scope">
          {{ scope.row.billCode }}
        </template>
      </el-table-column>
      <el-table-column label="评价昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.userNickName }}
        </template>
      </el-table-column>
      <el-table-column label="会员卡号" align="center">
        <template slot-scope="scope">
          {{ scope.row.vipCode }}
        </template>
      </el-table-column>
      <el-table-column label="会员名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.vipName }}
        </template>
      </el-table-column>
      <el-table-column label="单据金额" align="center">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column label="单据数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList as getEvaluateEmployList} from '@/api/transfer/evaluateEmploy'
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
          vipCode: '',
          employCode:''
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
        getEvaluateEmployList(this.listQuery).then(response => {
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
