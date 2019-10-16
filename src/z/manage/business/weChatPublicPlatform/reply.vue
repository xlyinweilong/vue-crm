<template>
  <div>
    <div class="tab-container">
      <el-tabs v-model="tabName" style="margin-top:15px;" type="border-card" @tab-click="tabClick">
        <el-tab-pane label="回复配置" name="BASE">
          <el-form ref="form" :model="form" :rules="rules" v-loading="loading">
            <el-form-item label="一般回复" prop="reply">
              <el-input type="textarea" :rows="2" placeholder="请输入回复内容" v-model="form.reply"></el-input>
            </el-form-item>
            <el-form-item label="关注回复" prop="subscribe">
              <el-input type="textarea" :rows="2" placeholder="请输入回复内容" v-model="form.subscribe"></el-input>
            </el-form-item>
            <el-form-item label="取消关注回复" prop="unsubscribe">
              <el-input type="textarea" :rows="2" placeholder="请输入回复内容" v-model="form.unsubscribe"></el-input>
            </el-form-item>
          </el-form>
          <div class="filter-container" style="margin-top: 20px">
            <el-button style="float:right" :loading="loading" class="filter-item" type="success" icon="el-icon-check" @click="save">保存</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="关键字回复" name="KEY">
          <replyList ref="replyList"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import {save, info} from '@/api/config/sysconfig'
  import Sticky from '@/components/Sticky'
  import replyList from './reply/replyList'

  export default {
    components: {replyList},
    data() {
      return {
        form: {
          reply: '',
          subscribe: '',
          unsubscribe: ''
        },
        rules: {
          reply: [{required: true, message: '必填字段', trigger: 'blur'}],
          subscribe: [{required: true, message: '必填字段', trigger: 'blur'}],
          unsubscribe: [{required: true, message: '必填字段', trigger: 'blur'}]
        },
        loading: false,
        tabName: 'BASE'
      }
    },
    created() {
      this.loading = true
      this.getInfo('WE_CHAT_PLATFORM_reply', 'reply')
      this.getInfo('WE_CHAT_PLATFORM_subscribe', 'subscribe')
      this.getInfo('WE_CHAT_PLATFORM_unsubscribe', 'unsubscribe')
      this.loading = false
    },
    methods: {
      tabClick() {
        if (this.tabName == 'KEY') {
          this.$refs.replyList.getList()
        }
      },
      async getInfo(key, rs) {
        await info({key: key}).then(res => {
          this.form[rs] = res.data.configValue
        }).catch(() => this.loading = false)
      },
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            this.saveConfig('WE_CHAT_PLATFORM_reply', 'reply')
            this.saveConfig('WE_CHAT_PLATFORM_subscribe', 'subscribe')
            this.saveConfig('WE_CHAT_PLATFORM_unsubscribe', 'unsubscribe')
            this.$message({message: '保存成功', type: 'success'})
            this.loading = false
          }
        })
      },
      async saveConfig(key, rs) {
        await save({configKey: key, configValue: this.form[rs]}).then(response => {
        }).catch(() => this.loading = false)
      }
    }
  }
</script>
