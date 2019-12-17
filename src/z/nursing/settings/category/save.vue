<template>
  <el-dialog
    :title="form.id == null ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="600px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-form-item label="品类名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入品类名称" :maxlength="200" clearable/>
      </el-form-item>
      <el-form-item label="销售价" prop="price">
        <el-input-number style="width: 100%" v-model="form.price" :min="0" :max="9999999" :step="0.01" :controls="false"
                         step-strictly></el-input-number>
      </el-form-item>
      <el-form-item label="结算价" prop="settlePrice">
        <el-input-number style="width: 100%" v-model="form.settlePrice" :min="0" :max="9999999" :step="0.01" :controls="false"
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
    import {save} from '@/api/nursing/nursingCategoryConfig'

    export default {
        components: {},
        filters: {},
        directives: {},
        props: {},
        data() {
            return {
                show: false,
                rules: {
                    name: [{required: true, message: '必填字段', trigger: 'blur'}],
                    price: [{required: true, message: '必填字段', trigger: 'blur'}],
                    settlePrice: [{required: true, message: '必填字段', trigger: 'blur'}]
                },
                loading: false,
                title: '',
                form: {
                    price: 100,
                    settlePrice: 100,
                    name: ''
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
