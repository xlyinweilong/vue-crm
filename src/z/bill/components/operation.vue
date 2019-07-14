<template>
  <div>
    <div v-show="thisGoodsIndex == goodsList.length" class="filter-container">
      调拨已经完成
    </div>
    <div v-show="thisGoodsIndex !== goodsList.length" class="filter-container">
      <span class="filter-item" v-loading="loading">进度：<el-tag type="success">{{thisGoodsIndex + 1}} / {{goodsList.length}}</el-tag></span>
      <span class="filter-item" v-loading="loading">货号：{{goods.goodsCode}}</span>
      <span class="filter-item" style="margin-left: 30px">
      <el-radio v-model="type" label="OUT">单个模式</el-radio>
      <el-radio style="margin-left: 10px" v-model="type" label="BATCH">批量模式</el-radio>
      <el-radio style="margin-left: 10px" v-model="type" label="GOODS">整款模式</el-radio>
      </span>
      <el-button style="margin-left: 30px" :loading="loading" class="filter-item" type="primary" @click="nextGoods" v-text="(thisGoodsIndex + 1) == goodsList.length ? '完成' : '下一个'"></el-button>
      <el-button class="filter-item" type="primary" :loading="loading" :icon="showGoodsDetail ? 'el-icon-caret-top':'el-icon-caret-bottom'" circle plain @click="showGoodsDetail = !showGoodsDetail"/>
      <span v-show="type === 'BATCH'" style="margin-left: 30px" class="filter-item">调拨数量：</span>
      <el-input style="width: 200px;" ref="batchCount" v-show="type === 'BATCH'" class="filter-item" :disabled="!clicked.checked" v-model="batchCount" @blur="blurBatchCount"/>
    </div>
    <!--<el-collapse-transition>-->
    <div class="filter-container" v-show="showGoodsDetail && thisGoodsIndex !== goodsList.length">
      <el-row :gutter="20">
        <el-input placeholder="货号" v-model.trim="listQuery.goodsCode" style="width: 200px;" class="filter-item" @keyup.enter.native="findGoods"/>
        <el-button :loading="loading" class="filter-item" icon="el-icon-search" type="primary" @click="findGoods">定位</el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">名称：{{goods.goodsName}}</el-col>
        <el-col :span="6">品牌：{{goods.goodsBrand}}</el-col>
        <el-col :span="6">类别：{{goods.goodsCategory}}</el-col>
        <el-col :span="6">尺码组：{{goods.sizeClass}}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">系列：{{goods.goodsSeries}}</el-col>
        <el-col :span="6">风格：{{goods.goodsStyle}}</el-col>
        <el-col :span="6">款式：{{goods.goodsPattern}}</el-col>
        <el-col :span="6">性别：{{goods.goodsSex}}</el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">年份：{{goods.goodsYear}}</el-col>
        <el-col :span="6">季节：{{goods.goodsSeason}}</el-col>
        <el-col :span="6">上市时间：{{goods.marketTime}}</el-col>
        <el-col :span="6">吊牌价：{{goods.goodsTagPrice}}</el-col>
      </el-row>
    </div>
    <!--</el-collapse-transition>-->
    <el-table
      v-if="showTable"
      v-show="thisGoodsIndex !== goodsList.length"
      v-loading="loading"
      :data="channelListAndGoodsColorList"
      class="option"
      style="width: 100%"
      border
      row-key="id"
      max-height="740">
      <el-table-column
        fixed
        prop="typeName"
        label="类别"
        width="50">
      </el-table-column>
      <el-table-column
        fixed
        prop="colorName"
        label="颜色"
        width="50">
      </el-table-column>
      <el-table-column
        fixed
        prop="code"
        label="仓库/店铺编号"
        width="100">
      </el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="仓库/店铺名称"
        width="150">
      </el-table-column>
      <el-table-column v-for="(s,index) in sizeList" :label="s.sizeName" min-width="60" align="center">
        <el-table-column class-name="option-column" label="库存" v-if="diyHas('SIZE_SALE')">
          <template slot-scope="scope">
            <div style="width: 100%;height:100%;cursor:pointer" :class="cellClassName(scope.row,s.sizeName)" @click="cellClick(scope.row,s.sizeName)">{{scope.row[s.fieldName]}}&nbsp;</div>
          </template>
        </el-table-column>
        <el-table-column label="销售" class-name="option-column-sale" v-if="diyHas('SIZE_SALE')">
          <template slot-scope="scope">{{scope.row.sizeSale[s.fieldName]}}</template>
        </el-table-column>
        <template slot-scope="scope" v-if="!diyHas('SIZE_SALE')">
          <div style="width: 100%;height:100%;cursor:pointer" :class="cellClassName(scope.row,s.sizeName)" @click="cellClick(scope.row,s.sizeName)">{{scope.row[s.fieldName]}}&nbsp;</div>
        </template>
      </el-table-column>
      <el-table-column
        label="总销售量"
        prop="sumCount"
        width="50">
      </el-table-column>
      <el-table-column
        v-if="diyHas('TIME_SALE')"
        label="时间范围销售"
        prop="sumSaleByDate"
        width="50">
      </el-table-column>
      <el-table-column
        v-if="diyHas('DISCOUNT')"
        label="折扣"
        prop="discount"
        width="50">
      </el-table-column>
      <el-table-column
        v-if="diyHas('FIRST_IN_CHANNEL')"
        label="最早上柜时间"
        prop="firstInChannelDate"
        width="100">
      </el-table-column>
      <el-table-column
        v-if="diyHas('LAST_IN_CHANNEL')"
        label="最后上柜时间"
        prop="lastInChannelDate"
        width="100">
      </el-table-column>
      <el-table-column
        v-if="diyHas('SELL_THROUGH_RATE')"
        label="售罄率"
        prop="sellThroughRate"
        width="50">
      </el-table-column>
      <el-table-column
        v-if="diyHas('SELL_TIME')"
        label="售卖时长"
        prop="saleDay"
        width="50">
      </el-table-column>
    </el-table>
  </div>
