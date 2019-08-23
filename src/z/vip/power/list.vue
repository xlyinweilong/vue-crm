<template>
  <div class="app-container">
    <el-tabs v-model="tabName" @tab-click="tabClick" type="border-card">
      <el-tab-pane name="templateList" label="字段管理">
        <templateList ref="templateList"/>
      </el-tab-pane>
      <el-tab-pane name="gradeList" label="等级权益">
        <gradeList ref="gradeList"/>
      </el-tab-pane>
      <el-tab-pane name="detail" label="明细编辑">
        <detail ref="detail"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import gradeList from './grade_list'
  import templateList from './template_list'
  import detail from './detail'

  export default {
    components: {
      gradeList, templateList,detail
    },
    filters: {},
    directives: {},
    data() {
      return {
        tabName: "templateList",
      }
    },
    mounted() {
      this.$refs.templateList.getList()
    },
    methods: {
      tabClick(tab) {
        if (tab.name === 'gradeList') {
          this.$refs.gradeList.getList()
        } else if (tab.name === 'templateList') {
          this.$refs.templateList.getList()
        }else if(tab.name === 'detail'){
          this.$refs.detail.init()
        }
      }
    }
  }
</script>

<style scoped>

</style>
