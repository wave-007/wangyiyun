<template>
  <div>
    <BreakHeader title="歌单广场" />
    <PullRefresh>
      <van-tabs v-model="active" sticky>
        <van-tab
          v-for="(item, index) in nav.list"
          :title="item.text"
          :key="index"
        >
              <div class="songlist_box">

          <div v-for="(songlist, index) in item.results" :key="index">
            <router-link :to="`/songlist/${songlist.id}`">
                <van-image
                  :src="songlist.coverImgUrl"
                  contain
                  width="100"
                  height="100"
                >
                  <div class="songlist_title">
                    {{ songlist.name }}
                  </div>
                  <div class="left_top">
                    <van-icon name="service" />
                    <span>{{ (songlist.playCount / 10000).toFixed(0) }}万</span>
                  </div>
                </van-image>
            </router-link>
            <!-- <img > -->
              </div>

          </div>
        </van-tab>
      </van-tabs>
    </PullRefresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      show: false,
      nav: {
        list: [
          { text: "精品", results: [] },
          { text: "推荐", results: [] },
        ],
      },
      active: 0,
    };
  },
  methods: {
    showSonglist() {
      this.$router.push(`/songlist/${songlist.id}`);
    },
  },
  mounted() {
    this.axios({
      // url:'/personalized',
      // url:'/playlist/hot',
      url: "/top/playlist/highquality", //精品歌单
      // url:'/top/playlist',//推荐歌单
      // url:'/playlist/catlist',
      //  url:'/top/playlist/highquality/tags',
      withCredentials: true,
    }).then((res) => {
      // console.log(res.data.playlists);
      let result = res.data.playlists;
      // result.forEach(element => {
      //   this.nav.list[0].Boutique.push(element)
      // });
      this.nav.list[0].results = res.data.playlists;
      this.nav.list[0].results.splice(-2, 2);
    });
    this.axios({
      // url:'/personalized',
      // url:'/playlist/hot',
      // url:'/top/playlist/highquality',//精品歌单
      url: "/top/playlist", //推荐歌单
      // url:'/playlist/catlist',
      //  url:'/top/playlist/highquality/tags',
      withCredentials: true,
    }).then((res) => {
      // console.log(res);
      this.nav.list[1].results = res.data.playlists;
      this.nav.list[1].results.splice(-2, 2);
      // console.log(this.nav.list);
    });
  },
};
</script>

<style scoped>
.van-tabs /deep/ .van-tabs__line {
  bottom: 20px;
}
.songlist_box {
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around;
  align-content: space-around;
}
.van-image {
  border-radius: 5px;
  /* overflow: hidden; */
  text-align: left;
  font-size: 12px;
  margin: 0 0 50px 0;
}
.van-image /deep/ img {
  border-radius: 5px;
}
.van-image /deep/ .songlist_title {
  color: #000;
  padding: 5px 0 0 0;
}
.left_top {
  color: #fff;
  position: absolute;
  top: 5px;
  right: 5px;
  font-weight: bold;
}
</style>