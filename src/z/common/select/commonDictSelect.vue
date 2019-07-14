<template>
  <el-select :disable="isDisabled" v-model="tempId" filterable multiple collapse-tags reserve-keyword clearable remote default-first-option :placeholder="placeholder" :remote-method="searchEle" :loading="loading" @change="changeSelect">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
    <el-option v-for="item in optionList" :value="item" :label="item"/>
  </el-select>
</template>

<script>
  import {dimGoodsList} from '@/api/bill/bill'

  export default {
    computed: {},
    name: "dictSelect",
    data() {
      return {
        loading: false,
        optionList: [],
        tempId: []
      };
    },
    props: {
      placeholder: {default: '请输入编号'},
      eleKey: {default: ''},
      eleId: {default: []},
      isDisabled: {default: false}
    },
    created() {
    },
    methods: {
      init() {

      },
      searchEle(query) {
        if (query !== '') {
          this.loading = true
          dimGoodsList({key: this.eleKey, searchKey: query}).then(response => {
            this.optionList = response.data
          }).finally(() => this.loading = false)
        } else {
          this.optionList = []
        }
      },
      changeSelect() {
        this.$emit("update:eleId", this.tempId)
      }
    }
  }
</script>
