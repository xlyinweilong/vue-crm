<template>
  <el-dialog
    title="调换"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="1200px">
    <!--商品明细-->
    <div v-loading="loading">
      <el-form ref="form" :model="form" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="调换原因" prop="changeReason">
              <el-input v-model="form.changeReason" placeholder="调换原因" :maxlength="200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="调换备注" prop="changeRemarks">
              <el-tooltip class="item" effect="dark" content="备注客户看不见，原因客户可见" placement="top">
                <el-input v-model="form.changeRemarks" placeholder="调换备注" :maxlength="200"></el-input>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="调换产生的快递费用" prop="changeExpressAmount">
              <el-input-number style="width: 100%" v-model="form.changeExpressAmount" step-strictly :precision="2" :step="0.01" :min="0" :max="99999" :controls="false"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
        <el-table-column label="数量" align="center">
          <template slot-scope="scope">
            {{ scope.row.quantity }}
          </template>
        </el-table-column>
        <el-table-column label="退货数量" align="center">
          <template slot-scope="scope">
            {{ scope.row.totalRefundQuantity }}
          </template>
        </el-table-column>
        <el-table-column label="调换颜色" align="center">
          <template slot-scope="scope">
            <el-select filterable v-model="scope.row.changeColorId" placeholder="请选择颜色">
              <el-option v-for="color in scope.row.colorList" :key="color.id" :label="color.name" :value="color.id"/>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="调换尺码" align="center">
          <template slot-scope="scope">
            <el-select filterable v-model="scope.row.changeSizeId" placeholder="请选择尺码">
              <el-option v-for="size in scope.row.sizeList" :key="size.id" :label="size.name" :value="size.id"/>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="调换数量" align="center">
          <template slot-scope="scope">
            <el-input-number style="width: 100%" :controls="false" v-model="scope.row.changeQuantity" :precision="0" :step="1" :min="0" :max="scope.row.quantity-scope.row.totalRefundQuantity"></el-input-number>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">关闭</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {changeColorOrSize, infoAndStock} from '@/api/shop/business/order/order'

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
        goodsList: [],
        rules:{}
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
        this.form.changeExpressAmount = 0
        this.form.changeReason = ''
        this.form.changeRemarks = ''
        this.show = true
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
        this.loading = true
        infoAndStock({id: this.form.id}).then(res => {
          this.goodsList = res.data.goodsList
          this.goodsList.forEach(g => {
            g.changeColorId = g.colorId
            g.changeSizeId = g.sizeId
            g.changeQuantity = 0
          })
        }).finally(() => this.loading = false)
      },
      save() {
        let changeList = this.goodsList.filter(g => g.changeQuantity > 0 && (g.changeColorId != g.colorId || g.changeSizeId != g.sizeId))
        let ele = {id: this.form.id, goodsList: changeList,changeExpressAmount:this.form.changeExpressAmount,changeReason:this.form.changeReason,changeRemarks:this.form.changeRemarks}
        if (changeList.length == 0) {
          this.$message({
            message: '没有调换的商品',
            type: 'warning'
          })
          return
        }
        this.$confirm('调换了' + changeList.length + '件商品,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          changeColorOrSize(ele).then(res => {
            this.$message({type: 'success', message: '操作成功!'})
            this.onClose()
            this.$emit("getList", {})
          }).finally(() => this.loading = false)
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped>

</style>
