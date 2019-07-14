<template>
  <div>
    <sticky class-name="sub-navbar draft">
      <el-button style="margin-left: 10px;" type="success" @click="saveData" :loading="loading">保存</el-button>
    </sticky>
    <div class="tab-container">
      <el-form ref="configForm" :model="form" :rules="rules" v-loading="loading">
        <el-tabs style="margin-top:15px;" type="border-card">
          <el-tab-pane label="系统配置">
            <el-table
              v-loading="loading"
              :data="systemList"
              tooltip-effect="dark"
              style="width: 100%"
              fit
              border
            >
              <el-table-column label="控制名称" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="参数" align="center">
                <template slot-scope="scope">
                  <span>
                    <el-select v-if="scope.row.valueType === 0" v-model="scope.row.defaultValue" placeholder="请选择"><el-option v-for="(ele,index) in scope.row.valueSelect.split(',')" :value="index" :label="ele"></el-option></el-select>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="仓库默认配置">
            <el-table
              v-loading="loading"
              :data="warehouseList"
              tooltip-effect="dark"
              style="width: 100%"
              fit
              border
            >
              <el-table-column label="控制名称" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="参数" align="center">
                <template slot-scope="scope">
                  <span>
                    <el-select v-if="scope.row.valueType === 0" v-model="scope.row.defaultValue" placeholder="请选择"><el-option v-for="(ele,index) in scope.row.valueSelect.split(',')" :value="index" :label="ele"></el-option></el-select>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="渠道默认配置">
            <el-table
              v-loading="loading"
              :data="channelList"
              tooltip-effect="dark"
              style="width: 100%"
              fit
              border
            >
              <el-table-column label="控制名称" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="参数" align="center">
                <template slot-scope="scope">
                  <span>
                    <el-select v-if="scope.row.valueType === 0" v-model="scope.row.defaultValue" placeholder="请选择"><el-option v-for="(ele,index) in scope.row.valueSelect.split(',')" :value="index" :label="ele"></el-option></el-select>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </div>
</template>

<script>

  import {getAll,save} from '@/api/config/config'
  import Sticky from '@/components/Sticky'

  export default {
    name: 'sysconfig',
    components: {Sticky},
    watch: {},
    filters: {},
    data() {
      return {
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
      this.loading = true
      getAll().then(response => {
        this.list = response.data
        this.systemList = this.list.filter(r => r.type === 'system')
        this.warehouseList = this.list.filter(r => r.type === 'warehouse')
        this.channelList = this.list.filter(r => r.type === 'channel')
        //加载数据
      }).finally(() => this.loading = false)
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
