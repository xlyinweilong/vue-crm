<template>
  <el-dialog
    :title="form.id == null ? '新增' : '修改'"
    :close-on-click-modal="false"
    width="800px"
    :visible="show"
    @close="onClose">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="类型" prop="type">
            <el-select style="width: 100%" v-model="form.type" placeholder="请选择">
              <el-option key="click" label="click" value="click"/>
              <el-option key="view" label="view" value="view"/>
              <el-option key="scancode_push" label="scancode_push" value="scancode_push"/>
              <el-option key="scancode_waitmsg" label="scancode_waitmsg" value="scancode_waitmsg"/>
              <el-option key="pic_sysphoto" label="pic_sysphoto" value="pic_sysphoto"/>
              <el-option key="pic_photo_or_album" label="pic_photo_or_album" value="pic_photo_or_album"/>
              <el-option key="pic_weixin" label="pic_weixin" value="pic_weixin"/>
              <el-option key="location_select" label="location_select" value="location_select"/>
              <el-option key="media_id" label="media_id" value="media_id"/>
              <el-option key="view_limited" label="view_limited" value="view_limited"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" placeholder="" :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="key" prop="key">
            <el-input v-model="form.key" placeholder="" :maxlength="30"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="url" prop="url">
            <el-input v-model="form.url" placeholder="" :maxlength="128"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="素材ID" prop="mediaId">
        <el-input v-model="form.mediaId" placeholder="" :maxlength="128"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="小程序appid" prop="appid">
            <el-input v-model="form.appid" placeholder="" :maxlength="128"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="小程序页面" prop="pagepath">
            <el-input v-model="form.pagepath" placeholder="" :maxlength="128"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="排序" prop="indexOrder">
            <el-input-number style="width: 100%" v-model="form.indexOrder" :min="0" :max="9" :step="1" step-strictly label="排序"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
      <el-button :loading="loading" @click="onClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {save} from '@/api/manager/platform/diyView'

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
        form: {},
        rules: {
          type: [{required: true, message: '必填字段', trigger: 'blur'}],
          name: [{required: true, message: '必填字段', trigger: 'blur'}],
          indexOrder: [{required: true, message: '必填字段', trigger: 'blur'}],
        }
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.show = false
      },
      onOpen(ele) {
        if (ele.id == '') {
          this.form = {
            type: 'click',
            name: '',
            key: '',
            url: '',
            mediaId: '',
            appid: '',
            pagepath: '',
            indexOrder: 0
          }
          if(ele.pid != null){
            this.form.pid = ele.pid
          }
        } else {
          this.form = JSON.parse(JSON.stringify(ele))
        }
        this.show = true
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
      },
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            save(this.form).then(res => {
              this.$message({message: '保存成功', type: 'success'})
              this.onClose()
              this.$emit("getList", {})
            }).finally(() => this.loading = false)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
