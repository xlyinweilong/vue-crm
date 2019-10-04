<template>
  <el-dialog
    title="生成员工为用户"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="400px">
    <div>把未被禁用的员工生成用户账号和密码，账号和密码均为员工编号。如果账号已经被占用，则无法生成。</div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {initEmploy} from '@/api/manager/sys_user/user'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    data() {
      return {
        show: false,
        loading: false
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.show = false
      },
      onOpen() {
        this.show = true
      },
      save() {
        this.loading = true
        initEmploy({}).then(res => {
          this.$message({message: '操作成功', type: 'success'})
          setTimeout(() => {
            this.onClose()
            this.$emit("getList", {})
          }, 600)
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
