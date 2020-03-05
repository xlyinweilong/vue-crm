<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
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
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="下单时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="发件人姓名" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationSender }}
        </template>
      </el-table-column>
      <el-table-column label="发件人手机号码" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationMobile }}
        </template>
      </el-table-column>
      <el-table-column label="发件人省份" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationProvinceName }}
        </template>
      </el-table-column>
      <el-table-column label="发件人市/地区" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationCityName }}
        </template>
      </el-table-column>
      <el-table-column label="发件人区/县" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationStationName }}
        </template>
      </el-table-column>
      <el-table-column label="发件人详细地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationAddress }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteEle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <senderSave ref="senderSave" @getList="getList"/>
  </div>
</template>

<script>
  import {getList, deleteEle} from '@/api/shop/config/sender/sender'
  import senderSave from "./senderSave"
  import Pagination from '@/components/Pagination'

  export default {
    components: {senderSave, Pagination},
    data() {
      return {
        listQuery: {
          pageIndex: 1,
          pageSize: 10
        },
        total: 0,
        list: [],
        listLoading: false
      }
    },
    created() {
    },
    methods: {
      init() {
        this.getList()
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      },
      add() {
        this.$refs.senderSave.onOpen({id: ''})
      },
      edit(row) {
        this.$refs.senderSave.onOpen(row)
      },
      deleteEle(row) {
        this.$confirm('确定要删除选中的记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          deleteEle({id: row.id}).then(() => {
            this.$message({type: 'success', message: '删除成功!'})
            this.getList()
          }).catch(() => this.listLoading = false)
        })
      }
    }
  }
</script>
