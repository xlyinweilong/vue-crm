<template>
  <div class="app-container">
    <div style="font-size: 14px;color: #909399">
      1、微信接口每天限制请求次数，不要频繁使用同步数据<br/>
      2、每次请求20条数据，请求次数由素材内容多少决定<br/>
      3、同步数据需要执行一段时间，请耐心等待<br/>
      4、图片如果被防盗链，请点击打开，刷新新页面，或者修改问号后面的参数为任意后刷新
    </div>
    <div class="filter-container" style="margin-top: 10px">
      <el-button :loading="listLoading" class="filter-item" type="warning" icon="el-icon-upload" @click="synchronization">同步数据</el-button>
    </div>
    <div class="filter-container">
      <el-input @keyup.enter.native="getList" class="filter-item" style="width: 200px" placeholder="名称或标题" v-model="listQuery.searchKey" clearable />
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
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type == 'image'">图片</el-tag>
          <el-tag v-if="scope.row.type == 'video'" type="danger">视频</el-tag>
          <el-tag v-if="scope.row.type == 'voice'" type="info">语音</el-tag>
          <el-tag v-if="scope.row.type == 'news'" type="success">图文</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="素材ID" align="center">
        <template slot-scope="scope" >
          <span @click="handleCopy(scope.row.mediaId,$event)" style="color:#409EFF;cursor:pointer;">{{ scope.row.mediaId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="url" align="center">
        <template slot-scope="scope">
          <el-link v-if="scope.row.type != 'image'" v-for="url in getUrl(scope.row.url)" type="primary" :href="url" target="_blank">链接</el-link>
          <el-link v-if="scope.row.type == 'image'" :href="scope.row.url" target="_blank">
            <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.url"
            fit="fill" /></el-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0 && !listLoading" :total="total" :page.sync="listQuery.pageIndex" :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>

<script>
  import {synchronization, getList} from '@/api/manager/wechat/source_material'
  import Pagination from '@/components/Pagination'
  import clip from '@/utils/clipboard' // use clipboard directly
  import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive

  export default {
    components: {Pagination},
    directives: {
      clipboard
    },
    data() {
      return {
        list: [],
        total: 0,
        listLoading: false,
        listQuery: {
          searchKey: '',
          pageIndex: 1,
          pageSize: 10
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      handleCopy(text, event) {
        clip(text, event)
      },
      clipboardSuccess() {
        this.$message({
          message: '复制成功',
          type: 'success',
          duration: 1500
        })
      },
      getUrl(urls){
        return urls.split(",")
      },
      synchronization() {
        this.listLoading = true
        synchronization().then(res => {
          this.$message({message: res.message, type: 'success'});
        }).finally(() => this.listLoading = false)
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.list = res.data.content
          this.total = res.data.totalElements
        }).finally(() => this.listLoading = false)
      }
    }
  }
</script>
