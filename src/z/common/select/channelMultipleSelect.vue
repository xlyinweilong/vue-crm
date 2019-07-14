<template>
  <el-select multiple collapse-tags :disabled="isDetail" v-model="channelIds" filterable clearable remote default-first-option placeholder="请输入渠道" :loading="loadingOptionChannelList" style="width: 100%" :remote-method="searchChannelOption">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
    <el-option v-for="item in optionChannelList" :value="item.id" :label="item.name +'-'+item.code"/>
  </el-select>
</template>

<script>
  import {getList as getChannelList} from '@/api/info/channel'

  export default {
    computed: {},
    data() {
      return {
        loadingOptionChannelList: false,
        optionChannelList: [],
        channelIds: []
      };
    },
    props: {
      isDetail: {default: false}
    },
    methods: {
      //搜索渠道
      searchChannelOption(query) {
        if (query !== '') {
          this.loadingOptionChannelList = true
          getChannelList({pageIndex: 1, pageSize: 10, searchKey: query}).then(response => {
            this.loadingOptionChannelList = false
            this.optionChannelList = response.data.content
          })
        } else {
          this.optionChannelList = []
        }
      }
    }
  }
</script>
