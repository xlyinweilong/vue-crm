<template>
  <el-select :disable="isDisabled" v-model="tempPointId" filterable clearable remote default-first-option placeholder="请输入商场扣点码" :remote-method="searchPoint" :loading="loadingPoint" @change="changeSelect">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
    <el-option v-if="pointId != '' && pointId != null && optionPoint.every(e => e.id != pointId)" :value="pointId" :label="pointCode"/>
    <el-option v-for="item in optionPoint" :value="item.id" :label="item.code"/>
  </el-select>
</template>

<script>
  import {getList as getPointList} from '@/api/info/marketPoint'

  export default {
    computed: {},
    name: "pointSelect",
    data() {
      return {
        loadingPoint: false,
        optionPoint: [],
        tempPointId: ''
      };
    },
    props: {
      pointId: {default: '', required: false},
      pointCode: {default: '', required: false},
      isDisabled: {default: false, required: false},
      isCallBack:{default: false, required: false}
    },
    watch: {
      pointId: 'initPoint'
    },
    created() {
      this.initPoint()
    },
    methods: {
      initPoint() {
        this.tempPointId = this.pointId
        this.optionPoint = []
        if (this.pointId != null && this.pointId != '') {
          this.optionPoint.push({id: this.pointId, code: this.pointCode})
        }
      },
      searchPoint(query) {
        if (query !== '') {
          this.loadingPoint = true
          getPointList({pageIndex: 1, pageSize: 10, searchKey: query}).then(response => {
            this.optionPoint = response.data.content
          }).finally(() => this.loadingPoint = false)
        } else {
          this.optionPoint = []
        }
      },
      changeSelect() {
        this.$emit("update:pointId", this.tempPointId)
        if (this.isCallBack && this.tempPointId != null && this.tempPointId != '') {
          let option = this.optionPoint.find(p => p.id === this.tempPointId)
          this.$emit("change", {id: this.tempPointId, code: option.code})
        }
      }
    }
  }
</script>
