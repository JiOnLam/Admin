<template>
  <div class="create_type">
    <Back />
    <div class="form_box">
      <el-row>
        <el-col :span="8">
          <el-form
            :model="typeData"
            :rules="rules"
            ref="typeData"
            label-width="100px"
          >
            <el-form-item label="类型名称" prop="name">
              <el-input
                v-model="typeData.name"
                placeholder="输入类型名称"
              ></el-input>
            </el-form-item>

            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="typeData.status">
                <el-radio label="0">正常</el-radio>
                <el-radio label="1">冻结</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('typeData')">{{
                typeId ? "保存" : "立即创建"
              }}</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Back from "../components/Back";
export default {
  name: "CreateType",
  data() {
    return {
      typeData: {
        name: "",
        status: "0",
      },
      rules: {
        name: [{ required: true, validator: this.validName, trigger: "blur" }],

        status: [
          { required: true, message: "请选择商品状态", trigger: "change" },
        ],
      },
      //商品类型id
      typeId: "",

      //复制typeData数据,便于在保存类型数据时,对吧typeData数据的变化
      copyTypeData: {},
    };
  },
  components: {
    Back,
  },
  created() {
    let typeId = this.$route.query.typeId;
    if (typeId) {
      this.typeId = typeId;
      this.getTypeDataByTypeId();
    }
  },
  methods: {
    //检测类型名称
    validName(rule, value, callback) {
      if (!value) {
        return callback(new Error("类型名称不能为空"));
      }

      let reg = /^[\w\u4e00-\u9fa5]{1,20}$/;
      if (!reg.test(value)) {
        callback(new Error("类型名称仅支持汉字字母数字_(1-20位)"));
      } else {
        callback();
      }
    },

    //根据typeId查询商品类型数据
    getTypeDataByTypeId() {
      this.axios({
        method: "get",
        url: "/typeDataByTypeId",
        params: {
          typeId: this.typeId,
        },
        headers: {
          token: document.cookie,
        },
      })
        .then((result) => {
          console.log("typeDataByTypeId result=>", result);

          if (result.data.status == 1050) {
            return this.$router.push({ name: "Login" });
          }

          if (result.data.status == 1090) {
            this.$message({
              message: result.data.msg,
              type: "success",
              showClose: true,
            });
            let data = result.data.data[0];
            this.typeData.name = data.name;
            this.typeData.status = Number(data.status).toString();
            this.copyTypeData = { ...this.typeData };
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

    //创建商品类型
    createType() {
      this.axios({
        method: "POST",
        url: "/createType",
        data: {
          name: this.typeData.name,
          status: this.typeData.status,
        },
        headers: {
          token: document.cookie,
        },
      })
        .then((result) => {
          console.log(result);

          if (result.data.status == 1050) {
            return this.$router.push({ name: "Login" });
          }

          if (result.data.status == 1060) {
            this.$message({
              message: result.data.msg,
              type: "success",
              showClose: true,
            });
            this.$router.go(-1);
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

    //编辑商品类型
    editType() {
      //编辑过的数据
      let values = {};
      //对比this.copyTypeData 和 this.typeData数据
      for (let key in this.typeData) {
        if (this.copyTypeData[key] != this.typeData[key]) {
          values[key] = this.typeData[key];
        }
      }

      console.log("values==>", values);

      //判断values为空对象
      if (JSON.stringify(values) == "{}") {
        return this.$router.go(-1);
      }
      //发起编辑商品类型请求
      this.axios({
        method: "POST",
        url: "/editType",
        data: {
          ...values,
          typeId:this.typeId
        },
        headers: {
          token: document.cookie,
        },
      })
        .then((result) => {
          // console.log(result);
          if (result.data.status == 1050) {
            return this.$router.push({ name: "Login" });
          }
    
          if (result.data.status == 1100) {
            this.$message({
              message: result.data.msg,
              type: "success",
              showClose: true,
            });
            this.$router.go(-1);
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

    submitForm(typeData) {
      this.$refs[typeData].validate((valid) => {
        if (valid) {
          console.log("表单验证通过");
          if (this.typeId) {
            this.editType();
          } else {
            this.createType();
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.create_type {
  .form_box {
    text-align: left;
    margin-top: 15px;
    background-color: #fff;
    padding: 15px;
  }
}
</style>