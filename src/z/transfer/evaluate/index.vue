<template>
  <div class="app-container">
    <el-tabs type="border-card" v-model="tabName" @tab-click="tabClick">
      <el-tab-pane label="评价明细" name="evaluate_list">
        <evaluateList ref="evaluateList"/>
      </el-tab-pane>
      <el-tab-pane label="评价标签明细" name="evaluate_tag_list">
        <evaluateTagList ref="evaluateTagList"/>
      </el-tab-pane>
      <el-tab-pane label="评价员工明细" name="evaluate_employ_list">
        <evaluateEmployList ref="evaluateEmployList"/>
      </el-tab-pane>
      <el-tab-pane label="评价员工标签明细" name="evaluate_tag_employ_list">
        <evaluateTagEmployList ref="evaluateTagEmployList"/>
      </el-tab-pane>
      <el-tab-pane label="标签模板" name="tag_template">
        <tagTemplate ref="tagTemplate"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import evaluateList from './evaluate_list'
  import evaluateTagList from './evaluate_tag_list'
  import evaluateEmployList from './evaluate_employ_list'
  import evaluateTagEmployList from './evaluate_tag_employ_list'
  import tagTemplate from './tag_template'

  export default {
    components: {
      evaluateList, evaluateTagList, evaluateEmployList, tagTemplate,evaluateTagEmployList
    },
    filters: {},
    directives: {},
    data() {
      return {
        tabName: 'evaluate_list'
      }
    },
    mounted() {
      this.$refs.evaluateList.getList()
    },
    methods: {
      tabClick() {
        if (this.tabName == 'evaluate_list') {
          this.$refs.evaluateList.getList()
        } else if (this.tabName == 'evaluate_tag_list') {
          this.$refs.evaluateTagList.getList()
        } else if (this.tabName == 'evaluate_employ_list') {
          this.$refs.evaluateEmployList.getList()
        }else if (this.tabName == 'evaluate_tag_employ_list') {
          this.$refs.evaluateTagEmployList.getList()
        } else if (this.tabName == 'tag_template') {
          this.$refs.tagTemplate.getList()
        }
      }
    }
  }
</script>

<style scoped>

</style>
