<template>
  <el-dialog
    title="上下券架设置"
    :close-on-click-modal="false"
    :visible="show"
    width="650px"
    @close="onClose">
    <div>
      <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
        <el-form-item label="上下架" prop="onShelf">
          <el-select style="width: 100%" v-model="form.onShelf" placeholder="请选择上下架" >
            <el-option label="上架" :value="true"></el-option>
            <el-option label="下架" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡卷类型" prop="onShelfType">
          <el-select style="width: 100%" v-model="form.onShelfType" placeholder="请选择卡卷类型" >
            <el-option label="全场券" value="FULL_COURT"></el-option>
            <el-option label="品类券" value="CATEGORY"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员等级">
          <el-tooltip class="item" effect="dark" content="不设置不限制等级" placement="top">
            <el-select :disabled="!form.onShelf" filterable multiple style="width: 100%" v-model="form.vipGradeIds"
                       placeholder="请选择会员等级">
              <el-option v-for="grade in gradeList" :key="grade.id" :label="grade.name" :value="grade.id"></el-option>
            </el-select>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
      <el-button :loading="loading" @click="onClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import {upShelf} from '@/api/vip/ticket/ticket'
    import {getAll} from '@/api/vip/grade/grade'

    export default {
        components: {},
        filters: {},
        directives: {},
        props: {},
        computed: {},
        data() {
            return {
                gradeList:[],
                form: {
                    onShelf: false,
                    onShelfType: '',
                    vipGradeIds: []
                },
                show: false,
                loading: false,
                rules: {
                    onShelf: [{required: true, trigger: 'blur', message: '必填字段'}],
                    onShelfType: [{required: true, trigger: 'blur', message: '必填字段'}]
                }
            }
        },
        mounted() {
        },
        methods: {
            getGradeList() {
                this.loading = true
                getAll().then(res => {
                    this.gradeList = res.data.filter(d => d.disabled == 0 && d.powerShow)
                }).finally(() => this.loading = false)
            },
            save() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        if (this.form.vipGradeIds.length == 0) {
                            this.form.vipGradeIds = null
                        } else {
                            this.form.vipGradeIds = this.form.vipGradeIds.join(",")
                        }
                        upShelf(this.form).then(res => {
                            this.$message({message: '操作成功', type: 'success'})
                            this.$emit("getList", {})
                            this.onClose()
                        }).finally(() => this.loading = false)
                    }
                })
            },
            onClose() {
                this.show = false
            },
            onOpen(ele) {
                this.form = JSON.parse(JSON.stringify(ele))
                if (this.form.vipGradeIds != null) {
                    this.form.vipGradeIds = this.form.vipGradeIds.split(",")
                } else {
                    this.form.vipGradeIds = []
                }
                this.show = true
                if (this.gradeList.length == 0) {
                    this.getGradeList()
                }
            }
        }
    }
</script>

<style scoped>

</style>
