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
          <el-form-item label="字段排序" prop="fieldIndex">
            <el-input-number style="width: 100%" v-model="form.fieldIndex" @keyup.enter.native="save" :min="1" :max="10" :step="1" step-strictly label="字段排序"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="字段名称" prop="fieldName">
            <el-input v-model.trim="form.fieldName" @keyup.enter.native="save" :maxlength="50" placeholder="请输入字段名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="字段类型" prop="fieldType">
            <el-select style="width: 100%" v-model="form.fieldType" placeholder="请选择">
              <el-option key="string" label="字符串" value="string"/>
              <el-option key="radio" label="单选" value="radio"/>
              <!--<el-option key="checkbox" label="多选" value="checkbox"/>-->
              <el-option key="integer" label="整数" value="integer"/>
              <el-option key="double" label="小数" value="double"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="完善送积分" prop="setGiveIntegral">
            <el-tooltip class="item" effect="dark" content="当【完善送积分】选项全部填写时才赠送积分" placement="top-start">
              <el-select style="width: 100%" v-model="form.setGiveIntegral" placeholder="请选择">
                <el-option key="1" label="是" :value="true"/>
                <el-option key="0" label="否" :value="false"/>
              </el-select>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-show="form.fieldType == 'string'">
        <el-col :span="24">
          <el-form-item label="字符串最大长度" prop="valueMaxLength">
            <el-input-number style="width: 100%" v-model="form.valueMaxLength" @keyup.enter.native="save" :min="1" :max="255" :step="1" step-strictly label="字符串最大长度"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-show="form.fieldType == 'radio'">
        <el-col :span="24">
          <el-form-item label="字段选项" prop="valueOptions">
            <el-input v-model.trim="form.valueOptions" @keyup.enter.native="save" :maxlength="250" placeholder="请使用英文的逗号分隔多个选项"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-show="form.fieldType == 'integer' || form.fieldType == 'double'">
        <el-col :span="12">
          <el-form-item label="最小值" prop="valueMin">
            <el-input-number style="width: 100%" v-model="form.valueMin" @keyup.enter.native="save" :step="1" step-strictly label="最小值"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="最大值" prop="valueMax">
            <el-input-number style="width: 100%" v-model="form.valueMax" @keyup.enter.native="save" :step="1" step-strictly label="最小值"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="权重" prop="weight">
            <el-tooltip class="item" effect="dark" content="权重用于计算资料完善比例，0-9数值越大，比重越大，0为不计入计算" placement="top-start">
              <el-input-number style="width: 100%" v-model="form.weight" @keyup.enter.native="save" :min="0" :max="9" :step="1" step-strictly label="权重"></el-input-number>
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
  import {save} from '@/api/manager/platform/userInfoField'

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
          fieldIndex: [{required: true, trigger: 'blur', message: '必填字段'}],
          fieldName: [{required: true, trigger: 'blur', message: '必填字段'}],
          fieldType: [{required: true, trigger: 'blur', message: '必填字段'}],
          setGiveIntegral: [{required: true, trigger: 'blur', message: '必填字段'}]
        },
        loading: false,
        title: '',
        form: {
          fieldName: '',
          fieldIndex: 1,
          fieldType: 'string',
          setGiveIntegral: false,
          valueOptions: '',
          valueMaxLength: 1,
          valueMin: 0,
          valueMax: 1,
          weight: 0
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
            fieldName: '',
            fieldIndex: 1,
            fieldType: 'string',
            setGiveIntegral: false,
            valueOptions: '',
            valueMaxLength: 1,
            valueMin: 0,
            valueMax: 1,
            weight: 0
          }
        }
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
      },
      save() {
        this.$refs.form.validate(valid => {
          if (valid && !this.loading) {
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
