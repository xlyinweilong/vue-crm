<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select class="filter-item" v-model="listQuery.canSendCard" clearable placeholder="可发送的用户">
        <el-option key="true" label="可发送" :value="true" />
        <el-option key="false" label="不可发送" :value="false" />
      </el-select>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">查询</el-button>
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
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="微信头像" align="center">
        <template slot-scope="scope">
          <el-image style="width: 50px; height: 50px" :src="scope.row.avatarUrl" fit="fit"/>
        </template>
      </el-table-column>
      <el-table-column label="微信昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickName }}
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.userNickName }}
        </template>
      </el-table-column>
      <el-table-column label="生日" align="center">
        <template slot-scope="scope">
          {{ scope.row.birthday }}
        </template>
      </el-table-column>
      <el-table-column label="获取完善资料积分" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isGodUserInfoIntegral" type="success">是</el-tag>
          <el-tag v-if="!scope.row.isGodUserInfoIntegral" type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="送券" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="与公众号24小时内有互动的用户，才能发送卡券" placement="top">
            <el-button type="primary" :disabled="scope.row.platformOpenId == null || !scope.row.canSendCard" plain icon="el-icon-s-ticket" @click="edit(scope.row)">送券</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <sendTicket ref="sendTicket"/>
  </div>
</template>

<script>
  import {getList, pushToWeChart} from '@/api/user/user'
  import sendTicket from './sendTicket'

  import Pagination from '@/components/Pagination'

  export default {
    components: {sendTicket, Pagination},
    filters: {},
    directives: {},
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          canSendCard:null,
          // isEmploy: false,
          pageIndex: 1,
          pageSize: 10
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      edit(row) {
        this.$refs.sendTicket.onOpen(row)
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      }
    }
  }
</script>

<style scoped>

</style>
