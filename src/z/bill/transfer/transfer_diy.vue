<template>
  <el-dialog title="偏好设置" :visible="show" width="50%" @close="onClose" @open="onOpen">
    <el-table
      v-loading="loading"
      :data="diyConfig"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="选项">
      </el-table-column>
      <el-table-column
        label="设置">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.value"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose" :loading="loading">取消</el-button>
      <el-button type="primary" @click="save" :loading="loading">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {getDiy, saveDiy} from '@/api/bill/transfer'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'transfer_diy',
    components: {
      Pagination,
    },
    filters: {},
    directives: {},
    data() {
      return {
        diyConfig: [
          {id: 'SIZE_SALE', name: '尺码销售', value: 0},
          {id: 'TIME_SALE', name: '时间范围销售', value: 0},
          {id: 'DISCOUNT', name: '折扣', value: 0},
          {id: 'FIRST_IN_CHANNEL', name: '最早上柜时间', value: 0},
          {id: 'LAST_IN_CHANNEL', name: '最后上柜时间', value: 0},
          {id: 'SELL_THROUGH_RATE', name: '售罄率', value: 0},
          {id: 'SELL_TIME', name: '售卖时长', value: 0},
        ],
        loading: false
      }
    },
    props: {
      show: {default: false},
    },
    created() {
    },
    methods: {
      onOpen() {
        this.diyConfig = [
          {id: 'SIZE_SALE', name: '尺码销售', value: 0},
          {id: 'TIME_SALE', name: '时间范围销售', value: 0},
          {id: 'DISCOUNT', name: '折扣', value: 0},
          {id: 'FIRST_IN_CHANNEL', name: '最早上柜时间', value: 0},
          {id: 'LAST_IN_CHANNEL', name: '最后上柜时间', value: 0},
          {id: 'SELL_THROUGH_RATE', name: '售罄率', value: 0},
          {id: 'SELL_TIME', name: '售卖时长', value: 0},
        ]
        this.load()
      },
      onClose() {
        this.$emit('update:show', false)
      },
      load() {
        this.loading = true
        getDiy({}).then(response => {
          this.diyConfig.forEach(diy => {
            let d = response.data.find(d => d.id == diy.id)
            if (d != null) {
              diy.value = d.value
            }
          })
        }).finally(() => this.loading = false)
      },
      save() {
        this.loading = true
        saveDiy(this.diyConfig).then(response => {
          this.$message({type: 'success', message: '保存成功!'})
          this.load()
        }).finally(() => this.loading = false)
        this.onClose()
      },
    }
  }
</script>

<style scoped>

</style>
