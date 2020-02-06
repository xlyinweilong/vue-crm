<template>
  <div class="app-container">
    <div class="filter-container">
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
      <el-table-column label="尺码" align="center">
        <template slot-scope="scope">
          {{ scope.row[0] }}
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row[1]" :precision="0" :step="1" :min="0" :max="999999" step-strictly :controls="false" @keyup.enter.native="save(scope.row)"></el-input-number>
          <el-button type="text" @click="save(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {allSize,saveSize} from '@/api/shop/config/goods/goods'

  export default {
    components: {},
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
      // 获取列表
      getList() {
        this.listLoading = true
        allSize().then(response => {
          this.list = response.data
        }).finally(() => this.listLoading = false)
      },
      save(row) {
        this.listLoading = true
        saveSize({name: row[0], sortIndex: row[1]}).then(res => {
          this.getList()
        }).catch(e => this.listLoading = false)
      }
    }
  }
</script>

<style scoped>

</style>
