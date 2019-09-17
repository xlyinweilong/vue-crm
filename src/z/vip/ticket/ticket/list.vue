<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="deleteElement" :disabled="listLoading || selectedIds.length == 0">删除</el-button>-->
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
      <el-table-column label="起用时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.startTime }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.endTime }}
        </template>
      </el-table-column>
      <el-table-column label="领取后多少天内有效" align="center">
        <template slot-scope="scope">
          {{ scope.row.fixedTerm }}
        </template>
      </el-table-column>
      <el-table-column label="领取后多少天开始生效" align="center">
        <template slot-scope="scope">
          {{ scope.row.fixedBeginTerm }}
        </template>
      </el-table-column>
      <el-table-column label="指定用户领取" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.bindOpenid" type="success">是</el-tag>
          <el-tag v-if="!scope.row.bindOpenid" type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审核" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isChecked == 0 && !scope.row.isPush" type="primary">未推送</el-tag>
          <el-tag v-if="scope.row.isChecked == 0 && scope.row.isPush" type="primary">审核中</el-tag>
          <el-tag v-if="scope.row.isChecked == 1" type="success">审核通过</el-tag>
          <el-tag v-if="scope.row.isChecked == -1" type="danger">审核失败</el-tag>
          <span v-if="scope.row.isChecked == -1">{{scope.row.refuseReason}}</span>
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center"  fixed="right">
        <template slot-scope="scope">
          <!--<el-button type="primary" :disabled="scope.row.isPush" plain icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>-->
          <el-button type="text" :disabled="scope.row.isPush" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="推送" align="center"  fixed="right">
        <template slot-scope="scope">
          <!--<el-button type="danger" :disabled="scope.row.isPush"  plain icon="el-icon-sell" @click="pushToWeChart(scope.row)">推送</el-button>-->
          <el-button type="text" :disabled="scope.row.isPush"  @click="pushToWeChart(scope.row)">推送</el-button>
        </template>
      </el-table-column>
      <el-table-column label="投放二维码" align="center"  fixed="right">
        <template slot-scope="scope">
          <!--<el-button type="danger" :disabled="scope.row.isChecked != 1"  plain icon="el-icon-full-screen" @click="createQrCode(scope.row)">二维码</el-button>-->
          <el-button type="text" :disabled="scope.row.isChecked != 1"  @click="createQrCode(scope.row)">二维码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <saveEle ref="saveEle" @getList="getList"/>
    <qrCode ref="qrCode"/>
  </div>
</template>

<script>
  import {getList,pushToWeChart,createQrCode,deleteEle} from '@/api/vip/ticket/ticket'
  import saveEle from './save'
  import qrCode from './qrCode'
  import Pagination from '@/components/Pagination'

  export default {
    components: {saveEle, Pagination,qrCode},
    filters: {},
    directives: {},
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        selectedIds: [],
        listQuery: {
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
      pushToWeChart(row){
        this.$confirm('确定要推送到腾讯吗?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          pushToWeChart({id: row.id}).then(response => {
            this.$message({message: response.message, type: 'success'});
            this.getList()
          })
        })
      },
      createQrCode(row){
        this.$refs.qrCode.onOpen(row)
      },
      //删除
      deleteElement() {
        this.$confirm('确定要删除选中的数据吗?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
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
