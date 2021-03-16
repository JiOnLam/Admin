<template>
  <div class="back">
    <div class="back_text" @click="back"><i class="el-icon-arrow-left"></i>{{text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default:'返回'
    },
  },
  name: "Back",
  methods:{
      back(){
          this.$router.go(-1);
      }
  }
};
</script>

<style lang="less" scoped>
.back {
  display: flex;
  height: 30px;
  padding: 15px;
  align-items: center;
  .back_text {
    cursor: pointer;
    &:hover {
      color: skyblue;
    }
  }
}
</style>