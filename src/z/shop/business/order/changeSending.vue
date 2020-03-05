<template>
  <el-dialog
    title="修改发货中"
    :close-on-click-modal="false"
    :visible="show"
    width="850px"
    @close="onClose">
    <el-table
      v-loading="loading"
      :data="goodsList"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
    >
      <el-table-column label="货号" align="center">
        <template slot-scope="scope">
          {{ scope.row.goodsCode }}
        </template>
      </el-table-column>
      <el-table-column label="含有颜色" align="center">
        <template slot-scope="scope">
          {{ scope.row.colorNames }}
        </template>
      </el-table-column>
      <el-table-column label="含有尺码" align="center">
        <template slot-scope="scope">
          {{ scope.row.sizeNames }}
        </template>
      </el-table-column>
      <el-table-column label="发货数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.quantity }}
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose" :loading="loading">取消</el-button>
      <el-button type="primary" @click="save" :loading="loading">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import {loadSendGoodsInfo, changeSendingOrder} from '@/api/shop/business/order/order'

  export default {
    components: {Pagination},
    filters: {},
    directives: {},
    props: {},
    computed: {},
    data() {
      return {
        loading: false,
        show: false,
        list: [],
        goodsList: [],
        ids: []
      }
    },
    computed: {},
    mounted() {
    },
    methods: {
      save() {
        this.loading = true
        changeSendingOrder({ids: this.ids}).then(res => {
          this.$message({message: '保存成功', type: 'success'})
          this.onClose()
          this.$emit("getList", {})
        }).finally(() => this.loading = false)
      },
      onClose() {
        this.show = false
      },
      onOpen(ids) {
        this.show = true
        this.loading = true
        this.ids = ids
        loadSendGoodsInfo({ids: ids}).then(res => {
          this.list = res.data
          this.goodsList = []
          this.list.forEach(o => {
            if (this.goodsList.every(g => g.goodsId !== o.goodsId)) {
              let e = {goodsId: o.goodsId, goodsCode: o.goodsCode, sendCount: 0, colorNames: [], sizeNames: []}
              e.colorNames = this.list.filter(oo => oo.goodsId === e.goodsId).map(t => t.colorName).filter((item, index, self) => self.indexOf(item) === index)
              e.sizeNames = this.list.filter(oo => oo.goodsId === e.goodsId).map(t => t.sizeName).filter((item, index, self) => self.indexOf(item) === index)
              e.quantity = this.list.filter(oo => oo.goodsId === e.goodsId).reduce((t, a) => t + a.quantity, 0)
              this.goodsList.push(e)
            }
          })
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
