<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="$router.push({ path: '/bill/transfer_create/'})" :loading="listLoading">新增</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" :loading="listLoading" :disabled="selectedIds.length !== 1" @click="$router.push({path: '/bill/transfer_update/' + selectedIds[0].id})">修改</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="deleteEle" :loading="listLoading" :disabled="selectedIds.length === 0">删除</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-setting" @click="showDiy=true" :loading="listLoading" plain>偏好</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selectionChange"
      highlight-current-row
      fit
      border
    >
      <el-table-column type="selection" width="35"/>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.updateDate }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <transferDiy :show.sync="showDiy"/>
  </div>
</template>

<script>
  import {getList, deleteEle} from '@/api/bill/transfer'
  import Pagination from '@/components/Pagination'
  import transferDiy from '@/z/bill/transfer/transfer_diy'

  export default {
    name: 'transfer_list',
    components: {
      Pagination,transferDiy
    },
    filters: {},
    directives: {},
    data() {
      return {
        showSearchMore: false,
        //列表相关
        listQuery: {
          pageIndex: 1,
          pageSize: 10,
          name: ''
        },
        selectedIds: [],
        list: [],
        total: 0,
        listLoading: false,
        showDiy:false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getStatusTag(status) {
        switch (status) {
          case 'DRAFT':
            return 'info'
          case 'AUDIT_FAILURE':
            return 'danger'
          case 'AUDITED':
          case 'COMPLETE':
            return 'success'
        }
        return '';
      },
      //获取列表
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.selectedIds = []
          this.list = response.data.content
          this.total = response.data.totalElements
        }).finally(() => this.listLoading = false)
      },
      //选择
      selectionChange(val) {
        this.selectedIds = val
      },
      deleteEle() {
        this.$confirm('确定要删除选中的记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          deleteEle({ids: this.selectedIds.map(s => s.id)}).then(() => {
            this.$message({type: 'success', message: '删除成功!'})
            this.getList()
          }).catch(() => {this.listLoading = false})
        })
      }
    }
  }
</script>

<style scoped>

</style>
