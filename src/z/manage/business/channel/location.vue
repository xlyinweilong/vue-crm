<template>
  <el-dialog
    :title="'坐标：'+ele.name"
    :visible.sync="show"
    :before-close="onClose"
    @open="onOpen"
    top="3vh"
    width="80%">
    <div>
      <span>城市：</span>
      <el-input v-model="cityName" style="width: 200px" :disabled="loading" placeholder="例如：北京市天安门" @keyup.enter.native="searchCity"></el-input>
      <el-button type="primary" plain @click="searchCity" :loading="loading">定位</el-button>
    </div>
    <div v-loading="loading" id="container" style="width: 100%;height: 500px;margin-top: 10px"></div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="onClose">取消</el-button>
    <el-button type="primary" @click="save" :loading="loading">确定</el-button>
  </span>
  </el-dialog>
</template>

<script>
  import {saveLocation} from '@/api/manager/business/channel'
  import Pagination from '@/components/Pagination'


  export default {
    name: 'channelLocation',
    components: {
      Pagination
    },
    filters: {},
    directives: {},
    props: {
      show: {
        default: false
      },
      ele: {
        default: {}
      }
    },
    data() {
      return {
        cityName: '',
        loading: false,
        marker: null,
        map: null
      }
    },
    mounted() {

    },
    methods: {
      onOpen() {
        this.location()
      },
      onClose() {
        this.$emit('update:show', false)
      },
      searchCity() {
        let geocoder = new qq.maps.Geocoder()
        geocoder.setComplete(result => {
          this.map.setCenter(result.detail.location)
          this.marker.setPosition(result.detail.location)
        })
        geocoder.setError(result => {
          this.$message.error("无法定位：" + this.cityName)
        })
        geocoder.getLocation(this.cityName)
      },
      location() {
        this.$nextTick(() => {
          let _this = this
          if (this.ele.lat == null || this.ele.lng == null) {
            _this.loading = true
            _this.map = new qq.maps.Map(document.getElementById('container'), {
              center: new qq.maps.LatLng(39.916527, 116.397128),
              zoom: 13
            })
            //获取城市列表接口设置中心点
            var citylocation = new qq.maps.CityService({
              complete: function (result) {
                _this.map.setCenter(result.detail.latLng);
                //设置坐标
                _this.marker = new qq.maps.Marker({
                  position: _this.map.getCenter(),
                  draggable: true,
                  map: _this.map,
                  title: _this.ele.name
                })
                _this.loading = false
              }
            })
            //调用searchLocalCity();方法    根据用户IP查询城市信息。
            citylocation.searchLocalCity();
          } else {
            _this.map = new qq.maps.Map(document.getElementById('container'), {
              center: new qq.maps.LatLng(this.ele.lat, this.ele.lng),
              zoom: 15
            })
            _this.marker = new qq.maps.Marker({
              position: new qq.maps.LatLng(this.ele.lat, this.ele.lng),
              draggable: true,
              map: _this.map,
              title: _this.ele.name
            })
          }
        })
      },
      save() {
        this.loading = true
        let location = this.marker.getPosition()
        saveLocation({id: this.ele.id, lng: location.lng, lat: location.lat}).then(res => {
          this.$message({type: 'success', message: '保存成功!'})
          this.onClose()
          this.$emit('getList', {})
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
