<template>
  <div class="nav_box">
    <div class="manage_logo">商家后台</div>
    <div class="user">
      <div class="user_img">
        <img :src="userInfo.avatar" alt="" class="auto_img">
      </div>
      <div class="">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{userInfo.nickName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-key">修改密码</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBox",
  data() {
    return {
      //用户信息
      userInfo: {
        avatar:'',
        nickName:'设置'
      },
    };
  },
  created(){
     this.getUserInfo();
  },
  methods: {
    //获取用户信息
    getUserInfo() {
      this.axios({
        method: "GET",
        url: "/userInfo",
        headers: {
          token: document.cookie,
        },
      })
        .then((result) => {
          // console.log(result);

          if (result.data.status == 1050) {
            return this.$router.push({ name: "Login" });
          }

          if (result.data.status == 1400) {
            let data = result.data.data[0];
            this.userInfo.nickName = data.nickName;
            this.userInfo.avatar = `${result.data.staticUrl}${data.avatar}`;
            // console.log(this.userInfo)
          } else {
            this.$message({
              message: result.data.msg,
              type: "error",
              showClose: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less">
.nav_box {
  height: 60px;
  background-color: skyblue;
  display: flex;
  padding: 0 15px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.manage_logo {
  width: 145px;
  height: 100%;
  margin-right: auto;
  padding-right: 15px;
  line-height: 60px;
  font-size: 20px;
  font-weight: bold;
}

.user {
  display: flex;
  align-items: center;
  .user_img {
    width: 40px;
    height: 40px;
    margin-right: 15px;
    border-radius: 50%;
    overflow: hidden;
    .auto_img{
      width: 100%;
      height: 100%;
    }
  }
  .el-dropdown-link {
    cursor: pointer;
  }
}
</style>