<template>
  <el-dialog
    title="权限"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="800px">
    <div>
      <el-tree
        :data="powerList"
        show-checkbox
        node-key="powerKey"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {save, getList} from '@/api/manager/sys_user/role_power'
  import {all as allPower} from '@/api/manager/sys_user/power'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    data() {
      return {
        show: false,
        rules: {
          roleName: [{required: true, trigger: 'blur', message: '必填字段'}]
        },
        loading: false,
        title: '',
        form: {},
        roleId: '',
        powerList: [],
        defaultProps: {
          children: 'subList',
          label: 'powerName'
        }
      }
    },
    mounted() {
    },
    methods: {
      async getPowerList() {
        if (this.powerList.length == 0) {
          this.loading = true
          await allPower().then(res => {
            this.powerList = res.data.filter(d => d.pid == null)
            this.powerList.forEach(p => this.getPowerNode(p, res.data))
            console.log(this.powerList)
          }).finally(() => this.loading = false)
        }
      },
      getPowerNode(node, allList) {
        let temp = allList.filter(d => d.pid == node.id)
        if (temp.length > 0) {
          node.subList = temp
          node.subList.forEach(n => {
            this.getPowerNode(n, allList)
          })
        }
      },
      onClose() {
        this.show = false
      },
      onOpen(roleId) {
        this.show = true
        this.getPowerList()
        this.roleId = roleId
        this.loading = true
        getList({roleId: this.roleId}).then(res => {
          this.$nextTick(() => this.$refs.tree.setCheckedKeys(res.data))
        }).finally(() => this.loading = false)
      },
      save() {
        this.loading = true
        save({roleId: this.roleId, powerKeys: this.$refs.tree.getCheckedKeys()}).then(res => {
          this.$message({message: '保存成功', type: 'success'})
          setTimeout(() => {
            this.onClose()
          }, 600)
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style scoped>

</style>
