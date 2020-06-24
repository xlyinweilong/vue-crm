<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="券编号" clearable v-model.trim="listQuery.ticketCode" style="width: 250px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-input placeholder="券标题" clearable v-model.trim="listQuery.title" style="width: 250px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-select class="filter-item" style="width: 100px;" v-model="listQuery.usePlatform" clearable placeholder="使用平台类型">
        <el-option key="ONLINE" label="线上" value="ONLINE"/>
        <el-option key="MARKET" label="线下" value="MARKET"/>
      </el-select>
      <!--<el-select class="filter-item" style="width: 100px;" v-model="listQuery.disabled" clearable placeholder="禁用">-->
        <!--<el-option key="false" label="启用" :value="false"/>-->
        <!--<el-option key="true" label="禁用" :value="true"/>-->
      <!--</el-select>-->
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">
        查询
      </el-button>
    </div>
    <div class="filter-container">
      <el-button :disabled="total==0" :loading="listLoading" class="filter-item" icon="el-icon-download" type="warning" plain @click="exportExcel">导出</el-button>
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
      <el-table-column label="领取时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 'CASH'" type="success">代金券</el-tag>
          <el-tag v-if="scope.row.type === 'DISCOUNT'" type="danger">折扣券</el-tag>
          <el-tag v-if="scope.row.type === 'GIFT'" type="warning">兑换券</el-tag>
          <el-tag v-if="scope.row.type === 'GROUPON'" type="info">团购券</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="优惠码" align="center">
        <template slot-scope="scope">
          {{ scope.row.userCardCode }}
        </template>
      </el-table-column>
      <el-table-column label="券编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.ticketCode }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="有效期开始时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.startDate }}
        </template>
      </el-table-column>
      <el-table-column label="有效期结束时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.endDate }}
        </template>
      </el-table-column>
      <el-table-column label="金额/折扣" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 'CASH'">{{ scope.row.amount }}</span>
          <span v-if="scope.row.type == 'DISCOUNT'">{{ scope.row.discount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.onShelfTypeMean }}
        </template>
      </el-table-column>
      <el-table-column label="领取人昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.userNickName }}
        </template>
      </el-table-column>
      <el-table-column label="是否核销" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.checked" type="success">是</el-tag>
          <el-tag v-if="!scope.row.checked">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="核销时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.checkedDate }}
        </template>
      </el-table-column>
      <el-table-column label="会员电话" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.vip != null">{{scope.row.vip.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员编号" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.vip != null">{{scope.row.vip.code}}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList,exportExcel} from '@/api/vip/ticket/ticketDetail'
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
        total: 0,
        listLoading: false,
        selectedIds: [],
        listQuery: {
          usePlatform: 'ONLINE',
          code: '',
          title:'',
          ticketType: '',
          pageIndex: 1,
          pageSize: 10
        }
      }
    },
    created() {
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          // sessionStorage.ticket_listQuery = JSON.stringify(this.listQuery)
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      },
      exportExcel() {
        this.listLoading = true
        exportExcel(this.listQuery).then(res => {
        }).finally(() => this.listLoading = false)
      }
    }
  }
</script>

<style scoped>

</style>
