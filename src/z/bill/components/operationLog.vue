<template>
  <div>
    <div class="filter-container">
      <el-input placeholder="货号" v-model.trim="listQuery.goodsCode" style="width: 200px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-button :loading="loading" class="filter-item" icon="el-icon-search" type="primary" @click="getList">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-download" @click="exportElement()" :loading="loading" :disabled="total ==  0">导出</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      fit
      border
    >
      <el-table-column label="货号" prop="goodsCode" align="center"/>
      <el-table-column label="颜色" prop="colorName" align="center"/>
      <el-table-column label="尺码" prop="sizeName" align="center"/>
      <el-table-column label="调出编号" prop="fromCode" align="center"/>
      <el-table-column label="调出名称" prop="fromName" align="center"/>
      <el-table-column label="调入编号" prop="targetCode" align="center"/>
      <el-table-column label="调入名称" prop="targetName" align="center"/>
      <el-table-column label="数量" prop="billCount" align="center"/>
    </el-table>
    <pagination v-show="total>0 && !loading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>

  </div>
</template>


<script>

  import {logList} from '@/api/bill/transfer'
  import Pagination from '@/components/Pagination'
  import {getToken} from '@/utils/auth'
  import {param, urlEncode} from '@/utils'

  export default {
    name: 'transfer_log',
    computed: {},
    components: {
      Pagination,
    },
    data() {
      return {
        loading: false,
        list: [],
        total: 0,
        listQuery: {
          parentId: '',
          pageIndex: 1,
          pageSize: 10,
          goodsCode: ''
        }
      };
    },
    props: {
      eleId: {default: ''}
    },
    methods: {
      init() {
        this.getList()
      },
      getList() {
        this.loading = true
        this.listQuery.parentId = this.eleId
        logList(this.listQuery).then((response) => {
          this.list = response.data.content
          this.total = response.data.totalElements
        }).finally(() => this.loading = false)
      },
      //导出
      exportElement() {
        window.open(process.env.BASE_API + "/api/transfer/export/" + this.eleId + "?token=" + getToken())
      }
    }
  }
</script>
