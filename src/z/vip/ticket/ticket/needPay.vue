<template>
  <el-dialog
    title="支付券"
    :close-on-click-modal="false"
    :visible="show"
    width="650px"
    @close="onClose">
    <div>
      <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
        <el-form-item label="开启">
          <el-select style="width: 100%" v-model="form.needPay" placeholder="请选择是否开启" prop="needPay">
            <el-option label="开启" :value="true"></el-option>
            <el-option label="关闭" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="每张需要支付金额(单位：元)" prop="payMoney">
              <el-input-number :disabled="!form.needPay" style="width: 100%" v-model="form.payMoney" :step="0.01" step-strictly
                               :min="0.01" :max="999999"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
      <el-button :loading="loading" @click="onClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import {setNeedPay} from '@/api/vip/ticket/ticket'

    export default {
        components: {},
        filters: {},
        directives: {},
        props: {},
        computed: {},
        data() {
            return {
                form: {
                    needPay: true,
                    payMoney: 1
                },
                show: false,
                loading: false,
                rules: {
                    needPay: [{required: true, trigger: 'blur', message: '必填字段'}],
                    payMoney: [{required: true, trigger: 'blur', message: '必填字段'}]
                }
            }
        },
        mounted() {
        },
        methods: {
            save() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        setNeedPay(this.form).then(res => {
                            this.$message({message: '保存成功', type: 'success'})
                            this.onClose()
                            this.$emit("getList", {})
                        }).finally(() => this.loading = false)
                    }
                })
            },
            onClose() {
                this.show = false
            },
            onOpen(ele) {
                this.form = JSON.parse(JSON.stringify(ele))
                this.show = true
            }
        }
    }
</script>

<style scoped>

</style>
