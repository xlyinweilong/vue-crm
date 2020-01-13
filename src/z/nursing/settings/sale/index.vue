<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      fit
      border
    >
      <el-table-column label="支付方式" align="center">
        <template slot-scope="scope">
          {{ scope.row.paymentName }}
        </template>
      </el-table-column>
      <el-table-column label="每消费N元得1换新币" align="center">
        <template slot-scope="scope">
          {{ scope.row.nursingSale }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <save ref="save" @getList="getList"/>
  </div>
</template>

<script>
  import {getList} from '@/api/nursing/payment'
  import Pagination from '@/components/Pagination'
  import Save from "./save";

  export default {
    components: {Save, Pagination},
    filters: {},
    directives: {},
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          pageIndex: 1,
          pageSize: 10
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      edit(row) {
        this.$refs.save.onOpen(row)
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      }
    }
  }
</script>

<style scoped>

</style>
