<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="showRsCreate = true" :loading="listLoading">生成结果</el-button>
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
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="解析数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.rsCount }}
        </template>
      </el-table-column>
      <el-table-column label="网络错误" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="rsId = scope.row.id;showRsNetCount=true">{{ scope.row.netErrorCount }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="未找到货号" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="rsId = scope.row.id;showRsNoCount=true">{{ scope.row.noRsCount }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="用时" align="center">
        <template slot-scope="scope">
          {{(scope.row.useTime)}}
        </template>
      </el-table-column>
      <el-table-column label="下载结果" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="downLoadRs(scope.row.id)">下载结果</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <planRsCreate :show.sync="showRsCreate" @reload="getList" :planId="listQuery.planId"/>
    <planRsNoCount :show.sync="showRsNoCount"  :rsId="rsId"/>
    <planRsNetCount :show.sync="showRsNetCount"  :rsId="rsId"/>
  </div>
</template>

<script>
  import {getList, createRs, deleteEle} from '@/api/kuyun/planRs'
  import Pagination from '@/components/Pagination'
  import planRsCreate from '@/z/kuyun/plan/plan_rs_create'
  import planRsNoCount from '@/z/kuyun/plan/plan_rs_no_count'
  import planRsNetCount from '@/z/kuyun/plan/plan_rs_net_count'

  export default {
    name: 'plan_rs_list',
    components: {
      Pagination, planRsCreate, planRsNoCount,planRsNetCount
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
        showRsCreate: false,
        showRsNoCount: false,
        showRsNetCount: false,
        rsId:''
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
      },
      downLoadRs(rsId){
        window.open(process.env.BASE_API + "/api/kuyunshang/plan_rs/download/" + rsId)
      }
    }
  }
</script>

<style scoped>

</style>
