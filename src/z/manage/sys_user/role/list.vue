<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="角色名称" clearable v-model.trim="listQuery.searchKey" style="width: 200px;"
                class="filter-item" @keyup.enter.native="getList"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">
        查询
      </el-button>
    </div>
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增
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
      <el-table-column label="角色名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column label="平台-后台" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.platformCrmWeb ? 'success':'warning'" v-text="scope.row.platformCrmWeb ? '是':'否'"/>
        </template>
      </el-table-column>
      <el-table-column label="平台-小程序员工端" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.platformCrmEmploy ? 'success':'warning'" v-text="scope.row.platformCrmEmploy ? '是':'否'"/>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="450" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="editUsers(scope.row)">角色用户</el-button>
          <el-button :disabled="!scope.row.platformCrmWeb" type="text" @click="power(scope.row)">权限-后台</el-button>
          <el-button :disabled="!scope.row.platformCrmEmploy" type="text" @click="powerCrmEmploy(scope.row)">权限-小程序员工端</el-button>
          <el-button :disabled="scope.row.type == 'root'" type="text"
                     @click="deleteEle(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <saveCom ref="saveCom" @getList="getList"/>
    <powerCom ref="powerCom" @getList="getList"/>
    <power_crm_employ ref="power_crm_employ" @getList="getList"/>
    <role_user ref="role_user" @getList="getList"/>
  </div>
</template>

<script>
    import {getList, deleteEle} from '@/api/manager/sys_user/role'
    import Pagination from '@/components/Pagination'
    import saveCom from './save'
    import powerCom from './power'
    import Power_crm_employ from "./power_crm_employ";
    import Role_user from "./role_user";

    export default {
        components: {
            Role_user,
            Power_crm_employ,
            Pagination, saveCom, powerCom
        },
        filters: {},
        directives: {},
        data() {
            return {
                show: false,
                listQuery: {
                    disabled: 0,
                    pageIndex: 1,
                    pageSize: 10,
                    searchKey: ''
                },
                list: [],
                total: 0,
                listLoading: false
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            add() {
                this.$refs.saveCom.onOpen({id: ''})
            },
            edit(row) {
                this.$refs.saveCom.onOpen(row)
            },
            editUsers(row){
                this.$refs.role_user.onOpen(row)
            },
            power(row) {
                this.$refs.powerCom.onOpen(row.id)
            },
            powerCrmEmploy(row) {
                this.$refs.power_crm_employ.onOpen(row.id)
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
            },
            deleteEle(row) {
                this.$confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true
                    deleteEle({ids: [row.id]}).then(() => {
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
