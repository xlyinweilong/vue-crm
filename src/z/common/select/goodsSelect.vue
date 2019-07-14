<template>
  <el-select :disable="isDisabled" v-model="tempGoodsId" filterable clearable remote default-first-option placeholder="请输入货品编号" :remote-method="searchGoods" :loading="loadingGoods" @change="changeSelect">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
    <el-option v-for="item in optionGoods" :value="item.id" :label="item.name +'-'+item.code"/>
  </el-select>
</template>

<script>
  import {getList} from '@/api/info/goods'

  export default {
    computed: {},
    name: "goodsSelect",
    data() {
      return {
        loadingGoods: false,
        optionGoods: [],
        tempGoodsId: ''
      };
    },
    props: {
      goodsId: {default: ''},
      goodsName: {default: '', required: false},
      goodsCode: {default: '', required: false},
      isDisabled: {default: false, required: false},
      isCallBack: {default: false, required: false},
    },
    watch: {
      goodsId: 'initGoods'
    },
    created() {
      this.initGoods()
    },
    methods: {
      initGoods() {
        this.tempGoodsId = this.goodsId
        this.optionGoods = []
        if (this.goodsId != null && this.goodsId != '') {
          this.optionGoods.push({id: this.goodsId, name: this.goodsName, code: this.goodsCode})
        }
      },
      searchGoods(query) {
        if (query !== '') {
          this.loadingGoods = true
          getList({pageIndex: 1, pageSize: 10, searchKey: query}).then(response => {
            this.optionGoods = response.data.content
          }).finally(() => this.loadingGoods = false)
        } else {
          this.optionGoods = []
        }
      },
      changeSelect() {
        this.$emit("update:goodsId", this.tempGoodsId)
        let goods = this.optionGoods.find(g => this.tempGoodsId === g.id)
        if (this.isCallBack && goods != null) {
          this.$emit("change", {id: this.tempGoodsId, code: goods.code, name: goods.name})
        }
      }
    }
  }
</script>
