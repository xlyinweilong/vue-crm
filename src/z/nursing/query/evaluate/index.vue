<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="品类名称" clearable v-model.trim="listQuery.searchKey" style="width: 200px;"
                class="filter-item" @keyup.enter.native="getList"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">
        查询
      </el-button>
    </div>
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增
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
      <el-table-column label="品类名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="销售价" align="center">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="结算价" align="center">
        <template slot-scope="scope">
          {{ scope.row.settlePrice }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="320" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteEle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList, deleteEle, exportExcel} from '@/api/nursing/nursingCategoryConfig'
  import Pagination from '@/components/Pagination'

  export default {
    components: {
      Save,
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
          searchKey: '',
          startDateTime: '',
          endDateTime: ''
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
      },
      edit(row) {
        this.$refs.save.onOpen(row)
      },
      add() {
        this.$refs.save.onOpen({})
      },
      deleteEle(row) {
        this.$confirm('确定要删除选中的记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          deleteEle({id: row.id}).then(() => {
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
