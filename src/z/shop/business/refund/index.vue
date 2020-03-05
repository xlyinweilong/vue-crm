<template>
  <div class="tab-container">
    <el-tabs v-model="tabName" style="margin-top:15px;" type="border-card" @tab-click="tabClick">
      <el-tab-pane label="退款申请审核" name="APPLY">
        <apply ref="apply"/>
      </el-tab-pane>
      <el-tab-pane label="退款快递打包" name="PACK">
        <packageEle ref="packageEle"/>
      </el-tab-pane>
      <el-tab-pane label="退款收到审核" name="RECEIVED">
        <received ref="received"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {loadPackInfo, pack, getAccountList} from '@/api/shop/business/pack/pack'
  import {getAll as loadSenderList} from '@/api/shop/config/sender/sender'
  import Pagination from '@/components/Pagination'
  import apply from './apply'
  import packageEle from './packageEle'
  import received from './received'

  export default {
    components: {
      Pagination, apply,packageEle,received
    },
    filters: {},
    directives: {},
    data() {
      return {
        tabName: 'APPLY',
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      tabClick() {
        if (this.tabName == 'APPLY') {
          this.$refs.apply.init()
        } else if (this.tabName == 'PACK') {
          this.$refs.packageEle.init()
        } else if (this.tabName == 'RECEIVED') {
          this.$refs.received.init()
        }
      }
    }
  }
</script>

<style scoped>

</style>
