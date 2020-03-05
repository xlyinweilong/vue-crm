<template>
  <el-dialog
    :title="'商品：'+form.code+'的尺码'"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="650px">
    <div>
      <el-button :loading="loading" icon="el-icon-plus" type="primary" @click="addEle">增加一个颜色</el-button>
    </div>
    <div v-loading="loading">
      <div v-for="(e,index) in list" style="margin-top: 8px">
        <el-input v-model.trim="e.name" :maxlength="20" placeholder="请输入颜色名称">
          <el-button slot="append" icon="el-icon-delete" @click="deleteEle(index)"></el-button>
        </el-input>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {info, saveSize} from '@/api/transfer/goods'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    data() {
      return {
        loading: false,
        show: false,
        list: [],
        form: {
          id: '',
          code: ''
        },
        rules: {}
      }
    },
    mounted() {
    },
    methods: {
      addEle() {
        this.list.push({name: ''})
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
        this.loading = true
        info({id: this.form.id}).then(res => {
          this.list = res.data.sizeList
        }).finally(() => this.loading = false)
      },
      deleteEle(index) {
        this.list.splice(index, 1)
      },
      save() {
        this.loading = true
        this.form.sizeList = this.list
        saveSize(this.form).then(res => {
          this.$message({message: '保存成功', type: 'success'})
          this.onClose()
          this.$emit("getList", {})
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
