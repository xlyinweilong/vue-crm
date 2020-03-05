<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select :loading="listLoading" class="filter-item" v-model="listQuery.status" clearable placeholder="请选择状态">
        <el-option key="PACKED" label="待审核" value="PACKED"/>
        <el-option key="INIT" label="已退款" value="INIT"/>
      </el-select>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">查询</el-button>
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :data="props.row.goodsList"
            tooltip-effect="dark"
            style="width: 100%"
            fit
            border
          >
            <el-table-column label="货号" align="center">
              <template slot-scope="subScope">
                {{ subScope.row.goodsCode }}
              </template>
            </el-table-column>
            <el-table-column label="颜色" align="center">
              <template slot-scope="subScope">
                {{ subScope.row.colorName }}
              </template>
            </el-table-column>
            <el-table-column label="尺码" align="center">
              <template slot-scope="subScope">
                {{ subScope.row.sizeName }}
              </template>
            </el-table-column>
            <el-table-column label="数量" align="center">
              <template slot-scope="subScope">
                {{ subScope.row.refundQuantity }}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.statusMean }}
        </template>
      </el-table-column>
      <el-table-column label="取件时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.senderCreateTime }}
        </template>
      </el-table-column>
      <el-table-column label="发货人" align="center">
        <template slot-scope="scope">
          {{ scope.row.senderLocationSender }}
        </template>
      </el-table-column>
      <el-table-column label="发货人电话" align="center">
        <template slot-scope="scope">
          {{ scope.row.senderLocationMobile }}
        </template>
      </el-table-column>
      <el-table-column label="取件省份" align="center">
        <template slot-scope="scope">
          {{ scope.row.senderLocationProvinceName }}
        </template>
      </el-table-column>
      <el-table-column label="取件城市" align="center">
        <template slot-scope="scope">
          {{ scope.row.senderLocationCityName }}
        </template>
      </el-table-column>
      <el-table-column label="取件地区" align="center">
        <template slot-scope="scope">
          {{ scope.row.senderLocationStationName }}
        </template>
      </el-table-column>
      <el-table-column label="取件地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.senderLocationAddress }}
        </template>
      </el-table-column>
      <el-table-column label="退货数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.refundTotalQuantity }}
        </template>
      </el-table-column>
      <el-table-column label="包裹单号" align="center">
        <template slot-scope="scope">
          {{ scope.row.packageId }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 'PACKED'" type="text" @click="refund(scope.row)">退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList,checkRefundOrder} from '@/api/shop/business/refund/refund'
  import Pagination from '@/components/Pagination'

  export default {
    components: {
      Pagination
    },
    filters: {},
    directives: {},
    data() {
      return {
        loading: false,
        dialogVisible: false,
        total: 0,
        listQuery: {
          status: 'PACKED',
          pageIndex: 1,
          pageSize: 10,
          origin: 'USER'
        },
        list: [],
        listLoading: false
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      init() {
        this.getList()
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.selection = []
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      },
      refund(row){
        this.$confirm('确定已经收到快递了吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          checkRefundOrder({id:row.id}).then(res => {
            this.$message({message: '保存成功', type: 'success'})
            this.onClose()
            this.$emit("getList", {})
          }).finally(() => this.loading = false)
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped>

</style>
