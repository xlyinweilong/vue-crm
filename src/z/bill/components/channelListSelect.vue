<template>
  <el-dialog class="channel_list_dialog" title="选择渠道" :visible="show" width="65%" @close="onClose" @open="onOpen">
    <el-row :gutter="24">
      <el-col :span="24" style="text-align:center">
        <el-transfer v-loading="loading" class="goods_select_transfer" style="text-align: left; display: inline-block;" :titles="['待选渠道', '选择的渠道']" filterable filter-placeholder="请输入渠道" v-model="selectChannelList" :data="allChannelList" :props="props"/>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose" :loading="loading">取消</el-button>
      <el-button type="primary" @click="ok" :loading="loading">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>

  import {getChannelList} from '@/api/bill/bill'

  export default {
    computed: {},
    components: {},
    data() {
      return {
        loading: false,
        allChannelList: [],
        props: {
          key: 'code',
          label: 'showName'
        },
        selectChannelList: []
      };
    },
    props: {
      show: {default: false},
      channelList: {default: []},
    },
    methods: {
      onOpen() {
        //加载渠道
        this.loadChannelList()
      },
      //加载渠道
      loadChannelList() {
        this.loading = true
        getChannelList({}).then(response => {
          response.data.forEach(c => c.showName = c.code + ' -  ' + c.name)
          this.allChannelList = response.data
          this.selectChannelList = this.allChannelList.filter(c => this.channelList.some(cl => cl.code === c.code)).map(c => c.code)
        }).finally(() => this.loading = false)
      },
      onClose() {
        this.selectChannelList = []
        this.allChannelList = []
        this.$emit('update:show', false)
      },
      ok() {
        this.$emit('update:channelList', this.allChannelList.filter(c => this.selectChannelList.indexOf(c.code) > -1))
        this.onClose()
      }
    }
  }
</script>
<style>

  .channel_list_dialog .el-dialog .el-dialog__body {
    padding-bottom: 0px;
  }

  .channel_list_dialog {
    width: 100%;
  }

  .channel_list_dialog .el-transfer-panel {
    width: 42%;
  }

  .channel_list_dialog .el-transfer-panel .el-transfer-panel__body {
    height: 475px;
  }

  .channel_list_dialog .el-transfer-panel .el-transfer-panel__body .el-transfer-panel__list {
    height: 430px;
  }

</style>
