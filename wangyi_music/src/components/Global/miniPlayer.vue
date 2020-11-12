<template>
  <!--组件播放下方  -->
  <div class="miniplayer" @click="toFullScreenplayer">
    <!-- 迷你播放组件 -->
    <div class="player">
      <div class="cover">
        <img :src="songInfo.song_cover" alt="" width="100%" />
      </div>
      <div>
        <p>{{ songInfo.song_name }}</p>
        <p>{{ songInfo.song_singer }}</p>
      </div>
      <div>
        <van-icon
          class="iconfont"
          class-prefix="icon"
          :name="isPlaying ? 'zanting' : 'iconset0481'"
          size="35"
          @click="handlePlaySong"
        />

        <van-icon
          class="iconfont"
          class-prefix="icon"
          name="bofangliebiao"
          size="35"
          @click="showPlaylist"
        />
        <!-- 是否展示播放列表 -->
        <van-popup
          v-model="isShowPlaylist"
          position="bottom"
          class="music_playlist"
          closeable
        >
          <p>当前播放({{ songList.length }})</p>
          <p>
            <!-- 播放模式 -->
            <span>列表播放</span>
            <span></span>
            <span></span>
          </p>
          <ul>
            <li
              v-for="(song, index) in songInfo.playlist"
              :key="index"
              :data-key="index"
            >
              <div class="playsong">
                <span>{{ index + 1 }}</span>
                <div class="playsong_avator">
                  <p>{{ song.name }}--</p>
                  <p>{{ song.ar[0].name }}</p>
                </div>
                <van-icon
                  class="iconfont"
                  class-prefix="icon"
                  name="gengduo"
                  size="20"
                />
              </div>
            </li>
          </ul>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
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
  data() {
    return {
      isShowPlaylist: false,
      //暂停和播放图标的切换
      show: false,
      isfullscreen: false,
      isPlaying,
      songList: musicList,
      songInfo: current || {},
    };
  },
  methods: {
    toFullScreenplayer(event) {
      //非点击迷你播放器的播放按钮或歌曲列表按钮
      if (event.target.nodeName !== "I") {
        //将vuex的fullScreen数据设为true,就是全屏状态
        this.$router.push("/fullscreenplayer");
      }
    },

    handlePlaySong() {
      isPlaying ? pause() : play(current);
    },

    //点击播放列表icon展示播放列表
    showPlaylist() {
      this.isShowPlaylist = true;
    },
  },
  mounted() {
    events.$on("play", () => {
      // console.log("别的组件 play 了", current);
      this.songInfo = current;
    });

    events.$on("playing", () => {
      this.isPlaying = isPlaying;
    });
  },
};
</script>
<style>
.normalPlayer {
  background-color: rgba(0, 0, 0);
  /*视口高度 */
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.smallfun .iconfont {
  margin: 0 20px;
  color: #fff;
}
.playfun .iconfont {
  margin: 0 15px;
  color: #fff;
}
.progress_all {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.progress {
  width: 200px;
  margin: 0 10px;
  position: relative;
  bottom: -22px;
}
.zheng {
  position: relative;
  width: 100px;
  height: 150px;
  top: 5%;
  left: 50%;
  overflow: hidden;
}
.pian {
  width: 140px;
  height: 140px;
  margin: 0 auto 20px;
  position: relative;
}
.mask {
  display: block;
  width: 250px;
  height: 250px;
  background: url(../../assets/singlecover.png) no-repeat;
  position: absolute;
  top: -70px;
  left: -35px;
}
.pian > img {
  position: relative;
  top: -35px;
  border-radius: 10px;
}
.songInfo > p {
  margin: 0;
}
.smallfun {
  margin-top: 100px;
}
.playfun {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
/*迷你播放组件的样式*/
.miniplayer {
  position: fixed;
  bottom: 0;
  background: #fff;
}
.player {
  width: 375px;
  border-top: 1px solid #d4d4d4;
  display: flex;
  align-items: center;
}
.player > div:nth-child(2) {
  text-align: left;
  width: 200px;
  margin-left: 10px;
}
.player > div:nth-child(2) > p {
  font-size: 15px;
  margin: 0;
}
.player > div:nth-child(2) > p:last-child {
  font-size: 10px;
  color: #9c9c9c;
  margin-top: 8px;
}
.cover {
  margin: 5px 10px;
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
}
.player > div:nth-child(3) > .iconfont {
  margin: 0 5px;
}
.music_playlist {
  border-radius: 20px;
  width: 90vw;
  height: 60vh;
  left: 5vw;
  bottom: 10vh;
}
.music_playlist > p {
  margin-left: 20px;
  text-align: left;
}
.music_playlist > p:first-child {
  text-align: left;
  position: fixed;
}
.music_playlist > p:nth-child(2) {
  position: relative;
  top: 30px;
}
.music_playlist > ul {
  margin-top: 35px;
}
.playsong{
  margin: 0 20px;
  display:flex ;
  align-items: center;
  justify-content: space-between;
}
.playsong .playsong_avator {
  display: flex;
  align-items: center;
  width: 200px;
}
.playsong .playsong_avator>p:nth-child(2){
  font-size: 5px;
  color: #9c9c9c;
}
</style>

