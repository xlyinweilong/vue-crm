<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete"
                 @click="deleteElement" :disabled="listLoading || selectedIds.length == 0">删除
      </el-button>
    </div>
    <div class="filter-container">
      <el-input placeholder="编号" clearable v-model.trim="listQuery.code" style="width: 200px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-input placeholder="名称" clearable v-model.trim="listQuery.title" style="width: 200px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-select class="filter-item" style="width: 100px;" v-model="listQuery.cardType" clearable placeholder="类型">
        <el-option key="CASH" label="代金券" value="CASH"/>
        <el-option key="DISCOUNT" label="折扣券" value="DISCOUNT"/>
        <el-option key="GIFT" label="兑换券" value="GIFT"/>
        <el-option key="GROUPON" label="团购券" value="GROUPON"/>
      </el-select>
      <el-select class="filter-item" style="width: 100px;" v-model="listQuery.disabled" clearable placeholder="删除">
        <el-option key="false" label="未删除" :value="false"/>
        <el-option key="true" label="已删除" :value="true"/>
      </el-select>
      <el-select class="filter-item" style="width: 100px;" v-model="listQuery.unUse" clearable placeholder="过期">
        <el-option key="false" label="正在用" :value="false"/>
        <el-option key="true" label="已过期" :value="true"/>
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
      @selection-change="selectionChange"
      fit
      border
    >
      <el-table-column type="selection" width="35"/>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.cardType === 'CASH'" type="success">代金券</el-tag>
          <el-tag v-if="scope.row.cardType === 'DISCOUNT'" type="danger">折扣券</el-tag>
          <el-tag v-if="scope.row.cardType === 'GIFT'" type="warning">兑换券</el-tag>
          <el-tag v-if="scope.row.cardType === 'GROUPON'" type="info">团购券</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="库存数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.quantity }}
        </template>
      </el-table-column>
      <el-table-column label="已领取数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.receiveQuantity }}
        </template>
      </el-table-column>
      <el-table-column label="每人限制领取数" align="center">
        <template slot-scope="scope">
          {{ scope.row.getLimit }}
        </template>
      </el-table-column>
      <el-table-column label="起用时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.dateInfoType == 'DATE_TYPE_FIX_TIME_RANGE'">{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.dateInfoType == 'DATE_TYPE_FIX_TIME_RANGE'">{{ scope.row.endTime }}</span>
          <span v-if="scope.row.dateInfoType == 'DATE_TYPE_FIX_TERM'">{{ scope.row.fixedEndTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取后多少天内有效" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.dateInfoType == 'DATE_TYPE_FIX_TERM'">{{ scope.row.fixedTerm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取后多少天开始生效" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.dateInfoType == 'DATE_TYPE_FIX_TERM'">{{ scope.row.fixedBeginTerm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="指定用户领取" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.bindOpenid" type="success">是</el-tag>
          <el-tag v-if="!scope.row.bindOpenid" type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="上券架" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.onShelf" type="success">上</el-tag>
          <el-tag v-if="!scope.row.onShelf">下</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="生日劵" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isBirthday" type="success">是</el-tag>
          <el-tag v-if="!scope.row.isBirthday">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="支付可见" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.needPay" type="success">是</el-tag>
          <el-tag v-if="!scope.row.needPay">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="满额送" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.consumeGive" type="success">是</el-tag>
          <el-tag v-if="!scope.row.consumeGive">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="已删除" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.disabled" type="success">是</el-tag>
          <el-tag v-if="!scope.row.disabled">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审核" align="center" min-width="100px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isChecked == 0 && !scope.row.isPush" type="primary">未推送</el-tag>
          <el-tag v-if="scope.row.isChecked == 0 && scope.row.isPush" type="primary">审核中</el-tag>
          <el-tag v-if="scope.row.isChecked == 1" type="success">审核通过</el-tag>
          <el-tag v-if="scope.row.isChecked == -1" type="danger">审核失败</el-tag>
          <span v-if="scope.row.isChecked == -1">{{scope.row.refuseReason}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.disabled" type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button v-if="!scope.row.disabled" type="text" :disabled="scope.row.isPush" @click="pushToWeChart(scope.row)">推送</el-button>
          <el-button v-if="!scope.row.disabled" type="text" :disabled="scope.row.isChecked != 1" @click="setOnShelf(scope.row)"
                     v-text="scope.row.onShelf ? '下架' :'上架'"></el-button>
          <el-button v-if="!scope.row.disabled" type="text" :disabled="scope.row.isChecked == 0" @click="setBirthday(scope.row)">生日劵</el-button>
          <el-button v-if="!scope.row.disabled" type="text" :disabled="scope.row.isChecked == 0" @click="setNeedPay(scope.row)">支付劵</el-button>
          <el-button v-if="!scope.row.disabled" type="text" :disabled="scope.row.isChecked == 0" @click="setConsumeGive(scope.row)">满额送</el-button>
        </template>
      </el-table-column>
      <el-table-column label="投放二维码" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.disabled" type="text" :disabled="scope.row.isChecked != 1" @click="createQrCode(scope.row)">二维码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <saveEle ref="saveEle" @getList="getList"/>
    <qrCode ref="qrCode"/>
    <birthday ref="birthday" @getList="getList"/>
    <need-pay ref="needPay" @getList="getList"/>
    <on-shelf ref="onShelf" @getList="getList"/>
    <consume-give ref="consumeGive" @getList="getList"/>
  </div>
</template>

<script>
    import {getList, pushToWeChart, createQrCode, deleteEle, upShelf} from '@/api/vip/ticket/ticket'
    import saveEle from './save'
    import qrCode from './qrCode'
    import birthday from './birthday'
    import Pagination from '@/components/Pagination'
    import NeedPay from "./needPay";
    import OnShelf from "./onShelf";
    import ConsumeGive from "./consumeGive";

    export default {
        components: {ConsumeGive, OnShelf, NeedPay, saveEle, Pagination, qrCode, birthday},
        filters: {},
        directives: {},
        data() {
            return {
                list: [],
                total: 0,
                listLoading: false,
                selectedIds: [],
                listQuery: {
                    code: '',
                    title: '',
                    cardType: '',
                    disabled: false,
                    unUse: false,
                    pageIndex: 1,
                    pageSize: 10
                }
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            add() {
                this.$refs.saveEle.onOpen({id: ''})
            },
            edit(row) {
                this.$refs.saveEle.onOpen(row)
            },
            setBirthday(row) {
                this.$refs.birthday.onOpen(row)
            },
            setNeedPay(row) {
                this.$refs.needPay.onOpen(row)
            },
            setOnShelf(row) {
                this.$refs.onShelf.onOpen(row)
            },
            setConsumeGive(row){
                this.$refs.consumeGive.onOpen(row)
            },
            getList() {
                this.listLoading = true
                getList(this.listQuery).then(res => {
                    this.list = res.data.content
                    this.total = res.data.totalElements
                }).finally(() => this.listLoading = false)
            },
            //选择
            selectionChange(val) {
                this.selectedIds = val
            },
            pushToWeChart(row) {
                this.$confirm('确定要推送到腾讯吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    pushToWeChart({id: row.id}).then(response => {
                        this.$message({message: response.message, type: 'success'});
                        this.getList()
                    })
                })
            },
            createQrCode(row) {
                this.$refs.qrCode.onOpen(row)
            },
            //删除
            deleteElement() {
                this.$confirm('没有推送的数据会直接删除;已经推送的数据会永久删除微信服务器的券,crm中券会标记已删除,已经领取的劵还能继续使用,确定要删除选中的数据吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteEle({ids: this.selectedIds.map(s => s.id)}).then(response => {
                        this.$message({message: response.message, type: 'success'});
                        this.getList()
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>
