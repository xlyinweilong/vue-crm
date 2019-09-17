<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input class="filter-item" style="width: 200px;" placeholder="微信昵称" v-model="listQuery.nickName" clearable/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">查询</el-button>
      <el-button :disabled="total==0" :loading="listLoading" class="filter-item" icon="el-icon-download" type="warning" plain @click="exportExcel">导出</el-button>
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
      <el-table-column label="小程序注册时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="微信头像" align="center">
        <template slot-scope="scope">
          <el-image style="width: 50px; height: 50px" :src="scope.row.avatarUrl" fit="fit"/>
        </template>
      </el-table-column>
      <el-table-column label="微信昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickName }}
        </template>
      </el-table-column>
      <el-table-column label="微信性别" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.gender == 1">男</el-tag>
          <el-tag v-if="scope.row.gender == 2" type="success">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.userNickName }}
        </template>
      </el-table-column>
      <el-table-column label="自定义1" align="center">
        <template slot-scope="scope">
          {{ scope.row.diy1 }}
        </template>
      </el-table-column>
      <el-table-column label="自定义2" align="center">
        <template slot-scope="scope">
          {{ scope.row.diy2 }}
        </template>
      </el-table-column>
      <el-table-column label="自定义3" align="center">
        <template slot-scope="scope">
          {{ scope.row.diy3 }}
        </template>
      </el-table-column>
      <el-table-column label="自定义4" align="center">
        <template slot-scope="scope">
          {{ scope.row.diy4 }}
        </template>
      </el-table-column>
      <el-table-column label="自定义5" align="center">
        <template slot-scope="scope">
          {{ scope.row.diy5 }}
        </template>
      </el-table-column>
      <el-table-column label="自定义6" align="center">
        <template slot-scope="scope">
          {{ scope.row.diy6 }}
        </template>
      </el-table-column>
      <el-table-column label="自定义7" align="center">
        <template slot-scope="scope">
          {{ scope.row.diy7 }}
        </template>
      </el-table-column>
      <el-table-column label="自定义8" align="center">
        <template slot-scope="scope">
          {{ scope.row.diy8 }}
        </template>
      </el-table-column>
      <el-table-column label="自定义9" align="center">
        <template slot-scope="scope">
          {{ scope.row.diy9 }}
        </template>
      </el-table-column>
      <el-table-column label="自定义10" align="center">
        <template slot-scope="scope">
          {{ scope.row.diy10 }}
        </template>
      </el-table-column>
      <el-table-column label="员工编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.employCode }}
        </template>
      </el-table-column>
      <el-table-column label="员工名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.employName }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="bindEmploy(scope.row)">绑定员工</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <bindEmploy ref="bindEmploy" @getList="getList"/>
  </div>
</template>

<script>
  import {getList, exportExcel} from '@/api/user/user'
  import Pagination from '@/components/Pagination'
  import bindEmploy from './bind_employ'

  export default {
    components: {Pagination, bindEmploy},
    filters: {},
    directives: {},
    data() {
      return {
        showDiy: true,
        list: [],
        total: 0,
        listLoading: false,
        selectedIds: [],
        listQuery: {
          nickName: '',
          pageIndex: 1,
          pageSize: 10
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      bindEmploy(row) {
        this.$refs.bindEmploy.onOpen(row)
      },
      exportExcel() {
        this.listLoading = true
        exportExcel(this.listQuery).then(res => {
        }).finally(() => this.listLoading = false)
      },
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
