<template>
  <div>
    <div class="tab-container">
      <el-form ref="form" v-loading="loading">
        <el-tabs value="1" style="margin-top:15px;" type="border-card">
          <el-tab-pane label="基本资料" name="1">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="货号">
                  <el-input v-model="goods.code" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="货品名称">
                  <el-input v-model="goods.name" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="品牌">
                  <el-input v-model="goods.brandName" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="吊牌价">
                  <el-input v-model="goods.tagPrice" :disabled="true"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="一级品类">
                  <el-input v-model="goods.categoryName" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="二级品类">
                  <el-input v-model="goods.category2Name" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="年份">
                  <el-input v-model="goods.yearName" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="季节">
                  <el-input v-model="goods.seasonName" :disabled="true"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="tabType" style="margin-top:15px;" type="border-card">
          <el-tab-pane label="CRM资料" name="1">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="是否上架">
                  <el-select style="width: 100%" v-model="goods.onShelf" placeholder="请选择是否上架">
                    <el-option :key="true" label="上架" :value="true"/>
                    <el-option :key="false" label="下架" :value="false"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="CRM名称">
                  <el-input v-model="goods.crmName" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="零售价">
                  <el-input-number style="width: 100%" v-model="goods.price" :precision="2" :step="0.01" :min="0" :max="9999999999" :controls="false"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="积分价">
                  <el-input-number style="width: 100%" v-model="goods.integralPrice" :precision="0" :step="1" :min="0" :max="9999999999" :controls="false"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="加购价">
                  <el-input-number style="width: 100%" v-model="goods.addPrice" :precision="2" :step="0.01" :min="0" :max="9999999999" :controls="false"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="库存数量">
                  <el-input-number style="width: 100%" v-model="goods.stockVolume" :precision="0" :step="1" :min="0" :max="9999999999" :controls="false"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="基础销量">
                  <el-input-number style="width: 100%" v-model="goods.baseSalesVolume" :precision="0" :step="1" :min="0" :max="9999999999" :controls="false"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="图片地址1">
                  <el-input v-model="goods.imageUrl1" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="图片地址2">
                  <el-input v-model="goods.imageUrl2" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="图片地址3">
                  <el-input v-model="goods.imageUrl3" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="图片地址4">
                  <el-input v-model="goods.imageUrl4" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="图片地址5">
                  <el-input v-model="goods.imageUrl5" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="图片地址6">
                  <el-input v-model="goods.imageUrl6" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="图片地址7">
                  <el-input v-model="goods.imageUrl7" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="图片地址8">
                  <el-input v-model="goods.imageUrl8" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="图片地址9">
                  <el-input v-model="goods.imageUrl9" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="图片地址10">
                  <el-input v-model="goods.imageUrl10" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="图片地址11">
                  <el-input v-model="goods.imageUrl11" clearable/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="图片地址12">
                  <el-input v-model="goods.imageUrl12" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="详细资料图片" name="2">
            <div class="filter-container">
              <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="addImageDetail">新增</el-button>
            </div>
            <el-table
              :data="imageDetailList"
              style="width: 100%">
              <el-table-column
                label="图片预览"
                width="100">
                <template slot-scope="scope">
                  <el-image
                    style="width: 80px; height: 80px"
                    :src="scope.row"
                    :preview-src-list="imageDetailList">
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column
                label="URL地址">
                <template slot-scope="scope">
                  {{ scope.row }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" fixed="right" width="250">
                <template slot-scope="scope">
                  <el-button type="text" :disabled="scope.$index == 0" @click="moveUp(scope.$index)">上移</el-button>
                  <el-button type="text" :disabled="scope.$index == imageDetailList.length - 1" @click="moveDown(scope.$index)">下移</el-button>
                  <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                  <el-button type="text" @click="remove(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="库存" name="3">
            <el-table
              :data="goods.colorList"
              border
              style="width: 100%">
              <el-table-column fixed label="颜色">
                <template slot-scope="scope">
                  {{scope.row.name}}
                </template>
              </el-table-column>
              <el-table-column
                width="240"
                v-for="(size,index) in goods.sizeList"
                :label="size.name">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.sizeList[index].stockCount" :precision="0" :step="1" step-strictly :controls="false" :min="0" :max="99999999" label="库存"></el-input-number>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <div class="operation">
          <el-button :loading="loading" type="success" @click="save">确定</el-button>
        </div>
      </el-form>
    </div>
    <el-dialog
      title="详细资料图片"
      :visible.sync="dialogVisible"
      width="750px"
      :before-close="handleClose">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="图片URL地址" prop="imageUrl">
          <el-input @keyup.enter.native="saveImage" ref="imageUrl" v-model="form.imageUrl" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="saveImage">确定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {info, save} from '@/api/transfer/goods'

  export default {
    components: {},
    data() {
      return {
        goods: {
          id: '',
          colorList: [],
          sizeList: [],
        },
        loading: false,
        tabType: "1",
        imageDetailList: [],
        dialogVisible: false,
        form: {imageUrl: ''},
        rules: {
          imageUrl: [{required: true, trigger: 'blur', message: '必填字段'}],
        },
      }
    },
    created() {
      const id = this.$route.params && this.$route.params.id
      if (id != null) {
        this.goods.id = id
        this.info()
      }
    },
    methods: {
      addImageDetail() {
        this.edit('')
      },
      handleClose() {

      },
      saveImage() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.imageDetailList.push(this.form.imageUrl)
            this.dialogVisible = false
          }
        })
      },
      edit(url) {
        if (this.$refs['form'] != null) {
          this.$refs['form'].resetFields()
        }
        this.form.imageUrl = url
        this.dialogVisible = true
        this.$nextTick(() => this.$refs.imageUrl.select())
      },
      remove(index) {
        this.imageDetailList.splice(index, 1)
      },
      swapItems(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0]
        return arr
      },
      moveUp(index) {
        this.swapItems(this.imageDetailList, index, index - 1)
      },
      moveDown(index) {
        this.swapItems(this.imageDetailList, index, index + 1)
      },
      info() {
        this.loading = true
        info({id: this.goods.id}).then(res => {
          this.goods = JSON.parse(JSON.stringify(res.data))
          this.imageDetailList = this.goods.imageDetailList
          this.goods.sizeList.forEach(s => s.stockCount = 0)
          this.goods.colorList.forEach(c => {
            c.sizeList = JSON.parse(JSON.stringify(this.goods.sizeList))
            c.sizeList.forEach(s => {
              let st = this.goods.stockList.find(stock => stock.colorId === c.id && stock.sizeId === s.id)
              if (st != null) {
                s.stockCount = st.stockCount
              }
            })
          })
        }).finally(() => this.loading = false)
      },
      save() {
        this.loading = true
        this.goods.imageDetailList = this.imageDetailList
        save(this.goods).then(res => {
          this.$message({message: '操作成功', type: 'success'})
        }).finally(() => this.loading = false)
      }
    }
  }
</script>

<style>
  .showDisabled .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
  }

  .operation {
    text-align: right;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-right: 15px;
    background-color: #ffffff;
    margin-top: 10px;
    border: 1px solid #DCDFE6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }
</style>


