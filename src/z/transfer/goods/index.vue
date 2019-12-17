<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="货号" clearable v-model.trim="listQuery.code" style="width: 250px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-select v-model="listQuery.brandId" filterable class="filter-item" clearable placeholder="品牌">
        <el-option v-for="ele in allBrandList" :key="ele.id" :label="ele.name" :value="ele.erpId"/>
      </el-select>
      <el-select v-model="listQuery.categoryId" filterable class="filter-item" clearable placeholder="品类">
        <el-option v-for="ele in allCategoryList" :key="ele.id" :label="ele.name" :value="ele.erpId"/>
      </el-select>
      <el-select v-model="listQuery.seasonId" filterable class="filter-item" clearable placeholder="年份">
        <el-option v-for="ele in allSeasonList" :key="ele.id" :label="ele.name" :value="ele.erpId"/>
      </el-select>
      <el-select v-model="listQuery.yearId" filterable class="filter-item" clearable placeholder="季节">
        <el-option v-for="ele in allYearList" :key="ele.id" :label="ele.name" :value="ele.erpId"/>
      </el-select>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">
        查询
      </el-button>
<!--      <el-button :loading="listLoading" class="filter-item" type="warning" plain @click="changePriceAll">批量修改</el-button>-->
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
<!--      <el-table-column label="清洗指导价" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.washingPrice }} <el-button type="text" @click="changePrice(scope.row)">修改</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <change-price ref="changePrice" @getList="getList" />
  </div>
</template>

<script>
    import {getList,allBrand,allCategory,allSeason,allYear} from '@/api/transfer/goods'
    import Pagination from '@/components/Pagination'
    import ChangePrice from "./changePrice";


    export default {
        components: {
            ChangePrice,
            Pagination
        },
        filters: {},
        directives: {},
        data() {
            return {
                listQuery: {
                    pageIndex: 1,
                    pageSize: 10,
                    code: '',
                    type: '',
                    brandId:'',
                    categoryId:'',
                    seasonId:'',
                    yearId:''
                },
                list: [],
                total: 0,
                listLoading: false,
                allBrandList:[],
                allCategoryList:[],
                allSeasonList:[],
                allYearList:[]
            }
        },
        mounted() {
            this.allBrand()
            this.allCategory()
            this.allSeason()
            this.allYear()
            this.getList()
        },
        methods: {
            changePrice(ele){
              this.$refs.changePrice.onOpen(ele)
            },
            changePriceAll(){
                this.$refs.changePrice.onOpenAll(this.listQuery)
            },
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
            async allBrand(){
                await allBrand().then(res => this.allBrandList = res.data)
            },
            async allCategory(){
                await allCategory().then(res => this.allCategoryList = res.data)
            },
            async allSeason(){
                await allSeason().then(res => this.allSeasonList = res.data)
            },
            async allYear(){
                await allYear().then(res => this.allYearList = res.data)
            }
        }
    }
</script>

<style scoped>

</style>
