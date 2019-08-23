<template>
  <div>
    <div class="filter-container">
      <el-select :loading="listLoading" class="filter-item" style="width: 200px" v-model="gradeErpId" filterable placeholder="请选择" @change="changeGrade">
        <el-option v-for="grade in gradeList" :key="grade.erpId" :label="grade.name" :value="grade.erpId" />
      </el-select>
    </div>
  </div>
</template>

<script>
  import {getAll as getGradeList} from '@/api/vip/grade/grade'

  export default {
    components: {
    },
    filters: {},
    directives: {},
    data() {
      return {
        list: [],
        listLoading: false,
        gradeList:[],
        gradeErpId:''
      }
    },
    mounted() {
    },
    methods: {
      init(){
        this.getGradeList()
        this.listLoading = false
      },
      getGradeList() {
        this.listLoading = true
        getGradeList().then(res => {
          this.gradeList = res.data
        }).catch(() => this.listLoading = false)
      },
      changeGrade(e){

      },
      // 获取列表
      getList() {
        this.listLoading = true
        getList().then(res => {
          this.list = res.data
        }).finally(() => this.listLoading = false)
      },
      deleteEle() {
        this.$confirm('确定要删除选中的记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          deleteEle({ids: this.selectedIds.map(s => s.id)}).then(() => {
            this.$message({type: 'success', message: '删除成功!'})
            this.getList()
          }).catch(() => {
            this.listLoading = false
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
