<template>
  <div class="home">
    <!-- 顶部标签 -->
    <van-tabs v-model="nav.active" swipeable class="home-contain">
      <span class="nav-aside van-icon van-icon-bars" slot="nav-left" @click="showPopup"></span>
      <span class="nav-aside van-icon van-icon-search" slot="nav-right" @click="mySearch"></span>
      <van-tab
        v-for="(item, index) in nav.list"
        :title="item.text"
        :key="index"
      >
      <!-- 主页标签内容 -->
        <div :is="item.comp"></div>
      </van-tab>
    </van-tabs>
    <van-popup v-model="show" round position="left" :style="{ width: '80%',height:'100%' }" >
      <Account  width="70%" />
    </van-popup>
    <MiniPlayer v-if="song_info.id"/>
  </div>
</template>

<style scoped>
.home {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.home-contain{
  position: relative;
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
.nav-aside{
  width: 60px;
  height: 44px;
  font-size: 20px;
  display: flex;
  box-sizing: border-box;
  align-items: center;
}
.nav-aside:first-child{
  justify-content: flex-start;
  padding-left: 12px;
}
.nav-aside:last-child{
  justify-content: flex-end;
  padding-right: 12px;
}
</style>

<script>
import Explore from "../components/home/Explore";
import SkySquare from "../components/home/SkySquare";
import UserCenter from "../components/home/UserCenter";
import Village from "../components/home/Village";
import Account from '../components/home/Account';
import {
  // consts
  current,
  isPlaying,
  musicList,
  events,

  // methods
  loadList,
  play,
  pause,
  next,
} from "@/plugins/player";
export default {
  components: {
    Explore,
    SkySquare,
    UserCenter,
    Village,
    Account,
  },
  data() {
    return {
      nav: {
        list: [
          { text: "我的", comp: "UserCenter" },
          { text: "发现", comp: "Explore" },
          { text: "云村", comp: "Village" },
          { text: "视频", comp: "SkySquare" },
        ],
        active: 1,
      },
      show:false,
      song_info: current || { playlist:[] },

    };
  },
  methods:{
    showPopup(){
      this.show = true
    },
    mySearch(){
      this.$router.push('/search')
    }
  }
};
</script>