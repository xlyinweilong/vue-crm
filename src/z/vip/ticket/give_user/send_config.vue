<template>
  <div class="filter-container">
    <div v-loading="listLoading">
      <el-table
        v-loading="listLoading"
        :data="gradeList"
        tooltip-effect="dark"
        style="width: 100%"
        highlight-current-row
        fit
        border
      >
        <el-table-column label="编号" align="center">
          <template slot-scope="scope">
            {{ scope.row.code }}
          </template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="赠送卡券" align="center">
          <template slot-scope="scope">
            {{ scope.row.giveTicketName }}
          </template>
        </el-table-column>
        <el-table-column label="修改赠送卡券" align="center" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button type="primary" plain icon="el-icon-edit" @click="edit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <gradeGiveTicket ref="gradeGiveTicket" @getList="getAllGrade"/>
  </div>
</template>

<script>
  import {getAll as getAllGrade} from '@/api/vip/grade/grade'
  import gradeGiveTicket from './gradeGiveTicket'

  export default {
    components: {gradeGiveTicket},
    filters: {},
    directives: {},
    data() {
      return {
        gradeList: [],
        listLoading: false
      }
    },
    mounted() {
    },
    methods: {
      init() {
        this.getAllGrade()
      },
      edit(row) {
        this.$refs.gradeGiveTicket.onOpen(row)
      },
      getAllGrade() {
        this.listLoading = true
        getAllGrade().then(res => {
          this.gradeList = res.data.filter(d => d.disabled == 0)
        }).finally(e => this.listLoading = false)
      }
    }
  }
</script>

<style scoped>

</style>
