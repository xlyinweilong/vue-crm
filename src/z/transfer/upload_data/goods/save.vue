<template>
  <el-dialog
    :title="form.id == '' ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible="show"
    @close="onClose"
    width="650px">
    <el-form ref="form" :model="form" v-loading="loading" :rules="rules" label-width="80px">
      <el-form-item label="商品编号" prop="code">
        <el-input v-model.trim="form.code" :maxlength="20" placeholder="请输入编号"
                  @keyup.enter.native="save"></el-input>
      </el-form-item>
      <el-form-item label="商品名称" prop="name">
        <el-input v-model.trim="form.name" :maxlength="100" placeholder="请输入名称"
                  @keyup.enter.native="save"></el-input>
      </el-form-item>
      <el-form-item label="品牌" prop="brandId">
        <el-select style="width: 100%" filterable  v-model="form.brandId" placeholder="请选择">
          <el-option v-for="e in allBrandList" :key="e.id" :label="e.name" :value="e.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="年份" prop="yearId">
        <el-select style="width: 100%" filterable  v-model="form.yearId" placeholder="请选择">
          <el-option v-for="e in allYearList" :key="e.id" :label="e.name" :value="e.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="季节" prop="seasonId">
        <el-select style="width: 100%" filterable  v-model="form.seasonId" placeholder="请选择">
          <el-option v-for="e in allSeasonList" :key="e.id" :label="e.name" :value="e.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="分类" prop="categoryId">
        <el-select style="width: 100%" filterable  v-model="form.categoryId" placeholder="请选择">
          <el-option v-for="e in allCategoryList" :key="e.id" :label="e.name" :value="e.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="category2Id">
        <el-select style="width: 100%" filterable v-model="form.category2Id" placeholder="请选择">
          <el-option v-for="e in allCategory2List" :key="e.id" :label="e.name" :value="e.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="吊牌价" prop="tagPrice">
        <el-input-number style="width: 100%" v-model="form.tagPrice" step-strictly :precision="2" :step="0.01" :max="9999999" :controls="false"></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button :loading="loading" @click="onClose">取消</el-button>
      <el-button :loading="loading" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {saveGoods} from '@/api/transfer/goods'

  export default {
    components: {},
    filters: {},
    directives: {},
    props: {
      allBrandList: {
        default: []
      },
      allCategoryList: {
        default: []
      },
      allCategory2List: {
        default: []
      },
      allSeasonList: {
        default: []
      },
      allYearList: {
        default: []
      }
    },
    data() {
      return {
        loading: false,
        show: false,
        form: {
          id: ''
        },
        rules: {
          code: [{required: true, trigger: 'blur', message: '必填字段'}],
          name: [{required: true, trigger: 'blur', message: '必填字段'}],
          brandId: [{required: true, trigger: 'blur', message: '必填字段'}],
          yearId: [{required: true, trigger: 'blur', message: '必填字段'}],
          seasonId: [{required: true, trigger: 'blur', message: '必填字段'}],
          categoryId: [{required: true, trigger: 'blur', message: '必填字段'}],
          category2Id: [{required: true, trigger: 'blur', message: '必填字段'}],
          tagPrice: [{required: true, trigger: 'blur', message: '必填字段'}]
        }
      }
    },
    mounted() {
    },
    methods: {
      onClose() {
        this.show = false
      },
      onOpen(ele) {
        this.form = JSON.parse(JSON.stringify(ele))
        this.show = true
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
      },
      save() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            saveGoods(this.form).then(res => {
              this.$message({message: '保存成功', type: 'success'})
              this.onClose()
              this.$emit("getList", {})
            }).finally(() => this.loading = false)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
