<template>
  <div>
    <list ref="list" v-show="status == 'list'" @changeStatus="changeStatus"/>
    <goodsList ref="goodsList" v-if="status == 'goodsList'" @changeStatus="changeStatus"/>
  </div>
</template>

<script>
  import list from "./list";
  import goodsList from "./goodsList";

  export default {
    components: {
      list,
      goodsList
    },
    filters: {},
    directives: {},
    data() {
      return {
        status: "list"
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      changeStatus(ele) {
        this.status = ele.status
        if (this.status == 'list') {
          this.$refs.list.getList()
        } else if (this.status == 'goodsList') {
          this.$nextTick(() => {
            this.$refs.goodsList.init(ele.id)
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
