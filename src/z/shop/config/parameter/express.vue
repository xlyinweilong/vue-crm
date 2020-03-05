<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="warning" plain @click="getAllAccount">同步数据</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="下单时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{scope.row.statusMean}}
        </template>
      </el-table-column>
      <el-table-column label="订单号" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getAllAccount, getAccountList} from '@/api/shop/business/pack/pack'

  export default {
    components: {},
    data() {
      return {
        list: [],
        listLoading: false
      }
    },
    created() {
    },
    methods: {
      init() {
        this.listLoading = true
        getAccountList().then().finally(() => this.listLoading = false)
      },
      getAllAccount() {
        this.$confirm('确定要同步数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          getAllAccount().then(res => {
            this.$message({message: '保存成功', type: 'success'})
            this.init()
          }).finally(() => this.listLoading = false)
        }).catch(() => {
        })

      }
    }
  }
</script>
