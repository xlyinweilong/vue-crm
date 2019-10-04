<template>
  <el-dialog
    :title="form.id == null ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="600px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules">
      <!--<el-form-item label="类型" prop="icon">-->
        <!--<el-select style="width: 100%" v-model="form.icon" placeholder="请选择类型">-->
          <!--<el-option v-for="ci in cardIconList" :label="ci.url" :value="ci.url">-->
            <!--<span style="float: left">{{ ci.url }}</span>-->
            <!--<span style="float: right;">-->
               <!--<el-image style="width: 30px; height: 30px" :src="baseUrl + ci.url" fit="fit" />-->
            <!--</span>-->

          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <el-form-item label="升级规则信息" prop="levelUpInfo">
        <el-input v-model.trim="form.levelUpInfo" placeholder="请输入升级规则信息" @keyup.enter.native="save" :maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="规则明细" prop="info">
        <el-input v-model="form.info" type="textarea" :rows="2" placeholder="请输入规则明细" :maxlength="250"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {save} from '@/api/vip/rule/rule'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {
      show: {
        default: false
      },
      cardIconList: {
        default: []
      }
    },
    data() {
      return {
        baseUrl: process.env.BASE_API + "/static/images/icon/",
        rules: {},
        loading: false,
        title: '',
        form: {
          icon: '',
          levelUpInfo: '',
          info: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.$emit("update:show", false)
      },
      onOpen(ele) {
        this.form = JSON.parse(JSON.stringify(ele))
        console.log(this.form);
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
      },
      save() {
        this.loading = true
        save(this.form).then(res => {
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
