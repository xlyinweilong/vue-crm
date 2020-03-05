<template>
  <el-dialog
    title="打包确认"
    :close-on-click-modal="false"
    :visible="show"
    width="1200px"
    top="1vh"
    @close="onClose">
    <div>
      <el-select v-model="expressId" placeholder="请选择快递">
        <el-option
          v-for="item in expressList"
          :key="item.id"
          :label="item.label"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select v-model="sendId" filterable placeholder="请选择发货信息">
        <el-option v-for="item in sendList" :key="item.id" :label="item.name" :value="item.id"/>
      </el-select>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose" :loading="loading">取消</el-button>
      <el-button type="primary" @click="save" :loading="loading">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Pagination from '@/components/Pagination'
  import {loadPackInfo, pack, getAccountList} from '@/api/shop/business/pack/pack'
  import {getAll as loadSenderList} from '@/api/shop/config/sender/sender'

  export default {
    components: {Pagination},
    filters: {},
    directives: {},
    props: {
    },
    computed: {},
    data() {
      return {
        loading: false,
        show: false,
        list: [],
        goodsList: [],
        ids: [],
        expressList: [],
        expressId: '',
        sendId: '',
        sendList: []
      }
    },
    computed: {},
    mounted() {
    },
    methods: {
      save() {
        let form = {list: this.list}
        form.sendId = this.sendId
        if (form.sendId == '') {
          this.$message.error('请选择发货信息')
          return
        }
        this.loading = true
        pack(form).then(res => {
          this.$message({message: '保存成功', type: 'success'})
          this.onClose()
          this.$emit("getList", {})
        }).finally(() => this.loading = false)
      },
      onClose() {
        this.show = false
      },
      onOpen(ids) {
      }
    }
  }
</script>

<style scoped>

</style>
