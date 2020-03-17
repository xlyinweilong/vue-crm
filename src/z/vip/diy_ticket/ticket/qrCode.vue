<template>
  <el-dialog
    title="二维码"
    :close-on-click-modal="false"
    :visible="show"
    width="850px"
    @close="onClose">
    <div v-loading="loading">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="宽度" prop="width">
              <el-input-number style="width: 100%" v-model="form.width" :precision="0" :step="10" :min="280" :max="1280"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="透明底色" prop="isHyaline">
              <el-select style="width: 100%" v-model="form.isHyaline" placeholder="请选择">
                <el-option :key="false" label="不透明" :value="false"/>
                <el-option :key="true" label="透明" :value="true"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="路径" prop="path">
                <el-input readonly v-model="path" placeholder="卡卷路径" style="width: 100%" >
                  <el-button slot="append" icon="el-icon-copy-document" @click='handleCopy(path,$event)'>复制</el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
      </el-form>
      <div style="text-align: center">
        <img style="width: 320px;margin: auto" v-if="imgSrc != ''" :src="imgSrc"/>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="loadQrCode">生成</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {loadQrCode} from '@/api/common_qr/common_qr'
  import clip from '@/utils/clipboard'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    computed: {},
    data() {
      return {
        show: false,
        loading: false,
        ele: {},
        imgSrc: '',
        form: {
          page: 'pages/login/index',
          scene: '',
          width: 480,
          isHyaline: false
        },
        path: '',
        rules: {
          width: [{required: true, trigger: 'blur', message: '必填字段'}],
          isHyaline: [{required: true, trigger: 'blur', message: '必填字段'}]
        }
      }
    },
    mounted() {
    },
    methods: {
      handleCopy(text, event) {
        clip(text, event)
      },
      loadQrCode() {
        this.loading = true
        loadQrCode(this.form).then(res => this.imgSrc = res.data).finally(() => this.loading = false)
      },
      onClose() {
        this.show = false
      },
      onOpen(ele) {
        this.ele = JSON.parse(JSON.stringify(ele))
        this.imgSrc = ''
        this.form.scene = 'ti,' + this.ele.code
        this.path = this.form.page + '?scene=ti,' + this.ele.code
        this.show = true
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
      }
    }
  }
</script>

<style scoped>

</style>
