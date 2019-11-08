<template>
  <el-dialog
    :title="form.id == null ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    width="650px"
    @close="onClose">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <el-form-item label="关键字" prop="keyword">
        <el-input style="width: 100%" v-model="form.keyword" :maxlength="250" @keyup.enter.native="save"
                  placeholder="请输入识别的关键字"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select style="width: 100%" v-model="form.type" placeholder="请选择类型">
          <el-option key="WORDS" label="文字" value="WORDS"/>
          <el-option key="TICKET" label="卡券" value="TICKET"/>
          <el-option key="IMAGE" label="图片" value="IMAGE"/>
        </el-select>
      </el-form-item>
      <el-form-item v-show="form.type != 'IMAGE'" label="回复内容" prop="reply">
        <el-input v-model="form.reply" type="textarea" :rows="2" placeholder="请输入要回复的内容" :maxlength="2000"></el-input>
      </el-form-item>
      <el-form-item v-show="form.type == 'TICKET'" label="没有库存" prop="replyTicketNoStock">
        <el-input v-model="form.replyTicketNoStock" type="textarea" :rows="2" placeholder="请输入要回复的内容" :maxlength="2000"></el-input>
      </el-form-item>
      <el-form-item v-show="form.type == 'TICKET'" label="已经领取回复内容" prop="replyTicketAlreadyReceived">
        <el-input v-model="form.replyTicketAlreadyReceived" type="textarea" :rows="2" placeholder="请输入要回复的内容" :maxlength="2000"></el-input>
      </el-form-item>
      <el-form-item v-show="form.type == 'TICKET'" label="赠送优惠券" prop="ticketId">
        <el-select style="width: 100%" v-model="form.ticketId" filterable clearable placeholder="请选择赠送优惠券">
          <el-option v-for="ticket in tickets" :key="ticket.id" :label="ticket.code+'('+ticket.title+')'" :value="ticket.id"/>
        </el-select>
      </el-form-item>
      <el-form-item v-show="form.type == 'IMAGE'" label="素材ID" prop="mediaId">
        <el-input v-model="form.mediaId" placeholder="素材ID" :maxlength="100"></el-input>
      </el-form-item>
      <el-form-item label="禁用" prop="disabled">
        <el-select style="width: 100%" v-model="form.disabled" placeholder="请选择">
          <el-option :key="false" label="启用" :value="false"/>
          <el-option :key="true" label="禁用" :value="true"/>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
      <el-button :loading="loading" @click="onClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import {save} from '@/api/manager/wechat/reply'
    import {getAll} from '@/api/vip/ticket/ticket'

    export default {
        components: {},
        filters: {},
        directives: {},
        props: {},
        computed: {},
        data() {
            return {
                tickets: [],
                show: false,
                loading: false,
                title: '',
                form: {},
                rules: {
                    keyword: [{required: true, message: '必填字段', trigger: 'blur'}],
                    type: [{required: true, message: '必填字段', trigger: 'blur'}]
                }
            }
        },
        mounted() {
        },
        methods: {
            async getAllTickets() {
                this.loading = true
                await getAll({disabled: false}).then(res => {
                    this.tickets = res.data
                }).finally(() => this.loading = false)
            },
            onClose() {
                this.show = false
            },
            onOpen(ele) {
                this.form = JSON.parse(JSON.stringify(ele))
                this.show = true
                this.getAllTickets()
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
                            this.$emit("getList", {})
                            this.onClose()
                        }).finally(() => this.loading = false)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
