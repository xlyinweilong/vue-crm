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
      <el-table-column label="默认等级" align="center">
        <template slot-scope="scope">
          <el-switch
            :disabled="scope.row.default"
            @change="changeDefaultGrade(scope.row)"
            v-model="scope.row.default"
            active-color="#13ce66">
          </el-switch>
        </template>
      </el-table-column>
      <!--<el-table-column label="设置为默认等级" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button type="primary" plain icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList,setDefaultGrade} from '@/api/vip/grade/grade'
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
          searchKey: ''
        },
        defaultId:'',
        list: [],
        total: 0,
        listLoading: false
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      changeDefaultGrade(row) {
        if(row.default){
          this.listLoading = true
          setDefaultGrade({id: row.id}).then(res => {
            this.$message({message: '操作成功', type: 'success'})
            this.getList()
          }).catch(() => this.listLoading = false)
        }
      },
      // 获取列表
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          res.data.page.content.forEach(c => c.default = false)
          this.list = res.data.page.content
          this.total = res.data.page.totalElements
          this.defaultId = res.data.defaultId
          this.list.filter(c => c.id ===  this.defaultId).forEach(c => c.default = true)
        }).finally(() => {
          this.listLoading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
