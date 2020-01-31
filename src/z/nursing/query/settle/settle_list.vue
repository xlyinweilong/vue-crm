<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="编号" clearable v-model.trim="listQuery.code" style="width: 200px;"
                class="filter-item" @keyup.enter.native="getList"/>
      <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                      class="filter-item"
                      v-model="listQuery.startDateTime"
                      type="datetime"
                      placeholder="创建开始时间">
      </el-date-picker>
      <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                      class="filter-item"
                      v-model="listQuery.endDateTime"
                      type="datetime"
                      placeholder="创建结束时间">
      </el-date-picker>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">
        查询
      </el-button>
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
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="总金额" align="center">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column label="总结算金额" align="center">
        <template slot-scope="scope">
          {{ scope.row.settleAmount }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <!--<el-button type="text" @click="$router.push({ path: '/nursing/query/bill_detail/' + scope.row.id})">查看明细-->
          <!--</el-button>-->
          <!--<el-button type="text" @click="print(scope.row,'80')">打印80-->
          <!--</el-button>-->
          <el-button type="text" @click="print(scope.row,'a4')">打印A4
          </el-button>
          <el-button type="text" @click="deleteEle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList,deleteEle,exportExcel} from '@/api/nursing/nursingSettle'
  import Pagination from '@/components/Pagination'

  export default {
    components: {
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
          code: '',
          startDateTime:'',
          endDateTime:''
        },
        list: [],
        total: 0,
        listLoading: false,
        baseApi: process.env.BASE_API
      }
    },
    mounted() {
      this.getList()
    },
    computed: {
    },
    methods: {
      exportExcel(){
        this.listLoading = true
        exportExcel(this.listQuery).then(res => {
        }).finally(() => this.listLoading = false)
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
      print(row, type) {
        let firstUrl = window.location.pathname.split('/')[1]
        document.getElementById("print_iframe").src = this.baseApi + '/api/print/nursing_settle?tnId=' + firstUrl + '&code=' + row.code + '&type=' + type
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
