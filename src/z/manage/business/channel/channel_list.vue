<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="编号或者名称" clearable v-model.trim="listQuery.searchKey" style="width: 200px;" class="filter-item" @keyup.enter.native="getList"/>
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
      <el-table-column label="禁用" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.disabled == 1 ? 'danger':'success'" v-text="scope.row.disabled == 1 ? '禁用':'启用'"/>
        </template>
      </el-table-column>
      <el-table-column label="坐标" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.lat != null">{{ scope.row.lat }},{{ scope.row.lng }}</span>
        </template>
      </el-table-column>
      <el-table-column label="别名" align="center">
        <template slot-scope="scope">
          {{ scope.row.aliasName }}
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="介绍图" align="center">
        <template slot-scope="scope">
          <el-image v-if="scope.row.imageUrl" style="width: 50px; height: 50px" :src="baseUrl + scope.row.imageUrl" fit="fit" />
        </template>
      </el-table-column>
      <el-table-column label="评价总得分" align="center">
        <template slot-scope="scope">
          {{ scope.row.evaluateTotalRate }}
        </template>
      </el-table-column>
      <el-table-column label="评价次数" align="center">
        <template slot-scope="scope">
          {{ scope.row.evaluateTotalCount }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-location" @click="setLocation(scope.row)">坐标</el-button>
          <el-button type="primary" plain icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <location :show.sync="showLocation" :ele="ele" @getList="getList"/>
    <edit :show.sync="showEdit" :ele="ele" :baseUrl="baseUrl" @getList="getList"/>
  </div>
</template>

<script>
  import {getList} from '@/api/manager/business/channel'
  import Pagination from '@/components/Pagination'
  import location from './location'
  import edit from './edit'
  import {getBaseUrl} from '@/api/upload/upload'

  export default {
    name: 'channelList',
    components: {
      Pagination, location, edit
    },
    filters: {},
    directives: {},
    data() {
      return {
        baseUrl: '',
        listQuery: {
          pageIndex: 1,
          pageSize: 10,
          searchKey: ''
        },
        list: [],
        total: 0,
        listLoading: false,
        showLocation: false,
        showEdit: false,
        ele: {}
      }
    },
    mounted() {
      this.getBaseUrl()
      this.getList()
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
      setLocation(row) {
        this.ele = row
        this.showLocation = true
      },
      edit(row) {
        this.ele = row
        this.showEdit = true
      },
      async getBaseUrl() {
        await getBaseUrl().then(res => this.baseUrl = res.data)
      }
    }
  }
</script>

<style scoped>

</style>
