<template>
  <div class="app-container">
    <div class="filter-container">
      <el-tooltip class="item" effect="dark" content="最多可以创建30个组件" placement="right">
        <el-button :loading="listLoading" :disabled="total >= 30" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增
        </el-button>
      </el-tooltip>
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
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="激活" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.active" type="success">激活</el-tag>
          <el-tag v-if="!scope.row.active" type="info">不激活</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="320" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="color(scope.row)">颜色配置</el-button>
          <el-button type="text" @click="indexPage(scope.row)">首页设计</el-button>
        </template>
      </el-table-column>
    </el-table>
    <save ref="save" @getList="getList" />
  </div>
</template>

<script>

  import {all,getList} from '@/api/shop/config/components/components'
  import Save from "./save"

  export default {
    components: {Save},
    filters: {},
    directives: {},
    data() {
      return {
        list: [],
        listLoading: false,
        total: 0,
        listQuery: {
          pageIndex: 1,
          pageSize: 10
        },
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      add() {
        this.$refs.save.onOpen({active: false})
      },
      edit(ele) {
        this.$refs.save.onOpen(ele)
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.content
          this.total = response.data.totalElements
        }).finally(() => this.listLoading = false)
      }
    }
  }
</script>

<style scoped>

</style>
