<template>
  <el-dialog
    title="二维码"
    :close-on-click-modal="false"
    :visible="show"
    width="400px"
    @close="onClose">
    <div style="text-align: center">
      <el-image
        v-loading="loading"
        style="width: 100%; height: 100%"
        :src="url"
        fit="fit"></el-image>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {createQrCode} from '@/api/vip/ticket/ticket'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    computed: {},
    data() {
      return {
        show: false,
        loading: false,
        url: ''
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.show = false
      },
      onOpen(ele) {
        this.form = JSON.parse(JSON.stringify(ele))
        this.show = true
        this.loading = true
        createQrCode({id: this.form.id}).then(res => {
          this.url = res.data.showQrcodeUrl
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
