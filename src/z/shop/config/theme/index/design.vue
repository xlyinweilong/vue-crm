<template>
  <el-dialog
    title="首页设计"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    fullscreen>
    <div>
      <el-row :gutter="20">
        <!--工具栏-->
        <el-col class="box" :span="10" style="text-align: center;">
          <h5 style="margin-bottom: 3px;font-size: 20px;color: #303133">工具栏</h5>
          <p style="margin-top: 0;color: #909399;font-size: 14px">点击添加</p>
          <div class="item" v-for="c in componentsList" :style="{'background-color': c.color}" :key="c.key" @click="pushToList(c)">
            <div>{{c.name}}</div>
          </div>
          <p style="margin-bottom: 20px"></p>
        </el-col>
        <!--内容-->
        <el-col class="box" :span="14"  style="text-align: center;">
          <h5 style="margin-bottom: 3px;font-size: 20px;color: #303133">首页</h5>
          <p style="margin-top: 0;color: #909399;font-size: 14px">宽度750rpx</p>
          <div v-for="c in list" class="item" style="border:2px solid;" :style="{'border-color':c.color}">
            <p></p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="design">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>

  import {save} from '@/api/shop/config/theme/theme'
  import vuedraggable from 'vuedraggable'

  export default {
    components: {vuedraggable},
    filters: {},
    directives: {},
    data() {
      return {
        componentsList: [{key: 'div', color: '#42b983', name: 'DIV'}, {key: 'image', color: '#AAAAAA', name: '图片'}],
        list: [],
        loading: false,
        show: false,
        form: {},
        rules: {
          name: [{required: true, trigger: 'blur', message: '必填字段'}],
          active: [{required: true, trigger: 'blur', message: '必填字段'}]
        }
      }
    },
    mounted() {
    },
    methods: {
      pushToList(e){
        let ele = JSON.parse(JSON.stringify(e))
        this.list.push(ele)
      },
      onClose() {
        this.show = false
      },
      onOpen(ele) {
        this.form = JSON.parse(JSON.stringify(ele))
        this.show = true
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
      },
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            save(this.form).then(res => {
              this.$message({message: '保存成功', type: 'success'})
              this.onClose()
              this.$emit("getList", {})
            }).finally(() => this.loading = false)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .item {
    cursor: pointer;
    text-align: center;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #ffffff;
  }

  .item:hover {
    color: rgba(0, 0, 0, .9);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  .box {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

</style>
