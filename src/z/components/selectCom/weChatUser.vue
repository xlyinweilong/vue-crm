<template>
  <span>
    <span style="cursor:pointer;" @click="openDialog">
      <el-input class="filter-item" style="cursor:pointer;" readonly :style="{'width':width+'px'}" v-model="input" placeholder="请选择用户"></el-input>
    </span>
    <el-dialog
      top="1vh"
      title="选择用户"
      :close-on-click-modal="false"
      :visible="show"
      @close="onClose"
      width="1100px">
       <div class="filter-container">
      <el-input class="filter-item" style="width: 200px;" placeholder="微信昵称" @keyup.enter.native="getList"
                v-model="listQuery.nickName" clearable/>
      <el-input placeholder="手机号" clearable v-model.trim="listQuery.mobile" style="width: 200px;" class="filter-item"
                @keyup.enter.native="getList"/>
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="45">
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
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </el-dialog>
  </span>

</template>

<script>

  import Pagination from '@/components/Pagination'
  import {getList} from '@/api/user/user'

  export default {
    components: {Pagination},
    filters: {},
    directives: {},
    props: {
      width: {
        default: 200
      }
    },
    data() {
      return {
        input: '',
        show: false,
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
    },
    methods: {
      save() {
        if (this.selectedIds.length > 1) {
          this.$message.error("只能选择一个对象")
          return
        }
        this.input = ''
        if (this.selectedIds.length > 0) {
          this.input = this.selectedIds[0].nickName
          this.$emit("changeUser", this.selectedIds[0])
        } else {
          this.$emit("changeUser", {})
        }
        this.onClose()
      },
      handleSelectionChange(val) {
        this.selectedIds = val
      },
      openDialog() {
        this.show = true
      },
      onClose() {
        this.show = false
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.selectedIds = []
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      }
    }
  }
</script>

<style>
</style>
