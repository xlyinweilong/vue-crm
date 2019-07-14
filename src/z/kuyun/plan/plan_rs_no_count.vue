<template>
  <el-dialog title="未找到的货号" :visible="show" width="50%" @close="onClose" @open="onOpen">
    <el-table
      v-loading="loading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
    >
      <el-table-column label="货品编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.goodsCode }}
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !loading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose" :loading="loading">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getList} from '@/api/kuyun/planRsNoCount'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'plan_rs_no_count',
    components: {
      Pagination,
    },
    filters: {},
    directives: {},
    data() {
      return {
        listQuery: {
          rsId: '',
          pageIndex: 1,
          pageSize: 10
        },
        list: [],
        total: 0,
        loading: false
      }
    },
    props: {
      rsId: {default: ''},
      show: {default: false},
    },
    created() {
    },
    methods: {
      onOpen() {
        this.listQuery.rsId = this.rsId
        this.getList()
      },
      onClose() {
        this.$emit('update:show', false)
      },
      getList() {
        this.loading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.content
          this.total = response.data.totalElements
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
