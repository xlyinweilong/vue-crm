<template>
  <div>
    <el-table
      v-loading="listLoading"
      :data="dataList"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
    >
      <el-table-column label="字段名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.templateName }}
        </template>
      </el-table-column>
      <el-table-column v-for="(grade,$index) in gradeList" :key="grade.erpId" :label="grade.name" align="center">
        <template slot-scope="scope">
          <el-switch v-if="scope.row.templateType === 'BOOLEAN'" v-model="scope.row.gradeList[$index].ele.valueBoolean" active-color="#13ce66"/>
          <el-input v-if="scope.row.templateType === 'STRING'" type="textarea" :rows="4" v-model="scope.row.gradeList[$index].ele.valueText" placeholder="请输入内容"/>
        </template>
      </el-table-column>
    </el-table>
    <div class="filter-container" style="margin-top: 20px">
      <el-button style="float:right" :loading="listLoading" class="filter-item" type="success" icon="el-icon-check" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {getList, save} from '@/api/vip/power/detail'
  import {getAll as getGradeList} from '@/api/vip/grade/grade'
  import {getList as getTemplatetList} from '@/api/vip/power/template'

  export default {
    components: {},
    filters: {},
    directives: {},
    data() {
      return {
        dataList: [],
        list: [],
        templateList: [],
        gradeList: [],
        total: 0,
        listLoading: false,
        focusEle: {
          gradeErpId: '',
          templateId: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      getTemplatetList() {
        this.listLoading = true
        getTemplatetList().then(res => {
          this.templateList = res.data
          this.getGradeList()
        }).catch(() => this.listLoading = false)
      },
      getGradeList() {
        this.listLoading = true
        getGradeList().then(res => {
          this.gradeList = res.data
          this.getDataList()
        }).catch(() => this.listLoading = false)
      },
      getDataList() {
        this.listLoading = true
        getList().then(res => {
          this.list = res.data
          this.dataList = JSON.parse(JSON.stringify(this.templateList))
          this.dataList.forEach(t => {
            t.gradeList = JSON.parse(JSON.stringify(this.gradeList))
            t.gradeList.forEach(g => {
              let ele = this.list.find(d => d.templateId === t.id && d.gradeErpId === g.erpId)
              if (ele == null) {
                g.ele = {templateId: t.id, gradeErpId: g.erpId, valueText: '', valueBoolean: false}
              } else {
                g.ele = ele
              }
            })
          })
          this.dataList = JSON.parse(JSON.stringify(this.dataList))
        }).finally(() => this.listLoading = false)
      },
      // 获取列表
      getList() {
        this.getTemplatetList()
      },
      save() {
        this.listLoading = true
        let list = []
        this.dataList.forEach(t => t.gradeList.forEach(g => list.push(g.ele)))
        save(list).then(res => {
          this.$message({message: '保存成功', type: 'success'})
          this.getList()
        }).catch(() => this.listLoading = false)
      }
    }
  }
</script>

<style scoped>

</style>
