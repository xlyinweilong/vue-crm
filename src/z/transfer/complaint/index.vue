<template>
  <div class="app-container">
    <el-tabs type="border-card" v-model="tabName" @tab-click="tabClick">
      <el-tab-pane label="投诉建议明细" name="complaint_list">
        <complaintList ref="complaintList"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import complaintList from './complaint_list'

  export default {
    components: {
      complaintList
    },
    filters: {},
    directives: {},
    data() {
      return {
        tabName: 'complaint_list'
      }
    },
    mounted() {
      this.$refs.complaintList.getList()
    },
    methods: {
      tabClick() {
        if (this.tabName == 'complaint_list') {
          this.$refs.complaintList.getList()
        }
      }
    }
  }
</script>

<style scoped>

</style>
