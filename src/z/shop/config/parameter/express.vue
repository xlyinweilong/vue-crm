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
      <el-table-column label="快递公司ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.deliveryId }}
        </template>
      </el-table-column>
      <el-table-column label="快递公司客户编码" align="center">
        <template slot-scope="scope">
          {{scope.row.bizId}}
        </template>
      </el-table-column>
      <el-table-column label="账号绑定时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="账号更新时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>
      <el-table-column label="绑定状态" align="center">
        <template slot-scope="scope">
          {{ scope.row.statusCodeMean }}
        </template>
      </el-table-column>
      <el-table-column label="账号别名" align="center">
        <template slot-scope="scope">
          {{ scope.row.alias }}
        </template>
      </el-table-column>
      <el-table-column label="账号绑定失败的错误信息（EMS审核结果）" align="center">
        <template slot-scope="scope">
          {{ scope.row.remarkWrongMsg }}
        </template>
      </el-table-column>
      <el-table-column label="账号绑定时的备注内容（提交EMS审核需要）" align="center">
        <template slot-scope="scope">
          {{ scope.row.remarkContent }}
        </template>
      </el-table-column>
      <el-table-column label="电子面单余额" align="center">
        <template slot-scope="scope">
          {{ scope.row.quotaNum }}
        </template>
      </el-table-column>
      <el-table-column label="电子面单余额更新时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.quotaUpdateTime }}
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
        getAccountList().then(res => this.list = res.data).finally(() => this.listLoading = false)
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
