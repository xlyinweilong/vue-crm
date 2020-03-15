<template>
  <el-dialog
    title="明细"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="1000px">
    <!--商品明细-->
    <div v-loading="loading">
      <el-table
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
        <el-table-column label="品牌" align="center" prop="brandName">
        </el-table-column>
        <el-table-column label="大类" align="center">
          <template slot-scope="scope">
            {{ scope.row.categoryName }}
          </template>
        </el-table-column>
        <el-table-column label="颜色" align="center">
          <template slot-scope="scope">
            {{scope.row.colorName}}
          </template>
        </el-table-column>
        <el-table-column label="尺码" align="center">
          <template slot-scope="scope">
            {{ scope.row.sizeName }}
          </template>
        </el-table-column>
        <el-table-column label="单价" align="center">
          <template slot-scope="scope">
            {{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column label="数量" align="center">
          <template slot-scope="scope">
            {{ scope.row.quantity }}
          </template>
        </el-table-column>
        <el-table-column label="金额" align="center">
          <template slot-scope="scope">
            {{ scope.row.amount }}
          </template>
        </el-table-column>
        <el-table-column label="退货数量" align="center">
          <template slot-scope="scope">
            {{ scope.row.totalRefundQuantity }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {saveExpressCode, info} from '@/api/shop/business/order/order'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    data() {
      return {
        loading: false,
        show: false,
        form: {
          status: ''
        },
        goodsList: []
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.show = false
      },
      onOpen(ele) {
        this.form = JSON.parse(JSON.stringify(ele))
        this.show = true
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
        this.loading = true
        info({id: this.form.id}).then(res => {
          this.goodsList = res.data.goodsList
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
