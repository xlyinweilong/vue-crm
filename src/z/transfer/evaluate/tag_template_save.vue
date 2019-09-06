<template>
  <el-dialog
    :title="eleId == '' ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="60%">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="标签内容" prop="content">
            <el-input v-model.trim="form.content" @keyup.enter.native="save" :maxlength="50" placeholder="请输入标签内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标签位置" prop="position">
            <el-tooltip class="item" effect="dark" content="位置为1-6，0表示任意位置" placement="top-start">
              <el-input-number style="width: 100%" v-model="form.position" :min="0" :max="6" :step="1" step-strictly label="标签位置"></el-input-number>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="标签类型" prop="type">
            <el-tooltip class="item" effect="dark" content="【固定】为永远显示，【随机】会根据权重显示" placement="top-start">
              <el-select style="width: 100%" v-model="form.type" placeholder="请选择">
                <el-option key="FIXED" label="固定" value="FIXED"/>
                <el-option key="RANDOM" label="随机" value="RANDOM"/>
              </el-select>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标签权重" prop="randomWeight">
            <el-tooltip class="item" effect="dark" content="权重越大，【随机】的概率越大；【固定】则显示最大的权重" placement="top-start">
              <el-input-number style="width: 100%" v-model="form.randomWeight" :min="1" :max="99" :step="1" step-strictly label="标签权重"></el-input-number>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="出现时分数" prop="showInScore">
            <el-tooltip class="item" effect="dark" content="当分数时多少时，显示这个标签" placement="top-start">
              <el-input-number style="width: 100%" v-model="form.showInScore" :min="1" :max="5" :step="1" step-strictly label="标签权重"></el-input-number>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {save} from '@/api/transfer/evaluateTagTemplate'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    data() {
      return {
        show: false,
        eleId: '',
        rules: {
          content: [{required: true, trigger: 'blur', message: '必填字段'}],
          position: [{required: true, trigger: 'blur', message: '必填字段'}],
          type: [{required: true, trigger: 'blur', message: '必填字段'}]
        },
        loading: false,
        title: '',
        form: {
          content: '',
          position: 0,
          type: 'FIXED',
          randomWeight: 1,
          showInScore:1
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
        this.eleId = ele.id
        this.show = true
        if (ele.id != '') {
          this.form = JSON.parse(JSON.stringify(ele))
        } else {
          this.form = {
            content: '',
            position: 0,
            type: 'FIXED',
            randomWeight: 1,
            showInScore:1
          }
        }
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
      },
      save() {
        this.$refs.form.validate(valid => {
          if (valid && !this.loading) {
            if(this.form.type === 'FIXED' && this.form.position === 0){
              this.$message.error({message: '固定类型不可以位置是0'})
              return
            }
            this.loading = true
            save(this.form).then(res => {
              this.$message({message: '保存成功', type: 'success'})
              setTimeout(() => {
                this.onClose()
                this.$emit("getList", {})
              }, 600)
            }).finally(() => this.loading = false)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
