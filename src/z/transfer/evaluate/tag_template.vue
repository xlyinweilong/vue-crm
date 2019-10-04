<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="标签内容" clearable v-model.trim="listQuery.content" style="width: 250px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">查询</el-button>
    </div>
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="deleteElement" :disabled="listLoading || selectedIds.length == 0">删除</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      @selection-change="selectionChange"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
    >
      <el-table-column type="selection" width="35"/>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="标签内容" align="center">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="标签位置" align="center">
        <template slot-scope="scope">
          {{ scope.row.position }}
        </template>
      </el-table-column>
      <el-table-column label="标签类型" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type === 'FIXED'" type="success">固定</el-tag>
          <el-tag v-if="scope.row.type === 'RANDOM'">随机</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="标签权重" align="center">
        <template slot-scope="scope">
          {{ scope.row.randomWeight }}
        </template>
      </el-table-column>
      <el-table-column label="出现时分数" align="center">
        <template slot-scope="scope">
          {{ scope.row.showInScore }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <tagTemplateSave ref="tagTemplateSave" @getList="getList"/>
  </div>
</template>

<script>
  import {getList,deleteEle} from '@/api/transfer/evaluateTagTemplate'
  import Pagination from '@/components/Pagination'
  import tagTemplateSave from './tag_template_save'

  export default {
    components: {
      Pagination, tagTemplateSave
    },
    filters: {},
    directives: {},
    data() {
      return {
        listQuery: {
          pageIndex: 1,
          pageSize: 10,
          content: ''
        },
        selectedIds: [],
        list: [],
        total: 0,
        listLoading: false
      }
    },
    mounted() {
    },
    methods: {
      add() {
        this.$refs.tagTemplateSave.onOpen({id: ''})
      },
      edit(row) {
        this.$refs.tagTemplateSave.onOpen(row)
      },
      deleteElement() {
        this.$confirm('确定要删除选中的数据吗?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          deleteEle({ids: this.selectedIds.map(s => s.id)}).then(response => {
            this.$message({message: response.message, type: 'success'});
            this.getList()
          })
        })
      },
      //选择
      selectionChange(val) {
        this.selectedIds = val
      },
      // 获取列表
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.content
          this.total = response.data.totalElements
        }).finally(() => {
          this.listLoading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
