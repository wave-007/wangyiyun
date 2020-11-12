<template>
  <div>
    <!-- 头部开始 -->
    <div class="my_header">
      <van-row>
        <van-col span="4">
          <van-icon class="top_icons" name="enlarge" size="24" />
        </van-col>
        <van-col span="16">
          <van-search
            class="my_top_input"
            shape="round"
            background="#e4463b"
            placeholder="请输入搜索关键词"
          />
        </van-col>
        <van-col span="4">
          <van-icon class="top_icons" name="weapp-nav" size="24" />
        </van-col>
      </van-row>
    </div>
    <!-- 头部结束 -->
    <!-- 顶部导航开始 -->
    <div class="top_nav">
      <van-tabs v-model="active">
        <!-- 轮播图开始 -->
        <div class="banner">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in banners" :key="index">
              <img v-lazy="image.pic" width="100%" />
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 轮播图结束 -->
        <!-- 首页圆形图标入口开始 -->
        <div class="quick_entry">
          <van-grid :border="false">
            <van-grid-item icon="manager" text="私人FM" />
            <van-grid-item icon="award" text="每日推荐" />
            <van-grid-item icon="umbrella-circle" text="歌单" />
            <van-grid-item icon="bar-chart-o" text="排行榜" />
          </van-grid>
        </div>
        <!-- 首页原型图标入口结束 -->
        <van-tab title="个性推荐">1111</van-tab>
        <van-tab title="主播电台">2222</van-tab>
      </van-tabs>
    </div>
    <!-- 顶部导航结束 -->

    <div>
      <p class="first_title">每日推荐</p>
      <van-divider />
      <!-- 每日推荐歌单开始 -->
      <van-grid :border="false" :column-num="2">
        <van-grid-item v-for="(item, index) of AlbumPics" :key="index">
          <van-image :src="item.picUrl" />
          <div class="list_subject">
            {{ item.name }}
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <div>
      <van-tabs v-model="active" animated>
        <van-tab>
          <van-image
            v-for="(item, index) in SongsPics"
            :key="index"
            round
            width="10rem"
            height="10rem"
            :src="item.al.picUrl"
          />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style scoped>
.my_header {
  padding-top: 10px;
  background-color: #e4463b;
}
.van-icon {
  color: #fff;
}
.top_icons {
  padding-top: 15px;
}
.top_nav /deep/ .van-tab {
  color: aliceblue;
  background: #e4463b;
}
.top_nav /deep/.van-tabs__line {
  background-color: aliceblue;
  margin-bottom: 5px;
}
.banner {
  padding: 10px 12px;
  border-radius: 12px;
}
.banner /deep/ .van-swipe__track {
  height: 146px;
}
.quick_entry /deep/ .van-grid-item__icon {
  padding: 10px;
  background-color: #e4463b;
  border-radius: 50%;
  color: #fff;
}
.list_subject {
  height: 30px;
  font-size: 12px;
  padding-top: 10px;
  /* text-overflow: ellipsis; */
  /* white-space: nowrap; */
}
.first_title {
  padding-top: 15px;
  padding-left: 10px;
  font-weight: bold;
  text-align: left;
}
</style>

<script>
export default {
  data() {
    return {
      active: 0,
      banners: [],
      AlbumPics: [],
      SongsPics: [],
    };
  },
  mounted() {
    //请求数据 得到轮播图片
    this.axios.get("/banner?type=1").then((res) => {
      // console.log(res.data.banners);
      this.banners = res.data.banners;
    });
    //设置登录
    this.axios({
      url: `/login/cellphone?phone=17603017770&password=woshiklde1993`,
      withCredentials: true,
    }).then((res) => {
      // console.log(res.data);
      this.axios({
        url: `/recommend/resource`,
        withCredentials: true,
      }).then((res) => {
        // console.log(res.data.recommend);
        let results = res.data.recommend;
        // results.forEach(element => {
        this.AlbumPics = results;
        // console.log(this.pics);
        // });
        // this.pic = results.picUrl;
      });
      this.axios({
        url: "/recommend/songs",
        withCredentials: true,
      }).then((res) => {
        // console.log(res.data.data.dailySongs);
        let results = res.data.data.dailySongs;
        // console.log(results);
        this.SongsPics = results;
      });
    });
    this.axios({ url: "/video/group/list" }).then((res) => {
      // console.log(res);
    });
    this.axios({ url: "/video/group?id=12144" ,
        withCredentials: true,

    }).then((res) => {
      // console.log(res);
    });
        this.axios({ url: "/video/url?id=1F2659254165AEE3B4864274B8F66AB1" ,
        withCredentials: true,

    }).then((res) => {
      // console.log(res);
    });
    // this.axios({
    //   url: `/recommend/resource`,
    //   withCredentials: true,
    // }).then((res)=>{
    //   console.log(res.data)
    // })
  },
};
</script>