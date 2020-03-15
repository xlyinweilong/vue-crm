<template>
  <div class="app-container">
    <div class="filter-container">
      <!--<el-input placeholder="货号" clearable v-model.trim="listQuery.goodsCode" style="width: 150px;" class="filter-item"-->
                <!--@keyup.enter.native="getList"/>-->
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
      <el-table-column label="运单" align="center">
        <template slot-scope="scope">
          {{ scope.row.waybillId }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.statusMean }}
        </template>
      </el-table-column>
      <el-table-column label="快递" align="center">
        <template slot-scope="scope">
          {{ scope.row.deliveryId }}
        </template>
      </el-table-column>
      <el-table-column label="发货人" align="center">
        <template slot-scope="scope">
          {{scope.row.senderLocationSender}}
        </template>
      </el-table-column>
      <el-table-column label="发货电话" align="center">
        <template slot-scope="scope">
          {{ scope.row.senderLocationMobile }}
        </template>
      </el-table-column>
      <el-table-column label="发货地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.senderLocationProvinceName }} - {{ scope.row.senderLocationCityName }} - {{ scope.row.senderLocationStationName }}
          {{ scope.row.senderLocationAddress }}
        </template>
      </el-table-column>
      <el-table-column label="收货人" align="center">
        <template slot-scope="scope">
          {{scope.row.locationReceiver}}l
        </template>
      </el-table-column>
      <el-table-column label="收货电话" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationMobile }}
        </template>
      </el-table-column>
      <el-table-column label="收货地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationProvinceName }} - {{ scope.row.locationCityName }} - {{ scope.row.locationStationName }}
          {{ scope.row.locationAddress }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="260">>
        <template slot-scope="scope">
          <el-button type="text" @click="cancelOrder(scope.row)">取消运单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList,cancelOrder} from '@/api/shop/business/pack/pack'
  import Pagination from '@/components/Pagination'


  export default {
    components: {
      Pagination,
    },
    filters: {},
    directives: {},
    data() {
      return {
        listQuery: {
          pageIndex: 1,
          pageSize: 10
        },
        list: [],
        total: 0,
        listLoading: false
      }
    },
    created() {
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
        }).finally(() => this.listLoading = false)
      },
      cancelOrder(row){
        this.$confirm('取消运单不能恢复，确定要取消运单吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          cancelOrder({id: row.id}).then(() => {
            this.$message({type: 'success', message: '操作成功!'})
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
