<template>
  <div>
    <div class="filter-container">
      <el-select :loading="listLoading" class="filter-item" style="width: 200px" v-model="gradeErpId" filterable placeholder="请选择" @change="changeGrade">
        <el-option v-for="grade in gradeList" :key="grade.erpId" :label="grade.name" :value="grade.erpId"/>
      </el-select>
      <div v-show="gradeErpId != '' && gradeErpId != null" v-loading="listLoading">
        <el-form ref="form" :model="form">
          <el-form-item label="会员规则">
            <el-input
              type="textarea"
              :rows="10"
              placeholder="请输入会员规则"
              v-model="form.ruleInfo">
            </el-input>
          </el-form-item>
          <el-form-item label="会员权益">
            <el-input
              type="textarea"
              :rows="10"
              placeholder="请输入会员权益"
              v-model="form.powerInfo">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="gradeErpId != '' && gradeErpId != null" class="filter-container" style="margin-top: 20px">
        <el-button style="float:right" :loading="listLoading" class="filter-item" type="success" icon="el-icon-check" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {getAll as getGradeList} from '@/api/vip/grade/grade'
  import {save, info} from '@/api/vip/power/powerRuleInfo'

  export default {
    components: {},
    filters: {},
    directives: {},
    data() {
      return {
        listLoading: false,
        gradeList: [],
        gradeErpId: '',
        form: {
          gradeErpId: '',
          ruleInfo: '',
          powerInfo: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      init() {
        this.getGradeList()
        this.listLoading = false
      },
      getGradeList() {
        this.listLoading = true
        getGradeList().then(res => {
          this.gradeList = res.data
          if (this.gradeList.length > 0) {
            this.gradeErpId = this.gradeList[0].erpId
            this.info()
          }
        }).catch(() => this.listLoading = false)
      },
      changeGrade(e) {
        this.info()
      },
      info() {
        this.listLoading = true
        info({gradeErpId: this.gradeErpId}).then(res => {
          this.form.ruleInfo = res.data.ruleInfo != null ? res.data.ruleInfo : ''
          this.form.powerInfo = res.data.powerInfo != null ? res.data.powerInfo : ''
        }).finally(() => this.listLoading = false)
      },
      // 获取列表
      save() {
        this.listLoading = true
        this.form.gradeErpId = this.gradeErpId
        save(this.form).then(res => {
          this.list = res.data
          this.info()
        }).catch(() => this.listLoading = false)
      }
    }
  }
</script>

<style scoped>

</style>
