<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select :loading="loading"
                 class="filter-item" v-model="expressId" placeholder="请选择快递" @change="changeExpress">
        <el-option v-for="item in expressList" :key="item.id" :label="item.deliveryId + '-' + item.bizId" :value="item.id"/>
      </el-select>
      <el-select :loading="loading"
                 class="filter-item" v-model="serviceId" placeholder="请选择发货服务">
        <el-option v-for="item in serviceList" :key="item.serviceType" :label="item.serviceName" :value="item.serviceType"/>
      </el-select>
      <el-select :loading="loading" class="filter-item" v-model="sendId" filterable placeholder="请选择发货信息">
        <el-option v-for="item in sendList" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
      <el-tooltip class="item" effect="dark" content="预期的上门揽件时间，需大于当前时间，收件员会在预期时间附近上门。说明：若选择了预期揽件时间，请不要自己打单，由上门揽件的时候打印。" placement="top">
        <el-date-picker class="filter-item" v-model="expectTime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择上门时间"/>
      </el-tooltip>
      <el-button :loading="loading" :disabled="selection.length == 0" class="filter-item" icon="el-icon-check" type="primary" plain @click="save">
        确定打包
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table
            :data="props.row.goodsList"
            tooltip-effect="dark"
            style="width: 100%"
            fit
            border
          >
            <el-table-column label="货号" align="center">
              <template slot-scope="subScope">
                {{ subScope.row.goodsCode }}
              </template>
            </el-table-column>
            <el-table-column label="颜色" align="center">
              <template slot-scope="subScope">
                {{ subScope.row.colorName }}
              </template>
            </el-table-column>
            <el-table-column label="尺码" align="center">
              <template slot-scope="subScope">
                {{ subScope.row.sizeName }}
              </template>
            </el-table-column>
            <el-table-column label="数量" align="center">
              <template slot-scope="subScope">
                {{ subScope.row.quantity }}
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="收件人" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationReceiver }}
        </template>
      </el-table-column>
      <el-table-column label="手机" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationMobile }}
        </template>
      </el-table-column>
      <el-table-column label="省份" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationProvinceName }}
        </template>
      </el-table-column>
      <el-table-column label="城市" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationCityName }}
        </template>
      </el-table-column>
      <el-table-column label="地区" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationStationName }}
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center">
        <template slot-scope="scope">
          {{ scope.row.locationAddress }}
        </template>
      </el-table-column>
      <el-table-column label="发货数量" align="center">
        <template slot-scope="scope">
          {{ scope.row.quantity }}
        </template>
      </el-table-column>
      <el-table-column label="*包裹长(厘米)" align="center" fixed="right" width="100">
        <template slot-scope="scope">
          <el-input-number style="width: 100%" v-model="scope.row.spaceX" :precision="1" :step="0.1" :min="0" :max="999999" :controls="false"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="*包裹宽(厘米)" align="center" fixed="right" width="100">
        <template slot-scope="scope">
          <el-input-number style="width: 100%" v-model="scope.row.spaceY" :precision="1" :step="0.1" :min="0" :max="999999" :controls="false"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="*包裹高(厘米)" align="center" fixed="right" width="100">
        <template slot-scope="scope">
          <el-input-number style="width: 100%" v-model="scope.row.spaceZ" :precision="1" :step="0.1" :min="0" :max="999999" :controls="false"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="*重量(千克)" align="center" fixed="right" width="100">
        <template slot-scope="scope">
          <el-input-number style="width: 100%" v-model="scope.row.weight" :precision="2" :step="0.01" :min="0" :max="999999" :controls="false"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="保价(元)" align="center" fixed="right" width="100">
        <template slot-scope="scope">
          <el-input-number style="width: 100%" v-model="scope.row.insuredValue" :precision="2" :step="0.01" :min="0" :max="999999" :controls="false"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="快递备注信息" align="center" fixed="right" width="160">
        <template slot-scope="scope">
          <el-input v-model="scope.row.customRemark" placeholder="比如易碎物品"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {loadPackInfo, pack, getAccountList, getAllDelivery} from '@/api/shop/business/pack/pack'
  import {getAll as loadSenderList} from '@/api/shop/config/sender/sender'
  import Pagination from '@/components/Pagination'

  export default {
    components: {
      Pagination
    },
    filters: {},
    directives: {},
    data() {
      return {
        loading: false,
        list: [],
        goodsList: [],
        ids: [],
        expressList: [],
        expressId: '',
        sendId: '',
        expectTime: '',
        sendList: [],
        selection: [],
        allDelivery: [],
        serviceId: ''
      }
    },
    computed: {
      serviceList() {
        if (this.expressId != '') {
          let ex = this.expressList.find(e => e.id == this.expressId)
          if (ex != null) {
            return ex.serviceTypeList
          }
        }
        return []
      }
    },
    created() {
    },
    mounted() {
      this.loadExpressInfo()
      this.loadSenderList()
      // this.getAllDelivery()
      this.getList()
    },
    methods: {
      changeExpress(){
        this.serviceId = ''
        if(this.serviceList.length == 1){
          this.serviceId = this.serviceList[0].serviceType
        }
      },
      handleSelectionChange(val) {
        this.selection = val
      },
      async getAllDelivery() {
        await getAllDelivery().then(res => this.allDelivery = res.data.data)
      },
      async loadExpressInfo() {
        await getAccountList().then(res => this.expressList = res.data)
      },
      async loadSenderList() {
        await loadSenderList().then(res => this.sendList = res.data)
      },
      save() {
        let form = {list: this.selection}
        form.sendId = this.sendId
        let serviceType = this.serviceList.find(s => this.serviceId == s.serviceType)
        if (form.sendId == '') {
          this.$message.error('请选择发货信息')
          return
        }
        if(serviceType == null){
          this.$message.error('请选择发货服务')
          return
        }
        if(this.expressId == null){
          this.$message.error('请选择快递')
          return
        }
        form.expressAccountId = this.expressId
        form.serviceType = serviceType.serviceType
        form.serviceName = serviceType.serviceName
        form.expectTime = this.expectTime
        this.$confirm('确定要发起快递打包吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          pack(form).then(res => {
            this.$message({message: '保存成功', type: 'success'})
            this.onClose()
            this.getList()
          }).finally(() => this.loading = false)
        }).catch(() => {
        })
      },
      getList() {
        this.loading = true
        loadPackInfo().then(res => {
          this.selection = []
          this.list = res.data
          this.list.forEach(e => {
            e.quantity = e.goodsList.reduce((t, a) => t + a.quantity, 0)
          })
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
