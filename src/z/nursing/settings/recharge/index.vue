<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      fit
      border
    >
      <el-table-column label="支付金额" align="center">
        <template slot-scope="scope">
          {{ scope.row.payAmount }}
        </template>
      </el-table-column>
      <el-table-column label="得到换新币" align="center">
        <template slot-scope="scope">
          {{ scope.row.nursingAmount }}
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">
          {{ scope.row.orderIndex }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteEle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <save ref="save" @getList="getList"/>
  </div>
</template>

<script>
    import {getList, deleteEle} from '@/api/nursing/nursingRechargeConfig'
    import Save from "./save";

    export default {
        components: {Save},
        filters: {},
        directives: {},
        data() {
            return {
                list: [],
                listLoading: false
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            add() {
                this.$refs.save.onOpen({orderIndex: this.list.length})
            },
            edit(row) {
                this.$refs.save.onOpen(row)
            },
            getList() {
                this.listLoading = true
                getList().then(res => {
                    this.list = res.data
                }).finally(() => this.listLoading = false)
            },
            deleteEle(row) {
                this.$confirm('确定要删除选中的记录吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true
                    deleteEle({id: row.id}).then(() => {
                        this.$message({type: 'success', message: '删除成功!'})
                        this.getList()
                    }).catch(() => {
                        this.listLoading = false
                    })
                })
            }
        }
    }
</script>

<style scoped>

</style>
