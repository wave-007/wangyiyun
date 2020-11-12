<template>
  <div>
    <!-- 导航栏开始 -->
    <div class="nav">
      <van-nav-bar
        title="电台分类"
        left-arrow
        class="navBar"
        :border="false"
        @click-left="back"
        @click-right="onClickRight"
      >
        <template #right>
          <van-image
            width="24px"
            height="24px"
            fit="contain"
            :src="require('../assets/icons/bofang_4.png')"
          />
        </template>
      </van-nav-bar>
    </div>
    <!-- 导航栏结束 -->
    <!-- 热门分类开始 -->
    <div class="hotList">
      <p class="head">热门分类</p>
      <van-grid direction="horizontal" :column-num="2" :border="true">
        <van-grid-item
          :to="`/radioListBook/${item.id}/${item.name}`"
          v-for="(item, index) in catelist.slice(0, 6)"
          :key="index"
        >
          <van-image :src="item.pic56x56Url" />
          <p>{{ item.name }}</p>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 热门分类结束 -->
    <!-- 更多分类开始 -->
    <div class="moreList">
      <p class="head">更多分类</p>
      <van-grid direction="horizontal" :column-num="2" :border="true">
        <van-grid-item
          :to="`/radioListBook/${item.id}/${item.name}`"
          v-for="(item, index) in catelist.slice(6, 20)"
          :key="index"
        >
          <van-image :src="item.pic56x56Url" />
          <p>{{ item.name }}</p>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 更多分类结束 -->
    <div class="iwant">
      <van-image :src="require('../assets/icons/wenhao.png')" /><span class="iwant_text">我要做主播</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      catelist: [],
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    onClickRight() {
      // Toast('音乐播放');
    },
  },
  mounted() {
    this.axios({
      url: `/login/cellphone?phone=17603017770&password=woshiklde1993`,
      withCredentials: true,
    }).then((res) => {
      this.axios({
        url: `/dj/catelist`,
      }).then((res) => {
        // console.log(res);
        this.catelist = res.data.categories;
      });
    });
  },
};
</script>
<style scoped>
.nav /deep/ .van-ellipsis {
  font-weight: 500;
  font-size: 18px;
}
.nav /deep/ .van-nav-bar .van-icon {
  color: #646566;
  font-size: 22px;
}
.head {
  margin-top: 20px;
  margin-bottom: 20px;
}
.hotList /deep/ .van-grid-item {
  height: 50px;
}
a {
  color: #2c3e50;
  display: flex;
}
.hotList /deep/ .van-grid-item__content,
.moreList /deep/ .van-grid-item__content {
  padding: 0 0 0 45px;
  justify-content: left;
}
.hotList /deep/ .van-image,
.moreList /deep/ .van-image {
  width: 25px;
  height: 25px;
}
.hotList .van-grid .van-grid-item p,
.moreList .van-grid .van-grid-item p {
  margin-left: 9px;
}
.iwant {
  text-align: left;
  margin-left: 45px;
  margin-top: 10px;
  display: flex;
  height: 25px;
}
.iwant /deep/ .van-image {
  width: 22px;
  height: 22px;
}
.iwant .iwant_text {
  font-size: 15px;
  margin-left: 9px;
  line-height: 25px;
}
</style>