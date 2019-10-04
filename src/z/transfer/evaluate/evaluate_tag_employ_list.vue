<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker class="filter-item" value-format="yyyy-MM-dd" clearable v-model="listQuery.startDate" type="date" placeholder="开始时间"/>
      <el-date-picker class="filter-item" value-format="yyyy-MM-dd" clearable v-model="listQuery.endDate" type="date" placeholder="结束时间"/>
      <el-select class="filter-item" clearable style="width: 100px;" v-model="listQuery.disabled" placeholder="有效">
        <el-option :key="false" label="有效" :value="false"/>
        <el-option :key="true" label="失效" :value="true"/>
      </el-select>
      <el-input placeholder="单据编号" clearable v-model.trim="listQuery.billCode" style="width: 150px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-input placeholder="员工编号" clearable v-model.trim="listQuery.employCode" style="width: 150px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-input placeholder="员工姓名" clearable v-model.trim="listQuery.employName" style="width: 150px;" class="filter-item" @keyup.enter.native="getList"/>
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
      <el-table-column label="有效" align="center">
        <template slot-scope="scope">
          <el-tag v-if="!scope.row.disabled" type="success">是</el-tag>
          <el-tag v-if="scope.row.disabled" type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="标签" align="center">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="单据" align="center">
        <template slot-scope="scope">
          {{ scope.row.billCode }}
        </template>
      </el-table-column>
      <el-table-column label="员工编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.employCode }}
        </template>
      </el-table-column>
      <el-table-column label="员工姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.employName }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList} from '@/api/transfer/evaluateTagEmploy'
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
          billCode:'',
          evaluateScore: '',
          startDate: '',
          endDate: '',
          employName: '',
          disabled: '',
          pageIndex: 1,
          pageSize: 10,
          vipCode: '',
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
