<template>
  <div class="app-container">
    <div v-loading="loading">
      <el-card class="box-card">
        <el-row :gutter="20">
          <el-col :span="6">创建时间：{{ele.createDate }}</el-col>
          <el-col :span="6">类型：
            <el-tag v-if="ele.cardType === 'CASH'" type="success">代金券</el-tag>
            <el-tag v-if="ele.cardType === 'DISCOUNT'" type="danger">折扣券</el-tag>
            <el-tag v-if="ele.cardType === 'GIFT'" type="warning">兑换券</el-tag>
            <el-tag v-if="ele.cardType === 'GROUPON'" type="info">团购券</el-tag>
          </el-col>
          <el-col :span="6">编号： {{ele.code }}</el-col>
          <el-col :span="6">名称： {{ele.title }}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">库存数量：{{ele.quantity }}</el-col>
          <el-col :span="6">已领取数量：{{ele.receiveQuantity }}</el-col>
          <el-col :span="6">每人限制领取数： {{ele.getLimit }}</el-col>
          <el-col :span="6">上券架：
            <el-tag v-if="ele.onShelf" type="success">上</el-tag>
            <el-tag v-if="!ele.onShelf">下</el-tag>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-if="ele.dateInfoType == 'DATE_TYPE_FIX_TIME_RANGE'" :span="6">起用时间：{{ele.startTime }}</el-col>
          <el-col :span="6">结束时间：
            <span v-if="ele.dateInfoType == 'DATE_TYPE_FIX_TIME_RANGE'">{{ ele.endTime }}</span>
            <span v-if="ele.dateInfoType == 'DATE_TYPE_FIX_TERM'">{{ ele.fixedEndTime }}</span>
          </el-col>
          <el-col v-if="ele.dateInfoType == 'DATE_TYPE_FIX_TERM'" :span="6">领取后多少天内有效： {{ ele.fixedTerm }}</el-col>
          <el-col v-if="ele.dateInfoType == 'DATE_TYPE_FIX_TERM'" :span="6">领取后多少天开始生效：
            {{ ele.fixedBeginTerm }}
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">生日劵：
            <el-tag v-if="ele.isBirthday" type="success">是</el-tag>
            <el-tag v-if="!ele.isBirthday">否</el-tag>
          </el-col>
          <el-col :span="6">支付可见：
            <el-tag v-if="ele.needPay" type="success">是</el-tag>
            <el-tag v-if="!ele.needPay">否</el-tag>
          </el-col>
          <el-col v-if="ele.dateInfoType == 'DATE_TYPE_FIX_TERM'" :span="6">满额送：
            <el-tag v-if="ele.consumeGive" type="success">是</el-tag>
            <el-tag v-if="!ele.consumeGive">否</el-tag>
          </el-col>
          <el-col v-if="ele.dateInfoType == 'DATE_TYPE_FIX_TERM'" :span="6">已删除：
            <el-tag v-if="ele.disabled" type="success">是</el-tag>
            <el-tag v-if="!ele.disabled">否</el-tag>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">生日劵：
            <el-tag v-if="ele.isChecked == 0 && !ele.isPush" type="primary">未推送</el-tag>
            <el-tag v-if="ele.isChecked == 0 && ele.isPush" type="primary">审核中</el-tag>
            <el-tag v-if="ele.isChecked == 1" type="success">审核通过</el-tag>
            <el-tag v-if="ele.isChecked == -1" type="danger">审核失败</el-tag>
            <span v-if="ele.isChecked == -1">{{ele.refuseReason}}</span></el-col>
        </el-row>
      </el-card>
      <el-card class="box-card" style="margin-top: 10px">
        <div class="filter-container">
          <el-date-picker class="filter-item" value-format="yyyy-MM-dd" clearable v-model="listQuery.startCreateDate" type="date" placeholder="领取开始日期"/>
          <el-date-picker class="filter-item" value-format="yyyy-MM-dd" clearable v-model="listQuery.endCreateDate" type="date" placeholder="领取结束日期"/>
          <!--<el-select class="filter-item" style="width: 100px;" v-model="listQuery.checked" clearable placeholder="核销">-->
          <!--<el-option key="false" label="已核销" :value="true"/>-->
          <!--<el-option key="true" label="未核销" :value="false"/>-->
          <!--</el-select>-->
          <!--<el-select class="filter-item" style="width: 100px;" v-model="listQuery.refunded" clearable placeholder="退款">-->
          <!--<el-option key="false" label="已退款" :value="true"/>-->
          <!--<el-option key="true" label="未退款" :value="false"/>-->
          <!--</el-select>-->
          <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="search">
            查询
          </el-button>
          <el-button :disabled="payTotal==0" :loading="listLoading" class="filter-item" icon="el-icon-download" type="warning" plain @click="exportExcel">导出支付明细</el-button>
          <!--<el-input placeholder="失效卷号" clearable v-model.trim="invalidCode" style="width: 200px;" class="filter-item"/>-->
          <!--<el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="doInvalid">-->
            <!--失效-->
          <!--</el-button>-->
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div style="text-align:center;width: 100%;padding-top: 15px;padding-bottom: 15px;color: #ffffff;background-color: #67C23A">券总张数：{{total}}张</div>
          </el-col>
          <el-col :span="12">
            <div style="text-align:center;width: 100%;padding-top: 15px;padding-bottom: 15px;color: #ffffff;background-color: #F56C6C">券已退款张数：{{refundDetailTotal}}张</div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 8px">
          <el-col :span="12">
            <div style="text-align:center;width: 100%;padding-top: 15px;padding-bottom: 15px;color: #ffffff;background-color: #67C23A">支付总金额：{{totalPayEle.success}}元</div>
          </el-col>
          <el-col :span="12">
            <div style="text-align:center;width: 100%;padding-top: 15px;padding-bottom: 15px;color: #ffffff;background-color: #F56C6C">支付总退款：{{totalPayEle.refund}}元</div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 8px">
          <el-col :span="12">
            <div style="text-align:center;width: 100%;padding-top: 15px;padding-bottom: 15px;color: #ffffff;background-color: #67C23A">支付成功数：{{payTotal}}次</div>
          </el-col>
          <el-col :span="12">
            <div style="text-align:center;width: 100%;padding-top: 15px;padding-bottom: 15px;color: #ffffff;background-color: #F56C6C">支付退款数：{{refundTotal}}次</div>
          </el-col>
        </el-row>

        <el-tabs type="border-card" style="margin-top: 8px">
          <el-tab-pane label="券明细">
            <el-table
              v-loading="listLoading"
              :data="list"
              tooltip-effect="dark"
              style="width: 100%;margin-top: 8px"
              highlight-current-row
              fit
              border
            >
              <el-table-column label="领取时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.createDate }}
                </template>
              </el-table-column>
              <el-table-column label="编号" align="center">
                <template slot-scope="scope">
                  {{ scope.row.userCardCode }}
                </template>
              </el-table-column>
              <el-table-column label="核销单号" align="center">
                <template slot-scope="scope">
                  {{ scope.row.posCode }}
                </template>
              </el-table-column>
              <el-table-column label="领取昵称" align="center">
                <template slot-scope="scope">
                  {{ scope.row.userNickName }}
                </template>
              </el-table-column>
              <el-table-column label="券金额" align="center">
                <template slot-scope="scope">
                  {{ scope.row.amount }}
                </template>
              </el-table-column>
              <el-table-column label="核销时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.checkedDate }}
                </template>
              </el-table-column>
              <el-table-column label="有效开始时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.startDate }}
                </template>
              </el-table-column>
              <el-table-column label="有效结束时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.endDate }}
                </template>
              </el-table-column>
            </el-table>
            <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                        :limit.sync="listQuery.pageSize" @pagination="getList"/>
          </el-tab-pane>
          <el-tab-pane label="被退券明细">
            <el-table
              v-loading="listRefundLoading"
              :data="refundDetailList"
              tooltip-effect="dark"
              style="width: 100%;margin-top: 8px"
              highlight-current-row
              fit
              border
            >
              <el-table-column label="退款时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.refundDate }}
                </template>
              </el-table-column>
              <el-table-column label="编号" align="center">
                <template slot-scope="scope">
                  {{ scope.row.userCardCode }}
                </template>
              </el-table-column>
              <el-table-column label="退款流水号" align="center">
                <template slot-scope="scope">
                  {{ scope.row.refundCode }}
                </template>
              </el-table-column>
              <el-table-column label="领取昵称" align="center">
                <template slot-scope="scope">
                  {{ scope.row.userNickName }}
                </template>
              </el-table-column>
              <el-table-column label="券金额" align="center">
                <template slot-scope="scope">
                  {{ scope.row.amount }}
                </template>
              </el-table-column>
              <el-table-column label="核销时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.checkedDate }}
                </template>
              </el-table-column>
              <el-table-column label="有效开始时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.startDate }}
                </template>
              </el-table-column>
              <el-table-column label="有效结束时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.endDate }}
                </template>
              </el-table-column>
            </el-table>
            <pagination v-show="refundDetailTotal>0 && !listRefundLoading" :total="refundDetailTotal" :page.sync="listRefundDetailQuery.pageIndex"
                        :limit.sync="listRefundDetailQuery.pageSize" @pagination="getRefundList"/>
          </el-tab-pane>
          <el-tab-pane label="支付信息">
            <el-table
              v-loading="listLoadingPay"
              :data="payList"
              tooltip-effect="dark"
              style="width: 100%;margin-top: 8px"
              highlight-current-row
              fit
              border
            >
              <el-table-column label="时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.createDate }}
                </template>
              </el-table-column>
              <el-table-column label="流水号" align="center">
                <template slot-scope="scope">
                  {{ scope.row.code }}
                </template>
              </el-table-column>
              <el-table-column label="内容" align="center">
                <template slot-scope="scope">
                  {{ scope.row.payBody }}
                </template>
              </el-table-column>
              <el-table-column label="金额" align="center">
                <template slot-scope="scope">
                  {{ scope.row.amount }}
                </template>
              </el-table-column>
              <el-table-column label="昵称" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.user != null">{{ scope.row.user.nickName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="会员默认手机号" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.user != null">{{ scope.row.user.defaultVipMobile }}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination v-show="payTotal>0 && !listLoadingPay" :total="payTotal" :page.sync="listQueryPay.pageIndex"
                        :limit.sync="listQueryPay.pageSize" @pagination="payGetList"/>
          </el-tab-pane>
          <el-tab-pane label="退款信息">
            <el-table
              v-loading="listLoadingRefund"
              :data="refundList"
              tooltip-effect="dark"
              style="width: 100%;margin-top: 8px"
              highlight-current-row
              fit
              border
            >
              <el-table-column label="时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.refundDate }}
                </template>
              </el-table-column>
              <el-table-column label="流水号" align="center">
                <template slot-scope="scope">
                  {{ scope.row.refundCode }}
                </template>
              </el-table-column>
              <el-table-column label="原支付流水号" align="center">
                <template slot-scope="scope">
                  {{ scope.row.code }}
                </template>
              </el-table-column>
              <el-table-column label="退款金额" align="center">
                <template slot-scope="scope">
                  {{ scope.row.refundAmount }}
                </template>
              </el-table-column>
              <el-table-column label="昵称" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.user != null">{{ scope.row.user.nickName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="会员默认手机号" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.user != null">{{ scope.row.user.defaultVipMobile }}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination v-show="refundTotal>0 && !listLoadingRefund" :total="refundTotal" :page.sync="listQueryRefund.pageIndex"
                        :limit.sync="listQueryRefund.pageSize" @pagination="payRefundList"/>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {info} from '@/api/vip/ticket/ticket'
  import {getList, totalAll} from '@/api/vip/ticket/ticketDetail'
  import {postList as payGetList, totalAll as payTotalAll, invalid,exportExcel} from '@/api/vip/ticket/payOrder'
  import Pagination from '@/components/Pagination'

  export default {
    components: {
      Pagination
    },
    filters: {},
    directives: {},
    data() {
      return {
        list: [],
        ele: {},
        total: 0,
        loading: false,
        listLoading: false,
        listQuery: {
          startCreateDate: '',
          endCreateDate: '',
          ticketId: '',
          pageIndex: 1,
          pageSize: 10
        },
        listQueryPay: {
          startDate: '',
          endDate: '',
          ticketId: '',
          pageIndex: 1,
          pageSize: 10,
          statusList: ['SUCCESS', 'REFUND']
        },
        totalEle: {},
        listLoadingPay: false,
        payList: [],
        payTotal: 0,
        totalPayEle: {
          success: 0,
          refund: 0
        },
        listQueryRefund: {
          refundStartDate: '',
          refundEndDate: '',
          ticketId: '',
          pageIndex: 1,
          pageSize: 10,
          statusList: ['REFUND']
        },
        listLoadingRefund: false,
        refundList: [],
        refundTotal: 0,
        listRefundLoading: false,
        listRefundDetailQuery: {
          refunded: true,
          startRefundDate: '',
          endRefundDate: '',
          ticketId: '',
          pageIndex: 1,
          pageSize: 10
        },
        refundDetailList: [],
        refundDetailTotal: 0,
        invalidCode: ''
      }
    },
    created() {
      const id = this.$route.params && this.$route.params.id
      // if (sessionStorage.ticket_detail_listQuery != null) {
      //   this.listQuery = JSON.parse(sessionStorage.ticket_detail_listQuery)
      // }
      this.info(id)
    },
    mounted() {

    },
    methods: {
      exportExcel() {
        this.listLoading = true
        exportExcel(this.listQueryPay).then(res => {
        }).finally(() => this.listLoading = false)
      },
      doInvalid() {
        if (this.invalidCode != '') {
          this.$confirm('确定要失效这张卡卷吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            invalid({cardCode: this.invalidCode}).then(response => {
              this.$message({message: response.message, type: 'success'});
            })
          })
        }
      },
      info(id) {
        this.loading = true
        info({id: id}).then(res => {
          this.ele = res.data
          this.listQuery.ticketId = id
          this.listQueryPay.ticketId = id
          this.listQueryRefund.ticketId = id
          this.listRefundDetailQuery.ticketId = id
          this.search()
        }).finally(() => this.loading = false)
      },
      search() {
        this.listQuery.pageIndex = 1
        this.listQueryPay.pageIndex = 1
        this.payTotalAll()
        this.totalRefund()
        this.getList()
        this.getRefundList()
        this.payGetList()
        this.payRefundList()
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      },
      getRefundList() {
        this.listRefundLoading = true
        this.listRefundDetailQuery.startRefundDate = this.listQuery.startCreateDate
        this.listRefundDetailQuery.endRefundDate = this.listQuery.endCreateDate
        getList(this.listRefundDetailQuery).then(res => {
          this.refundDetailList = res.data.content
          this.refundDetailTotal = res.data.totalElements
        }).finally(() => this.listRefundLoading = false)
      },
      payGetList() {
        this.listLoadingPay = true
        this.listQueryPay.startDate = this.listQuery.startCreateDate
        this.listQueryPay.endDate = this.listQuery.endCreateDate
        payGetList(this.listQueryPay).then(res => {
          this.payList = res.data.content
          this.payTotal = res.data.totalElements
        }).finally(() => this.listLoadingPay = false)
      },
      payRefundList() {
        this.listLoadingRefund = true
        this.listQueryRefund.refundStartDate = this.listQuery.startCreateDate
        this.listQueryRefund.refundEndDate = this.listQuery.endCreateDate
        payGetList(this.listQueryRefund).then(res => {
          this.refundList = res.data.content
          this.refundTotal = res.data.totalElements
        }).finally(() => this.listLoadingRefund = false)
      },
      payTotalAll() {
        this.listQueryPay.startDate = this.listQuery.startCreateDate
        this.listQueryPay.endDate = this.listQuery.endCreateDate
        payTotalAll(this.listQueryPay).then(res => {
          this.totalPayEle.success = res.data == null ? 0 : res.data
        })
      },
      totalRefund() {
        this.listQueryRefund.refundStartDate = this.listQuery.startCreateDate
        this.listQueryRefund.refundEndDate = this.listQuery.endCreateDate
        payTotalAll(this.listQueryRefund).then(res => {
          this.totalPayEle.refund = res.data == null ? 0 : res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
