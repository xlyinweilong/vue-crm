<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="编号或者名称" clearable v-model.trim="listQuery.searchKey" style="width: 200px;"
                class="filter-item" @keyup.enter.native="getList"/>
      <el-input placeholder="手机号" clearable v-model.trim="listQuery.mobile" style="width: 200px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-select class="filter-item" style="width: 100px;" v-model="listQuery.status" clearable placeholder="状态">
        <el-option label="正常" value="正常"/>
        <el-option label="其他" value="其他"/>
      </el-select>
      <el-date-picker clearable class="filter-item" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
        v-model="listQuery.startDate"
        type="date"
        placeholder="开卡开始日期">
      </el-date-picker>
      <el-date-picker clearable class="filter-item" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
        v-model="listQuery.endDate"
        type="date"
        placeholder="开卡结束日期">
      </el-date-picker>
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
      fit
      border
    >
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="手机号码" align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="开卡时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.openDate }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
    import {getList} from '@/api/vip/vip_manager/vip'
    import Pagination from '@/components/Pagination'

    export default {
        name: 'channelList',
        components: {
            Pagination
        },
        filters: {},
        directives: {},
        data() {
            return {
                listQuery: {
                    pageIndex: 1,
                    pageSize: 10,
                    searchKey: '',
                    mobile: '',
                    status: '正常',
                    startDate: '',
                    endDate: ''
                },
                list: [],
                total: 0,
                listLoading: false,
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            // async getAllColor(){
            //   this.listLoading = true
            //   await getAllColor().then(res => this.colorList = res.data).catch(() => this.listLoading = false)
            // },
            // 获取列表
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
