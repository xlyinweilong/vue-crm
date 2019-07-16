<template>
  <el-dialog
    title="微信二维码"
    :visible="show"
    @close="onClose"
    width="45%">
    <div style="text-align: center">
      <qrcode :url="qrcode.url" :iconurl="qrcode.icon" :wid="200" :hei="200" :imgwid="53" :imghei="53"></qrcode>
      <div>
        使用微信扫描二维码，填写员工编号，微信会和该员工进行绑定
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {loadQrCode} from '@/api/manager/business/employ'
  import qrcode from 'vue_qrcodes'

  export default {
    name: 'user_qr_code',
    components: {
      qrcode
    },
    filters: {},
    directives: {},
    props: {
      show: {
        default: false
      }
    },
    data() {
      return {
        qrcode: {
          url: "https://cn.vuejs.org/",
          icon: "https://cn.vuejs.org/images/logo.png"
        },
        loading: false
      }
    },
    mounted() {
      this.loadQrCode()
    },
    methods: {
      onClose() {
        this.$emit("update:show", false)
      },
      loadQrCode() {
        this.loading = true
        alert(1)
        loadQrCode().then(res => {
          console.log(res.data)
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
