<template>
  <el-dialog
    title="导出"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="800px">
    <div v-loading="loading">
      <span>导出内容：</span>
      <el-select style="margin-top: 5px" v-model="type" placeholder="请选择">
        <el-option key="BILL" label="仅订单" value="BILL"/>
        <el-option key="DETAIL" label="订单和商品" value="DETAIL"/>
      </el-select>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">关闭</el-button>
      <el-button :loading="loading" type="primary" @click="exportExcel">导出</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {exportExcel, exportDetailExcel} from '@/api/report/shop/order'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    data() {
      return {
        loading: false,
        show: false,
        type: 'DETAIL',
        listQuery: {}
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.show = false
      },
      onOpen(listQuery) {
        this.listQuery = listQuery
        this.show = true
      },
      exportExcel() {
        this.loading = true
        let fun = this.type == 'DETAIL' ? exportDetailExcel : exportExcel
        fun(this.listQuery).then(res => {
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
