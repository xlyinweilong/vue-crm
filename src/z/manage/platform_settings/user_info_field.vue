<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="字段名称" clearable v-model.trim="listQuery.searchKey" style="width: 250px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">查询</el-button>
    </div>
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="deleteElement" :disabled="listLoading || selectedIds.length == 0">删除</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      @selection-change="selectionChange"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
    >
      <el-table-column type="selection" width="35"/>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">
          {{ scope.row.fieldIndex }}
        </template>
      </el-table-column>
      <el-table-column label="字段名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.fieldName }}
        </template>
      </el-table-column>
      <el-table-column label="字段类型" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.fieldType === 'string'" type="info">字符串</el-tag>
          <el-tag v-if="scope.row.fieldType === 'radio'" type="info">单选</el-tag>
          <el-tag v-if="scope.row.fieldType === 'integer'" type="info">整数</el-tag>
          <el-tag v-if="scope.row.fieldType === 'double'" type="info">小数</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="完善送积分" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.setGiveIntegral" type="success">是</el-tag>
          <el-tag v-if="!scope.row.setGiveIntegral" type="warning">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="权重" align="center">
        <template slot-scope="scope">
          {{ scope.row.weight }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <userInfoFieldSave ref="userInfoFieldSave" @getList="getList"/>
  </div>
</template>

<script>
  import {getList, deleteEle} from '@/api/manager/platform/userInfoField'
  import Pagination from '@/components/Pagination'
  import userInfoFieldSave from './user_info_field_save'


  export default {
    components: {
      Pagination, userInfoFieldSave
    },
    filters: {},
    directives: {},
    data() {
      return {
        selectedIds: [],
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
        this.$refs.userInfoFieldSave.onOpen({id: ''})
      },
      edit(row) {
        this.$refs.userInfoFieldSave.onOpen(row)
      },
      //选择
      selectionChange(val) {
        this.selectedIds = val
      },
      deleteElement() {
        this.$confirm('确定要删除选中的数据吗?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          deleteEle({ids: this.selectedIds.map(s => s.id)}).then(response => {
            this.$message({message: response.message, type: 'success'});
            this.getList()
          })
        })
      },
      // 获取列表
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.content
          this.total = response.data.totalElements
        }).finally(() => this.listLoading = false)
      }
    }
  }
</script>

<style scoped>

</style>
