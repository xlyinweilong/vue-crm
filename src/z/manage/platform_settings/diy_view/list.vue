<template>
  <div class="app-container">
    <div style="font-size: 14px;color: #909399">
      1、自定义菜单最多包括3个一级菜单，每个一级菜单最多包含5个二级菜单。<br/>
      2、一级菜单最多4个汉字，二级菜单最多7个汉字，多出来的部分将会以“...”代替。<br/>
      3、创建自定义菜单后，菜单的刷新策略是，在用户进入公众号会话页或公众号profile页时，如果发现上一次拉取菜单的请求在5分钟以前，就会拉取一下菜单，如果菜单有更新，就会刷新客户端的菜单。测试时可以尝试取消关注公众账号后再次关注，则可以看到创建后的效果。
    </div>
    <div class="filter-container" style="margin-top: 10px">
      <el-button :loading="listLoading" class="filter-item" type="primary" icon="el-icon-plus" @click="add">新增父节点</el-button>
      <el-button :loading="listLoading" class="filter-item" type="warning" icon="el-icon-upload" @click="createToWeChat">生成到微信</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      default-expand-all
      row-key="id"
      tooltip-effect="dark"
      style="width: 100%"
      highlight-current-row
      fit
      border
    >
      <el-table-column label="级别" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.pid == null">1</el-tag>
          <el-tag v-if="scope.row.pid != null">2</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template slot-scope="scope">
          {{ scope.row.indexOrder }}
        </template>
      </el-table-column>
      <el-table-column label="key" align="center">
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column label="url" align="center">
        <template slot-scope="scope">
          {{ scope.row.url }}
        </template>
      </el-table-column>
      <el-table-column label="素材ID" align="center">
        <template slot-scope="scope">
          {{ scope.row.mediaId }}
        </template>
      </el-table-column>
      <el-table-column label="小程序appid" align="center">
        <template slot-scope="scope">
          {{ scope.row.appid }}
        </template>
      </el-table-column>
      <el-table-column label="小程序页面" align="center">
        <template slot-scope="scope">
          {{ scope.row.pagepath }}
        </template>
      </el-table-column>
      <el-table-column label="编辑" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain icon="el-icon-edit" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="增加子节点" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.pid == null" type="primary" plain icon="el-icon-plus" @click="addChild(scope.row)">新增</el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" align="center">
        <template slot-scope="scope">
          <el-button type="danger" plain icon="el-icon-delete" @click="deleteEle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <saveEle ref="saveEle" @getList="getList"/>
    <div style="font-size: 14px;color: #909399;margin-top: 10px">
      1、click：点击推事件用户点击click类型按钮后，微信服务器会通过消息接口推送消息类型为event的结构给开发者（参考消息接口指南），并且带上按钮中开发者填写的key值，开发者可以通过自定义的key值与用户进行交互；<br/>
      2、view：跳转URL用户点击view类型按钮后，微信客户端将会打开开发者在按钮中填写的网页URL，可与网页授权获取用户基本信息接口结合，获得用户基本信息。<br/>
      3、scancode_push：扫码推事件用户点击按钮后，微信客户端将调起扫一扫工具，完成扫码操作后显示扫描结果（如果是URL，将进入URL），且会将扫码的结果传给开发者，开发者可以下发消息。<br/>
      4、scancode_waitmsg：扫码推事件且弹出“消息接收中”提示框用户点击按钮后，微信客户端将调起扫一扫工具，完成扫码操作后，将扫码的结果传给开发者，同时收起扫一扫工具，然后弹出“消息接收中”提示框，随后可能会收到开发者下发的消息。<br/>
      5、pic_sysphoto：弹出系统拍照发图用户点击按钮后，微信客户端将调起系统相机，完成拍照操作后，会将拍摄的相片发送给开发者，并推送事件给开发者，同时收起系统相机，随后可能会收到开发者下发的消息。<br/>
      6、pic_photo_or_album：弹出拍照或者相册发图用户点击按钮后，微信客户端将弹出选择器供用户选择“拍照”或者“从手机相册选择”。用户选择后即走其他两种流程。<br/>
      7、pic_weixin：弹出微信相册发图器用户点击按钮后，微信客户端将调起微信相册，完成选择操作后，将选择的相片发送给开发者的服务器，并推送事件给开发者，同时收起相册，随后可能会收到开发者下发的消息。<br/>
      8、location_select：弹出地理位置选择器用户点击按钮后，微信客户端将调起地理位置选择工具，完成选择操作后，将选择的地理位置发送给开发者的服务器，同时收起位置选择工具，随后可能会收到开发者下发的消息。<br/>
      9、media_id：下发消息（除文本消息）用户点击media_id类型按钮后，微信服务器会将开发者填写的永久素材id对应的素材下发给用户，永久素材类型可以是图片、音频、视频、图文消息。请注意：永久素材id必须是在“素材管理/新增永久素材”接口上传后获得的合法id。<br/>
      10、view_limited：跳转图文消息URL用户点击view_limited类型按钮后，微信客户端将打开开发者在按钮中填写的永久素材id对应的图文消息URL，永久素材类型只支持图文消息。请注意：永久素材id必须是在“素材管理/新增永久素材”接口上传后获得的合法id。
    </div>
  </div>
</template>

<script>
  import {getList, deleteEle, createView} from '@/api/manager/platform/diyView'
  import saveEle from './save'
  import Pagination from '@/components/Pagination'

  export default {
    components: {saveEle, Pagination},
    filters: {},
    directives: {},
    data() {
      return {
        list: [],
        subList: [],
        listLoading: false,
        selectedIds: [],
        listQuery: {
          pageIndex: 1,
          pageSize: 10
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      add() {
        this.$refs.saveEle.onOpen({id: ''})
      },
      edit(row) {
        this.$refs.saveEle.onOpen(row)
      },
      addChild(row) {
        this.$refs.saveEle.onOpen({id: '', pid: row.id})
      },
      getList() {
        this.listLoading = true
        getList(this.listQuery).then(res => {
          this.list = []
          let list = res.data.filter(d => d.pid == null)
          list.forEach(l => {
            this.list.push(l)
            let subList = res.data.filter(d => d.pid === l.id)
            if (subList.length > 0) {
              this.list = this.list.concat(subList)
            }
          })
          console.log(this.list);
        }).finally(() => this.listLoading = false)
      },
      //选择
      selectionChange(val) {
        this.selectedIds = val
      },
      createToWeChat(row) {
        this.$confirm('确定要生成到微信吗?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          createView().then(response => {
            this.$message({message: response.message, type: 'success'});
            this.getList()
          })
        })
      },
      //删除
      deleteEle(row) {
        this.$confirm('确定要删除数据吗?', '提示', {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'}).then(() => {
          deleteEle({ids: [row.id]}).then(response => {
            this.$message({message: response.message, type: 'success'});
            this.getList()
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
