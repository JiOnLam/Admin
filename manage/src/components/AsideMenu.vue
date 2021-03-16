<template>
  <div class="aside_menu">
    <el-menu
      default-active="home"
      :router="true"
      :collapse="isCollapse"
    >
     <el-menu-item index="home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="typeList">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">商品管理</span>
        </template>
        <el-menu-item index="typeList">类型列表</el-menu-item>
        <el-menu-item index="productList">商品列表</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span slot="title">订单管理</span>
        </template>
        <el-menu-item index="2-1">订单列表</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span slot="title">数据统计</span>
        </template>
        <el-menu-item index="2-1">订单数</el-menu-item>
      </el-submenu>
     <el-menu-item index="5">
        <i class="el-icon-s-tools"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "AsideMenu",
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    
  },
};
</script>

<style lang="less">
.aside_menu {
  text-align: left;

  /deep/ .el-submenu__title {
    padding: 0 !important;
  }

  /deep/ .el-submenu .el-menu-item {
    padding: 0 15px 0 30px !important;
    min-width: 159px;
  }

  /deep/ .el-menu{
      border-right: none;
  }
  
  /deep/ .el-icon-location{
      padding-left: 4px;
  }

  /deep/ .el-menu-item{
      padding-left: 4px !important;
  }

  /deep/ .el-submenu [class^=el-icon-]{
      padding-left: 4px;
  }
}
</style>