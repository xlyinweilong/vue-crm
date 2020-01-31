<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="搜索内容" clearable v-model.trim="listQuery.searchKey" style="width: 450px;" class="filter-item" suffix-icon="el-icon-search"/>
    </div>
    <div class="filter-container">
      <el-tooltip class="item" effect="dark" content="最多可以建立30个" placement="top">
        <el-button :loading="listLoading" :disabled="total >= 30" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      </el-tooltip>
    </div>
    <el-table
      v-loading="listLoading"
      :data="pageList"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
    >
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="搜索内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.searchText }}
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">
          {{scope.row.sortIndex}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteEle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="allList.length>0 && !listLoading" :total="allList.length" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize"/>
    <save ref="save" @getList="loadData"/>
  </div>
</template>

<script>

  import {all, deleteEle} from '@/api/shop/config/search/recommend'
  import Pagination from '@/components/Pagination'
  import Save from "./save"

  export default {
    components: {Save, Pagination},
    filters: {},
    directives: {},
    computed: {
      pageList() {
        return this.allList.slice((this.listQuery.pageIndex - 1) * this.listQuery.pageSize, this.listQuery.pageIndex * this.listQuery.pageSize)
      },
      allList() {
        let list = this.list
        if (this.listQuery.searchKey != '') {
          list = list.filter(e => e.searchText.indexOf(this.listQuery.searchKey) > -1)
        }
        return list
      }
    },
    data() {
      return {
        list: [],
        listLoading: false,
        total: 0,
        listQuery: {
          searchKey: '',
          pageIndex: 1,
          pageSize: 10
        },
      }
    },
    mounted() {
      this.loadData()
    },
    methods: {
      add() {
        this.$refs.save.onOpen({active: false})
      },
      edit(ele) {
        this.$refs.save.onOpen(ele)
      },
      loadData() {
        this.listLoading = true
        all().then(response => {
          this.list = response.data
        }).finally(() => this.listLoading = false)
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
            this.loadData()
          }).catch(e => this.listLoading = false)
        })
      }
    }
  }
</script>

<style scoped>

</style>
