<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="编号或者名称" clearable v-model.trim="listQuery.searchKey" style="width: 200px;" class="filter-item" @keyup.enter.native="getList"/>
      <el-button :loading="listLoading" class="filter-item" icon="el-icon-search" type="primary" plain @click="getList">查询</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
    >
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="禁用" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.disabled == 1 ? 'danger':'success'" v-text="scope.row.disabled == 1 ? '禁用':'启用'"/>
        </template>
      </el-table-column>
      <el-table-column label="默认等级" align="center">
        <template slot-scope="scope">
          <el-switch
            :disabled="scope.row.default"
            @change="changeDefaultGrade(scope.row)"
            v-model="scope.row.default"
            active-color="#13ce66">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">
          {{ scope.row.gradeIndex }}
        </template>
      </el-table-column>
      <el-table-column label="会员权益中显示" align="center">
        <template slot-scope="scope">
          <span v-text="scope.row.powerShow ? '显示' : '不显示'"></span>
        </template>
      </el-table-column>
      <!--<el-table-column label="会员权益中宽度" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--{{ scope.row.powerWidth }}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="卡颜色" align="center" width="120px">-->
      <!--<template slot-scope="scope">-->
      <!--<div style="width: 100px;text-align: center">-->
      <!--<el-image v-if="scope.row.cardImageUrl != null" :src="baseUrl + scope.row.cardImageUrl"></el-image>-->
      <!--</div>-->
      <!--<el-button type="text" @click="showSetGradeColor(scope.row)" v-text="scope.row.cardImageUrl != null ? '更换颜色' : '设置颜色'"></el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="卡图片" align="center" width="120px">
        <template slot-scope="scope">
          <div style="width: 100px;text-align: center">
            <el-image v-if="scope.row.cardImageDiyUrl != null" :src="scope.row.cardImageDiyUrl"></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
      <!--<el-table-column label="生成微信卡" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button type="primary" plain icon="el-icon-edit" @click="editWeChart(scope.row)">生成微信卡</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="排序" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<el-input-number style="width: 100%" v-model="scope.row.gradeIndex" :min="0" :max="99999" :step="1" step-strictly @blur="setGradeIndex(scope.row)" :controls="false"></el-input-number>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
    <setGradeColor :show.sync="show" :colorList="colorList" :eleId="eleId" :eleUrl="eleUrl" @getList="getList"/>
    <gradeSave ref="gradeSave" :show.sync="showGradeSave" @getList="getList"/>
    <save ref="save" @getList="getList"/>
  </div>
</template>

<script>
  import {getList, setDefaultGrade} from '@/api/vip/grade/grade'
  import {all as getAllColor} from '@/api/config/card_image'
  import setGradeColor from './set_grade_color'
  import gradeSave from './grade_save'
  import save from './save'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'channelList',
    components: {
      Pagination, setGradeColor, gradeSave, save
    },
    filters: {},
    directives: {},
    data() {
      return {
        baseUrl: process.env.BASE_API + "/static/images/card/",
        show: false,
        listQuery: {
          pageIndex: 1,
          pageSize: 10,
          searchKey: ''
        },
        defaultId: '',
        list: [],
        total: 0,
        listLoading: false,
        colorList: [],
        eleId: '',
        eleUrl: '',
        showGradeSave: false
      }
    },
    mounted() {
      this.getAllColor()
      this.getList()
    },
    methods: {
      editWeChart(row) {
        this.$refs.save.onOpen(row)
      },
      edit(row) {
        this.$refs.gradeSave.onOpen(row)
        this.showGradeSave = true
      },
      showSetGradeColor(row) {
        this.eleId = row.id
        this.eleUrl = row.cardImageUrl
        this.show = true
      },
      changeDefaultGrade(row) {
        if (row.default) {
          this.listLoading = true
          setDefaultGrade({id: row.erpId}).then(res => {
            this.$message({message: '操作成功', type: 'success'})
            this.getList()
          }).catch(() => this.listLoading = false)
        }
      },
      async getAllColor() {
        this.listLoading = true
        await getAllColor().then(res => this.colorList = res.data).catch(() => this.listLoading = false)
      },
      // 获取列表
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          res.data.page.content.forEach(c => c.default = false)
          this.list = res.data.page.content
          this.total = res.data.page.totalElements
          this.defaultId = res.data.defaultId
          this.list.filter(c => c.erpId === this.defaultId).forEach(c => c.default = true)
        }).finally(() => {
          this.listLoading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
