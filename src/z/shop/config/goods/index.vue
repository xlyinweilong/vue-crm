<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.onShelf" filterable class="filter-item" clearable placeholder="上下架商品">
        <el-option :key="true" label="已上架" :value="true"/>
        <el-option :key="false" label="未上架" :value="false"/>
      </el-select>
      <el-input placeholder="货号" clearable v-model.trim="listQuery.code" style="width: 250px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-select v-model="listQuery.brandId" filterable class="filter-item" clearable placeholder="品牌">
        <el-option v-for="ele in allBrandList" :key="ele.id" :label="ele.name" :value="ele.erpId"/>
      </el-select>
      <el-select v-model="listQuery.categoryId" filterable class="filter-item" clearable placeholder="品类">
        <el-option v-for="ele in allCategoryList" :key="ele.id" :label="ele.name" :value="ele.erpId"/>
      </el-select>
      <el-select v-model="listQuery.category2Id" filterable class="filter-item" clearable placeholder="二级品类">
        <el-option v-for="ele in allCategory2List" :key="ele.id" :label="ele.name" :value="ele.erpId"/>
      </el-select>
      <el-select v-model="listQuery.seasonId" filterable class="filter-item" clearable placeholder="年份">
        <el-option v-for="ele in allSeasonList" :key="ele.id" :label="ele.name" :value="ele.erpId"/>
      </el-select>
      <el-select v-model="listQuery.yearId" filterable class="filter-item" clearable placeholder="季节">
        <el-option v-for="ele in allYearList" :key="ele.id" :label="ele.name" :value="ele.erpId"/>
      </el-select>
      <el-input placeholder="零售价" clearable v-model.trim="listQuery.price" style="width: 100px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-input placeholder="吊牌价" clearable v-model.trim="listQuery.tagPrice" style="width: 100px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">
        查询
      </el-button>
      <el-button :disabled="total==0" :loading="listLoading" class="filter-item" icon="el-icon-download" type="warning"
                 plain @click="exportExcel">导出
      </el-button>
      <el-button :disabled="total==0" :loading="listLoading" class="filter-item" icon="el-icon-download" type="warning"
                 plain @click="exportExcelAll">导出带有颜色和尺码
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
      <el-tooltip class="item" effect="dark" content="批量修改需要先让商品下架" placement="top">
        <el-button :disabled="total == 0" :loading="listLoading" class="filter-item" type="warning" icon="el-icon-upload2" plain @click="showUpload('uploadStock')">上传修改库存</el-button>
      </el-tooltip>
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
    <onShelf ref="onShelf" @getList="getList"/>
    <uploadCrmInfo ref="uploadCrmInfo" @getList="getList"/>
    <uploadStock ref="uploadStock" @getList="getList"/>
    <uploadGoodsImage ref="uploadGoodsImage" @getList="getList"/>
  </div>
</template>

<script>
  import {getList, allBrand, allCategory, allCategory2, allSeason, allYear, exportExcel, exportExcelAll} from '@/api/transfer/goods'
  import Pagination from '@/components/Pagination'
  import onShelf from "./onShelf"
  import uploadCrmInfo from "./uploadCrmInfo"
  import uploadStock from "./uploadStock"
  import uploadGoodsImage from "./uploadGoodsImage"
  import store from '@/store'

  export default {
    components: {
      onShelf,
      Pagination,
      uploadCrmInfo,
      uploadStock,
      uploadGoodsImage
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
          yearId: '',
          price: '',
          tagPrice: ''
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
      if (sessionStorage.pay_order_listQuery != null) {
        this.listQuery = JSON.parse(sessionStorage.pay_order_listQuery)
      }
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
      exportExcel() {
        this.listLoading = true
        exportExcel(this.listQuery).then(res => {
        }).finally(() => this.listLoading = false)
      },
      exportExcelAll() {
        this.listLoading = true
        exportExcelAll(this.listQuery).then(res => {
        }).finally(() => this.listLoading = false)
      },
      selectionChange(val) {
        this.selectedIds = val
      },
      onShelf() {
        this.$refs.onShelf.onOpen(this.selectedIds)
      },
      showUpload(e) {
        this.$refs[e].onOpen()
      },
      // 获取列表
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          sessionStorage.pay_order_listQuery = JSON.stringify(this.listQuery)
          this.list = response.data.content
          this.total = response.data.totalElements
        }).finally(() => this.listLoading = false)
      },
      edit(ele) {
        this.$router.push({path: '/shop/config/goods_detail/' + ele.id})
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
      }
    }
  }
</script>

<style scoped>

</style>
