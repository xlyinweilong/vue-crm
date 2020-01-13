<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="编号" clearable v-model.trim="listQuery.code" style="width: 200px;"
                class="filter-item" @keyup.enter.native="getList"/>
      <el-input placeholder="客户手机号" clearable v-model.trim="listQuery.customerMobile" style="width: 200px;"
                class="filter-item" @keyup.enter.native="getList"/>
      <el-select class="filter-item" v-model="listQuery.statuss" multiple collapse-tags placeholder="请选择状态">
        <el-option key="INIT" label="店员创建" value="INIT"/>
        <el-option key="WASHING" label="洗衣坊取走" value="WASHING"/>
        <el-option key="PROBLEM" label="洗衣坊提出问题" value="PROBLEM"/>
        <el-option key="PROBLEM_REFUSE" label="客户拒绝" value="PROBLEM_REFUSE"/>
        <el-option key="PROBLEM_AGREE" label="客户同意" value="PROBLEM_AGREE"/>
        <el-option key="FINISHED_PROBLEM" label="拒绝单取走" value="FINISHED_PROBLEM"/>
        <el-option key="SETTLED" label="已经结算" value="SETTLED"/>
        <el-option key="FINISHED" label="客户取走" value="FINISHED"/>
        <el-option key="IN_CHANNEL" label="等待客户取走" value="IN_CHANNEL"/>
        <el-option key="DELETED" label="已经删除" value="DELETED"/>
      </el-select>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">
        查询
      </el-button>
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
      <el-table-column label="店铺名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="员工编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label=员工姓名 align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 'INIT'">店员创建</el-tag>
          <el-tag v-if="scope.row.status == 'WASHING'" type="success">洗衣坊取走</el-tag>
          <el-tag v-if="scope.row.status == 'PROBLEM'" type="danger">洗衣坊提出问题</el-tag>
          <el-tag v-if="scope.row.status == 'PROBLEM_REFUSE'" type="danger">客户拒绝</el-tag>
          <el-tag v-if="scope.row.status == 'PROBLEM_AGREE'" type="warning">客户同意</el-tag>
          <el-tag v-if="scope.row.status == 'FINISHED_PROBLEM'" type="danger">拒绝单取走</el-tag>
          <el-tag v-if="scope.row.status == 'SETTLED'" type="success">已经结算</el-tag>
          <el-tag v-if="scope.row.status == 'FINISHED'" type="success">客户取走</el-tag>
          <el-tag v-if="scope.row.status == 'IN_CHANNEL'" type="success">等待客户取走</el-tag>
          <el-tag v-if="scope.row.status == 'DELETED'" type="danger">已经删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="成交数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.channelAliasNameAndName }}
        </template>
      </el-table-column>
      <el-table-column label="焕新比例" align="center">
        <template slot-scope="scope">
          {{ scope.row.createEmployCode }}
        </template>
      </el-table-column>
      <el-table-column label="焕新评价数" align="center">
        <template slot-scope="scope">
          {{ scope.row.createEmployName }}
        </template>
      </el-table-column>
      <el-table-column label="焕新评价率" align="center">
        <template slot-scope="scope">
          {{ scope.row.customerUserMobile }}
        </template>
      </el-table-column>
      <el-table-column label="焕新评价分" align="center">
        <template slot-scope="scope">
          {{ scope.row.customerUserMobile }}
        </template>
      </el-table-column>
      <el-table-column label="最终得分" align="center">
        <template slot-scope="scope">
          {{ scope.row.customerUserMobile }}
        </template>
      </el-table-column>
      <el-table-column label="最终合计得分" align="center">
        <template slot-scope="scope">
          {{ scope.row.customerUserMobile }}
        </template>
      </el-table-column>
      <el-table-column label="最终排名" align="center">
        <template slot-scope="scope">
          {{ scope.row.customerUserMobile }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList} from '@/api/nursing/nursing'
  import Pagination from '@/components/Pagination'

  export default {
    components: {
      Pagination,
    },
    filters: {},
    directives: {},
    data() {
      return {
        baseUrl: '',
        listQuery: {
          pageIndex: 1,
          pageSize: 10,
          code: '',
          statuss: ['INIT', 'WASHING', 'IN_CHANNEL', 'FINISHED', 'SETTLED', 'PROBLEM', 'PROBLEM_REFUSE', 'PROBLEM_AGREE', 'FINISHED_PROBLEM'],
          customerMobile: ''
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
        getList(this.listQuery).then(res => {
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      }
    }
  }
</script>

<style scoped>
</style>
