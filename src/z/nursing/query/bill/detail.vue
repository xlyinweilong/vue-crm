<template>
  <div>
    <div class="tab-container">
      <el-form ref="form" v-loading="loading">
        <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="handleTagPaneClick">
          <el-tab-pane label="基本资料" name="BASE">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="单据编号">
                  <el-input class="showDisabled" v-model="detail.code" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建时间">
                  <el-input class="showDisabled" v-model="detail.createDate" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="服务店铺">
                  <el-input class="showDisabled" v-model="detail.channelAliasNameAndName" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="当前状态">
                  <el-input class="showDisabled" v-model="detail.statusMean" :disabled="true"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="创建员工编号">
                  <el-input class="showDisabled" v-model="detail.createEmployCode" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建员工姓名">
                  <el-input class="showDisabled" v-model="detail.createEmployName" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户昵称">
                  <el-input class="showDisabled" v-model="detail.customerUserNickName" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="客户默认电话">
                  <el-input class="showDisabled" v-model="detail.customerUserMobile" :disabled="true"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">

            </el-row>
          </el-tab-pane>
          <el-tab-pane label="货品信息" name="GOODS">
            <div v-for="goods in detail.goodsList">
              <el-card class="box-card">
                <div v-if="goods.problemGoodsUrlList.length > 0">
                  <p><b>客服问题：</b></p>
                  <p>{{goods.problemMessage}}</p>
                  <div>
                    <el-image v-for="goodsUrl in detail.problemGoodsUrlList"
                              style="width: 100px; height: 100px"
                              :src="goodsUrl"
                              :preview-src-list="detail.problemGoodsUrlList">
                    </el-image>
                  </div>
                </div>
                <div>
                  <p><b>品类：{{goods.categoryName}}</b></p>
                  <p>销售价：{{goods.categoryPrice}}</p>
                  <p>结算价：{{goods.settlePrice}}</p>
                  <div>
                    <el-image v-for="goodsUrl in goods.goodsUrlList"
                              style="width: 100px; height: 100px"
                              :src="goodsUrl"
                              :preview-src-list="goods.goodsUrlList">
                    </el-image>
                  </div>
                </div>
              </el-card>
            </div>
          </el-tab-pane>
          <el-tab-pane label="操作记录" name="OPERATION">
            <el-table
              :data="detail.operationLogList"
              tooltip-effect="dark"
              style="width: 100%"
              highlight-current-row
              fit
              border
            >
              <el-table-column label="操作时间" align="center">
                <template slot-scope="scope">
                  {{ scope.row.createDate }}
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  {{ scope.row.operation }}
                </template>
              </el-table-column>
              <el-table-column label="操作前状态" align="center">
                <template slot-scope="scope">
                  {{ scope.row.beforeStatusMean }}
                </template>
              </el-table-column>
              <el-table-column label="操作后状态" align="center">
                <template slot-scope="scope">
                  {{ scope.row.afterStatusMean }}
                </template>
              </el-table-column>
              <el-table-column label="操作人昵称" align="center">
                <template slot-scope="scope">
                  {{ scope.row.operationUserName }}
                </template>
              </el-table-column>
              <el-table-column label="被扫码人昵称" align="center">
                <template slot-scope="scope">
                  {{ scope.row.sweptCodeUserName }}
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="洗衣坊问题" name="DIFF">
            <el-image v-for="goodsUrl in detail.problemGoodsUrlList"
                      style="width: 100px; height: 100px"
                      :src="goodsUrl"
                      :preview-src-list="detail.problemGoodsUrlList">
            </el-image>
            <div>
              <p><b>问题描述：</b></p>
              {{detail.problemMessage}}
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-form>

    </div>


  </div>
</template>

<script>
  import {info} from '@/api/nursing/nursing'

  export default {
    components: {},
    data() {
      return {
        detail: {
          id: ''
        },
        loading: false,
        activeName: 'BASE'
      }
    },
    created() {
      const id = this.$route.params && this.$route.params.id
      if (id != null) {
        this.detail.id = id
        this.info()
      }
    },
    methods: {
      info() {
        this.loading = true
        info({id: this.detail.id}).then(res => {
          this.detail = JSON.parse(JSON.stringify(res.data))
        }).finally(() => this.loading = false)
      },
      //修改tag pane
      handleTagPaneClick(tab, event) {
        if (tab.name === 'GOODS') {
          this.$refs.detailGoods.initFocus()
        } else if (tab.name === 'DIFF') {
          this.$refs.diffGoods.init()
        }
      }
    }
  }
</script>

<style>
  .showDisabled .el-input.is-disabled .el-input__inner {
    background-color: #ffffff;
  }
</style>


