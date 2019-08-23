<template>
  <el-dialog
    :title="'编辑：' + form.name"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="600px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-form-item label="排序">
        <el-input-number style="width: 100%" v-model="form.gradeIndex" :min="0" :max="99999" :step="1" step-strictly @keyup.enter.native="save"></el-input-number>
      </el-form-item>
      <el-form-item label="会员权益中显示">
        <el-select style="width: 100%" v-model="form.powerShow" placeholder="请选择类型">
          <el-option key="show" label="显示" :value="true"/>
          <el-option key="notShow" label="不显示" :value="false"/>
        </el-select>
      </el-form-item>
      <!--<el-form-item label="会员权益中宽度(建议：24)">-->
        <!--<el-input-number style="width: 100%" v-model="form.powerWidth" :min="1" :max="99999" :step="1" step-strictly @keyup.enter.native="save"></el-input-number>-->
      <!--</el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {save} from '@/api/vip/grade/grade'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {
      show: {
        default: false
      }
    },
    data() {
      return {
        rules: {
        },
        loading: false,
        title: '',
        form: {
          gradeIndex: 0,
          powerShow: true,
          powerWidth: 28
        }
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.$emit("update:show", false)
      },
      onOpen(ele) {
        this.form = JSON.parse(JSON.stringify(ele))
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
      },
      save() {
        this.loading = true
        save(this.form).then(res => {
          this.$message({message: '保存成功', type: 'success'})
          this.onClose()
          this.$emit("getList", {})
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
