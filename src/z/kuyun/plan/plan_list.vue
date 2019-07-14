<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="planId='';showPlan = true" :loading="listLoading">新增</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" :loading="listLoading" :disabled="selectedIds.length !== 1" @click="planId=selectedIds[0].id;showPlan = true">修改</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="deleteEle" :loading="listLoading" :disabled="selectedIds.length === 0">删除</el-button>
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
      <el-table-column label="操作货品" align="center">
        <template slot-scope="scope">
          <el-button :plain="true" type="primary" @click="$router.push({ path: '/kuyun/goods_list/'+ scope.row.id})">货品</el-button>
        </template>
      </el-table-column>
      <el-table-column label="查询结果" align="center">
        <template slot-scope="scope">
          <el-button :plain="true" type="success" @click="$router.push({ path: '/kuyun/rs_list/'+ scope.row.id})">结果</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <planSave :show.sync="showPlan" @reload="getList" :planId="planId"/>

  </div>
</template>

<script>
  import {getList, deleteEle} from '@/api/kuyun/plan'
  import Pagination from '@/components/Pagination'
  import planSave from '@/z/kuyun/plan/plan_save'

  export default {
    name: 'plan_list',
    components: {
      Pagination, planSave
    },
    filters: {},
    directives: {},
    data() {
      return {
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
        showPlan: false,
        planId: ''
      }
    },
    created() {
      this.getList()
    },
    methods: {
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
