<template>
  <el-dialog
    title="首页设计"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    fullscreen>
    <div style="width: 900px;margin: auto">
      <div v-loading="loading">
        <el-row :gutter="20" style="width: 900px">
          <!--工具栏-->
          <el-col class="box" style="text-align: center;width: 300px">
            <h5 style="margin-bottom: 3px;font-size: 20px;color: #303133">工具栏</h5>
            <p style="margin-top: 0;color: #909399;font-size: 14px">点击添加</p>
            <div class="item" style="height: 50px;line-height: 50px" v-for="c in componentsList" :style="{'background-color': c.color}" :key="c.key" @click="pushToList(c)">
              <div>{{c.name}}</div>
            </div>
            <p style="margin-bottom: 20px"></p>
          </el-col>
          <!--内容-->
          <el-col class="" style="text-align: center;width: 600px">
            <h5 style="margin-bottom: 3px;font-size: 20px;color: #303133">首页</h5>
            <el-select v-model="screen" placeholder="请选择屏幕">
              <el-option v-for="item in screenList" :key="item.height" :label="item.name" :value="item.height"/>
            </el-select>
            <div style="width: 375px;margin: auto;border:1px solid #000;margin-top: 10px;overflow-y:auto;overflow-x:hidden" :style="{'height':screen+'px'}">
              <div v-for="(c,i) in list" :style="{'margin-left':c.type=='shrink'?'10px':'0','margin-right':c.type=='shrink'?'10px':'0'}">
                <div v-if="c.key == 'div'" @click="showDrawer(c,i)" class="item" :style="{'background-color': c.color,
                'margin-top':c.marginTop+'px','margin-bottom':c.marginBottom+'px'}">
                  <div :style="{'font-size':(c.unit == 'px' ? c.fontSize : c.fontSize/2) + 'px','text-align': c.align}">{{c.name}}<span v-if="c.name==''">无</span></div>
                </div>
                <div v-if="c.key == 'imageList'" @click="showDrawer(c,i)">
                  <div class="item" style="display: flex;" :style="{'margin-top':c.marginTop+'px','margin-bottom':c.marginBottom+'px'}">
                    <div :style="{'width': 375/c.imageQuantity+'px', height: c.imageHeight/2+'px','line-height': c.imageHeight/2+'px'}">
                      <div style="margin: auto" :style="{'background-color': c.color,'width': c.imageWidth/2+'px'}">
                        {{c.name}}<span v-if="c.name==''">无</span>
                      </div>
                    </div>
                    <div v-if="c.imageQuantity > 1" :style="{'width': 375/c.imageQuantity+'px', height: c.imageHeight/2+'px','line-height': c.imageHeight/2+'px'}">
                      <div style="margin: auto" :style="{'background-color': c.color,'width': c.imageWidth/2+'px'}">
                        {{c.name}}<span v-if="c.name==''">无</span>
                      </div>
                    </div>
                    <div v-if="c.imageQuantity > 2" :style="{'width': 375/c.imageQuantity+'px', height: c.imageHeight/2+'px','line-height': c.imageHeight/2+'px'}">
                      <div style="margin: auto" :style="{'background-color': c.color,'width': c.imageWidth/2+'px'}">
                        {{c.name}}<span v-if="c.name==''">无</span>
                      </div>
                    </div>
                    <div v-if="c.imageQuantity > 3" :style="{'width': 375/c.imageQuantity+'px', height: c.imageHeight/2+'px','line-height': c.imageHeight/2+'px'}">
                      <div style="margin: auto" :style="{'background-color': c.color,'width': c.imageWidth/2+'px'}">
                        {{c.name}}<span v-if="c.name==''">无</span>
                      </div>
                    </div>
                    <div v-if="c.imageQuantity > 4" :style="{'width': 375/c.imageQuantity+'px', height: c.imageHeight/2+'px','line-height': c.imageHeight/2+'px'}">
                      <div style="margin: auto" :style="{'background-color': c.color,'width': c.imageWidth/2+'px'}">
                        {{c.name}}<span v-if="c.name==''">无</span>
                      </div>
                    </div>
                    <div v-if="c.imageQuantity > 5" :style="{'width': 375/c.imageQuantity+'px', height: c.imageHeight/2+'px','line-height': c.imageHeight/2+'px'}">
                      <div style="margin: auto" :style="{'background-color': c.color,'width': c.imageWidth/2+'px'}">
                        {{c.name}}<span v-if="c.name==''">无</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="c.key == 'carousel'" @click="showDrawer(c,i)">
                  <div class="item" style="width:375px;text-align: center" :style="{'margin-top':c.marginTop+'px','margin-bottom':c.marginBottom+'px',height: c.imageHeight/2+'px','line-height': c.imageHeight/2+'px'}">
                    <div style="margin: auto" :style="{'background-color': c.color,'width': c.imageWidth/2+'px'}">
                      {{c.name}}<span v-if="c.name==''">无</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer" style="margin-top: 15px">
        <el-button :loading="loading" @click="onClose">取消</el-button>
        <el-button :loading="loading" type="primary" @click="save">保存</el-button>
      </div>
    </div>
    <el-drawer
      title="组件"
      :with-header="false"
      :append-to-body="true"
      :visible.sync="drawer"
      direction="rtl"
      size="400px"
      :show-close="false"
      custom-class="drawer"
      :before-close="handleClose">
      <div style="margin-left: 10px;padding-right: 10px;overflow-y:scroll;height: 100%" :style="{'height':screenHeight+'px'}">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="base">
            <el-form :model="ele" v-loading="loading">
              <el-form-item label="组件名称" prop="name">
                <el-input ref="autoFocus" v-model.trim="ele.name" placeholder="请输入组件名称" @keyup.enter.native="save" :maxlength="50"></el-input>
              </el-form-item>
              <el-form-item v-if="ele.key == 'div'" label="组件排版" prop="name">
                <el-select v-model="ele.type" style="width: 100%" placeholder="请选择组件排版">
                  <el-option key="full" label="充满" value="full"/>
                  <el-option key="shrink" label="收缩" value="shrink"/>
                </el-select>
              </el-form-item>
              <el-form-item label="组件外上距离px" prop="marginTop">
                <el-input-number style="width: 100%" v-model="ele.marginTop" step-strictly :step="1" :min="0" :max="100"></el-input-number>
              </el-form-item>
              <el-form-item label="组件外下距离px" prop="marginBottom">
                <el-input-number style="width: 100%" v-model="ele.marginBottom" step-strictly :step="1" :min="0" :max="100"></el-input-number>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane v-if="ele.key == 'div'" label="文字属性" name="font">
            <el-form :model="ele" v-loading="loading">
              <el-form-item label="文字内容" prop="text">
                <el-input v-model.trim="ele.text" placeholder="请输入文字内容" @keyup.enter.native="save" :maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="字体大小" prop="fontSize">
                <el-input-number style="width: 100%" v-model="ele.fontSize" step-strictly :step="1" :min="1" :max="100"></el-input-number>
              </el-form-item>
              <el-form-item label="字体单位" prop="unit">
                <el-select v-model="ele.unit" style="width: 100%" placeholder="请选择字体单位">
                  <el-option key="rpx" label="rpx" value="rpx"/>
                  <el-option key="px" label="px" value="px"/>
                </el-select>
              </el-form-item>
              <el-form-item label="文字排列" prop="align">
                <el-select v-model="ele.align" style="width: 100%" placeholder="请选择文字排列">
                  <el-option key="left" label="左对齐" value="left"/>
                  <el-option key="center" label="居中" value="center"/>
                  <el-option key="right" label="右对齐" value="right"/>
                </el-select>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane v-if="ele.key == 'imageList'" label="图片属性" name="image">
            <el-form :model="ele" v-loading="loading">
              <el-form-item label="图片数量">
                <el-input-number style="width: 100%" v-model="ele.imageQuantity" step-strictly :step="1" :min="1" :max="6" @change="changeImageQuantity"></el-input-number>
              </el-form-item>
              <el-form-item label="图片高度rpx">
                <el-input-number style="width: 100%" v-model="ele.imageHeight" step-strictly :step="1" :min="1" :max="10000"></el-input-number>
              </el-form-item>
              <el-form-item label="图片宽度rpx">
                <el-input-number style="width: 100%" v-model="ele.imageWidth" step-strictly :step="1" :min="1" :max="750/ele.imageQuantity"></el-input-number>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane v-if="ele.key == 'imageList'" label="图片内容" name="image_content">
            <el-form :model="ele" v-loading="loading">
              <div v-for="c in ele.imageList">
                <el-form-item :label="'图片类型'+(c.index+1)">
                  <el-select v-model="c.imageType" style="width: 100%" placeholder="请选择图片类型">
                    <el-option v-for="item in imageTypeList" :key="item.key" :label="item.name" :value="item.key"/>
                  </el-select>
                </el-form-item>
                <el-form-item :label="'图片地址'+(c.index+1)">
                  <el-tooltip class="item" effect="dark" content="类型是商品时，不填使用默认商品图片" placement="top">
                    <el-input v-model.trim="c.imageUrl" placeholder="https://" :maxlength="255"></el-input>
                  </el-tooltip>
                </el-form-item>
                <el-form-item v-show="c.imageType == 'PAGE' " :label="'小程序页面地址'+(c.index+1)">
                  <el-input v-model.trim="c.pageUrl" placeholder="地址" :maxlength="100"></el-input>
                </el-form-item>
                <el-form-item v-show="c.imageType == 'PAGE'" :label="'小程序页面参数'+(c.index+1)">
                  <el-input v-model.trim="c.pageParam" placeholder="参数" :maxlength="200"></el-input>
                </el-form-item>
                <el-form-item v-show="c.imageType == 'GOODS'" :label="'图片'+(c.index+1)+'货号'">
                  <el-input v-model.trim="c.goodsCode" placeholder="请输入货号" :maxlength="100"></el-input>
                </el-form-item>
                <el-form-item v-show="c.imageType == 'H5'" :label="'H5地址'+(c.index+1)">
                  <el-input v-model.trim="c.htmlUrl" placeholder="https://" :maxlength="200"></el-input>
                </el-form-item>
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane v-if="ele.key == 'carousel'" label="图片属性" name="carousel">
            <el-form :model="ele" v-loading="loading">
              <el-form-item label="图片数量">
                <el-input-number style="width: 100%" v-model="ele.imageQuantity" step-strictly :step="1" :min="1" :max="15" @change="setImageQuantity"></el-input-number>
              </el-form-item>
              <el-form-item label="图片高度rpx">
                <el-input-number style="width: 100%" v-model="ele.imageHeight" step-strictly :step="1" :min="1" :max="10000"></el-input-number>
              </el-form-item>
              <el-form-item label="图片宽度rpx">
                <el-input-number style="width: 100%" v-model="ele.imageWidth" step-strictly :step="1" :min="1" :max="750"></el-input-number>
              </el-form-item>
              <div v-for="c in ele.imageList" :key="c.index">
                <el-form-item :label="'图片类型'+(c.index+1)">
                  <el-select v-model="c.imageType" style="width: 100%" placeholder="请选择图片类型">
                    <el-option v-for="item in imageTypeList" :key="item.key" :label="item.name" :value="item.key"/>
                  </el-select>
                </el-form-item>
                <el-form-item :label="'图片地址'+(c.index+1)">
                  <el-tooltip class="item" effect="dark" content="类型是商品时，不填使用默认商品图片" placement="top">
                    <el-input v-model.trim="c.imageUrl" placeholder="https://" :maxlength="255"></el-input>
                  </el-tooltip>
                </el-form-item>
                <el-form-item v-show="c.imageType == 'PAGE' " :label="'小程序页面地址'+(c.index+1)">
                  <el-input v-model.trim="c.pageUrl" placeholder="地址" :maxlength="100"></el-input>
                </el-form-item>
                <el-form-item v-show="c.imageType == 'PAGE'" :label="'小程序页面参数'+(c.index+1)">
                  <el-input v-model.trim="c.pageParam" placeholder="参数" :maxlength="200"></el-input>
                </el-form-item>
                <el-form-item v-show="c.imageType == 'GOODS'" :label="'图片'+(c.index+1)+'货号'">
                  <el-input v-model.trim="c.goodsCode" placeholder="请输入货号" :maxlength="100"></el-input>
                </el-form-item>
                <el-form-item v-show="c.imageType == 'H5'" :label="'H5地址'+(c.index+1)">
                  <el-input v-model.trim="c.htmlUrl" placeholder="https://" :maxlength="200"></el-input>
                </el-form-item>
              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <div style="margin-bottom: 30px;text-align: center">
          <el-button @click="handleClose">关闭</el-button>
          <el-button :disabled="selectIndex == 0" type="warning" @click="moveUp">上移</el-button>
          <el-button :disabled="selectIndex + 1 == list.length" type="warning" @click="moveDown">下移</el-button>
          <el-button type="danger" @click="removeEle">删除</el-button>
        </div>
      </div>
    </el-drawer>
  </el-dialog>
