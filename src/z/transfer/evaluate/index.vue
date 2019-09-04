<template>
  <div class="app-container">
    <el-tabs type="border-card" v-model="tabName" @tab-click="tabClick">
      <el-tab-pane label="评价明细" name="evaluate_list">
        <evaluateList ref="evaluateList"/>
      </el-tab-pane>
      <el-tab-pane label="标签模板" name="tag_template">
        <tagTemplate ref="tagTemplate"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import evaluateList from './evaluate_list'
  import tagTemplate from './tag_template'

  export default {
    components: {
      evaluateList,tagTemplate
    },
    filters: {},
    directives: {},
    data() {
      return {
        tabName: 'evaluate_list'
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
