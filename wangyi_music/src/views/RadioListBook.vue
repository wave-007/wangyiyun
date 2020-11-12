<template>
  <div>
    <!-- 电台分类--有声书 导航开始 -->
    <div class="nav">
      <van-nav-bar
        :title="category"
        left-arrow
        class="navBar"
        :border="false"
        @click-left="back"
        @click-right="onClickRight"
        fixed
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
    <!-- 电台分类导航结束 -->
    <!-- tab标签选项开始 -->
    <div class="listDetail">
      <van-tabs
        v-model="active"
        title-inactive-color="#646566"
        title-active-color="#e4463b"
        swipeable
        sticky
        :offset-top="46"
      >
        <van-tab title="热门">
          <!-- 列表内容 开始 -->
          <div class="listContent">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div v-for="(item, index) of contents" :key="index">
                <router-link :to="`/radioListBookDetail/${item.id}`">
                  <van-cell>
                    <van-card>
                      <template #tags>
                        <div class="myCard">
                          <div class="card_left">
                            <van-image
                              radius="10"
                              width="120px"
                              height="120px"
                              fit="cover"
                              lazy-load
                              :src="item.picUrl"
                              alt="缺省图"
                            />
                            <div class="payTag" v-if="item.price != 0">
                              付费精品
                            </div>
                          </div>

                          <div class="card_right">
                            <p class="title van-ellipsis">{{ item.name }}</p>
                            <p class="content content_one">
                              {{ item.rcmdtext }}
                            </p>
                            <p class="content">
                              节目：{{ item.programCount }}，
                              <span v-if="item.price != 0">最新上架</span>
                              <span v-else>订阅:{{ item.subCount }}</span>
                            </p>
                            <p class="price" v-if="item.price != 0">
                              ¥<span>{{ (item.price / 100).toFixed(1) }}</span
                              >/期
                            </p>
                          </div>
                        </div>
                      </template>
                    </van-card>
                  </van-cell>
                </router-link>
              </div>
            </van-list>
          </div>
          <!-- 列表内容结束 -->
        </van-tab>
        <van-tab title="文学"> <div class="listContent"></div> </van-tab>
        <van-tab title="玄幻"> <div class="listContent"></div> </van-tab>
        <van-tab title="亲子"> <div class="listContent"></div> </van-tab>
        <van-tab title="历史"> <div class="listContent"></div> </van-tab>
      </van-tabs>
    </div>
    <!-- tab标签选项结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      contents: [],
      category: "",
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    onClickRight() {
      // 暂时先这样写，后期修改
      // this.$router.push("/fullscreenplayer");
    },
    onLoad() {},
  },
  mounted() {
    let cateId = this.$route.params.cateId;
    this.category = this.$route.params.name;
    //获取有声书的列表数据
    this.axios({
      url: `/dj/radio/hot?cateId=` + cateId,
    }).then((res) => {
      // console.log(res);
      this.contents = res.data.djRadios;
    });
  },
};
</script>
<style scoped>
.nav /deep/ .van-ellipsis {
  font-size: 18px;
}
.nav /deep/ .van-nav-bar {
  z-index: 100;
}
.nav /deep/ .van-nav-bar .van-icon {
  color: #646566;
  font-size: 22px;
}
.listDetail /deep/ .van-tabs__line {
  bottom: 21px;
}
.listDetail /deep/ .van-tab__text {
  font-size: 16px;
}
.listDetail /deep/ .van-tabs__content {
  margin-top: 10px;
}
/* 列表内容 */
.listContent {
  margin-top: 46px;
}
.listContent /deep/ .van-cell {
  padding: 0;
}
.listContent /deep/ .van-card {
  background-color: #fff;
  padding: 0 3px;
}
.myCard {
  display: flex;
}
.card_left {
  position: relative;
}
/* 付费精品 */
.payTag {
  width: 70px;
  height: 25px;
  background-color: #e4463b;
  color: #fff;
  z-index: 10;
  font-size: 8px;
  text-align: center;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  left: 0;
  top: 0;
}
/* 列表卡片右侧内容 */
.card_right {
  padding: 10px 12px;
  width: 60%;
}
.card_right p {
  margin: 0;
}
.card_right .title {
  font-size: 16px;
  margin-bottom: 4px;
  font-weight: bold;
}
.card_right .content {
  color: #aaaaab;
  font-size: 14px;
}
.card_right .price {
  color: #e4463b;
  font-size: 18px;
  margin-top: 6px;
}
</style>