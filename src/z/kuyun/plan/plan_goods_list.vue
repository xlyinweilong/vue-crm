<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="showGoodsImport = true" :loading="listLoading">导入货品</el-button>
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
      <el-table-column label="货品编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.goodsCode }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <planGoodsImport :show.sync="showGoodsImport" @reload="getList" :planId="this.listQuery.planId"/>
  </div>
</template>

<script>
  import {getList, deleteEle} from '@/api/kuyun/planGoods'
  import Pagination from '@/components/Pagination'
  import planGoodsImport from '@/z/kuyun/plan/plan_goods_import'

  export default {
    name: 'plan_goods_list',
    components: {
      Pagination, planGoodsImport
    },
    filters: {},
    directives: {},
    data() {
      return {
        //列表相关
        listQuery: {
          planId: '',
          pageIndex: 1,
          pageSize: 10,
          name: ''
        },
        selectedIds: [],
        list: [],
        total: 0,
        listLoading: false,
        showGoodsImport: false
      }
    },
    created() {
      const id = this.$route.params && this.$route.params.id
      this.listQuery.planId = id
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
