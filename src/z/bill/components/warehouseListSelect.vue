<template>
  <el-dialog class="warehouse_list_dialog" title="选择仓库" :visible="show" width="65%" @close="onClose" @open="onOpen">
    <el-row :gutter="24">
      <el-col :span="24" style="text-align:center">
        <el-transfer v-loading="loading" class="goods_select_transfer" style="text-align: left; display: inline-block;" :titles="['待选仓库', '选择的仓库']" filterable filter-placeholder="请输入仓库" v-model="selectWarehouseList" :data="allWarehouseList" :props="props"/>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose" :loading="loading">取消</el-button>
      <el-button type="primary" @click="ok" :loading="loading">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>

  import {getWarehouseList} from '@/api/bill/bill'

  export default {
    computed: {},
    components: {},
    data() {
      return {
        loading: false,
        allWarehouseList: [],
        props: {
          key: 'code',
          label: 'showName'
        },
        selectWarehouseList: []
      };
    },
    props: {
      show: {default: false},
      warehouseList:{default: []},
    },
    methods: {
      onOpen() {
        //加载渠道
        this.loadWarehouseList()
      },
      //加载渠道
      loadWarehouseList() {
        this.loading = true
        getWarehouseList({}).then(response => {
          response.data.forEach(c => c.showName = c.code + ' -  ' + c.name)
          this.allWarehouseList = response.data
          this.selectWarehouseList = this.allWarehouseList.filter(c => this.warehouseList.some(cl => cl.code === c.code)).map(c => c.code)
        }).finally(() => this.loading = false)
      },
      onClose() {
        this.selectWarehouseList = []
        this.allWarehouseList = []
        this.$emit('update:show', false)
      },
      ok() {
        this.$emit('update:warehouseList', this.allWarehouseList.filter(c => this.selectWarehouseList.indexOf(c.code) > -1))
        this.onClose()
      }
    }
  }
</script>
<style>

  .warehouse_list_dialog .el-dialog .el-dialog__body {
    padding-bottom: 0px;
  }

  .warehouse_list_dialog {
    width: 100%;
  }

  .warehouse_list_dialog .el-transfer-panel {
    width: 42%;
  }

  .warehouse_list_dialog .el-transfer-panel .el-transfer-panel__body {
    height: 475px;
  }

  .warehouse_list_dialog .el-transfer-panel .el-transfer-panel__body .el-transfer-panel__list {
    height: 430px;
  }

</style>
