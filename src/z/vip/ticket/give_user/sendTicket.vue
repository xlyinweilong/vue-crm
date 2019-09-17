<template>
  <el-dialog
    title="赠送卡卷"
    :close-on-click-modal="false"
    width="65%"
    :visible="show"
    @close="onClose">
    <el-table
      v-loading="listLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      @selection-change="selectionChange"
      fit
      border
    >
      <el-table-column type="selection" width="35"/>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="卡卷名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <div slot="footer" class="dialog-footer">
      <el-button :disabled="selectedIds.length === 0" :loading="loading" type="primary" @click="sendTicket">赠送</el-button>
      <el-button :loading="loading" @click="onClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getList, sendTicket} from '@/api/vip/ticket/ticket'
  import Pagination from '@/components/Pagination'

  export default {
    components: {Pagination},
    filters: {},
    directives: {},
    props: {},
    computed: {},
    data() {
      return {
        ele: {},
        total: 0,
        list: [],
        show: false,
        selectedIds: [],
        listLoading: false,
        loading: false,
        listQuery: {
          IsChecked: 1,
          pageIndex: 1,
          pageSize: 10
        }
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.show = false
      },
      onOpen(row) {
        this.ele = row
        this.show = true
        this.getList()
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.selectedIds = []
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      },
      selectionChange(val) {
        this.selectedIds = val
      },
      sendTicket() {
        if (this.selectedIds.length > 1) {
          this.$message.error({message: '单次只能发1张'})
          return
        }
        this.loading = true
        let list = this.selectedIds.map(s => ({
          title: s.title, ticketId: s.id, cardId: s.cardId, userNickName: this.ele.userNickName,
          nickName: this.ele.nickName, userId: this.ele.id, platformOpenId: this.ele.platformOpenId
        }))
        sendTicket({list: list, platformOpenId: this.ele.platformOpenId}).then(res => {
          this.$message({message: '发送成功', type: 'success'})
          this.onClose()
          this.$emit("getList", {})
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
