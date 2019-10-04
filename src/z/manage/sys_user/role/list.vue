<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="角色名称" clearable v-model.trim="listQuery.searchKey" style="width: 200px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">查询</el-button>
    </div>
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
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
      <el-table-column label="角色名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <!--<el-table-column label="来源" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<el-tag :type="scope.row.erpId != null ? 'success':'warning'" v-text="scope.row.erpId != null ? '同步':'创建'"/>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column fixed="right" label="操作" width="350" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
          <el-button type="warning" plain icon="el-icon-wind-power" @click="power(scope.row)">权限</el-button>
          <el-button :disabled="scope.row.type == 'root'" type="danger" plain icon="el-icon-delete" @click="deleteEle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <saveCom ref="saveCom" @getList="getList"/>
    <powerCom ref="powerCom" @getList="getList"/>
  </div>
</template>

<script>
  import {getList, deleteEle} from '@/api/manager/sys_user/role'
  import Pagination from '@/components/Pagination'
  import saveCom from './save'
  import powerCom from './power'

  export default {
    components: {
      Pagination, saveCom, powerCom
    },
    filters: {},
    directives: {},
    data() {
      return {
        show: false,
        listQuery: {
          disabled: 0,
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
      add() {
        this.$refs.saveCom.onOpen({id: ''})
      },
      edit(row) {
        this.$refs.saveCom.onOpen(row)
      },
      power(row) {
        this.$refs.powerCom.onOpen(row.id)
      },
      // 获取列表
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.content
          this.total = response.data.totalElements
        }).finally(() => {
          this.listLoading = false
        })
      },
      deleteEle(row) {
        this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          deleteEle({ids: [row.id]}).then(() => {
            this.$message({type: 'success', message: '删除成功!'})
            this.getList()
          }).catch(() => {
            this.listLoading = false
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
