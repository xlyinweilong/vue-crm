<template>
  <el-select :disable="isDisabled" v-model="tempEmployId" filterable clearable remote default-first-option placeholder="请输入营业员" :remote-method="searchEmploy" :loading="loadingEmploy" @change="changeSelect">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
    <el-option v-for="item in optionEmploy" :value="item.id" :label="item.name +'-'+item.code"/>
  </el-select>
</template>

<script>
  import {getList as getEmployList} from '@/api/info/employ'

  export default {
    computed: {},
    name: "employSelect",
    data() {
      return {
        loadingEmploy: false,
        optionEmploy: [],
        tempEmployId: ''
      };
    },
    props: {
      employId: {default: '',required: false},
      employName: {default: '',required: false},
      employCode: {default: '',required: false},
      isDisabled: {default: false,required: false}
    },
    watch: {
      employId: 'initEmploy'
    },
    created() {
      this.initEmploy()
    },
    methods: {
      initEmploy() {
        this.tempEmployId = this.employId
        this.optionEmploy = []
        if (this.employId != null && this.employId != '') {
          this.optionEmploy.push({id: this.employId, name: this.employName, code: this.employCode})
        }
      },
      //搜索营业员
      searchEmploy(query) {
        if (query !== '') {
          this.loadingEmploy = true
          getEmployList({pageIndex: 1, pageSize: 10, searchKey: query}).then(response => {
            this.optionEmploy = response.data.content
          }).finally(() => this.loadingEmploy = false)
        } else {
          this.optionEmploy = []
        }
      },
      changeSelect() {
        this.$emit("update:employId", this.tempEmployId)
      }
    }
  }
</script>
