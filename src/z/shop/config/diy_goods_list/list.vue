<template>
  <div class="app-container">
    <div class="filter-container">
        <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增
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
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="链接" align="center">
        <template slot-scope="scope">
          /pages/shop/goods/goods_list?diy={{ scope.row.code }}
          <el-button type="text" @click="handleCopy('/pages/shop/goods/goods_list?diy=' + scope.row.code,$event)">复制</el-button>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="320" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="goodsList(scope.row)">商品</el-button>
          <el-button type="text" @click="deleteEle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <save ref="save" @getList="getList" />
  </div>
</template>

<script>

  import {list,deleteEle} from '@/api/shop/config/diyGoodsList/diyGoodsList'
  import Pagination from '@/components/Pagination'
  import Save from "./save"
  import clip from '@/utils/clipboard'

  export default {
    components: {Pagination,Save},
    filters: {},
    directives: {},
    data() {
      return {
        listLoading: false,
        listQuery: {
          pageIndex: 1,
          pageSize: 10,
          searchKey: '',
          startDateTime: '',
          endDateTime: ''
        },
        list: [],
        total: 0
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      handleCopy(text, event) {
        clip(text, event)
      },
      add() {
        this.$refs.save.onOpen({id: ''})
      },
      edit(ele) {
        this.$refs.save.onOpen(ele)
      },
      goodsList(row) {
        this.$emit("changeStatus", {status: "goodsList", id: row.id})
      },
      getList() {
        this.listLoading = true
        list(this.listQuery).then(response => {
          this.list = response.data.content
          this.total = response.data.totalElements
        }).finally(() => this.listLoading = false)
      },
      deleteEle(row){
        this.$confirm('确定要删除选中的记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          deleteEle({id: row.id}).then(() => {
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
