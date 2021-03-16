<template>
  <div class="post_product">
    <Back />
    <div class="form_box">
      <el-row>
        <el-col :span="10">
          <el-form
            :model="productData"
            :rules="rules"
            ref="productData"
            label-width="100px"
          >
            <el-form-item label="商品名称" prop="name">
              <el-input
                v-model="productData.name"
                placeholder="输入商品名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="英文名称" prop="enname">
              <el-input
                v-model="productData.enname"
                placeholder="输入商品英文名称"
              ></el-input>
            </el-form-item>

            <el-form-item label="商品价格" prop="price">
              <el-input
                v-model="productData.price"
                placeholder="输入商品价格"
              ></el-input>
            </el-form-item>

            <el-form-item label="商品类型" prop="typeId">
              <el-select
                v-model="productData.typeId"
                placeholder="请选择商品类型"
              >
                <el-option
                  :label="item.name"
                  :value="item.typeId"
                  v-for="item in typeData"
                  :key="item.typeId"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="商品图片" prop="img">
              <Upload
                :img-url="imgUrl"
                @uploadFile="uploadImg($event, 'img', 'imgType')"
              ></Upload>
            </el-form-item>
            <el-form-item label="详情图片" prop="detailImg">
              <Upload
                :img-url="detailImgUrl"
                @uploadFile="uploadImg($event, 'detailImg', 'detailImgType')"
              ></Upload>
            </el-form-item>

            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="productData.status">
                <el-radio label="0">正常</el-radio>
                <el-radio label="1">冻结</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="商品描述" prop="desc">
              <el-input
                type="textarea"
                v-model="productData.desc"
                placeholder="输入商品描述信息"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('productData')">{{
                proId ? "保存" : "发布新商品"
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
import Upload from "../components/Upload";
export default {
  name: "PostProduct",
  data() {
    return {
      productData: {
        name: "",
        enname: "",
        price: "",
        status: "0",
        typeId: "",
        img: "",
        imgType: "",
        detailImgType: "",
        detailImg: "",
        desc: "",
      },
      rules: {
        name: [{ required: true, validator: this.validName, trigger: "blur" }],
        enname: [
          { required: true, validator: this.validEnName, trigger: "blur" },
        ],
        typeId: [
          { required: true, message: "选择商品类型", trigger: "change" },
        ],
        img: [{ required: true, message: "上传商品图片", trigger: "change" }],
        desc: [
          { required: true, validator: this.validDesc, trigger: "change" },
        ],
        detailImg: [
          { required: true, message: "上传详情图片", trigger: "change" },
        ],
        price: [
          { required: true, validator: this.validPrice, trigger: "blur" },
        ],

        status: [
          { required: true, message: "请选择商品状态", trigger: "change" },
        ],
      },
      //商品类型id
      proId: "",

      //复制productData数据,便于在保存类型数据时,对吧productData数据的变化
      copyProductData: {},

      //商品类型
      typeData: [],

      imgUrl: "",
      detailImgUrl: "",
    };
  },
  created() {
    let proId = this.$route.query.proId;
    if (proId) {
      this.proId = proId;
      //根据
      this.getProductByProId();
    }
    this.getTypeData();
  },
  methods: {
    //检测商品名称
    validName(rule, value, callback) {
      if (!value) {
        return callback(new Error("商品名称不能为空"));
      }

      let reg = /^[\w\u4e00-\u9fa5]{1,30}$/;
      if (!reg.test(value)) {
        callback(new Error("商品名称仅支持汉字字母数字_(1-30位)"));
      } else {
        callback();
      }
    },

    //检测英文名称
    validEnName(rule, value, callback) {
      if (!value) {
        return callback(new Error("英文商品名称不能为空"));
      }

      let reg = /^[A-Za-z ]{1,30}$/;
      if (!reg.test(value)) {
        callback(new Error("商品名称仅支持字母空格(1-30位)"));
      } else {
        callback();
      }
    },

    validPrice(rule, value, callback) {
      if (!value) {
        return callback(new Error("商品价格不能为空"));
      }

      let reg = /^(([1-9]\d*)|0)(\.[0-9]{1,2})?$/;
      if (!reg.test(value)) {
        callback(new Error("商品价格仅支持数字(含小数点后两位)"));
      } else {
        callback();
      }
    },

    validDesc(rule, value, callback) {
      if (!value) {
        return callback(new Error("商品描述不能为空"));
      }

      let reg = /^[\w\u4e00-\u9fa5，,.。！!?？\s]{1,150}$/;
      if (!reg.test(value)) {
        callback(
          new Error("商品描述仅支持汉字字母数字_空格，,.。！!?(1-150)位")
        );
      } else {
        callback();
      }
    },

    //获取商品类型
    getTypeData() {
      this.axios({
        method: "GET",
        url: "/typeData",
        headers: {
          token: document.cookie,
        },
      })
        .then((result) => {
          if (result.data.status == 1050) {
            return this.$router.push({ name: "Login" });
          }

          if (result.data.status == 1530) {
            this.typeData = result.data.data;
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

    //发布商品
    postProduct() {
      this.axios({
        method: "POST",
        url: "/postProduct",
        data: {
          ...this.productData,
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

          if (result.data.status == 1500) {
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

    submitForm(productData) {
      this.$refs[productData].validate((valid) => {
        if (valid) {
          if (this.proId) {
            this.editProduct()
          }else{
            this.postProduct()
          }
        }
      });
    },

    //上传商品图片
    uploadImg(data, key1, key2) {
      this.productData[key1] = data.base64.replace(
        /^data:image\/[A-Za-z]+;base64/,
        ""
      );
      this.productData[key2] = data.type;
    },

    //根据proId查询商品类型数据
    getProductByProId() {
      this.axios({
        method: "get",
        url: "/productByProId",
        params: {
          proId: this.proId,
        },
        headers: {
          token: document.cookie,
        },
      })
        .then((result) => {
          // console.log("getProductByProId result=>", result);

          if (result.data.status == 1050) {
            return this.$router.push({ name: "Login" });
          }

          if (result.data.status == 1910) {
            let data = result.data.data[0];
            data.status = data.status.toString();
            this.imgUrl = `${result.data.staticUrl}${data.img}`;
            this.detailImgUrl = `${result.data.staticUrl}${data.detailImg}`;
            for (let key in data) {
              this.productData[key] = data[key];
            }

            this.copyProductData = { ...this.productData };
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

    //编辑商品
    editProduct(){
      let data= {};
      for(let key in this.productData){
        if(this.copyProductData[key]!=this.productData[key]){
          data[key] = this.productData[key];
        }
      }
      // console.log(data);
      //判断values为空对象
      if (JSON.stringify(data) == "{}") {
        return this.$router.go(-1);
      }
      //发起编辑商品类型请求
      this.axios({
        method: "POST",
        url: "/editProduct",
        data: {
          ...data,
          proId:this.proId
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
    
          if (result.data.status == 1930) {
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
    }
  },
  components: {
    Back,
    Upload,
  },
};
</script>

<style lang="less" scoped>
.post_product {
  .form_box {
    text-align: left;
    margin-top: 15px;
    background-color: #fff;
    padding: 15px;
  }
  /deep/ .el-textarea__inner {
    height: 100px !important;
    resize: none;
  }
}
</style>