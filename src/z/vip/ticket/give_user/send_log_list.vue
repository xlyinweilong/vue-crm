<template>
  <div class="app-container">
    <div class="filter-container">
      <!--<el-button :loading="listLoading" class="filter-item" type="warning" icon="el-icon-upload2" @click="showImport">批量导入</el-button>-->
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
      <el-table-column label="卡卷" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="发送给" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickName }}
        </template>
      </el-table-column>
      <el-table-column label="发送给" align="center">
        <template slot-scope="scope">
          {{ scope.row.userNickName }}
        </template>
      </el-table-column>
      <el-table-column label="获取完善资料积分" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isGodUserInfoIntegral" type="success">是</el-tag>
          <el-tag v-if="!scope.row.isGodUserInfoIntegral" type="danger">否</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <importEle ref="importEle" @getList="getList"/>
  </div>
</template>

<script>
  import {getList} from '@/api/vip/ticket/sendLog'
  import Pagination from '@/components/Pagination'
  import importEle from './importEle'

  export default {
    components: {Pagination,importEle},
    filters: {},
    directives: {},
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          isEmploy: false,
          pageIndex: 1,
          pageSize: 10
        }
      }
    },
    mounted() {
    },
    methods: {
      init() {
        this.getList()
      },
      showImport() {
        this.$refs.importEle.onOpen()
      },
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
