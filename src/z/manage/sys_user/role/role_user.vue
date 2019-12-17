<template>
  <el-dialog
    title="角色用户"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="580px">
    <div v-loading="loading">
      <el-row>
        <el-col :span="24">
          <el-select v-model="showText" multiple placeholder="请选择">
            <el-option key="NAME" label="名称" value="NAME"/>
            <el-option key="ACCOUNT" label="账号" value="ACCOUNT"/>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px">
        <el-col :span="24">
          <el-transfer
            :props="{key: 'id',label: label}"
            :titles="['待选区','选中区']"
            filterable
            filter-placeholder="请输入账号或姓名"
            v-model="selectedUser"
            :data="allUser">
          </el-transfer>
        </el-col>
      </el-row>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import {users, saveUsers} from '@/api/manager/sys_user/role'
    import {all as allUser} from '@/api/manager/sys_user/user'


    export default {
        components: {},
        filters: {},
        directives: {},
        props: {},
        computed: {
            label() {
                if (this.showText.length == 2) {
                    return 'label'
                } else if (this.showText.indexOf('NAME') > -1) {
                    return 'name'
                } else if (this.showText.indexOf('ACCOUNT') > -1) {
                    return 'account'
                }
                return 'label'
            }
        },
        data() {
            return {
                roleId: '',
                show: false,
                loading: false,
                allUser: [],
                selectedUser: [],
                showText: ['NAME', 'ACCOUNT']
            }
        },
        mounted() {
        },
        methods: {
            async getAllUserList() {
                if (this.allUser.length == 0) {
                    this.loading = true
                    await allUser({disabled: false}).then(res => {
                        this.allUser = res.data.filter(t => t.type != 'root')
                        this.allUser.forEach(t => t.label = t.account + "(" + t.name + ")")
                    }).finally(() => this.loading = false)
                }
            },
            onClose() {
                this.show = false
            },
            onOpen(ele) {
                this.roleId = ele.id
                this.show = true
                this.getAllUserList()
                this.info()
            },
            info() {
                this.loading = true
                users({roleId: this.roleId}).then(res => {
                    this.selectedUser = res.data
                }).finally(() => this.loading = false)
            },
            save() {
                this.loading = true
                saveUsers({userIds: this.selectedUser, roleId: this.roleId}).then(res => {
                    this.$message({message: '保存成功', type: 'success'})
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
