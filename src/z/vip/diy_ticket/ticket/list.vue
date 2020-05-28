<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete"
                 @click="deleteElement" :disabled="listLoading || selectedIds.length == 0">失效
      </el-button>
    </div>
    <div class="filter-container">
      <el-input placeholder="编号" clearable v-model.trim="listQuery.code" style="width: 200px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-input placeholder="名称" clearable v-model.trim="listQuery.title" style="width: 200px;" class="filter-item"
                @keyup.enter.native="getList"/>
      <el-select class="filter-item" style="width: 100px;" v-model="listQuery.ticketType" clearable placeholder="类型">
        <el-option key="CASH" label="代金券" value="CASH"/>
        <el-option key="DISCOUNT" label="折扣券" value="DISCOUNT"/>
      </el-select>
      <el-select class="filter-item" style="width: 100px;" v-model="listQuery.disabled" clearable placeholder="禁用">
        <el-option key="false" label="启用" :value="false"/>
        <el-option key="true" label="禁用" :value="true"/>
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
      @selection-change="selectionChange"
      fit
      border
    >
      <el-table-column type="selection" width="40"/>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.cardType === 'CASH'" type="success">代金券</el-tag>
          <el-tag v-if="scope.row.cardType === 'DISCOUNT'" type="danger">折扣券</el-tag>
          <el-tag v-if="scope.row.cardType === 'GIFT'" type="warning">兑换券</el-tag>
          <el-tag v-if="scope.row.cardType === 'GROUPON'" type="info">团购券</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="库存数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.quantity }}
        </template>
      </el-table-column>
      <el-table-column label="已领取数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.receiveQuantity }}
        </template>
      </el-table-column>
      <el-table-column label="每人限制领取数" align="center">
        <template slot-scope="scope">
          {{ scope.row.getLimit }}
        </template>
      </el-table-column>
      <el-table-column label="起用时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.dateInfoType == 'DATE_TYPE_FIX_TIME_RANGE'">{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.dateInfoType == 'DATE_TYPE_FIX_TIME_RANGE'">{{ scope.row.endTime }}</span>
          <span v-if="scope.row.dateInfoType == 'DATE_TYPE_FIX_TERM'">{{ scope.row.fixedEndTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取后多少天内有效" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.dateInfoType == 'DATE_TYPE_FIX_TERM'">{{ scope.row.fixedTerm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取后多少天开始生效" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.dateInfoType == 'DATE_TYPE_FIX_TERM'">{{ scope.row.fixedBeginTerm }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上券架" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.onShelf" type="success">上</el-tag>
          <el-tag v-if="!scope.row.onShelf">下</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="禁用" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.disabled" type="success">是</el-tag>
          <el-tag v-if="!scope.row.disabled">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.disabled" type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button v-if="!scope.row.disabled" :disabled="scope.row.onShelfType == 'FULL_COURT'" type="text" @click="goodsList(scope.row)">适用商品</el-button>
          <el-button v-if="!scope.row.disabled" type="text" @click="uploadUser(scope.row)">指定用户</el-button>
          <el-button v-if="!scope.row.disabled" type="text" @click="showRef('qrCode',scope.row)">二维码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <qrCode ref="qrCode"/>
    <upload-user ref="uploadUser" @getList="getList"/>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex"
                :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {getList, deleteEle} from '@/api/vip/ticket/ticket'
  import Pagination from '@/components/Pagination'
  import qrCode from './qrCode'
  import UploadUser from "./uploadUser";

  export default {
    components: {
      Pagination, qrCode,UploadUser
    },
    filters: {},
    directives: {},
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        selectedIds: [],
        listQuery: {
          type: 'INDEPENDENT',
          code: '',
          title: '',
          ticketType: '',
          disabled: false,
          pageIndex: 1,
          pageSize: 10
        }
      }
    },
    created() {
    },
    mounted() {
      this.getList()
    },
    methods: {
      uploadUser(row) {
        this.$refs.uploadUser.onOpen(row)
      },
      add() {
        this.$emit("changeStatus", {status: "save", id: ''})
      },
      edit(row) {
        this.$emit("changeStatus", {status: "save", id: row.id})
      },
      goodsList(row) {
        this.$emit("changeStatus", {status: "goodsList", id: row.id})
      },
      showRef(ref, ele) {
        this.$refs[ref].onOpen(ele)
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          // sessionStorage.ticket_listQuery = JSON.stringify(this.listQuery)
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      },
      //选择
      selectionChange(val) {
        this.selectedIds = val
      },
      //删除
      deleteElement() {
        this.$confirm('确定要失效选中的数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteEle({ids: this.selectedIds.map(s => s.id)}).then(response => {
            this.$message({message: response.message, type: 'success'});
            this.getList()
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
