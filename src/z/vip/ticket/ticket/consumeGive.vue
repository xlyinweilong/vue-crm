<template>
  <el-dialog
    title="满额送"
    :close-on-click-modal="false"
    :visible="show"
    width="650px"
    @close="onClose">
    <div>
      <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
        <el-form-item label="开启" prop="consumeGive">
          <el-select style="width: 100%" v-model="form.consumeGive" placeholder="请选择是否开启">
            <el-option label="开启" :value="true"></el-option>
            <el-option label="关闭" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="满多少元送1张" prop="consumeGiveMoney">
              <el-input-number style="width: 100%" v-model="form.consumeGiveMoney"
                               :step="0.01" step-strictly
                               :min="0.01" :max="999999"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="满额类型" prop="consumeGiveType">
              <el-select style="width: 100%" v-model="form.consumeGiveType" placeholder="请选择满额类型">
                <el-option disabled label="累计满" value="CUMULATIVE"></el-option>
                <el-option label="单笔满" value="SINGLE_STROKE"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开始时间" prop="consumeGiveStart">
              <el-date-picker style="width: 100%" v-model="form.consumeGiveStart" type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始时间"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间" prop="consumeGiveEnd">
              <el-date-picker style="width: 100%" v-model="form.consumeGiveEnd" type="datetime"
                              value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="消费店铺" prop="channelIds">
              <el-select style="width: 100%" v-model="form.channelIds" multiple collapse-tags placeholder="请选择店铺">
                <el-option v-for="channel in channelList" :key="channel.id" :label="channel.name"
                           :value="channel.erpId"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
      <el-button :loading="loading" @click="onClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import {setConsumeGive} from '@/api/vip/ticket/ticket'
    import {getAll} from '@/api/manager/business/channel'
    import {all} from '@/api/vip/ticket/ticketConsumeGiveChannel'


    export default {
        components: {},
        filters: {},
        directives: {},
        props: {},
        computed: {},
        data() {
            return {
                channelList: [],
                form: {
                    channelIds: [],
                    consumeGive: true,
                    consumeGiveMoney: 0.01,
                    consumeGiveType: 'CUMULATIVE',
                    consumeGiveStart: null,
                    consumeGiveEnd: null
                },
                show: false,
                loading: false,
                rules: {
                    consumeGive: [{required: true, trigger: 'blur', message: '必填字段'}],
                    consumeGiveMoney: [{required: true, trigger: 'blur', message: '必填字段'}],
                    consumeGiveType: [{required: true, trigger: 'blur', message: '必填字段'}],
                    consumeGiveStart: [{required: true, trigger: 'blur', message: '必填字段'}],
                    consumeGiveEnd: [{required: true, trigger: 'blur', message: '必填字段'}]
                }
            }
        },
        mounted() {
        },
        methods: {
            async allChannel() {
                this.loading = true
                await getAll().then(res => {
                    this.channelList = res.data.filter(d => !d.disabled)
                }).finally(() => this.loading = false)
            },
            async allConsumeGiveChannel() {
                this.loading = true
                await all({id:this.form.id}).then(res => {
                    this.form.channelIds = res.data.map(p => p.channelErpId)
                }).finally(() => this.loading = false)
            },
            save() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        setConsumeGive(this.form).then(res => {
                            this.$message({message: '保存成功', type: 'success'})
                            this.onClose()
                            this.$emit("getList", {})
                        }).finally(() => this.loading = false)
                    }
                })
            },
            onClose() {
                this.show = false
            },
            onOpen(ele) {
                this.form = JSON.parse(JSON.stringify(ele))
                this.show = true
                this.allChannel()
                this.allConsumeGiveChannel()
            }
        }
    }
</script>

<style scoped>

</style>
