<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="编号" clearable v-model.trim="listQuery.code" style="width: 200px;"
                class="filter-item" @keyup.enter.native="getList"/>
      <el-input placeholder="客户手机号" clearable v-model.trim="listQuery.customerMobile" style="width: 200px;"
                class="filter-item" @keyup.enter.native="getList"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">
        查询
      </el-button>
      <el-button :loading="listLoading" :disabled="selectedIds.length == 0" class="filter-item" type="primary" icon="el-icon-plus" @click="dialogVisible = true">生成结算单</el-button>
    </div>
    <div class="filter-container">已选择总结算金额：{{totalAmount}}</div>
    <el-table
      @selection-change="selectionChange"
      v-loading="listLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
    >
      <el-table-column type="selection" width="40"/>
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
      <el-table-column label="客户取走时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.finishedReceivingDate }}
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
      <el-table-column label="结算价" align="center">
        <template slot-scope="scope">
          {{ scope.row.settleAmount }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <el-dialog
      :title="dialogLoading ? '结算中...':'结算提示'"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :before-close="handleClose"
      width="450px">
      <div v-loading="dialogLoading">
        <span>确定要生成结算单吗？</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" :loading="dialogLoading">取消</el-button>
        <el-button type="primary" @click="createSettle" :loading="dialogLoading">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getList} from '@/api/nursing/nursing'
  import {create} from '@/api/nursing/nursingSettle'
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
          code: '',
          statuss: ['FINISHED'],
          customerMobile: ''
        },
        list: [],
        total: 0,
        listLoading: false,
        selectedIds: [],
        dialogVisible: false,
        dialogLoading: false
      }
    },
    mounted() {
      this.getList()
    },
    computed: {
      totalAmount() {
        return this.selectedIds.length == 0 ? 0 : this.selectedIds.reduce((t, a) => t + a.settleAmount, 0)
      }
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
      //选择
      selectionChange(val) {
        this.selectedIds = val
      },
      handleClose(done) {
        if (!this.dialogLoading) {
          done()
        }
      },
      //结算
      createSettle() {
        this.dialogLoading = true
        create({ids: this.selectedIds.map(s => s.id)}).then(res => {
          this.$message({message: '操作成功', type: 'success'})
          this.getList()
          setTimeout(() => {
            this.dialogVisible = false
          }, 600)
        }).finally(() => this.dialogLoading = false)
      }
    }
  }
</script>

<style scoped>
</style>
