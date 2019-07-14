<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-permission="'user_user_add'" class="filter-item" type="primary" icon="el-icon-plus" @click="createElement" :disabled="listLoading">新增</el-button>
      <el-button v-permission="'user_user_edit'" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="updateElement" :disabled="listLoading || selectedIds.length != 1">修改</el-button>
      <el-button v-permission="'user_user_delete'" class="filter-item" style="margin-left: 10px;" type="danger" icon="el-icon-delete" @click="deleteElement" :disabled="listLoading || selectedIds.length == 0 || selectedIds.some(r => r.sys === 1)">删除</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selectionChange"
      highlight-current-row
      fit
      border
    >
      <el-table-column type="selection" width="35"/>
      <el-table-column label="款式方式名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="系统默认" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.sys == 1 ? 'warning' : 'success'" v-text="scope.row.startUp == 1 ? '系统默认' : '自定义'"></el-tag>
        </template>
      </el-table-column>
      <el-table-column label="启用" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.startUp == 1 ? 'success' : 'danger'" v-text="scope.row.startUp == 1 ? '启用' : '禁用'"></el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogStatus==='create' ? '新增' : (temp.id == null ? '加载中...':'修改')" :visible.sync="dialogFormVisible">
      <el-form ref="paymentForm" :rules="rules" :model="temp" v-loading="saving || (dialogStatus !='create' && temp.id == null)">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="款式方式名称" prop="name">
              <el-input ref="paymentName" v-model="temp.name" placeholder="请输入款式方式名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="启用" prop="startUp">
              <el-select style="width: 100%" v-model="temp.startUp" placeholder="请选择">
                <el-option label="启用" :value="1"/>
                <el-option label="禁用" :value="0"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
        <el-button type="primary" @click="saveData" :loading="saving || (dialogStatus !='create' && temp.id == null)">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getList, save, deleteEle} from '@/api/config/payment'
  import permission from '@/directive/permission/index.js'

  export default {
    name: 'payment',
    components: {},
    directives: {permission},
    filters: {},
    data() {
      return {
        //列表相关
        listQuery: {
          pageIndex: 1,
          pageSize: 10,
          searchKey: ''
        },
        rules: {
          paymentName: [{required: true, message: '必填字段', trigger: 'blur'}],
          startUp: [{required: true, message: '必填字段', trigger: 'blur'}]
        },
        selectedIds: [],
        list: null,
        listLoading: false,
        temp: {},
        dialogStatus: '',
        dialogFormVisible: false,
        saving: false,
        gradeList: []
      }
    },
    created() {
      this.listLoading = true
      this.getList()
    },
    methods: {
      //获取列表
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.selectedIds = []
          this.list = response.data
        }).finally(() => this.listLoading = false)
      },
      //选择
      selectionChange(val) {
        this.selectedIds = val
      },
      //弹出框新增
      createElement() {
        this.temp = {id: '', name: '', startUp: 1}
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['paymentForm'].clearValidate()
        })
      },
      //弹出框修改
      updateElement() {
        this.createElement()
        this.dialogStatus = 'update'
        this.temp = this.list.find(r => r.id === this.selectedIds[0].id)
      },
      saveData() {
        this.$refs['paymentForm'].validate((valid) => {
          if (valid) {
            this.saving = true
            save(this.temp).then(response => {
              this.dialogFormVisible = false
              this.$message({message: response.message, type: 'success'});
              this.getList()
            }).finally(() => this.saving = false)
          }
        })
      },
      //删除
      deleteElement() {
        this.$confirm('确定要删除选中的数据吗?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
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
