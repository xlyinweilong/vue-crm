<template>
  <el-dialog
    title="生日劵"
    :close-on-click-modal="false"
    :visible="show"
    width="650px"
    @close="onClose">
    <div>
      <div class="tips" style="color: #909399;font-size:11px;margin-bottom: 10px"><span style="color: red">生日劵建议用法：</span>
        如活动：10月25号开始。卡卷设置次年10月25号结束，领取后立即生效，30天后失效，每人限制领取一张，不可转赠和分享。生日可提前20天领取，过生日10天内可以领取。
        <span style="color: red">（投放方式为券架领取，其他方式不起作用）</span>
      </div>
      <el-form ref="form" :model="form" v-loading="loading">
        <el-form-item label="开启">
          <el-select style="width: 100%" v-model="form.isBirthday" placeholder="请选择是否开启">
            <el-option label="开启" :value="true"></el-option>
            <el-option label="关闭" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="生日提前多少天可以领取">
              <el-input-number :disabled="!form.isBirthday" style="width: 100%" v-model="form.startReceiveDay" :step="1" :min="0" :max="365"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生日过后多少天不可以领取">
              <el-input-number :disabled="!form.isBirthday" style="width: 100%" v-model="form.endReceiveDay" :step="1" :min="0" :max="365"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="锁定生日">
              <el-tooltip class="item" effect="dark" content="锁定后后台会记录领取时会员的生日为隐藏字段，前台生日依旧可以改" placement="top">
                <el-select :disabled="!form.isBirthday" style="width: 100%" v-model="form.lockBirthday" placeholder="请选择是否锁定">
                  <el-option label="锁定" :value="true"></el-option>
                  <el-option label="不锁定" :value="false"></el-option>
                </el-select>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动使用锁定生日">
              <el-tooltip class="item" effect="dark" content="如果用户存在隐藏生日字段，就仅使用隐藏字段计算" placement="top">
                <el-select :disabled="!form.isBirthday" style="width: 100%" v-model="form.useLockBirthday" placeholder="请选择是否使用锁定生日">
                  <el-option label="使用" :value="true"></el-option>
                  <el-option label="不使用" :value="false"></el-option>
                </el-select>
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="会员等级">
          <el-tooltip class="item" effect="dark" content="不设置不限制等级" placement="top">
            <el-select :disabled="!form.isBirthday" filterable multiple style="width: 100%" v-model="form.vipGradeIds" placeholder="请选择会员等级">
              <el-option v-for="grade in gradeList" :key="grade.id" :label="grade.name" :value="grade.id"></el-option>
            </el-select>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
      <el-button :loading="loading" @click="onClose">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {setBirthday} from '@/api/vip/ticket/ticket'
  import {getAll} from '@/api/vip/grade/grade'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {},
    computed: {},
    data() {
      return {
        form: {
          isBirthday: true,
          startReceiveDay: 20,
          endReceiveDay: 10,
          lockBirthday: false,
          useLockBirthday: false,
          vipGradeIds: []
        },
        show: false,
        loading: false,
        gradeList: []
      }
    },
    mounted() {
    },
    methods: {
      getGradeList() {
        this.loading = true
        getAll().then(res => {
          this.gradeList = res.data.filter(d => d.disabled == 0 && d.powerShow)
        }).finally(() => this.loading = false)
      },
      save() {
        this.loading = true
        if (this.form.vipGradeIds.length == 0) {
          this.form.vipGradeIds = null
        } else {
          this.form.vipGradeIds = this.form.vipGradeIds.join(",")
        }
        setBirthday(this.form).then(res => {
          this.$message({message: '保存成功', type: 'success'})
          this.onClose()
          this.$emit("getList", {})
        }).finally(() => this.loading = false)
      },
      onClose() {
        this.show = false
      },
      onOpen(ele) {
        this.form = JSON.parse(JSON.stringify(ele))
        if (this.form.vipGradeIds != null) {
          this.form.vipGradeIds = this.form.vipGradeIds.split(",")
        } else {
          this.form.vipGradeIds = []
        }
        this.show = true
        if (this.gradeList.length == 0) {
          this.getGradeList()
        }
      }
    }
  }
</script>

<style scoped>

</style>
