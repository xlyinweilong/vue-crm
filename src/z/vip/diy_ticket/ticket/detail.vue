<template>
  <div class="app-container">
    <el-tabs type="border-card" v-model="tabName">
      <el-tab-pane label="用户管理" name="BASE">
        <save ref="save" @changeStatus="changeStatus"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import save from "./save";

  export default {
    components: {save},
    filters: {},
    directives: {},
    data() {
      return {
        tabName: 'BASE',
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      changeStatus(ele) {
        this.$emit("changeStatus", ele)
      },
      getInfo(id){
        this.$refs.save.getInfo(id)
      }
    }
  }
</script>

<style scoped>

</style>
