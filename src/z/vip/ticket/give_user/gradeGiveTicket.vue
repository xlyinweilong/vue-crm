<template>
  <el-dialog
    title="赠送卡券"
    :close-on-click-modal="false"
    width="650px"
    :visible="show"
    @close="onClose">
    <el-table
      ref="multipleTable"
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
      <el-table-column label="卡券名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <div slot="footer" class="dialog-footer">
      <el-button :disabled="selectedIds.length > 1" :loading="loading" type="primary" @click="save">确定</el-button>
      <el-button :loading="loading" @click="onClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getList} from '@/api/vip/ticket/ticket'
  import {saveAutoSendTicket} from '@/api/vip/grade/grade'
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
          this.$nextTick(() => {
            let ticket = this.list.find(l => l.cardId == this.ele.giveTicketCardId)
            if (ticket) {
              this.$refs.multipleTable.toggleRowSelection(ticket)
            } else {
              this.$refs.multipleTable.clearSelection()
            }
          })
        }).finally(() => this.listLoading = false)
      },
      selectionChange(val) {
        this.selectedIds = val
      },
      save() {
        this.loading = true
        let giveTicketCardId = null
        let giveTicketName = null
        if (this.selectedIds.length == 1) {
          giveTicketCardId = this.selectedIds[0].cardId
          giveTicketName = this.selectedIds[0].title
        }
        saveAutoSendTicket({id: this.ele.id, giveTicketCardId: giveTicketCardId, giveTicketName: giveTicketName}).then(res => {
          this.$message({message: '保存成功', type: 'success'})
          this.onClose()
          this.$emit("getList", {})
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
