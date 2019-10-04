<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="gradeList"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
    >
      <el-table-column label="等级" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <!--<el-table-column label="图标" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.icon }}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="升级规则信息" align="center">
        <template slot-scope="scope">
          {{ scope.row.levelUpInfo }}
        </template>
      </el-table-column>
      <el-table-column label="规则明细" align="center">
        <template slot-scope="scope">
          {{ scope.row.info }}
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <saveEle ref="saveEle" :show.sync="show" @getList="getList" :cardIconList="cardIconList"/>
  </div>
</template>

<script>
  import {all, save} from '@/api/vip/rule/rule'
  import {all as allIcon} from '@/api/config/card_icon_image'
  import {getAll as getGradeList} from '@/api/vip/grade/grade'
  import saveEle from './save'

  export default {
    components: {saveEle},
    filters: {},
    directives: {},
    data() {
      return {
        baseUrl: process.env.BASE_API + "/static/images/icon/",
        list: [],
        gradeList: [],
        listLoading: false,
        show: false,
        cardIconList: []
      }
    },
    mounted() {
      this.getAllIcon()
      this.getList()
    },
    methods: {
      edit(row) {
        this.show = true
        this.$refs.saveEle.onOpen(row)
      },
      getList() {
        this.listLoading = true
        getGradeList().then(res => {
          this.gradeList = res.data
          this.getDataList()
        }).catch(() => this.listLoading = false)
      },
      getDataList() {
        this.listLoading = true
        all().then(res => {
          this.list = res.data
          this.gradeList.forEach(g => {
            g.gradeErpId = g.erpId
            let data = this.list.find(d => d.gradeErpId === g.erpId)
            if (data != null) {
              g.icon = data.icon
              g.levelUpInfo = data.levelUpInfo
              g.info = data.info
            } else {
              g.icon = ''
              g.levelUpInfo = ''
              g.info = ''
            }
          })
          this.gradeList = JSON.parse(JSON.stringify(this.gradeList))
        }).finally(() => this.listLoading = false)
      },
      getAllIcon() {
        allIcon().then(res => this.cardIconList = res.data)
      }
    }
  }
</script>

<style scoped>

</style>
