<template>
  <el-dialog
    :title="'支付方式:'+form.paymentName"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="600px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-form-item label="每消费N元得1换新币" prop="nursingSale">
        <el-input-number style="width: 100%" v-model="form.nursingSale" :min="0" :max="9999999" :step="1" :controls="false"
                         step-strictly></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {save} from '@/api/nursing/payment'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    data() {
      return {
        show: false,
        rules: {
        },
        loading: false,
        title: '',
        form: {
          payAmount: 100,
          nursingAmount: 100,
          orderIndex: 0
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
              save(this.form).then(res => {
                this.$message({message: '保存成功', type: 'success'})
                this.onClose()
                this.$emit("getList", {})
              }).finally(() => this.loading = false)
            }
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
