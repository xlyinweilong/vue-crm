<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="用户默认手机" clearable v-model.trim="listQuery.mobile" style="width: 200px;"
                class="filter-item" @keyup.enter.native="getList"/>
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
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.userNickName }}
        </template>
      </el-table-column>
      <el-table-column label="用户手机" align="center">
        <template slot-scope="scope">
          {{ scope.row.userMobile }}
        </template>
      </el-table-column>
      <el-table-column label="焕新币" align="center">
        <template slot-scope="scope">
          {{ scope.row.washingAmount }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          {{ scope.row.operation }}
        </template>
      </el-table-column>
      <el-table-column label="单据编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.billCode }}
        </template>
      </el-table-column>
      <el-table-column label="充值单号" align="center">
        <template slot-scope="scope">
          {{ scope.row.rechargeCode }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
    import {getList} from '@/api/nursing/nursingBalanceLog'
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
                    mobile: '',
                    operationList:[]
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
            }
        }
    }
</script>

<style scoped>

</style>