</template>


<script>

  import {geGoodsInfo} from '@/api/bill/operation'
  import {save, saveLog} from '@/api/bill/transfer'

  export default {
    computed: {},
    data() {
      return {
        listQuery:{goodsCode:''},
        goods: {},
        loading: false,
        type: 'OUT',
        sizeList: [],
        goodsColorList: [],
        factChannelStockList: [],
        factWarehouseStockList: [],
        channelListAndGoodsColorList: [],
        clicked: {code: '', sizeName: '', colorName: '', checked: false, count: 1, type: ''},
        clickedRow: {code: '', colorName: '', checked: false, type: ''},
        logList: [],
        batchCount: 1,
        showGoodsDetail: false,
        showTable: true,
        thisGoodsIndex:0
      };
    },
    props: {
      diyConfig: {default: []},
      goodsList: {default: []},
      channelList: {default: []},
      warehouseList: {default: []},
      goodsCode: {default: ''},
      saleDate: {default: null},
      eleId: {default: ''},
      eleName: {default: ''},
      step: {default: 1},
      goodsIndex: {default: 0}
    },
    methods: {
      diyHas(key) {
        let diy = this.diyConfig.find(d => d.id == key)
        if (diy == null) {
          return false
        }
        return diy.value
      },
      //数量失去焦点
      blurBatchCount() {
        var reg = /^[1-9]\d*$/
        if (reg.test(this.batchCount) && this.batchCount <= this.clicked.count && this.batchCount >= 1) {
          this.clicked.count = parseInt(this.batchCount)
        }
        this.batchCount = this.clicked.count
      },
      //点击单元格
      cellClick(row, sizeName) {
        if (this.type === 'OUT') {
          this.cellClick1(row, sizeName)
        } else if (this.type === 'BATCH') {
          this.cellClick2(row, sizeName)
        } else if (this.type === 'GOODS') {
          this.cellClick3(row, sizeName)
        }
      },
      //普通模式
      cellClick1(row, sizeName) {
        let size = this.sizeList.find(s => s.sizeName === sizeName)
        if (size != null) {
          if (!this.clicked.checked) {
            let stock = this.channelListAndGoodsColorList.find(s => s.code === row.code && s.colorName === row.colorName && s.type === row.type)
            if (stock[size.fieldName] != null && stock[size.fieldName] > 0) {
              this.clicked.sizeName = sizeName
              this.clicked.code = row.code
              this.clicked.colorName = row.colorName
              this.clicked.type = row.type
              this.clicked.checked = true
            }
          } else {
            if (sizeName !== this.clicked.sizeName) {
              this.$message.error('不能调到其他尺码上')
              return
            }
            if (row.colorName !== this.clicked.colorName) {
              this.$message.error('不能调到其他颜色上')
              return
            }

            let size = this.sizeList.find(s => s.sizeName === this.clicked.sizeName)
            let stock = this.channelListAndGoodsColorList.find(s => s.code === this.clicked.code && s.colorName === this.clicked.colorName && s.type === this.clicked.type)
            let targetStock = this.channelListAndGoodsColorList.find(s => s.code === row.code && s.colorName === row.colorName)
            stock[size.fieldName] -= 1
            stock[size.fieldName] = (stock[size.fieldName] == 0 ? null : stock[size.fieldName])
            if (targetStock[size.fieldName] == null) {
              targetStock[size.fieldName] = 1
            } else {
              targetStock[size.fieldName] = targetStock[size.fieldName] + 1
            }
            this.clicked = {code: '', sizeName: '', colorName: '', checked: false, count: 1, type: ''}
            this.createLog(stock, targetStock, 1, size)
          }
        }
      },
      //批量模式
      cellClick2(row, sizeName) {
        let size = this.sizeList.find(s => s.sizeName === sizeName)
        if (size != null) {
          if (!this.clicked.checked) {
            let stock = this.channelListAndGoodsColorList.find(s => s.code === row.code && s.colorName === row.colorName && s.type === row.type)
            if (stock[size.fieldName] != null && stock[size.fieldName] > 0) {
              this.$nextTick(() => setTimeout(() => this.$refs.batchCount.select(), 100))
              this.clicked.count = stock[size.fieldName]
              this.batchCount = stock[size.fieldName]
              this.clicked.sizeName = sizeName
              this.clicked.code = row.code
              this.clicked.colorName = row.colorName
              this.clicked.type = row.type
              this.clicked.checked = true
            }
          } else {
            if (sizeName !== this.clicked.sizeName) {
              this.$message.error('不能调到其他尺码上')
              return
            }
            if (row.colorName !== this.clicked.colorName) {
              this.$message.error('不能调到其他颜色上')
              return
            }
            let size = this.sizeList.find(s => s.sizeName === this.clicked.sizeName)
            let stock = this.channelListAndGoodsColorList.find(s => s.code === this.clicked.code && s.colorName === this.clicked.colorName && s.type === this.clicked.type)
            let targetStock = this.channelListAndGoodsColorList.find(s => s.code === row.code && s.colorName === row.colorName)
            stock[size.fieldName] -= this.clicked.count
            stock[size.fieldName] = (stock[size.fieldName] == 0 ? null : stock[size.fieldName])
            if (targetStock[size.fieldName] == null) {
              targetStock[size.fieldName] = this.clicked.count
            } else {
              targetStock[size.fieldName] = targetStock[size.fieldName] + this.clicked.count
            }
            this.createLog(stock, targetStock, this.clicked.count, size)
            this.clicked = {code: '', sizeName: '', colorName: '', checked: false, count: 1, type: ''}
          }
        }
      },
      //整行模式
      cellClick3(row, sizeName) {
        if (!this.clickedRow.checked) {
          let stock = this.channelListAndGoodsColorList.find(s => s.code === row.code && s.colorName === row.colorName && s.type === row.type)
          let isAll0 = true
          for (let i = 0; i < this.sizeList.length; i++) {
            let size = this.sizeList[i]
            if (stock[size.fieldName] != null && stock[size.fieldName] > 0) {
              isAll0 = false
              break
            }
          }
          if (isAll0) {
            return
          }
          this.clickedRow.code = row.code
          this.clickedRow.colorName = row.colorName
          this.clickedRow.checked = true
          this.clickedRow.type = row.type
        } else {
          if (row.colorName !== this.clickedRow.colorName) {
            this.$message.error('不能调到其他颜色上')
            return
          }
          let stock = this.channelListAndGoodsColorList.find(s => s.code === this.clickedRow.code && s.colorName === this.clickedRow.colorName && s.type === this.clickedRow.type)
          let targetStock = this.channelListAndGoodsColorList.find(s => s.code === row.code && s.colorName === row.colorName)
          this.sizeList.forEach(size => {
            let count = 0
            if (stock[size.fieldName] != null && stock[size.fieldName] > 0) {
              count = stock[size.fieldName]
              stock[size.fieldName] = null
            }
            if (count > 0) {
              if (targetStock[size.fieldName] == null) {
                targetStock[size.fieldName] = count
              } else {
                targetStock[size.fieldName] = targetStock[size.fieldName] + count
              }
              this.createLog(stock, targetStock, count, size)
            }
          })
          this.clickedRow = {code: '', colorName: '', checked: false, type: ''}
        }
      },
      //变色
      cellClassName(row, sizeName) {
        if (this.type === 'GOODS') {
          if (this.clickedRow.code === row.code && this.clickedRow.colorName === row.colorName && this.clickedRow.type === row.type) {
            return 'option-warning'
          }
        } else {
          if (this.clicked.sizeName === sizeName && this.clicked.code === row.code && this.clicked.colorName === row.colorName && this.clicked.type === row.type) {
            return 'option-warning'
          }
        }
        return ''
      },
      //创建调拨记录
      createLog(stock, targetStock, billCount, size) {
        //记录调拨过程 来源、目标、数量 、颜色 、尺码 、货号
        let log = {fromCode: stock.code, fromType: stock.type, fromName: stock.name, targetCode: targetStock.code, targetName: targetStock.name, targetType: targetStock.type, billCount: billCount, colorName: stock.colorName, sizeName: size.sizeName}
        if (log.targetType === log.fromType && log.targetCode === log.fromCode) {
          return
        }
        log = this.troubleshoot(log)
        if (log == null) {
          this.mergeSame()
          return
        }
        //查看记录是否已经存在
        let hasLog = this.logList.find(l => l.goodsCode === log.goodsCode && l.fromType === log.fromType && l.fromCode === log.fromCode && l.targetCode === log.targetCode && l.targetType === log.targetType && l.colorName === log.colorName && l.sizeName === log.sizeName)
        if (hasLog == null) {
          //不存在就添加进去
          this.logList.push(log)
        } else {
          hasLog.billCount += log.billCount
        }
        //合并相同，删除调拨
        this.mergeSame()
      },
      mergeSame() {
        for (let i = 0; i < this.logList.length - 1; i++) {
          let log = this.logList[i]
          for (let j = i + 1; j < this.logList.length; j++) {
            let next = this.logList[j]
            if (next.goodsCode === log.goodsCode && next.fromType === log.fromType && next.fromCode === log.fromCode && next.targetCode === log.targetCode && next.targetType === log.targetType && next.colorName === log.colorName && next.sizeName === log.sizeName) {
              log.billCount += next.billCount
              this.logList.splice(j, 1)
            }
          }
        }
        for (let i = 0; i < this.logList.length; i++) {
          let log = this.logList[i]
          if (log.targetType === log.fromType && log.targetCode === log.fromCode) {
            this.logList.splice(i, 1)
          }
        }
      },
      //排除log中错误的逻辑
      troubleshoot(log) {
        //查询本次的源头是否是其他的目标
        let fromArray = this.logList.filter(l => l.goodsCode === log.goodsCode && l.targetType === log.fromType && l.targetCode === log.fromCode && l.colorName === log.colorName && l.sizeName === log.sizeName)
        if (fromArray.length > 0) {
          for (let i = 0; i < fromArray.length; i++) {
            let from = fromArray[i]
            // let from = this.logList.find(l => l.fromType === fromArray[i].fromType && l.fromCode === fromArray[i].fromCode && l.targetCode === fromArray[i].targetCode && l.targetType === fromArray[i].targetType && l.colorName === fromArray[i].colorName && l.sizeName === fromArray[i].sizeName)
            if (from.billCount === log.billCount) {
              from.targetCode = log.targetCode
              from.targetName = log.targetName
              from.targetType = log.targetType
              return null
            } else if (from.billCount > log.billCount) {
              log.fromCode = from.fromCode
              log.fromName = from.fromName
              log.fromType = from.fromType
              from.billCount = from.billCount - log.billCount
              return log
            } else {
              log.billCount = log.billCount - from.billCount
              from.targetCode = log.targetType
              from.targetName = log.targetType
              from.targetType = log.targetType
            }
          }
        }
        return log
      },
      init() {
        this.thisGoodsIndex = this.goodsIndex
        this.logList = []
        if (this.thisGoodsIndex !== this.goodsList.length && this.goodsList.length > 0) {
          this.loadGoods()
        }
      },
      //下一个货品
      nextGoods() {
        if (this.eleId == '') {
          this.loading = true
          save({id: this.eleId, name: this.eleName, goodsList: this.goodsList, channelList: this.channelList.map(c => c.code), warehouseList: this.warehouseList.map(w => w.code)}).then(response => {
            this.$emit('update:eleId', response.data.id)
            this.$emit('update:step', 2)
            this.saveLog(response.data.id, this.logList)
          }).catch(() => this.loading = false)
        } else {
          this.saveLog(this.eleId, this.logList)
        }
      },
      //保存log
      saveLog(id, logList) {
        this.loading = true
        saveLog({id: id, goodsCode: this.goodsList[this.thisGoodsIndex], logList: logList}).then(response => {
          //读取以一个货品
          this.thisGoodsIndex += 1
          this.$emit('update:goodsIndex', this.thisGoodsIndex)
          this.clicked = {code: '', sizeName: '', colorName: '', checked: false, count: 1, type: ''}
          this.clickedRow = {code: '', colorName: '', checked: false, type: ''}
          if (this.thisGoodsIndex !== this.goodsList.length) {
            this.loadGoods()
          }else{
            this.loading = false
          }
          this.logList = []
        }).catch(() => this.loading = false)
      },
      //读取货品
      loadGoods() {
        this.showTable = false
        this.channelListAndGoodsColorList = []
        let goodsCode = this.goodsList[this.thisGoodsIndex]
        //查询颜色和尺码
        this.loading = true
        let startDate, endDate = null
        if (this.saleDate != null && this.saleDate.length === 2) {
          startDate = this.saleDate[0]
          endDate = this.saleDate[1]
        }
        geGoodsInfo({goodsCode: goodsCode, startDate: startDate, endDate: endDate,transferId:this.eleId}).then(response => {
          this.goods = response.data.dimGoodsPo
          this.sizeList = response.data.sizeList
          this.goodsColorList = response.data.goodsColorList
          this.factChannelStockList = response.data.factChannelStockList
          this.factWarehouseStockList = response.data.factWarehouseStockList
          this.logList = response.data.logList
          this.warehouseList.forEach(warehouse => {
            this.goodsColorList.forEach(color => {
              let id = color.id + '-' + warehouse.id + 'warehouse'
              let row = {id: id, colorId: color.id, colorName: color.colorName, code: warehouse.code, name: warehouse.name, type: 'warehouse', typeName: '仓库', sizeSale: {}}
              this.sizeList.forEach(size => {
                let stock = this.factWarehouseStockList.find(s => s.warehouseCode === row.code && s.colorName === row.colorName && size.fieldName === s.sizeName)
                if (stock != null) {
                  row[size.fieldName] = stock.billCount
                }
              })
              this.channelListAndGoodsColorList.push(row)
            })
          })
          this.channelList.forEach(channel => {
            this.goodsColorList.forEach(color => {
              let id = color.id + '-' + channel.id + 'channel'
              let sumSale = response.data.sumSaleList.find(ss => ss[0] === channel.code && ss[1] === color.colorName)
              let sumCount = null
              if (sumSale != null) {
                sumCount = sumSale[2]
              }
              let row = {id: id, colorId: color.id, colorName: color.colorName, code: channel.code, name: channel.name, type: 'channel', typeName: '渠道', sumCount: sumCount, sizeSale: {}}
              this.setSumSaleByDateList(response.data.sumSaleByDateList, row, channel, color)
              this.setDiscount(response.data.discountList, row, channel, color)
              this.setFirstInChannelDate(response.data.inChannelDate, row, channel, color)
              this.setLastInChannelDate(response.data.inChannelDate, row, channel, color)
              this.setSellThroughRate(response.data.sellThroughRate, row, channel, color)
              this.saleDay(response.data.saleDay, row, channel, color)
              this.sizeList.forEach(size => {
                let stock = this.factChannelStockList.find(s => s.channelCode === row.code && s.colorName === row.colorName && size.fieldName === s.sizeName)
                //如果显示销售
                this.setSizeSale(response.data.sumSizeSaleList, row, size)
                if (stock != null) {
                  row[size.fieldName] = stock.billCount
                }
              })
              this.channelListAndGoodsColorList.push(row)
            })
          })
          //销售排序
          this.channelListAndGoodsColorList = this.channelListAndGoodsColorList.sort((a, b) => (a.type === 'warehouse' || a.sumCount > b.sumCount) ? -1 : 1)
          this.showTable = true
          this.loading = false
        }).catch(() => this.loading = false)
      },
      //选择货品
      findGoods(){
        let goodsIndex = this.goodsList.indexOf(this.listQuery.goodsCode)
        if(goodsIndex < 0){
          this.$message({message: '货号没找到', type: 'error'})
          return
        }
        this.thisGoodsIndex = goodsIndex
        this.$emit('update:goodsIndex', this.thisGoodsIndex)
        this.clicked = {code: '', sizeName: '', colorName: '', checked: false, count: 1, type: ''}
        this.clickedRow = {code: '', colorName: '', checked: false, type: ''}
        this.loadGoods()
      },
      //设置时间段销售
      setSumSaleByDateList(sumSaleList, row, channel, color) {
        let sumSale = sumSaleList.find(ss => ss[0] === channel.code && ss[1] === color.colorName)
        if (sumSale != null) {
          row.sumSaleByDate = sumSale[2]
        }
      },
      //设置尺码销售
      setSizeSale(sumSizeSaleList, row, size) {
        let sale = sumSizeSaleList.find(ss => ss[0] === row.code && ss[1] === row.colorName && ss[2] === size.fieldName)
        if (sale != null) {
          row.sizeSale[size.fieldName] = sale[3] == 0 ? null : sale[3]
        }
      },
      //折扣
      setDiscount(list, row, channel, color) {
        let ele = list.find(ss => ss[0] === channel.code && ss[1] === color.colorName)
        if (ele != null) {
          row.discount = ele[2]
        }
      },
      //上柜时间
      setFirstInChannelDate(list, row, channel, color) {
        let ele = list.find(ss => ss[0] === channel.code && ss[1] === color.colorName)
        if (ele != null) {
          row.firstInChannelDate = ele[2]
        }
      },
      setLastInChannelDate(list, row, channel, color) {
        let ele = list.find(ss => ss[0] === channel.code && ss[1] === color.colorName)
        if (ele != null) {
          row.lastInChannelDate = ele[3]
        }
      },
      //售罄率
      setSellThroughRate(list, row, channel, color) {
        let ele = list.find(ss => ss[0] === channel.code && ss[1] === color.colorName)
        if (ele != null) {
          row.sellThroughRate = ele[2]
        }
      },
      //售卖天数
      saleDay(list, row, channel, color) {
        let ele = list.find(ss => ss[0] === channel.code && ss[1] === color.colorName)
        if (ele != null) {
          row.saleDay = ele[2]
        }
      }
    }
  }
</script>

<style>
  .option-warning {
    background: #E6A23C;
  }

  .option td, .option th {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .option-column .cell {
    height: 100%;
    padding-left: 0px;
    padding-right: 0px;
  }

  .option-column-sale .cell {
    color: #C0C4CC
  }
</style>

