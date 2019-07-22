<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="编号或者姓名" clearable v-model.trim="listQuery.searchKey" style="width: 200px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">查询</el-button>
    </div>
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      <el-button :loading="listLoading" class="filter-item" type="success" icon="el-icon-full-screen" @click="showQrCode = true">二维码绑定</el-button>
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
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex == 1">男</el-tag>
          <el-tag v-if="scope.row.sex == 0" type="success">女</el-tag>
          <el-tag v-if="scope.row.sex == -1" type="warning">未知</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="禁用" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.disabled == 1 ? 'danger':'success'" v-text="scope.row.disabled == 1 ? '禁用':'启用'"/>
        </template>
      </el-table-column>
      <el-table-column label="来源" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.erpId != null ? 'success':'warning'" v-text="scope.row.erpId != null ? '同步':'创建'"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
          <el-button :disabled="scope.row.erpId != null" type="danger" plain icon="el-icon-delete" @click="deleteEle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <userAddEdit ref="userAddEdit" :show.sync="show" @getList="getList"/>
    <userQrCode ref="userQrCode" :show.sync="showQrCode"/>
  </div>
</template>

<script>
import { getList, deleteEle } from '@/api/manager/business/employ'
import Pagination from '@/components/Pagination'
import userAddEdit from './user_add_edit'
import userQrCode from './user_qr_code'

export default {
  name: 'UserList',
  components: {
    Pagination, userAddEdit, userQrCode
  },
  filters: {},
  directives: {},
  data() {
    return {
      show: false,
      showQrCode: false,
      listQuery: {
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
      this.show = true
      this.$refs.userAddEdit.onOpen('')
    },
    edit(row) {
      this.show = true
      this.$refs.userAddEdit.onOpen(row.id)
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
        deleteEle({ ids: [row.id] }).then(() => {
          this.$message({ type: 'success', message: '删除成功!' })
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
