<template>
  <div class="login">
    <el-container class="login_box">
      <el-aside width="500px" class="aside"></el-aside>
      <el-main class="main_box">
        <div class="nav_box">后台管理系统</div>
        <div class="user_box">
          <div class="user_title">欢迎登陆</div>
          <div class="form_box">
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="80px"
              class="demo-ruleForm"
            >
              <el-form-item label="邮箱" prop="email">
                <el-input
                  type="email"
                  v-model="ruleForm.email"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  v-model="ruleForm.password"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item v-show="isSecodeValid">
                <div>
                  <slide-verify
                    :l="42"
                    :r="10"
                    :w="310"
                    :h="155"
                    slider-text="向右滑动"
                    @success="onSuccess"
                    @refresh="onRefresh"
                  ></slide-verify>
                  <div>{{ msg }}</div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="block_btn"
                  @click="submitForm('ruleForm')"
                  >登录</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      ruleForm: {
        password: "",
        email: "",
      },
      rules: {
        email: [{ validator: this.validateEmail, trigger: "blur" }],
        password: [{ validator: this.validatePassword, trigger: "blur" }],
      },
      msg: "",
      isSlide: false,
      isSecodeValid: false,
    };
  },
  methods: {
    validateEmail(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入邮箱地址"));
      } else {
        let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!reg.test(value)) {
          callback(new Error("邮箱格式不正确"));
        } else {
          callback();
        }
      }
    },

    //检查密码password
    validatePassword(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        let reg = /^[A-Za-z]\w{5,15}$/;
        if (!reg.test(value)) {
          callback(
            new Error("密码支持字母数字下划线且首字母必须为字母(6-16)位")
          );
        } else {
          callback();
        }
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.isSecodeValid) {
            this.isSecodeValid = true;
          }

          if (!this.isSlide) {
            this.$message({
              message: "请操作滑动验证",
              type: "error",
              showClose: true,
            });
            return;
          }
          this.isSecodeValid = false;

          this.axios({
            method: "post",
            url: "/login",
            data: {
              email: this.ruleForm.email,
              password: this.ruleForm.password,
            },
          })
            .then((result) => {
              console.log("login=>", result);
              if (result.data.status == 1041) {
                //保存cookies信息
                for (let key in result.data.data) {
                  this.$cookies.set(key, result.data.data[key], "1d");
                }
                this.$message.success(result.data.msg);
                this.$router.push({ name: "Main" });
              } else {
                this.$message.error(result.data.msg);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },

    onSuccess() {
      this.msg = "滑动验证成功";
      this.isSlide = true;
    },

    onRefresh() {
      this.isSlide = false;
    },
  },
};
</script>

<style scoped>
.login_box {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.aside {
  background-color: #fff;
}

.nav_box {
  height: 50px;
  background-color: #fff;
  color: #666;
  font-size: 18px;
  line-height: 50px;
  font-weight: bold;
  padding: 0 15px;
  text-align: left;
}

.main_box {
  padding: 0;
  position: relative;
}

.user_box {
  width: 400px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
}

.user_title {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  text-align: center;
  color: #666;
  letter-spacing: 1px;
}

.form_box {
  margin-top: 20px;
}

.block_btn {
  width: 100%;
}
</style>