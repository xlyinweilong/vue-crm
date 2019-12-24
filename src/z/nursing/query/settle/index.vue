<template>
  <div class="app-container">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="做结算" name="bill">
        <bill_list ref="bill_list"/>
      </el-tab-pane>
      <el-tab-pane label="结算单" name="settle">
        <settle_list ref="settle_list"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

  import Bill_list from "./bill_list";
  import Settle_list from "./settle_list";

  export default {
    components: {
      Settle_list,
      Bill_list
    },
    filters: {},
    directives: {},
    data() {
      return {
        activeName: 'bill'
      }
    },
    mounted() {
      // this.getList()
    },
    methods: {
      // 获取列表
      handleClick(tab, event) {
        if (this.activeName == 'bill') {
          this.$refs.bill_list.getList()
        } else if (this.activeName == 'settle') {
          this.$refs.settle_list.getList()
        }
      }
    }
  }
</script>

<style scoped>
</style>
