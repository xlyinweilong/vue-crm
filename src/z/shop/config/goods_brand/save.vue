<template>
  <el-dialog
    :title="form.id == null ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="600px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-form-item label="名称" prop="name">
        <el-input :disabled="form.erpId != null" v-model.trim="form.name" placeholder="请输入名称" @keyup.enter.native="save" :maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="isShow">
        <el-select style="width: 100%" v-model="form.isShow" placeholder="是否在商城分类页面上显示">
          <el-option key="true" label="显示" :value="true"/>
          <el-option key="false" label="不显示" :value="false"/>
        </el-select>
      </el-form-item>
      <el-form-item v-show="form.isShow" label="排序" prop="sortIndex">
        <el-tooltip class="item" effect="dark" content="数字越小越排在前面" placement="top">
          <el-input-number style="width: 100%" v-model="form.sortIndex" :min="0" :max="9999" :step="1" :controls="false"
                           step-strictly></el-input-number>
        </el-tooltip>
      </el-form-item>
      <el-form-item v-show="form.isShow" label="标语" prop="slogan">
        <el-input v-model.trim="form.slogan" placeholder="请输入标语" @keyup.enter.native="save" :maxlength="255"></el-input>
      </el-form-item>
      <el-form-item v-show="form.isShow" label="图片URL" prop="logoUrl">
        <el-input v-model.trim="form.logoUrl" placeholder="请输入图片URL" @keyup.enter.native="save" :maxlength="255"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>

  import {saveBrand} from '@/api/transfer/goods'

  export default {
    components: {},
    filters: {},
    directives: {},
    data() {
      return {
        loading: false,
        show: false,
        form: {},
        rules: {
          name: [{required: true, trigger: 'blur', message: '必填字段'}],
          isShow: [{required: true, trigger: 'blur', message: '必填字段'}]
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
        this.form = JSON.parse(JSON.stringify(ele))
        this.show = true
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
      },
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            saveBrand(this.form).then(res => {
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
