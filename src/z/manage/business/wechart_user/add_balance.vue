<template>
  <el-dialog
    title="充值"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="600px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-form-item label="充值金额" prop="washingBalance">
        <el-input-number style="width: 100%" :controls="false" v-model="form.washingBalance" :precision="2" :step="0.01"
                         :min="-999999999" :max="999999999" step-strictly/>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model.trim="form.remarks" @keyup.enter.native="save" :maxlength="200"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import {addBalance} from '@/api/user/user'

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
                eleId: '',
                rules: {
                    washingBalance: [
                        {required: true, trigger: 'blur', message: '必填字段'}
                    ],
                },
                loading: false,
                form: {
                    id: '',
                    washingBalance: 0,
                    remarks:''
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
                this.form.id = ele.id
                this.form.washingBalance = 0
                this.form.remarks = ''
                this.show = true
                if (this.$refs['form'] != null) {
                    this.$refs['form'].resetFields()
                }
            },
            save() {
                this.loading = true
                addBalance(this.form).then(res => {
                    this.$message({message: '保存成功', type: 'success'})
                    setTimeout(() => {
                        this.onClose()
                        this.$emit("getList", {})
                    }, 600)
                }).finally(() => this.loading = false)
            }
        }
    }
</script>

<style scoped>

</style>
