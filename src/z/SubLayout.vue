<template>
  <router-view class="bill"/>
</template>

<style scoped>

  .bill /deep/ .el-select > > > .el-input__inner {
    color: #606266 !important;
  }

  .bill /deep/ .tab-container {
    margin: 10px;
  }

  .bill /deep/ .is-disabled /deep/ .el-input__inner {
    color: #606266 !important;
  }

  .bill /deep/ .is-disabled /deep/ input {
    color: #606266 !important;
  }

  .bill /deep/ .el-select /deep/ .el-input__inner {
    color: #606266 !important;
  }

  .bill /deep/ .el-select /deep/ .el-select__tags-text {
    color: #606266 !important;
  }

  .bill /deep/ .full_with_date {
    width: 100% !important;
  }

  .bill /deep/ .padding1 /deep/ input {
    padding-left: 1px;
    padding-right: 1px;
    /*border: 0;*/
  }

  .bill /deep/ .myt /deep/ .cell {
    padding-left: 5px;
    padding-right: 5px;
  }

</style>
