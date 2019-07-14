<template>
  <el-dialog class="goods_list_dialog" title="选择货品" :visible="show" width="85%" @close="onClose" @open="onOpen">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form>
          <el-form-item label="品牌" style=" margin-bottom: 5px;">
            <commonDictSelect style="width: 100%" :eleKey="'goodsBrand'" :eleId.sync="goodsBrandId" :placeholder="'请输入品牌'"/>
          </el-form-item>
          <el-form-item label="类别" style=" margin-bottom: 5px;">
            <commonDictSelect style="width: 100%" :eleKey="'goodsCategory'" :eleId.sync="goodsCategoryId" :placeholder="'请输入类别'"/>
          </el-form-item>
          <el-form-item label="年份" style=" margin-bottom: 5px;">
            <commonDictSelect style="width: 100%" :eleKey="'goodsYear'" :eleId.sync="goodsYearId" :placeholder="'请输入年份'"/>
          </el-form-item>
          <el-form-item label="季节" style=" margin-bottom: 5px;">
            <commonDictSelect style="width: 100%" :eleKey="'goodsSeason'" :eleId.sync="goodsSeasonId" :placeholder="'请输入季节'"/>
          </el-form-item>
          <el-form-item label="性别" style=" margin-bottom: 5px;">
            <commonDictSelect style="width: 100%" :eleKey="'goodsSex'" :eleId.sync="goodsSexId" :placeholder="'请输入性别'"/>
          </el-form-item>
          <el-form-item label="系列" style=" margin-bottom: 5px;">
            <commonDictSelect style="width: 100%" :eleKey="'goodsSeries'" :eleId.sync="goodsSeriesId" :placeholder="'请输入系列'"/>
          </el-form-item>
          <el-form-item label="风格" style=" margin-bottom: 5px;">
            <commonDictSelect style="width: 100%" :eleKey="'goodsStyle'" :eleId.sync="goodsStyleId" :placeholder="'请输入风格'"/>
          </el-form-item>
          <el-form-item style=" margin-bottom: 5px;">
            <el-button type="primary" plain @click="searchGoodsList" :loading="loading">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="16" style="text-align:center">
        <el-transfer v-loading="loading" class="goods_select_transfer" style="text-align: left; display: inline-block;" :titles="['待选货品', '选择的货品']" filterable filter-placeholder="请输入货号" v-model="selectGoodsList" :data="allGoodsList" :props="props"/>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose" :loading="loading">取消</el-button>
      <el-button type="primary" @click="ok" :loading="loading">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>

  import commonDictSelect from '@/z/common/select/commonDictSelect'
  import {searchGoodsList} from '@/api/bill/bill'

  export default {
    computed: {},
    components: {commonDictSelect},
    data() {
      return {
        loading: false,
        allGoodsList: [],
        goodsBrandId: [],
        goodsCategoryId: [],
        goodsYearId: [],
        goodsSeasonId: [],
        goodsSexId: [],
        goodsSeriesId: [],
        goodsStyleId: [],
        props: {
          key: 'goodsCode',
          label: 'goodsCode'
        },
        selectGoodsList: []
      };
    },
    props: {
      show: {default: false},
      goodsList: {default: []},
      selectType: {default: ''},
      saleDate: {default: null}
    },
    methods: {
      onOpen() {
      },
      searchGoodsList() {
        this.loading = true
        this.selectGoodsList = []
        let startDate, endDate = null
        if (this.saleDate != null && this.saleDate.length === 2) {
          startDate = this.saleDate[0]
          endDate = this.saleDate[1]
        }
        searchGoodsList({selectType: this.selectType, startDate: startDate, endDate: endDate, goodsBrandId: this.goodsBrandId, goodsCategoryId: this.goodsCategoryId, goodsYearId: this.goodsYearId, goodsSeasonId: this.goodsSeasonId, goodsSexId: this.goodsSexId, goodsSeriesId: this.goodsSeriesId, goodsStyleId: this.goodsStyleId}).then(response => {
          this.allGoodsList = response.data
        }).finally(() => this.loading = false)
      },
      onClose() {
        this.allGoodsList = []
        this.selectGoodsList = []
        // this.goodsBrandId = []
        // this.goodsCategoryId = []
        // this.goodsYearId = []
        // this.goodsSeasonId = []
        // this.goodsSexId = []
        // this.goodsSeriesId = []
        // this.goodsStyleId = []
        this.$emit('update:show', false)
      },
      ok() {
        this.selectGoodsList.forEach(s => {
          if (this.goodsList.indexOf(s) < 0) {
            this.goodsList.push(s)
          }
        })
        this.onClose()
      }
    }
  }
</script>
<style>

  .goods_list_dialog .el-dialog .el-dialog__body {
    padding-bottom: 0px;
  }

  .goods_select_transfer {
    width: 100%;
  }

  .goods_select_transfer .el-transfer-panel {
    width: 42%;
  }

  .goods_select_transfer .el-transfer-panel .el-transfer-panel__body {
    height: 475px;
  }

  .goods_select_transfer .el-transfer-panel .el-transfer-panel__body .el-transfer-panel__list {
    height: 430px;
  }

</style>
