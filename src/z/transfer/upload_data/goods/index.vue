<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="商品编号或名称" clearable v-model.trim="listQuery.searchKey" style="width: 250px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">
        查询
      </el-button>
    </div>
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="showSave({id:'',code:'',name:'',disabled:0})">新增</el-button>
      <el-button :loading="listLoading" class="filter-item" type="warning" icon="el-icon-upload2" plain @click="showUpload">上传货品资料</el-button>
      <el-button :loading="listLoading" class="filter-item" type="warning" icon="el-icon-upload2" plain @click="showUploadColor">上传货品的颜色</el-button>
      <el-button :loading="listLoading" class="filter-item" type="warning" icon="el-icon-upload2" plain @click="showUploadSize">上传货品的尺码</el-button>
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
          {{scope.row.code}}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="品牌" align="center">
        <template slot-scope="scope">
          {{ scope.row.brandName }}
        </template>
      </el-table-column>
      <el-table-column label="分类" align="center">
        <template slot-scope="scope">
          {{ scope.row.categoryName }}
        </template>
      </el-table-column>
      <el-table-column label="二级分类" align="center">
        <template slot-scope="scope">
          {{ scope.row.category2Name }}
        </template>
      </el-table-column>
      <el-table-column label="年份" align="center">
        <template slot-scope="scope">
          {{ scope.row.yearName }}
        </template>
      </el-table-column>
      <el-table-column label="季节" align="center">
        <template slot-scope="scope">
          {{ scope.row.seasonName }}
        </template>
      </el-table-column>
      <el-table-column label="吊牌价" align="center">
        <template slot-scope="scope">
          {{ scope.row.tagPrice }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="260">>
        <template slot-scope="scope">
          <el-button type="text" @click="showSave(scope.row)">修改</el-button>
          <el-button type="text" @click="showColor(scope.row)">颜色</el-button>
          <el-button type="text" @click="showSize(scope.row)">尺码</el-button>
          <el-button type="text" @click="deleteEle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <save ref="save" @getList="getList" :allBrandList="allBrandList" :allCategoryList="allCategoryList" :allCategory2List="allCategory2List" :allSeasonList="allSeasonList" :allYearList="allYearList"/>
    <importGoods ref="importGoods" @getList="getList"/>
    <importGoodsColor ref="importGoodsColor" @getList="getList"/>
    <importGoodsSize ref="importGoodsSize" @getList="getList"/>
    <showColor ref="showColor" @getList="getList"/>
    <showSize ref="showSize" @getList="getList"/>
  </div>
</template>

<script>
  import {getList, deleteEle, allBrand, allCategory, allCategory2, allSeason, allYear} from '@/api/transfer/goods'
  import Pagination from '@/components/Pagination'
  import save from "./save"
  import importGoods from "./importGoods"
  import importGoodsColor from "./importGoodsColor"
  import importGoodsSize from "./importGoodsSize"
  import showColor from "./showColor"
  import showSize from "./showSize"

  export default {
    components: {
      Pagination,
      save,
      importGoods,
      importGoodsSize,
      importGoodsColor,
      showColor,
      showSize
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
        list: [],
        total: 0,
        listLoading: false,
        allBrandList: [],
        allCategoryList: [],
        allCategory2List: [],
        allSeasonList: [],
        allYearList: []
      }
    },
    created() {
    },
    mounted() {
      this.allBrand()
      this.allCategory()
      this.allCategory2()
      this.allSeason()
      this.allYear()
      this.getList()
    },
    methods: {
      // 获取列表
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.content
          this.total = response.data.totalElements
        }).finally(() => this.listLoading = false)
      },
      async allBrand() {
        await allBrand().then(res => this.allBrandList = res.data)
      },
      async allCategory() {
        await allCategory().then(res => this.allCategoryList = res.data)
      },
      async allCategory2() {
        await allCategory2().then(res => this.allCategory2List = res.data)
      },
      async allSeason() {
        await allSeason().then(res => this.allSeasonList = res.data)
      },
      async allYear() {
        await allYear().then(res => this.allYearList = res.data)
      },
      showUpload() {
        this.$refs.importGoods.onOpen()
      },
      showColor(ele) {
        this.$refs.showColor.onOpen(ele)
      },
      showSize(ele) {
        this.$refs.showSize.onOpen(ele)
      },
      showUploadColor() {
        this.$refs.importGoodsColor.onOpen()
      },
      showUploadSize() {
        this.$refs.importGoodsSize.onOpen()
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
          deleteEle({id: row.id}).then(() => {
            this.$message({type: 'success', message: '删除成功!'})
            this.getList()
          }).catch(() => this.listLoading = false)
        })
      }
    }
  }
</script>

<style scoped>

</style>
