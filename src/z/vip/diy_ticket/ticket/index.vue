<template>
  <div>
    <list ref="list" v-show="status == 'list'" @changeStatus="changeStatus"/>
    <detail ref="detail" v-show="status == 'save'" @changeStatus="changeStatus"/>
    <goodsList ref="goodsList" v-if="status == 'goodsList'" @changeStatus="changeStatus"/>
  </div>
</template>

<script>
  import list from "./list";
  import detail from "./detail";
  import goodsList from "./goodsList";

  export default {
    components: {
      detail,
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
        if (this.status == 'save') {
          this.$refs.detail.getInfo(ele.id)
        } else if (this.status == 'list') {
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
