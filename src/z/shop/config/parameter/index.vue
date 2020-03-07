<template>
  <div>
    <div class="tab-container">
      <el-tabs v-model="tabName" style="margin-top:15px;" type="border-card" @tab-click="tabClick">
        <el-tab-pane label="商城参数配置" name="BASE">
          <baseEle ref="baseEle"/>
        </el-tab-pane>
        <el-tab-pane label="绑定的快递" name="EXPRESS">
          <expressEle ref="expressEle"/>
        </el-tab-pane>
        <el-tab-pane label="发货地址" name="SENDER">
          <senderLocation ref="senderLocation"/>
        </el-tab-pane>
        <el-tab-pane label="打印员设置" name="PRINTER">
          <printer ref="printer"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import baseEle from './base'
  import expressEle from './express'
  import senderLocation from './senderLocation'
  import printer from './printer'


  export default {
    components: {baseEle, expressEle, senderLocation, printer},
    data() {
      return {
        tabName: 'BASE'
      }
    },
    created() {
    },
    methods: {
      tabClick() {
        if (this.tabName == 'BASE') {
          this.$refs.baseEle.init()
        } else if (this.tabName == 'EXPRESS') {
          this.$refs.expressEle.init()
        } else if (this.tabName == 'SENDER') {
          this.$refs.senderLocation.init()
        } else if (this.tabName == 'PRINTER') {
          this.$refs.printer.init()
        }
      }
    }
  }
</script>
