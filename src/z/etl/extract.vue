<template>
  <div>
    <div class="tab-container">
      <el-row :gutter="20" style="margin-left: 0px;margin-right: 0px;padding-left: 10px;padding-right: 10px;border-top-width: 10px;padding-top: 10px;">
        <el-col :span="24">
          <el-button class="filter-item" type="primary" :loading="loading" @click="startEtl">抽取新数据</el-button>
          <p v-if="lastEle != null">上次完成：{{lastEle.endDate}}</p>
          <p v-if="lastEle != null">上次抽取用时：{{lastEle.useTime}}</p>
        </el-col>
        <el-col :span="24" v-show="extracting">
          <p v-show="status.status !== 'EXTRACTING'">启动JOB<br/></p>
          <p v-show="status.status === 'EXTRACTING'">JOB开始<br/></p>
          <p v-show="status.status === 'EXTRACTING' && status.totalStep > 0">进度为：{{status.nowStep}}/{{status.totalStep}}</p>
          <p v-show="status.status === 'EXTRACTING'">正在：{{status.nowName}}</p>
          <p v-show="status.status === 'EXTRACTING'">{{callinTime}}</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {startEtl, lastExtract, getStatus} from '@/api/etl/etl'
  import countTo from 'vue-count-to';

  export default {
    name: 'extract',
    components: {countTo},
    data() {
      return {
        lastEle: null,
        loading: false,
        extracting: false,
        status: {status: ''},
        callinTime: ''
      }
    },
    created() {
      // this.getLast()
    },
    methods: {
      //ETL抽取数据
      startEtl() {
        this.loading = this.extracting = true
        this.status.status = ''
        startEtl({}).then(response => {
          this.start(true)
          this.getStatus()
        }).catch(() => {
          this.extracting = this.loading = false
          this.start(false)
        })
      },
      getLast() {
        this.loading = true
        lastExtract({}).then(response => {
          this.lastEle = response.data
        }).finally(() => this.loading = false)
      },
      getStatus() {
        getStatus({}).then(response => {
          this.status = response.data
          if (this.status != null) {
            if (this.status.status === 'EXTRACTING') {
              //加载中
              setTimeout(() => this.getStatus(), 2000)
            } else {
              this.$message({message: '抽取完成', type: 'success'})
              this.extracting = this.loading = false
              this.getLast()
              this.start(false)
            }
          }
        }).catch(() => {
          this.extracting = this.loading = false
          this.start(false)
        })
      },
      start(bolean) {
        let _this = this
        let hour, minute, second
        hour = minute = second = 0
        if (bolean === true) {
          _this.timer = setInterval(function () {
            if (second >= 0) {
              second = second + 1
            }
            if (second >= 60) {
              second = 0
              minute = minute + 1
            }
            if (minute >= 60) {
              minute = 0
              hour = hour + 1
            }
            _this.callinTime = (hour > 0 ? hour + '时' : '') + (minute > 0 ? minute + '分' : '') + second + '秒'
          }, 1000)
        } else {
          window.clearInterval(_this.timer)
        }
      }
    }
  }
</script>
