<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker class="filter-item" value-format="yyyy-MM-dd" clearable v-model="listQuery.startDate" type="date" placeholder="开始时间"/>
      <el-date-picker class="filter-item" value-format="yyyy-MM-dd" clearable v-model="listQuery.endDate" type="date" placeholder="结束时间"/>
      <el-select class="filter-item" clearable style="width: 100px;" v-model="listQuery.disabled" placeholder="有效">
        <el-option :key="false" label="有效" :value="false"/>
        <el-option :key="true" label="失效" :value="true"/>
      </el-select>
      <el-select class="filter-item" clearable style="width: 100px;" v-model="listQuery.evaluateScore" placeholder="得分">
        <el-option :key="1" label="1" :value="1"/>
        <el-option :key="2" label="2" :value="2"/>
        <el-option :key="3" label="3" :value="3"/>
        <el-option :key="4" label="4" :value="4"/>
        <el-option :key="5" label="5" :value="5"/>
      </el-select>
      <el-input placeholder="单据编号" clearable v-model.trim="listQuery.billCode" style="width: 150px;" class="filter-item" @keyup.enter.native="getList"/>
      <!--<el-input placeholder="评价昵称" clearable v-model.trim="listQuery.nickName" style="width: 150px;" class="filter-item" @keyup.enter.native="getList"/>-->
      <el-input placeholder="店铺编号" clearable v-model.trim="listQuery.channelCode" style="width: 150px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-input placeholder="店铺名称" clearable v-model.trim="listQuery.channelName" style="width: 150px;" class="filter-item" @keyup.enter.native="getList"/>
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
      <el-table-column label="有效" align="center">
        <template slot-scope="scope">
          <el-tag v-if="!scope.row.disabled" type="success">是</el-tag>
          <el-tag v-if="scope.row.disabled" type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="店铺编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.channelCode }}
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.channelName }}
        </template>
      </el-table-column>
      <el-table-column label="评分" align="center">
        <template slot-scope="scope">
          {{ scope.row.evaluateScore }}
        </template>
      </el-table-column>
      <el-table-column label="是否匿名" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.evaluateAnonymous" type="success">是</el-tag>
          <el-tag v-if="!scope.row.evaluateAnonymous" type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="意见" align="center">
        <template slot-scope="scope">
          {{ scope.row.evaluateText }}
        </template>
      </el-table-column>
      <el-table-column label="单据" align="center">
        <template slot-scope="scope">
          {{ scope.row.billCode }}
        </template>
      </el-table-column>
      <el-table-column label="评价昵称" align="center">
        <template slot-scope="scope">
          <span v-if="!scope.row.evaluateAnonymous">{{ scope.row.userNickName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单据金额" align="center">
        <template slot-scope="scope">
          {{ scope.row.billAmount }}
        </template>
      </el-table-column>
      <el-table-column label="单据数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.billCount }}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="60">
        <template slot-scope="scope">
          <el-button @click="changeStatus(scope.row)" type="text" v-text="scope.row.disabled ? '恢复':'失效'"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList, changeStatus} from '@/api/transfer/evaluate'
  import Pagination from '@/components/Pagination'

  export default {
    components: {
      Pagination
    },
    filters: {},
    directives: {},
    data() {
      return {
        listQuery: {
          billCode:'',
          evaluateScore:'',
          channelName: '',
          channelCode: '',
          startDate: '',
          endDate: '',
          employName: '',
          disabled: '',
          pageIndex: 1,
          pageSize: 10,
          nickName: '',
          employCode: ''
        },
        list: [],
        total: 0,
        listLoading: false
      }
    },
    mounted() {
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
      changeStatus(row) {
        this.$confirm('确定要' + (row.disabled ? '恢复' : '失效') + '选中的数据吗?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          changeStatus({id: row.id}).then(response => {
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
