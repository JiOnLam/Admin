<template>
  <div class="type_list">
    <div class="search_box">
      <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
        <el-form-item label="类型名称">
          <el-input
            v-model="searchCondition.name"
            placeholder="输入类型名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchCondition.status" placeholder="输入状态">
            <el-option label="选择状态" value="-1"></el-option>
            <el-option label="正常" value="0"></el-option>
            <el-option label="冻结" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="searchCondition.createdAt"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initTypeList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="create_type">
      <el-button type="primary" @click="createType">创建商品类型</el-button>
      <el-button type="danger" :disabled="!isSelect" @click="removeMoreType"
        >删除选择</el-button
      >
    </div>
    <div class="type_list_table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @select="select"
        @select-all="select"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="商品类型" width="120">
        </el-table-column>
        <el-table-column label="状态" show-overflow-tooltip>
          <template slot-scope="scope">{{
            scope.row.status == 0 ? "正常" : "冻结"
          }}</template>
        </el-table-column>
        <el-table-column label="创建日期">
          <template slot-scope="scope">{{ scope.row.createdAt }}</template>
        </el-table-column>
        <el-table-column label="更新日期">
          <template slot-scope="scope">{{ scope.row.updatedAt }}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="editType(scope.row.typeId)"
              type="default"
              size="small"
              >编辑</el-button
            >
            <el-button
              @click="toggleTypeStatus(scope.row)"
              type="success"
              size="small"
              v-if="scope.row.status == 1"
              >启用</el-button
            >
            <el-button
              @click="toggleTypeStatus(scope.row)"
              type="warning"
              size="small"
              v-else
              >冻结</el-button
            >
            <el-button
              @click="removeOneType(scope.row.typeId)"
              type="danger"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination_box">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="paginationOptions.total"
          :pager-count="paginationOptions.pagerCount"
          :page-size="paginationOptions.pageSize"
          @current-change="currentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { tool } from "../assets/js/tool.js";
export default {
  name: "TypeList",
  data() {
    return {
      searchCondition: {
        name: "",
        status: "-1",
        createdAt: "",
        updatedAt: "",
      },

      //复制搜索查询条件
      copySearchCondition: {},

      //类型列表数据
      tableData: [],

      //选择类型id
      typeIds: [],

      //分页
      paginationOptions: {
        //总数量
        total: 0,
        //页码数量
        pagerCount: 5,
        //每页展示的数量
        pageSize: 2,
        //数据偏移量
        offset: 0,
      },
    };
  },
  created() {
    this.initTypeList();
  },
  methods: {
    initTypeList() {
      this.paginationOptions.total = 0;
      this.paginationOptions.offset = 0;
      this.copySearchCondition = { ...this.searchCondition };
      this.getTypeCount();
      this.search();
    },

    //搜索查询
    search() {
      //获取查询条件
      let params = {
        //数据偏移量
        offset: this.paginationOptions.offset,
        count: this.paginationOptions.pageSize,
      };

      for (let key in this.copySearchCondition) {
        if (
          (key == "status" && this.copySearchCondition[key] == -1) ||
          !this.copySearchCondition[key] ||
          this.copySearchCondition[key] == ""
        ) {
          continue;
        }

        if (key == "createdAt") {
          params[key] = tool.formatDate(
            this.copySearchCondition[key],
            "yyyy-MM-dd"
          );
        } else {
          params[key] = this.copySearchCondition[key];
        }
      }

      this.axios({
        method: "GET",
        url: "/findTypeList",
        params,
        headers: {
          token: document.cookie,
        },
      })
        .then((result) => {
          // console.log(result);

          if (result.data.status == 1050) {
            return this.$router.push({ name: "Login" });
          }

          if (result.data.status == 1070) {
            // this.$message({
            //   message: result.data.msg,
            //   type: "success",
            //   showClose: true,
            // });

            result.data.data.forEach((v) => {
              v.createdAt = tool.formatDate(v.createdAt, "yyyy-MM-dd hh:mm:ss");
              v.updatedAt = tool.formatDate(v.updatedAt, "yyyy-MM-dd hh:mm:ss");
            });
            this.tableData = result.data.data;
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
      this.$router.push({ name: "CreateType" });
    },

    //切换商品类型状态
    toggleTypeStatus(item) {
      // console.log(item);
      this.axios({
        method: "POST",
        url: "/toggleTypeStatus",
        data: {
          typeId: item.typeId,
          status: item.status == 0 ? 1 : 0,
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

          if (result.data.status == 1080) {
            this.$message({
              message: result.data.msg,
              type: "success",
              showClose: true,
            });
            item.status = result.data.data.status;
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
    editType(typeId) {
      this.$router.push({ name: "CreateType", query: { typeId } });
    },

    //选择数据行
    select(selection) {
      this.typeIds = [];
      selection.forEach((v) => {
        this.typeIds.push(v.typeId);
      });
    },

    //删除商品类型状态
    removeType(typeIds) {
      // console.log("typeIds==>", typeIds);
      this.axios({
        method: "POST",
        url: "/removeType",
        data: {
          typeIds,
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

          if (result.data.status == 1200) {
            if (result.data.data[0] >= 1) {
              this.$message({
                message: result.data.msg,
                type: "success",
                showClose: true,
              });

              //重新拉取数据
              this.typeIds = [];
              this.initTypeList();
            } else {
              this.$message({
                message: result.data.msg,
                type: "error",
                showClose: true,
              });
            }
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

    //单个删除
    removeOneType(typeId) {
      this.removeType([typeId]);
    },

    //多个删除
    removeMoreType() {
      this.removeType(this.typeIds);
    },

    //查询商品类型总数量
    getTypeCount() {
      let params = {};

      for (let key in this.copySearchCondition) {
        if (
          (key == "status" && this.copySearchCondition[key] == -1) ||
          !this.copySearchCondition[key] ||
          this.copySearchCondition[key] == ""
        ) {
          continue;
        }

        if (key == "createdAt") {
          params[key] = tool.formatDate(
            this.copySearchCondition[key],
            "yyyy-MM-dd"
          );
        } else {
          params[key] = this.copySearchCondition[key];
        }
      }
      this.axios({
        method: "GET",
        url: "/typeCount",
        params,
        headers: {
          token: document.cookie,
        },
      })
        .then((result) => {
          // console.log(result);

          if (result.data.status == 1050) {
            return this.$router.push({ name: "Login" });
          }

          if (result.data.status == 1300) {
            this.paginationOptions.total = result.data.data[0].count;
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

    //切换页码
    currentChange(index) {
      console.log(index);
      this.paginationOptions.offset =
        (index - 1) * this.paginationOptions.pageSize;
      this.search();
    },
  },
  computed: {
    isSelect() {
      return this.typeIds.length > 0;
    },
  },
};
</script>

<style lang="less" scoped>
.type_list {
  text-align: left;
  .search_box {
    padding: 15px;
    .el-form-item {
      margin-bottom: 0px;
    }
  }

  .create_type {
    height: 40px;
    margin-top: 15px;
  }

  .type_list_table {
    margin-top: 15px;
    padding: 15px;
  }

  .pagination_box {
    margin-top: 15px;
    text-align: center;
  }
}
</style>