<template>
  <el-dialog
    title="修改价格"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="600px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-form-item label="清洗指导价" prop="washingPrice">
        <el-input-number style="width: 100%" :controls="false" v-model="form.washingPrice" :precision="2" :step="0.01"
                         :min="0" :max="999999999" step-strictly/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import {save} from '@/api/transfer/goods'

    export default {
        components: {},
        filters: {},
        directives: {},
        props: {},
        data() {
            return {
                rules: {},
                loading: false,
                form: {
                    id: '',
                    washingPrice: 0
                },
                type:'id',
                show: false,
                listQuery:{}
            }
        },
        mounted() {
        },
        methods: {
            onClose() {
                this.show = false
            },
            onOpen(ele) {
                this.type = 'id'
                this.form.id = ele.id
                this.form.washingPrice = ele.washingPrice
                this.listQuery = {}
                this.show = true
                if (this.$refs['form'] != null) {
                    this.$refs['form'].resetFields()
                }
            },
            onOpenAll(listQuery){
                this.type = 'all'
                this.form.washingPrice = 0
                this.show = true
                this.listQuery = listQuery
            },
            save() {
                this.loading = true
                this.listQuery.washingPrice = this.form.washingPrice
                let form = this.type == 'id' ? this.form : this.listQuery
                save(form).then(res => {
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
