<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="货号" clearable v-model.trim="listQuery.code" style="width: 250px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">
        查询
      </el-button>
    </div>
    <div class="filter-container">
      <el-popover
        placement="top-start"
        title="提示"
        width="380"
        trigger="hover"
        content="调整后请手动给分类和二级分类排序，并设置图片地址">
        <el-button slot="reference" :disabled="selectedIds.length == 0" :loading="listLoading" class="filter-item" type="warning" icon="el-icon-sort" plain @click="onShelf">批量上/下架</el-button>
      </el-popover>
      <el-button :disabled="total == 0" :loading="listLoading" class="filter-item" type="warning" icon="el-icon-upload2" plain @click="showUpload('uploadCrmInfo')">上传修改CRM资料</el-button>
      <el-button :disabled="total == 0" :loading="listLoading" class="filter-item" type="warning" icon="el-icon-upload2" plain @click="showUpload('uploadStock')">上传修改库存</el-button>
      <el-button :disabled="total == 0" :loading="listLoading" class="filter-item" type="warning" icon="el-icon-upload2" plain @click="showUpload('uploadGoodsImage')">批量上传商品图片</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
      @selection-change="selectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="是否上架" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.onShelf" type="success">已上架</el-tag>
          <el-tag v-if="!scope.row.onShelf" type="info">没上架</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="货号" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="货品名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="品牌" align="center">
        <template slot-scope="scope">
          {{ scope.row.brandName }}
        </template>
      </el-table-column>
      <el-table-column label="品类" align="center">
        <template slot-scope="scope">
          {{ scope.row.categoryName }}
        </template>
      </el-table-column>
      <el-table-column label="二级品类" align="center">
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
      <el-table-column label="零售价" align="center">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="120">>
        <template slot-scope="scope">
          {{ scope.row.washingPrice }}
          <el-button type="text" @click="edit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList} from '@/api/transfer/goods'
  import Pagination from '@/components/Pagination'

  export default {
    components: {
      Pagination
    },
    filters: {},
    directives: {},
    data() {
      return {
        selectedIds: [],
        listQuery: {
          onShelf: '',
          pageIndex: 1,
          pageSize: 10,
          code: '',
          type: '',
          brandId: '',
          categoryId: '',
          category2Id: '',
          seasonId: '',
          yearId: ''
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
    mounted() {
      this.getList()
    },
    methods: {
      selectionChange(val) {
        this.selectedIds = val
      },
      onShelf() {
        this.$refs.onShelf.onOpen(this.selectedIds)
      },
      showUpload(e){
        this.$refs[e].onOpen()
      },
      // 获取列表
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.content
          this.total = response.data.totalElements
        }).finally(() => this.listLoading = false)
      },
      edit(ele) {
        this.$router.push({path: '/shop/config/goods_detail/' + ele.id})
      }
    }
  }
</script>

<style scoped>

</style>
