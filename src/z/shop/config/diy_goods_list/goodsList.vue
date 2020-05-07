<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="info" icon="el-icon-back" @click="goBack">返回
      </el-button>
      <!--<el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增-->
      <!--</el-button>-->
      <el-button :loading="listLoading" class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete"
                 @click="deleteElement" :disabled="listLoading || selectedIds.length == 0">删除
      </el-button>
      <el-button :loading="listLoading" class="filter-item" type="warning" icon="el-icon-upload2"
                 plain @click="showUpload">导入货号
      </el-button>
    </div>
    <div class="filter-container">
      <el-input placeholder="货号" clearable v-model.trim="listQuery.goodsCode" style="width: 200px;" class="filter-item"
                @keyup.enter.native="getList"/>
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
      @selection-change="selectionChange"
      fit
      border
    >
      <el-table-column type="selection" width="40"/>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="货号" align="center">
        <template slot-scope="scope">
          {{ scope.row.goodsCode }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <upload ref="upload" @getList="getList"></upload>
  </div>
</template>

<script>
  import {getList, deleteEle} from '@/api/shop/config/diyGoodsList/diyGoodsListDetail'
  import Pagination from '@/components/Pagination'
  import Upload from "./upload";

  export default {
    components: {
      Upload,
      Pagination
    },
    filters: {},
    directives: {},
    props: {},
    computed: {},
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        selectedIds: [],
        listQuery: {
          shopGoodsListId: '',
          goodsCode: '',
          pageIndex: 1,
          pageSize: 10
        }
      }
    },
    mounted() {
    },
    methods: {
      showUpload() {
        this.$refs.upload.onOpen(this.listQuery.shopGoodsListId)
      },
      selectionChange(val) {
        this.selectedIds = val
      },
      goBack() {
        this.$emit("changeStatus", {status: 'list'})
      },
      init(id) {
        this.listQuery.shopGoodsListId = id
        this.getList()
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      },
      //删除
      deleteElement() {
        this.$confirm('确定要删除选中的数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteEle({ids: this.selectedIds.map(s => s.id)}).then(response => {
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
