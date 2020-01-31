<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select class="filter-item" clearable v-model="listQuery.isShow" placeholder="是否显示">
        <el-option :key="true" label="显示" :value="true"/>
        <el-option :key="false" label="不显示" :value="false"/>
      </el-select>
      <el-select class="filter-item" filterable clearable v-model="listQuery.pid" placeholder="选择上级分类">
        <el-option v-for="c in allCategoryList" :key="c.id" :label="c.name" :value="c.id"/>
      </el-select>
      <el-input placeholder="名称" clearable v-model.trim="listQuery.searchKey" style="width: 450px;" class="filter-item" suffix-icon="el-icon-search"/>
    </div>
    <!--<div class="filter-container">-->
    <!--<el-button :loading="listLoading" :disabled="total >= 30" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增</el-button>-->
    <!--</div>-->
    <el-table
      v-loading="listLoading"
      :data="pageList"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
    >
      <!--<el-table-column label="创建时间" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--{{ scope.row.createDate }}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <!--<el-table-column label="来源" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<el-tag v-if="scope.row.erpId" type="success">同步</el-tag>-->
      <!--<el-tag v-if="!scope.row.erpId">自建</el-tag>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="是否显示" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isShow" type="success">显示</el-tag>
          <el-tag v-if="!scope.row.isShow" type="info">不显示</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">
          {{scope.row.sortIndex}}
        </template>
      </el-table-column>
      <el-table-column label="上级分类" align="center">
        <template slot-scope="scope">
          {{getPname(scope.row.pid)}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <!--<el-button :disabled="scope.row.erpId != null" type="text" @click="deleteEle(scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="allList.length>0 && !listLoading" :total="allList.length" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize"/>
    <save ref="save" @getList="loadData"/>
  </div>
</template>

<script>

  import {allCategory2, allCategory} from '@/api/transfer/goods'
  import Pagination from '@/components/Pagination'
  import Save from "./save"

  export default {
    components: {Save, Pagination},
    filters: {},
    directives: {},
    computed: {
      pageList() {
        return this.allList.slice((this.listQuery.pageIndex - 1) * this.listQuery.pageSize, this.listQuery.pageIndex * this.listQuery.pageSize)
      },
      allList() {
        let list = this.list
        if (this.listQuery.searchKey != '') {
          list = list.filter(e => e.name.indexOf(this.listQuery.searchKey) > -1)
        }
        if (this.listQuery.origin == 'sync') {
          list = list.filter(e => e.erpId != null)
        }
        if (this.listQuery.origin == 'crm') {
          list = list.filter(e => e.erpId == null)
        }
        if (this.listQuery.isShow != '') {
          list = list.filter(e => e.isShow == this.listQuery.isShow)
        }
        if (this.listQuery.pid != '') {
          list = list.filter(e => e.pid == this.listQuery.pid)
        }
        return list
      }
    },
    data() {
      return {
        list: [],
        listLoading: false,
        total: 0,
        listQuery: {
          origin: '',
          isShow: '',
          searchKey: '',
          pageIndex: 1,
          pageSize: 10,
          pid: ''
        },
        allCategoryList: []
      }
    },
    mounted() {
      this.allCategory()
      this.loadData()
    },
    methods: {
      getPname(pid) {
        let p = this.allCategoryList.find(c => c.id === pid)
        if (p != null) {
          return p.name
        }
        return ''
      },
      async allCategory() {
        await allCategory().then(res => this.allCategoryList = res.data)
      },
      add() {
        this.$refs.save.onOpen({active: false})
      },
      edit(ele) {
        this.$refs.save.onOpen(ele)
      },
      loadData() {
        this.listLoading = true
        allCategory2().then(response => {
          this.list = response.data.sort((a, b) => a.sortIndex > b.sortIndex ? 1 : -1)
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
            this.loadData()
          }).catch(e => this.listLoading = false)
        })
      }
    }
  }
</script>

<style scoped>

</style>
