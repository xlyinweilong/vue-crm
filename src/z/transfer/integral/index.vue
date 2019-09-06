<template>
  <div class="app-container">
    <el-tabs type="border-card" v-model="tabName" @tab-click="tabClick">
      <el-tab-pane label="积分记录" name="integralList">
        <integralList ref="integralList"/>
      </el-tab-pane>
      <el-tab-pane label="积分配置" name="setFullInfoIntegral">
        <setFullInfoIntegral ref="setFullInfoIntegral"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import integralList from './integral_list'
  import setFullInfoIntegral from './set_full_info_integral'

  export default {
    components: {
      integralList,setFullInfoIntegral
    },
    filters: {},
    directives: {},
    data() {
      return {
        tabName: 'integralList'
      }
    },
    mounted() {
    },
    methods: {
      tabClick() {
        console.log(this.tabName);
      }
    }
  }
</script>

<style scoped>

</style>
