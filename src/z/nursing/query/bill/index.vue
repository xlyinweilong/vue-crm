<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="编号" clearable v-model.trim="listQuery.code" style="width: 200px;"
                class="filter-item" @keyup.enter.native="getList"/>
      <el-input placeholder="客户手机号" clearable v-model.trim="listQuery.customerMobile" style="width: 200px;"
                class="filter-item" @keyup.enter.native="getList"/>
      <el-select class="filter-item" v-model="listQuery.statuss" multiple collapse-tags placeholder="请选择状态">
        <el-option key="INIT" label="店员创建" value="INIT"/>
        <el-option key="WASHING" label="洗衣坊取走" value="WASHING"/>
        <el-option key="PROBLEM" label="洗衣坊提出问题" value="PROBLEM"/>
        <el-option key="PROBLEM_REFUSE" label="客户拒绝" value="PROBLEM_REFUSE"/>
        <el-option key="PROBLEM_AGREE" label="客户同意" value="PROBLEM_AGREE"/>
        <el-option key="FINISHED_PROBLEM" label="拒绝单取走" value="FINISHED_PROBLEM"/>
        <el-option key="SETTLED" label="已经结算" value="SETTLED"/>
        <el-option key="FINISHED" label="客户取走" value="FINISHED"/>
        <el-option key="IN_CHANNEL" label="等待客户取走" value="IN_CHANNEL"/>
        <el-option key="DELETED" label="已经删除" value="DELETED"/>
      </el-select>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">
        查询
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
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status == 'INIT'">店员创建</el-tag>
          <el-tag v-if="scope.row.status == 'WASHING'" type="success">洗衣坊取走</el-tag>
          <el-tag v-if="scope.row.status == 'PROBLEM'" type="danger">洗衣坊提出问题</el-tag>
          <el-tag v-if="scope.row.status == 'PROBLEM_REFUSE'" type="danger">客户拒绝</el-tag>
          <el-tag v-if="scope.row.status == 'PROBLEM_AGREE'" type="warning">客户同意</el-tag>
          <el-tag v-if="scope.row.status == 'FINISHED_PROBLEM'" type="danger">拒绝单取走</el-tag>
          <el-tag v-if="scope.row.status == 'SETTLED'" type="success">已经结算</el-tag>
          <el-tag v-if="scope.row.status == 'FINISHED'" type="success">客户取走</el-tag>
          <el-tag v-if="scope.row.status == 'IN_CHANNEL'" type="success">等待客户取走</el-tag>
          <el-tag v-if="scope.row.status == 'DELETED'" type="danger">已经删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="店铺" align="center">
        <template slot-scope="scope">
          {{ scope.row.channelAliasNameAndName }}
        </template>
      </el-table-column>
      <el-table-column label="创建员工编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.createEmployCode }}
        </template>
      </el-table-column>
      <el-table-column label="创建员工姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.createEmployName }}
        </template>
      </el-table-column>
      <el-table-column label="客户电话" align="center">
        <template slot-scope="scope">
          {{ scope.row.customerUserMobile }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="$router.push({ path: '/nursing/query/bill_detail/' + scope.row.id})">查看明细
          </el-button>
          <el-button type="text" @click="print(scope.row)">打印86
          </el-button>
          <el-button type="text" @click="print(scope.row)">打印A4
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
    import {getList, deleteEle} from '@/api/nursing/nursing'
    import Pagination from '@/components/Pagination'
    import PrintJs from 'print-js'
    import {getToken} from '@/utils/auth'

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
                    statuss: ['INIT', 'WASHING', 'IN_CHANNEL', 'FINISHED', 'SETTLED', 'PROBLEM', 'PROBLEM_REFUSE', 'PROBLEM_AGREE', 'FINISHED_PROBLEM'],
                    customerMobile: ''
                },
                list: [],
                total: 0,
                listLoading: false,
                baseApi: process.env.BASE_API,
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
            },
            print(row) {
                let firstUrl = window.location.pathname.split('/')[1]
                PrintJs({
                    printable: this.baseApi + '/api/print/nursing_bill?tnId=' + firstUrl + '&code=' + row.code,
                    type: 'pdf',
                    header: '收银',
                    maxWidth: 800,
                    headerStyle: 'font-weight: 300;',
                    targetStyles: ['*']
                })
            }
        }
    }
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
