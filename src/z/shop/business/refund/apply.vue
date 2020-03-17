<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select :loading="listLoading" class="filter-item" v-model="listQuery.status" clearable placeholder="请选择状态">
        <el-option key="APPLY" label="待审核" value="APPLY"/>
        <el-option key="PENDING_PACKAGE" label="待打包" value="PENDING_PACKAGE"/>
      </el-select>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">查询</el-button>
    </div>
    <div class="filter-container">
      <el-button :loading="listLoading" :disabled="selection.length == 0" class="filter-item" type="warning" icon="el-icon-check" @click="dialogVisible = true">审核</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
      @selection-change="handleSelectionChange"
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
      <el-table-column
        type="selection"
        width="55">
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
      <el-table-column label="操作" align="center" fixed="right" width="140">>
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 'PENDING_PACKAGE'" type="text" @click="showChangeInfo(scope.row)">修改发货</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>
    <changeInfo ref="changeInfo" @getList="getList"/>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="550px">
      <span v-loading="loading">确定审核选中数据的结果</span>
      <span slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="dialogVisible = false">关闭</el-button>
        <el-button :loading="loading" type="primary" @click="checkRefundOrder">审核通过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getList, checkPackage} from '@/api/shop/business/refund/refund'
  import Pagination from '@/components/Pagination'
  import changeInfo from './changeInfo'

  export default {
    components: {
      Pagination,changeInfo
    },
    filters: {},
    directives: {},
    data() {
      return {
        loading: false,
        dialogVisible: false,
        total: 0,
        listQuery: {
          status: 'APPLY',
          pageIndex: 1,
          pageSize: 10,
          origin: 'USER'
        },
        list: [],
        listLoading: false,
        selection: []
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      showChangeInfo(row){
        this.$refs.changeInfo.onOpen(row)
      },
      handleSelectionChange(val) {
        this.selection = val
      },
      checkRefundOrder() {
        this.loading = true
        checkPackage({ids: this.selection.map(s => s.id)}).then(res => {
          this.dialogVisible = false
          this.$message({type: 'success', message: '操作成功!'})
          this.getList()
        }).finally(() => this.loading = false)
      },
      init() {
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.selection = []
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      }
    }
  }
</script>

<style scoped>

</style>
