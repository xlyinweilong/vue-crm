<template>
  <div class="app-container">
    <div class="filter-container">
      <el-tooltip class="item" effect="dark" content="最多可以创建5个主题" placement="right">
        <el-button :loading="listLoading" :disabled="list.length >= 5" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增
        </el-button>
      </el-tooltip>
      <el-button :loading="listLoading" class="filter-item" type="warning" icon="el-icon-s-tools" @click="$router.push({ path: '/shop/config/components'})">组件定义</el-button>
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
    <save ref="save" @getList="getList"/>
    <color ref="color" @getList="getList"/>
    <design ref="design" @getList="getList"/>
  </div>
</template>

<script>

  import {all} from '@/api/shop/config/theme/theme'
  import Save from "./save";
  import Color from "./color";
  import design from "./index/design";

  export default {
    components: {
      Color,
      Save,
      design},
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
        this.$refs.save.onOpen({active: false})
      },
      edit(ele) {
        this.$refs.save.onOpen(ele)
      },
      color(ele){
        this.$refs.color.onOpen(ele)
      },
      indexPage(ele){
        this.$refs.design.onOpen(ele)
      },
      getList() {
        this.listLoading = true
        all().then(response => {
          this.list = response.data
        }).finally(() => this.listLoading = false)
      }
    }
  }
</script>

<style scoped>

</style>
