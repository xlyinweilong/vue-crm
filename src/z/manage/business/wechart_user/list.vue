<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input class="filter-item" style="width: 200px;" placeholder="微信昵称" @keyup.enter.native="getList"
                v-model="listQuery.nickName" clearable/>
      <el-input placeholder="手机号" clearable v-model.trim="listQuery.mobile" style="width: 200px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">
        查询
      </el-button>
      <el-button :disabled="total==0" :loading="listLoading" class="filter-item" icon="el-icon-download" type="warning"
                 plain @click="exportExcel">导出
      </el-button>
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
      <el-table-column label="小程序注册时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="微信头像" align="center">
        <template slot-scope="scope">
          <el-image style="width: 50px; height: 50px" :src="scope.row.avatarUrl" fit="fit"
                    :preview-src-list="srcAvatarUrlList(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column label="微信昵称" align="center">
        <template slot-scope="scope">
          {{ scope.row.nickName }}
        </template>
      </el-table-column>
      <el-table-column label="微信性别" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.gender == 1">男</el-tag>
          <el-tag v-if="scope.row.gender == 2" type="success">女</el-tag>
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
      <el-table-column label="默认手机号" align="center">
        <template slot-scope="scope">
          {{ scope.row.defaultVipMobile }}
        </template>
      </el-table-column>
      <el-table-column v-for="diy in diyConfigList" :label="diy.fieldName" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row['diy' + diy.fieldIndex] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="员工编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.employCode }}
        </template>
      </el-table-column>
      <el-table-column label="员工名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.employName }}
        </template>
      </el-table-column>
      <el-table-column label="洗衣币余额" align="center">
        <template slot-scope="scope">
          {{ scope.row.washingBalance }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="bindEmploy(scope.row)">绑定员工</el-button>
          <el-button type="text" @click="addBalance(scope.row)">充值</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <bindEmploy ref="bindEmploy" @getList="getList"/>
    <add_balance ref="addBalance" @getList="getList" />
  </div>
</template>

<script>
    import {getList, exportExcel} from '@/api/user/user'
    import {all as diyConfigList} from '@/api/manager/platform/userInfoField'
    import Pagination from '@/components/Pagination'
    import bindEmploy from './bind_employ'
    import Add_balance from "./add_balance";

    export default {
        components: {Add_balance, Pagination, bindEmploy},
        filters: {},
        directives: {},
        data() {
            return {
                diyConfigList: [],
                showDiy: true,
                list: [],
                total: 0,
                listLoading: false,
                selectedIds: [],
                listQuery: {
                    nickName: '',
                    pageIndex: 1,
                    pageSize: 10,
                    mobile: ''
                }
            }
        },
        mounted() {
            this.getDiyConfig()
            this.getList()
        },
        methods: {
            srcAvatarUrlList(row) {
                let list = []
                list.push(row.avatarUrl)
                return list
            },
            //查询自定义配置
            async getDiyConfig() {
                this.listLoading = true
                await diyConfigList().then(res => this.diyConfigList = res.data).finally(() => this.listLoading = false)
            },
            bindEmploy(row) {
                this.$refs.bindEmploy.onOpen(row)
            },
            addBalance(row){
                this.$refs.addBalance.onOpen(row)
            },
            exportExcel() {
                this.listLoading = true
                exportExcel(this.listQuery).then(res => {
                }).finally(() => this.listLoading = false)
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
