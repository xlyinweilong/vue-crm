<template>
  <el-select :disable="isDisabled" v-model="tempId" filterable clearable remote default-first-option placeholder="请输入会员编号" :remote-method="searchEle" :loading="loading" @change="changeSelect">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
    <el-option v-for="item in optionList" :value="item.id" :label="item.name +'-'+item.code"/>
  </el-select>
</template>

<script>
  import {getList} from '@/api/vip/vip'

  export default {
    computed: {},
    name: "vipSelect",
    data() {
      return {
        loading: false,
        optionList: [],
        tempId: ''
      };
    },
    props: {
      vipId: {default: ''},
      vipName: {default: ''},
      vipCode: {default: ''},
      isDisabled: {default: false}
    },
    watch: {
      vipId: 'initVip'
    },
    created() {
      this.initVip()
    },
    methods: {
      initVip() {
        this.tempId = this.vipId
        this.optionList = []
        if (this.tempId != null && this.tempId != '') {
          this.optionList.push({id: this.vipId, name: this.vipName, code: this.vipCode})
        }
      },
      //搜索营业员
      searchEle(query) {
        if (query !== '') {
          this.loading = true
          getList({pageIndex: 1, pageSize: 10, searchKey: query}).then(response => {
            this.optionList = response.data.content
          }).finally(() => this.loading = false)
        } else {
          this.optionList = []
        }
      },
      changeSelect() {
        this.$emit("update:vipId", this.tempId)
      }
    }
  }
</script>
