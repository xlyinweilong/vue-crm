<template>
  <el-dialog
    :visible="show"
    title="微信二维码"
    width="450px"
    @close="onClose"
    :close-on-click-modal="false">
    <div v-loading="loading" style="text-align: center;">
      <div>
        <img style="width: 350px" v-if="imgSrc != ''" :src="imgSrc"/>
      </div>
      <div style="margin-top: 15px;font-size: 12px;color:#909399">
        使用微信扫描二维码，已经注册小程序的用户可以直接投诉店铺<br/>
        右键点击二维码点击【图片另存为】可以下载图片
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {loadComplaintQrCode} from '@/api/manager/business/channel'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    data() {
      return {
        show: false,
        imgSrc: '',
        loading: false
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.show = false
      },
      onOpen(channelId) {
        this.show = true
        this.loading = true
        loadComplaintQrCode({channelId: channelId}).then(res => {
          this.imgSrc = res.data
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
