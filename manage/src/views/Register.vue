<template>
  <div class="Register">
    <el-container class="register_box">
      <el-aside width="500px" class="aside"></el-aside>
      <el-main class="main_box">
        <div class="nav_box">后台管理系统</div>
        <div class="user_box">
          <div class="user_title">欢迎注册</div>
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
              <el-form-item label="确认密码" prop="checkPassword">
                <el-input
                  type="password"
                  v-model="ruleForm.checkPassword"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="" prop="validCode">
                <div class="validcode_box">
                  <div>
                    <el-input
                      type="text"
                      v-model="ruleForm.validCode"
                      autocomplete="off"
                    ></el-input>
                  </div>
                  <div class="send_code">
                    <el-button :disabled="isSend" @click="sendValidCode()">{{
                      sendText
                    }}</el-button>
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="block_btn"
                  @click="submitForm('ruleForm')"
                  >注册</el-button
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
        checkPassword: "",
        email: "",
        validCode: "",
      },
      rules: {
        email: [{ validator: this.validateEmail, trigger: "blur" }],
        password: [{ validator: this.validatePassword, trigger: "blur" }],
        checkPassword: [
          { validator: this.validateCheckPassword, trigger: "blur" },
        ],
        validCode: [{ validator: this.validateCode, trigger: "blur" }],
      },
      sendText: "发送验证码",
      isSend: false,

      //验证码id
      codeId: "",
    };
  },
  methods: {
    validateCode(rule, value, callback) {
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else {
        let reg = /^\d{6}$/;
        if (!reg.test(value)) {
          callback(new Error("请输入6位验证码"));
        } else {
          callback();
        }
      }
    },

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

    //检查确认密码
    validateCheckPassword(rule, value, callback) {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },

    //发送验证码
    sendValidCode() {
      //验证邮箱格式是否正确
      let emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!emailReg.test(this.ruleForm.email)) {
        // console.log('邮箱格式不正确');
        this.$message.error("邮箱格式不正确");
        return;
      }

      let time = 5;
      this.sendText = `${time}秒后重新发送`;
      this.isSend = true;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          timer = null;
          this.sendText = "发送验证码";
          this.isSend = false;
        } else {
          time--;
          this.sendText = `${time}秒后重新发送`;
        }
      }, 1000);

      //发起发送验证码请求
      this.axios({
        method: "POST",
        url: "/sendVaildCode",
        data: {
          email: this.ruleForm.email,
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data.status === 1010) {
            this.codeId = res.data.data.codeId;
            this.$message({
              message: res.data.msg,
              type: "success",
              showClose: true,
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
              showClose: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //判断验证码是否为空
          if (this.codeId == "") {
            this.$message({
              message: "请发送验证码",
              type: "error",
              showClose: true,
            });
            return;
          }

          this.axios({
            method: "post",
            url: "/register",
            data: {
              email: this.ruleForm.email,
              password: this.ruleForm.password,
              validCode: this.ruleForm.validCode,
              codeId: this.codeId,
            },
          })
            .then((result) => {
              console.log(result);
              if (result.data.status == 1000) {
                this.$message.success(result.data.msg);

                //跳转到登录页面
                setTimeout(()=>{
                   this.$router.push({name:'Login'});
                },1000)
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
  },
};
</script>

<style>
.register_box {
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

.validcode_box {
  display: flex;
}

.send_code {
  margin-left: 10px;
}

.block_btn {
  width: 100%;
}
</style>