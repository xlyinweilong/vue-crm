<template>
  <div>
    <div class="filter-container">
      <el-input placeholder="货号" v-model.trim="listQuery.goodsCode" style="width: 200px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-input placeholder="渠道/仓库编号" v-model.trim="listQuery.code" style="width: 200px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-input placeholder="渠道/仓库名称" v-model.trim="listQuery.name" style="width: 200px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-button :loading="loading" class="filter-item" icon="el-icon-search" type="primary" @click="getList">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-download" @click="exportElement()" :loading="loading" :disabled="total ==  0">导出</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="warning" icon="el-icon-edit-outline" @click="createResult()" :loading="loading">生成结果</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="warning" icon="el-icon-share" @click="synchronization()" :loading="loading" :disabled="total ==  0">同步到BI</el-button>

    </div>
    <div class="filter-container" v-if="status != null && status.status == 'EXTRACTING'">
      <el-progress :percentage="status.progress"></el-progress>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      fit
      border
    >
      <el-table-column label="渠道/仓库编号" prop="code" align="center"/>
      <el-table-column label="渠道/仓库名称" prop="name" align="center"/>
      <el-table-column label="类型" prop="type" align="center"/>
      <el-table-column label="货号" prop="goodsCode" align="center"/>
      <el-table-column label="颜色" prop="colorName" align="center"/>
      <el-table-column label="尺码" prop="sizeName" align="center"/>
      <el-table-column label="库存" prop="stockCount" align="center"/>
    </el-table>
    <pagination v-show="total>0 && !loading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>

  </div>
</template>


<script>

  import {resultStockList, createResult, getResultStatus,synchronization} from '@/api/bill/transfer'
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
        },
        status: null
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
        resultStockList(this.listQuery).then(response => {
          this.list = response.data.content
          this.list.forEach(s => s.type = (s.type === 'warehouse' ? '仓库' : "渠道"))
          this.total = response.data.totalElements
        }).finally(() => this.loading = false)
      },
      //导出
      exportElement() {
        window.open(process.env.BASE_API + "/api/transfer_result/export/" + this.eleId + "?token=" + getToken())
      },
      createResult() {
        this.loading = true
        createResult({id: this.eleId}).then(response => {
          this.getStatus()
        }).catch(() => this.loading = false)
      },
      synchronization(){
        this.loading = true
        synchronization({id: this.eleId}).then(response => {
          this.getStatus()
        }).catch(() => this.loading = false)
      },
      getStatus() {
        getResultStatus({}).then(response => {
          this.status = response.data
          if (this.status != null) {
            if (this.status.status === 'EXTRACTING') {
              //加载中
              setTimeout(() => this.getStatus(), 1000)
            } else {
              this.$message({message: '执行成功', type: 'success'})
              this.getList()
            }
          }
        }).catch(() => this.loading = false)
      }
    }
  }
</script>
