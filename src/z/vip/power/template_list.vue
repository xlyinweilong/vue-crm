<template>
  <div>
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="deleteEle" :loading="listLoading" :disabled="selectedIds.length === 0">删除</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="35"/>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.templateName }}
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          {{ getMean(scope.row.templateType) }}
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">
          {{ scope.row.templateIndex }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <templateSave ref="templateSave" :show.sync="show" @getList="getList"/>
  </div>
</template>

<script>
  import {getList,deleteEle} from '@/api/vip/power/template'
  import templateSave from './template_save'

  export default {
    components: {
      templateSave
    },
    filters: {},
    directives: {},
    data() {
      return {
        list: [],
        listLoading: false,
        show: false,
        selectedIds:[]
      }
    },
    mounted() {
    },
    methods: {
      getMean(type) {
        switch (type) {
          case "STRING":
            return "字符串"
          case "BOOLEAN":
            return "布尔型"
        }
      },
      add() {
        this.$refs.templateSave.onOpen({
          templateName: '',
          templateType: 'STRING',
          templateIndex: 0
        })
        this.show = true
      },
      edit(row) {
        this.$refs.templateSave.onOpen(row)
        this.show = true
      },
      selectionChange(val) {
        this.selectedIds = val
      },
      // 获取列表
      getList() {
        this.listLoading = true
        getList().then(res => {
          this.list = res.data
        }).finally(() => this.listLoading = false)
      },
      deleteEle() {
        this.$confirm('确定要删除选中的记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          deleteEle({ids: this.selectedIds.map(s => s.id)}).then(() => {
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
