<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="showSave({id:'',code:'',name:'',disabled:0})">新增</el-button>
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
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="260">>
        <template slot-scope="scope">
          <el-button type="text" @click="showSave(scope.row)">修改</el-button>
          <el-button type="text" @click="deleteEle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="list.length>0 && !listLoading" :total="list.length" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize"/>
    <save ref="save" :type="type" @getList="getList"/>
  </div>
</template>

<script>
  import {deleteFiledEle, allBrand, allCategory, allCategory2, allSeason, allYear, deleteBrand, deleteCategory, deleteCategory2, deleteSeason, deleteYear} from '@/api/transfer/goods'
  import Pagination from '@/components/Pagination'
  import save from "./save"

  export default {
    components: {
      Pagination,
      save
    },
    filters: {},
    directives: {},
    data() {
      return {
        listQuery: {
          pageIndex: 1,
          pageSize: 10
        },
        list: [],
        listLoading: false,
        type: ''
      }
    },
    computed: {
      pageList() {
        return this.list.slice((this.listQuery.pageIndex - 1) * this.listQuery.pageSize, this.listQuery.pageIndex * this.listQuery.pageSize)
      }
    },
    created() {
      this.type = this.$route.name
    },
    mounted() {
      this.getList()
    },
    methods: {
      // 获取列表
      getList() {
        let fun = null
        switch (this.type) {
          case 'brand':
            fun = allBrand
            break;
          case 'category':
            fun = allCategory
            break;
          case 'category2':
            fun = allCategory2
            break;
          case 'season':
            fun = allSeason
            break;
          case 'year':
            fun = allYear
            break;
        }
        this.listLoading = true
        fun().then(response => {
          this.list = response.data
        }).finally(() => this.listLoading = false)
      },
      showSave(ele) {
        this.$refs.save.onOpen(ele)
      },
      deleteEle(row) {
        this.$confirm('确定要删除选中的记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          let fun = null
          switch (this.type) {
            case 'brand':
              fun = deleteBrand
              break;
            case 'category':
              fun = deleteCategory
              break;
            case 'category2':
              fun = deleteCategory2
              break;
            case 'season':
              fun = deleteSeason
              break;
            case 'year':
              fun = deleteYear
              break;
          }
          fun({id: row.id}).then(() => {
            this.$message({type: 'success', message: '删除成功!'})
            this.getList()
          }).catch(() => {
            this.listLoading = false
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
