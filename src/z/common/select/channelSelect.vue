<template>
  <el-select :disable="isDisabled" v-model="tempChannelId" filterable clearable remote default-first-option placeholder="请输入渠道" :remote-method="searchChannel" :loading="loadingChannel" @change="changeSelect">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
    <el-option v-for="item in optionChannel" :value="item.id" :label="item.name +'-'+item.code"/>
  </el-select>
</template>

<script>
  import {getList as getChannelList} from '@/api/info/channel'

  export default {
    computed: {},
    name: "channelSelect",
    data() {
      return {
        loadingChannel: false,
        optionChannel: [],
        tempChannelId: ''
      };
    },
    props: {
      channelId: {default: ''},
      channelName: {default: ''},
      channelCode: {default: ''},
      isDisabled: {default: false}
    },
    watch: {
      channelId: 'initChannel'
    },
    created() {
      this.initChannel()
    },
    methods: {
      initChannel() {
        this.tempChannelId = this.channelId
        this.optionChannel = []
        if (this.channelId != null && this.channelId != '') {
          this.optionChannel.push({id: this.channelId, name: this.channelName, code: this.channelCode})
        }
      },
      searchChannel(query) {
        if (query !== '') {
          this.loadingChannel = true
          getChannelList({pageIndex: 1, pageSize: 10, searchKey: query}).then(response => {
            this.optionChannel = response.data.content
          }).finally(() => this.loadingChannel = false)
        } else {
          this.optionChannel = []
        }
      },
      changeSelect() {
        this.$emit("update:channelId", this.tempChannelId)
      }
    }
  }
</script>
