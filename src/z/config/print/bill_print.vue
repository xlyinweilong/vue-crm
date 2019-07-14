<template>
  <div>
    <sticky class-name="sub-navbar draft">
      <el-button style="margin-left: 10px;" type="success" @click="saveData" :loading="loading">保存</el-button>
    </sticky>
    <div class="tab-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>卡片名称</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        纸张类型
        <el-select v-model="paperType" placeholder="请选择">
          <el-option :label="'A4'" :value="'A4'"></el-option>
          <el-option :label="'80'" :value="'80'"></el-option>
          <el-option :label="'58'" :value="'58'"></el-option>
        </el-select>
      </el-card>
      <el-row :gutter="20">
        <el-col :span="6">


        </el-col>
        <el-col :span="18">
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

  import {getAll, save} from '@/api/config/config'
  import Sticky from '@/components/Sticky'


  export default {
    name: 'bill_print_config',
    components: {Sticky},
    watch: {},
    filters: {},
    data() {
      return {
        paperType:'',
        list: [],
        systemList: [],
        channelList: [],
        warehouseList: [],
        form: {
          roleId: '',
          roleName: '',
          selectPowerKeys: [],
          selectGoodsGroupIds: [],
          selectChannelGroupIds: [],
          selectWarehouseGroupIds: [],
          selectSupplierGroupIds: [],
        },
        loading: false,
        //新增修改
        saving: false,
        rules: {
          name: [{required: true, message: '必填字段', trigger: 'blur'}]
        }
      }
    },
    created() {
      // this.loading = true
      // getAll().then(response => {
      //   this.list = response.data
      //   this.systemList = this.list.filter(r => r.type === 'system')
      //   this.warehouseList = this.list.filter(r => r.type === 'warehouse')
      //   this.channelList = this.list.filter(r => r.type === 'channel')
      //   //加载数据
      // }).finally(() => this.loading = false)
    },
    methods: {
      saveData() {
        this.loading = true
        save(this.list).then(response => {
          this.$message({message: response.message, type: 'success'})
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
