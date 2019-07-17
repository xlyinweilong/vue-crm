<template>
  <el-dialog
    :visible="show"
    title="微信二维码"
    width="450px"
    @close="onClose"
    @open="onOpen">
    <div style="text-align: center;">
      <div>
        <img v-if="imgSrc != ''" :src="imgSrc" />
      </div>
      <div id="userRqCode" ref="qrcode" style="text-align: center;display:inline-block;position:relative;"/>
      <div style="margin-top: 15px;font-size: 12px;color:#909399">
        使用微信扫描二维码，填写员工编号，微信会和该员工进行绑定<br>
        右键点击二维码点击【图片另存为】可以下载图片
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { loadQrCode } from '@/api/manager/business/employ'
// import qrcode from 'vue_qrcodes'
import QRCode from 'qrcodejs2'

export default {
  name: 'UserQrCode',
  components: {
    QRCode
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
      imgSrc:'',
      qrcode: {
        url: '',
        icon: 'https://cn.vuejs.org/images/logo.png'
      },
      loading: false
    }
  },
  mounted() {
    this.loadQrCode()
  },
  methods: {
    onClose() {
      this.$emit('update:show', false)
    },
    onOpen() {
      this.$nextTick(() => {
        // this.qrCode(this.qrcode.url)
      })
    },
    loadQrCode() {
      this.loading = true
      loadQrCode().then(res => {
        this.imgSrc = res.data
        // this.qrcode.url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + res.data.appId + '&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1&redirect_uri=' + res.data.domain + '/' + res.data.appBase + '/static/login.html'
      }).finally(() => this.loading = false)
    },
    qrCode(url) {
      document.getElementById('userRqCode').innerHTML = ''
      const qrcode = new QRCode('userRqCode', {
        width: 200, // 图像宽度
        height: 200, // 图像高度
        colorDark: '#000000', // 前景色
        colorLight: '#ffffff', // 背景色
        typeNumber: 4,
        correctLevel: QRCode.CorrectLevel.M // 容错级别 容错级别有：（1）QRCode.CorrectLevel.L （2）QRCode.CorrectLevel.M （3）QRCode.CorrectLevel.Q （4）QRCode.CorrectLevel.H
      })
      qrcode.clear() // 清除二维码
      qrcode.makeCode(url) // 生成另一个新的二维码
    }
  }
}
</script>

<style scoped>

</style>
