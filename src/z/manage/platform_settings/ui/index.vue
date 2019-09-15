<template>
  <div class="app-container">
    <el-tabs type="border-card" v-model="tabName" @tab-click="tabClick">
      <el-tab-pane label="首页" name="interfaceSettings">
        <interfaceSettings ref="interfaceSettings"/>
      </el-tab-pane>
      <el-tab-pane label="用户资料字段" name="userInfoField">
        <userInfoField ref="userInfoField"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import interfaceSettings from './interface_settings'
  import userInfoField from './user_info_field'

  export default {
    components: {
      interfaceSettings,userInfoField
    },
    filters: {},
    directives: {},
    data() {
      return {
        tabName: 'interfaceSettings'
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
