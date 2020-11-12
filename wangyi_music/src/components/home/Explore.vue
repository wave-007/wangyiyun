<template>
  <div>
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in banners" :key="index">
          <img v-lazy="image.pic" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <QuickEntry />
    <!-- <p class="first_title">每日推荐</p> -->
    <van-divider />
    <ScrollXBlock />
  </div>
</template>

<style scoped>
.banner {
  padding: 10px 12px;
  border-radius: 12px;
}
.banner /deep/ .van-swipe__track {
  height: 146px;
}
.first_title {
  padding-top: 15px;
  padding-left: 10px;
  font-weight: bold;
  text-align: left;
}
</style>

<script>
import QuickEntry from "./childs/Quick-entry";
import ScrollXBlock from "./childs/ScrollXBlock";
export default {
  name: "explore",
  components: {
    QuickEntry,
    ScrollXBlock,
  },
  data() {
    return {
      banners: [],
    };
  },
  mounted() {
    //请求数据 得到轮播图片
    this.axios.get("/banner?type=1").then((res) => {
      // console.log(res.data.banners);
      this.banners = res.data.banners;
    });
  },
};
</script>