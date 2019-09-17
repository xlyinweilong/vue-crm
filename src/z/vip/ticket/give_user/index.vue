<template>
  <div class="app-container">
    <el-tabs type="border-card" v-model="tabName" @tab-click="tabClick">
      <el-tab-pane label="用户列表" name="userList">
        <userList ref="userList"/>
      </el-tab-pane>
      <el-tab-pane label="赠送记录" name="sendLogList">
        <sendLogList ref="sendLogList"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import userList from './user_list'
  import sendLogList from './send_log_list'

  export default {
    components: {userList, sendLogList},
    filters: {},
    directives: {},
    data() {
      return {
        tabName: 'userList'
      }
    },
    mounted() {
    },
    methods: {
      tabClick() {
        if(this.tabName === 'sendLogList'){
          this.$refs.sendLogList.init()
        }else if(this.tabName === 'userList'){
          this.$refs.userList.getList()
        }
      }
    }
  }
</script>

<style scoped>

</style>
