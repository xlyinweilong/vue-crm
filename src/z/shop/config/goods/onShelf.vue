<template>
  <el-dialog
    title="上/下架"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="600px">
    <span>确定要上/下架选中的<b>{{selectedIds.length}}</b>款商品吗？</span>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {onShelf} from '@/api/transfer/goods'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    data() {
      return {
        loading: false,
        show: false,
        selectedIds: []
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.show = false
      },
      onOpen(selectedIds) {
        this.selectedIds = selectedIds
        this.show = true
      },
      save() {
        this.loading = true
        onShelf(this.selectedIds).then(res => {
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
