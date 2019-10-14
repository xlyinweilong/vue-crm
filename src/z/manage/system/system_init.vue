<template>
  <div class="app-container">
    <el-form v-loading="loading" ref="form">
      <el-form-item>
        是否已经初始化过
        <el-tag v-if="isInit == 1" type="success">是</el-tag>
        <el-tag v-if="isInit == 0" type="danger">否</el-tag>
      </el-form-item>
      <el-form-item>
        1.初始化前，请先配置好小程序appId和appSecret，公众平台appId和appSecret，在微信开放平台关联小程序和公众平台。<br/>
        2.认证小程序、公众平台、开放平台<br/>
        2.开通公众平台【微信门店】、【微信卡券】、【微信支付】，开通小程序【公众号关注组件】<br/>
        3.联系管理员，安装好客户端，并配置好数据接口通道。
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="save">初始化</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {init, save} from '@/api/manager/system/system_init'

  export default {
    components: {},
    filters: {},
    directives: {},
    data() {
      return {
        isInit: 0,
        loading: false
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.loading = true
        init().then(res => {
          this.isInit = res.data
        }).finally(() => this.loading = false)
      },
      save() {
        this.loading = true
        save().then(res => {
          this.$message({message: '初始化成功', type: 'success'})
          this.isInit = res.data
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