</template>

<script>

  import {save, info} from '@/api/shop/config/components/components'
  import vuedraggable from 'vuedraggable'

  export default {
    components: {vuedraggable},
    filters: {},
    directives: {},
    data() {
      return {
        activeName: 'base',
        screen: 667,
        screenList: [{name: 'iPhone6', height: 667, wight: 375}, {name: 'iPhoneX', height: 812, wight: 375}],
        componentsList: [
          {key: 'div', color: '#42b983', name: 'DIV', text: '', type: 'full', fontSize: 40, unit: 'rpx', align: 'center', marginTop: 12, marginBottom: 0},
          {key: 'imageList', color: '#AAAAAA', name: '图片组', type: 'full', marginTop: 12, marginBottom: 0, imageHeight: 100, imageQuantity: 1, imageWidth: 750, imageType: 'GOODS', imageList: []},
          {key: 'carousel', color: '#00FFFF', name: '走马灯', type: 'full', marginTop: 12, marginBottom: 0, imageHeight: 100, imageQuantity: 5, imageWidth: 750, imageList: []}
        ],
        list: [],
        loading: false,
        show: false,
        form: {},
        ele: {name: '', text: '', type: 'full', fontSize: 40, unit: 'rpx', align: 'center', marginTop: 12, marginBottom: 0},
        rules: {
          name: [{required: true, trigger: 'blur', message: '必填字段'}],
          active: [{required: true, trigger: 'blur', message: '必填字段'}]
        },
        drawer: false,
        screenHeight: 0,
        selectIndex: -1,
        imageTypeList: [{key: 'NO', name: '无事件'}, {key: 'H5', name: 'H5链接'}, {key: 'GOODS', name: '商品'}, {key: 'PAGE', name: '小程序页面'}]
      }
    },
    computed: {},
    mounted() {
      const that = this
      that.screenHeight = document.body.clientHeight
      window.onresize = () => {
        return (() => {
          window.screenHeight = document.body.clientHeight
          that.screenHeight = window.screenHeight
        })()
      }
    },
    methods: {
      swapItems(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0]
        return arr
      },
      moveUp() {
        this.swapItems(this.list, this.selectIndex, this.selectIndex - 1)
        this.showDrawer(this.list[this.selectIndex - 1], this.selectIndex - 1)
      },
      moveDown() {
        this.swapItems(this.list, this.selectIndex, this.selectIndex + 1)
        this.showDrawer(this.list[this.selectIndex + 1], this.selectIndex + 1)
      },
      changeImageQuantity() {
        this.ele.imageWidth = 750 / this.ele.imageQuantity
        this.setImageQuantity()
      },
      setImageQuantity() {
        if (this.ele.imageList.length != this.ele.imageQuantity) {
          this.ele.imageList = []
          for (let i = 0; i < this.ele.imageQuantity; i++) {
            this.ele.imageList.push({index: i, imageType: 'NO', pageUrl: '', pageParam: '', goodsCode: '', htmlUrl: '', imageUrl: ''})
          }
        }
      },
      showDrawer(ele, i) {
        this.ele = ele
        this.selectIndex = i
        this.drawer = true
        this.activeName = 'base'
        if (this.ele.key == 'carousel' || this.ele.key == 'imageList') {
          this.setImageQuantity()
        }
        this.$nextTick(() => setTimeout(() => {
          this.$refs.autoFocus.focus()
        }, 50))
      },
      handleClose() {
        this.drawer = false
      },
      removeEle() {
        this.list.splice(this.selectIndex, 1)
        this.handleClose()
      },
      pushToList(e) {
        let ele = JSON.parse(JSON.stringify(e))
        this.list.push(ele)
      },
      onClose() {
        this.show = false
      },
      onOpen(ele) {
        this.form = JSON.parse(JSON.stringify(ele))
        this.show = true
        this.loadInfo()
      },
      loadInfo() {
        this.loading = true
        info({themeId: this.form.id}).then(res => {
          this.list = res.data
        }).finally(() => this.loading = false)
      },
      save() {
        //判断name是否有值
        this.loading = true
        save({themeId: this.form.id, list: this.list}).then(res => {
          this.$message({message: '保存成功', type: 'success'})
          this.onClose()
          this.$emit("getList", {})
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>
  .drawer {
    height: 100%;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .item {
    cursor: pointer;
    text-align: center;
    width: 100%;
    color: #ffffff;
  }

  .item:hover {
    color: rgba(0, 0, 0, .9);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .box {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .dialog-footer {
    text-align: right;
  }
</style>
