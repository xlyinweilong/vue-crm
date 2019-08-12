<template>
  <el-dialog width="50%" title="设置卡颜色" :visible.sync="show" :before-close="onClose" @open="onOpen">
    <div>
      <el-carousel ref="carouselRef" :interval="4000" type="card" @change="changeImage" :autoplay="false">
        <el-carousel-item v-for="item in colorList" :key="item.id">
          <el-image :src="baseUrl + item.url"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">关闭</el-button>
      <el-button type="primary" @click="save" :disabled="activityUrl == null || activityUrl == ''">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {setGradeImage} from '@/api/vip/grade/grade'
  import {getList, setDefaultGrade} from '@/api/vip/grade/grade'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'set_grade_color',
    components: {
      Pagination
    },
    filters: {},
    directives: {},
    props: {
      show: {
        default: false
      },
      colorList: {
        default: []
      },
      eleId: {
        default: ''
      },
      eleUrl: {
        default: ''
      }
    },
    data() {
      return {
        activityUrl: '',
        loading: false,
        baseUrl: process.env.BASE_API + "/static/images/card/"
      }
    },
    mounted() {
    },
    methods: {
      onOpen() {
        this.activityUrl = this.eleUrl
        console.log(this.activityUrl);
        this.$nextTick(() => {
          if(this.activityUrl != null){
            this.$refs.carouselRef.setActiveItem(this.colorList.findIndex(c => c.url === this.eleUrl))
          }else{
            this.activityUrl = this.colorList[0].url
            this.$refs.carouselRef.setActiveItem(0)
          }
        })
      },
      changeImage(e) {
        this.activityUrl = this.colorList[e].url
      },
      save() {
        this.loading = true
        setGradeImage({cardImageUrl: this.activityUrl, id: this.eleId}).then(res => {
          this.$message({type: 'success', message: '保存成功!'})
          this.onClose()
          this.$emit('getList', {})
        }).finally(() => this.loading = false)

      },
      onClose() {
        this.$emit('update:show', false)
      }
    }
  }
</script>

<style scoped>
</style>
