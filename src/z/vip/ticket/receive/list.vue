<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="卷编号" clearable v-model.trim="listQuery.ticketCode" style="width: 200px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-select class="filter-item" v-model="listQuery.outStr" clearable placeholder="领劵途径">
        <el-option key="QR" label="二维码" value="QR"/>
        <el-option key="SHELF" label="券架" value="SHELF"/>
      </el-select>
      <el-select style="width: 120px" class="filter-item" v-model="listQuery.checked" clearable placeholder="是否核销">
        <el-option :key="true" label="是" :value="true"/>
        <el-option :key="false" label="否" :value="false"/>
      </el-select>
      <el-date-picker class="filter-item" clearable
        v-model="listQuery.startDate"
        type="date"
        placeholder="核销开始日期">
      </el-date-picker>
      <el-date-picker class="filter-item" clearable
        v-model="listQuery.endDate"
        type="date"
        placeholder="核销结束日期">
      </el-date-picker>
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
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="用户昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.userNickName }}
        </template>
      </el-table-column>
      <el-table-column label="券编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.ticketCode }}
        </template>
      </el-table-column>
      <el-table-column label="券标题" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="券类型" align="center" min-width="100px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 'CASH'" type="success">代金券</el-tag>
          <el-tag v-if="scope.row.type === 'DISCOUNT'" type="danger">折扣券</el-tag>
          <el-tag v-if="scope.row.type === 'GIFT'" type="warning">兑换券</el-tag>
          <el-tag v-if="scope.row.type === 'GROUPON'" type="info">团购券</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="领劵途径" align="center" min-width="100px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.outerStr === 'QR'" type="success">二维码</el-tag>
          <el-tag v-if="scope.row.outerStr === 'SHELF'" type="danger">券架</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="券使用编码" align="center">
        <template slot-scope="scope">
          {{ scope.row.userCardCode }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.startDate }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.endDate }}
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 'CASH'">{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="折扣" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 'DISCOUNT'">{{ scope.row.discount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否核销" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isChecked" type="success">是</el-tag>
          <el-tag v-if="!scope.row.isChecked">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="核销时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.checkedDate }}
        </template>
      </el-table-column>
      <el-table-column label="核销小票" align="center">
        <template slot-scope="scope">
          {{ scope.row.posCode }}
        </template>
      </el-table-column>
      <el-table-column label="核销员工" align="center">
        <template slot-scope="scope">
          {{ scope.row.employNames }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList} from '@/api/vip/ticket/ticketDetail'
  import Pagination from '@/components/Pagination'

  export default {
    components: {Pagination},
    filters: {},
    directives: {},
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          pageIndex: 1,
          pageSize: 10,
          outStr: '',
          ticketCode: '',
          checked: null
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      }
    }
  }
</script>

<style scoped>

</style>
