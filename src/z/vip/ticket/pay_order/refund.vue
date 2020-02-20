<template>
  <el-dialog
    title="退款"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="800px">
    <div v-loading="loading">
      <el-table
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        highlight-current-row
        fit
        border
      >
        <el-table-column label="选择" align="center" width="55">
          <template slot-scope="scope">
            <el-radio v-model="selectRow" :label="scope.row.id">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="卷号" align="center">
          <template slot-scope="scope">
            {{ scope.row.userCardCode }}
          </template>
        </el-table-column>
        <el-table-column label="领取时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.createDate }}
          </template>
        </el-table-column>
        <el-table-column label="卷类型" align="center">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="用户昵称" align="center">
          <template slot-scope="scope">
            {{ scope.row.userNickName }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">关闭</el-button>
      <el-button :loading="loading" type="primary" @click="refund">全额退款</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {refund, refundList} from '@/api/vip/ticket/payOrder'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    data() {
      return {
        detailCode:'',
        selectRow: '',
        loading: false,
        show: false,
        form: {
        },
        list: []
      }
    },
    mounted() {
    },
    methods: {
      handleSelectionChange(val) {
        this.selection = val
      },
      onClose() {
        this.show = false
      },
      onOpen(ele,detailCode) {
        this.detailCode = detailCode
        this.form = JSON.parse(JSON.stringify(ele))
        this.show = true
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
        this.selectRow = ''
        this.loading = true
        refundList({id: this.form.id}).then(res => {
          this.list = res.data
          if(this.list.length > 0){
            this.selectRow = this.list[0].id
          }
          if(this.detailCode != ''){
            let ele = this.list.find(l => l.userCardCode == this.detailCode)
            if(ele != null){
              this.selectRow = ele.id
            }
          }
        }).finally(() => this.loading = false)
      },
      refund() {
        if( this.selectRow == ''){
          this.$message.error('请选择要失效的卷')
          return
        }
        this.loading = true
        this.form.ticketDetailId = this.selectRow
        refund(this.form).then(res => {
          this.$message({message: '退款成功', type: 'success'})
          this.onClose()
          this.$emit("getList", {})
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
