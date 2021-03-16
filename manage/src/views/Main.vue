<template>
  <div class="main">
    <NavBox />
    <div class="main_content">
      <div class="aside"><AsideMenu /></div>
      <div class="content">
          <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavBox from "../components/NavBox";
import AsideMenu from "../components/AsideMenu";
export default {
  name: "Main",
  components: {
    NavBox,
    AsideMenu,
  },
};
</script>

<style lang="less">
.main {
  .main_content {
    display: flex;
    .aside {
      width: 190px;
      background-color: #fff;
      position: fixed;
      top: 60px;
      left: 0;
      bottom: 0;
      overflow-y: auto;
      /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
      &::-webkit-scrollbar {
        width: 4px;
        height: 4px;
        background-color: #f5f5f5;
      }

      /*定义滚动条轨道 内阴影+圆角*/
      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #f5f5f5;
      }

      /*定义滑块 内阴影+圆角*/
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
        background-color: #c8c8c8;
      }
    }

    .content{
        width: 100%;
        margin-left: 190px;
        padding: 15px;
    }
  }
}
</style>