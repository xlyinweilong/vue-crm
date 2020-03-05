<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input class="filter-item" style="width: 200px;" placeholder="微信昵称" @keyup.enter.native="getList"
                v-model="listQuery.nickName" clearable/>
      <el-input placeholder="手机号" clearable v-model.trim="listQuery.mobile" style="width: 200px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-select class="filter-item" v-model="listQuery.printer" clearable placeholder="是否为打印员">
        <el-option key="1" label="是" value="1"/>
      </el-select>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">
        查询
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
      <el-table-column label="打印员" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.printer == 1">是</el-tag>
          <el-tag v-if="scope.row.printer == 0 || scope.row.printer == null" type="success">否</el-tag>
        </template>
      </el-table-column>
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
          <el-button type="text" @click="setPrint(scope.row)">设置打印员</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList} from '@/api/user/user'
  import Pagination from '@/components/Pagination'
  import {setPrinter} from '@/api/shop/business/pack/pack'

  export default {
    components: {Pagination},
    filters: {},
    directives: {},
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          nickName: '',
          pageIndex: 1,
          pageSize: 10,
          mobile: '',
          printer: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      srcAvatarUrlList(row) {
        let list = []
        list.push(row.avatarUrl)
        return list
      },
      setPrint(row) {
        let message = row.printer == 1 ? "取消" : "设置"
        this.$confirm('确定要' + message + '成打印员吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          setPrinter({id: row.id}).then(res => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getList()
          }).finally(() => this.listLoading = false)
        }).catch(() => {
        })
      },
      init() {
        this.getList()
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
