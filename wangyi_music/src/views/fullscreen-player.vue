<template>
  <div class="normalPlay-page">
    <div class="normalPlayer">
      <van-nav-bar
        :left-text="songInfo.song_name"
        left-arrow
        @click-left="$router.go(-1)"
        class="navbar"
        :border="false"
      >
        <template #right>
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="share"
            size="18"
            color="#fff"
          />
        </template>
      </van-nav-bar>
      <!-- 中间封面 -->
      <div @click="changeBg" class="content_box">
        <div v-if="isShowLrc" class="songImg">
          <div class="zheng">
            <img src="@/assets/zheng.png" alt="" width="100%" />
          </div>
          <div class="pian">
            <img :src="songInfo.song_cover" alt="" width="100%" />
            <span class="mask"></span>
          </div>
        </div>
      <!-- =========================歌词================== -->
        <div class="detail" v-else>
          <div class="song-title">
            <p>{{ songInfo.song_name }}</p>
            <!-- <p>{{ songInfo.song_singer }}</p> -->
          </div>
          <div class="wrapper">
            <ul ref="ul" class="content" :style="lyricMove">
              <li
                v-for="(item, index) in songLrc"
                :key="index"
                :style="{ 'font-size': index == currentRow ? '1.2rem' : '.7rem','color': index == currentRow ? '#5695c7':'#f8f8f8'}"
              >
                {{ item.text }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--小功能 -->
      <!-- 点击时间 -->
      <div class="bottom_box">
      <div class="smallfun">
        <van-icon
          class="iconfont"
          class-prefix="icon"
          name="xihuan"
          size="25"
        />
        <van-icon
          class="iconfont"
          class-prefix="icon"
          name="download1"
          size="25"
        />
        <van-icon class="iconfont" class-prefix="icon" name="share" size="25" />
        <van-icon
          class="iconfont"
          class-prefix="icon"
          name="comment"
          size="25"
        />
        <van-icon
          class="iconfont"
          class-prefix="icon"
          name="gengduo"
          size="25"
        />
      </div>
      <div class="progress_all">
        <p style="color: #fff">{{ getCurrentTime }}</p>
        <div>
          <van-progress
            :percentage="percentage"
            class="progress"
            :show-pivot="false"
          />
        </div>
        <p style="color: #fff">{{ songInfo.totaltime }}</p>
      </div>
      <div class="playfun">
        <van-icon
          class="iconfont"
          class-prefix="icon"
          name="xunhuan"
          size="30"
        />

        <!-- 上一首 -->
        <van-icon
          class="iconfont"
          class-prefix="icon"
          name="shangyishoushangyige"
          size="30"
          @click="handlePlayPrev"
        />

        <!-- 暂停 播放 -->
        <van-icon
          class="iconfont"
          class-prefix="icon"
          :name="isPlaying ? 'zanting' : 'iconset0481'"
          size="50"
          @click="handlePlaySong"
        />

        <!-- 下一首 -->
        <van-icon
          class="iconfont"
          class-prefix="icon"
          name="xiayigexiayishou"
          size="30"
          @click="handlePlayNext"
        />

        <van-icon
          class="iconfont"
          class-prefix="icon"
          name="bofangliebiao"
          size="30"
          @click="isShowPlaylist = true"
        />
        <van-popup
          v-model="isShowPlaylist"
          position="bottom"
          class="music_playlist"
          closeable
        >
          <p>当前播放({{ songInfo.playlist.length }})</p>
          <p>
            <!-- 播放模式 -->
            <span>列表循环</span>
            <span></span>
            <span></span>
          </p>
          <ul>
            <li
              v-for="(song, index) in songList"
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
  </div>
</template>

<script>
import {
  // consts
  current,
  isPlaying,
  musicList,
  events,
  percentage,

  // methods
  loadList,
  play,
  pause,
  next,
  prev,
  getTime,
} from "@/plugins/player";

export default {
  data() {
    return {
      songInfo: current || { playlist: [] },
      songList: musicList,
      isShowPlaylist: false,
      isPlaying,
      //歌曲总时长
      // totaltime,
      //当前播放时间(格式化后的)
      getCurrentTime: "",
      //未格式化后的当前播放时间
      currentTime: "",
      //未格式化的总时长
      duration: "",
      // 进度条
      percentage: 0,
      //歌词
      songLrc: [],
      //歌词移动样式
      lyricMove: {
        top: "2rem",
      },
      //当前歌词行
      currentRow: 0,
      newDate:'',
      //是否显示歌词
      isShowLrc:true,
    };
  },
  //监视播放时间
  watch: {
    getCurrentTime() {
      let songTime = this.getCurrentTime;
      let result = songTime.split(':');
      this.newDate = parseInt(result[0] * 60) +  parseInt(result[1]);
      this.songLrc.forEach((element, index) => {
        if (this.newDate == element.time) {
          // console.log(1);
          this.lyricMove.top = -index * 2 + 1 + "rem";
          this.currentRow = index;
        }
      });
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    handlePlaySong() {
      isPlaying ? pause() : play(current);
    },

    handlePlayNext() {
      next();
      this.songLrc = [];
      this.getLrc();
    },
    handlePlayPrev() {
      prev();
      this.songLrc = [];
      this.getLrc();
    },
    //处理歌词格式
    formatLyric(text) {
      let arr = text.split("\n"); //原歌词文本已经换好行了方便很多，我们直接通过换行符“\n”进行切割
      let row = arr.length; //获取歌词行数
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i]; //现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
        let temp_arr = temp_row.split("]"); //我们可以通过“]”对时间和文本进行分离
        let text = temp_arr.pop(); //把歌词文本从数组中剔除出来，获取到歌词文本了！
        //再对剩下的歌词时间进行处理
        temp_arr.forEach((element) => {
          let obj = {};
          let time_arr = element.substr(1, element.length - 1).split(":"); //先把多余的“[”去掉，再分离出分、秒
          let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); //把时间转换成与currentTime相同的类型，方便待会实现滚动效果
          obj.time = s;
          obj.text = text;
          // console.log(obj)
          this.songLrc.push(obj); //每一行歌词对象存到组件的lyric歌词属性里
        });
      }
      this.songLrc.sort(this.sortRule); //由于不同时间的相同歌词我们给排到一起了，所以这里要以时间顺序重新排列一下
      this.$store.commit("setLyric", this.songLrc); //把歌词提交到store里，为了重新进入该组件时还能再次渲染
    },
    sortRule(a, b) {
      //设置一下排序规则
      return a.time - b.time;
    },
    ////////////处理播放时间格式
    getSongTime(){

    },
    ///////////获取当前歌词
    getLrc() {
      this.axios({
        url: `/lyric?id=${this.songInfo.id}`,
        withCredentials: true,
      }).then((res) => {
        this.formatLyric(res.data.lrc.lyric);
        console.log(this.songLrc);
      });
    },
    changeBg(){
      this.isShowLrc = !this.isShowLrc;
    }
  },
  // computed: {
  //   getTime(time) {
  //     let minutes, second;
  //     minutes = parseInt(time / 60);
  //     second = parseInt(time % 60);

  //     if (second < 10) {
  //       second = "0" + second;
  //     }
  //     return minutes + ":" + second;
  //   },
  // },
  mounted() {
    //页面初始化歌词
      this.getLrc();

    //vue API 触发事件
    events.$on("playing", (isPlaying, duration) => {
      this.isPlaying = isPlaying;
      this.duration = duration;
    });

    //vue API 触发事件
    events.$on("timeupdate", (currentTime, getCurrentTime,percentage) => {
      this.getCurrentTime = getCurrentTime;
      this.currentTime = currentTime;
      this.percentage = percentage;
      //console.log(this.percentage);
      //console.log(this.currentTime);
    });

    //vue API 触发事件
    events.$on("play", () => {
      this.songInfo = current;
    });
    // console.log(this.songInfo);
  },
};
</script>

<style lang="less" scoped>
.normalPlayer-page {
  .normalPlayer {
    background-color: rgb(0, 0, 0);
    /*视口高度 */
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
  .van-nav-bar {
    background: black;
  }
  .van-nav-bar .van-icon {
    color: #fff;
  }
  .navbar .van-nav-bar .van-nav-bar__left .van-nav-bar__text {
    color: #fff;
  }
  .van-nav-bar .van-nav-bar__title .van-ellipsis > p {
    color: #fff;
    margin: 0;
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
    background: url("~@/assets/singlecover.png") no-repeat;
    position: absolute;
    top: -70px;
    left: -35px;
  }
  .pian > img {
    position: relative;
    top: -35px;
    border-radius: 10px;
  }
  .smallfun {
    margin-top: 100px;
  }
  .playfun {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.bottom_box{
  position: fixed;
  left: 30px;
  bottom: 35px;
}
.content_box{
  width: 100vw;
  height: 70vh;
}
.songImg{
  margin-top: 5vw;
}
// ===============================歌词样式=============
.detail {
  position: absolute;
  top: 7rem;
  bottom: 2.6rem;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
  height: 250px;
}
.song-title {
  width: 100%;
  height: 2rem;
  // background-color #eeefff;
  p {
    width: 100%;
    line-height: 0.6rem;
    font-size: 16px;
    color: #ffd700;
    margin-top: 0.1rem;
    text-align: center;
    // background-color: #fff;
  }
}
.wrapper {
  overflow: hidden;
  position: absolute;
  top: 5rem;
  right: 0;
  left: 0;
  height: 250px;
  // background-color yellow;
  ul {
    line-height: 32px;
    width: 100%;
    padding-bottom: 1rem;
    // background-color: red;
    li {
      font-size: 14px;
      transition-duration: 1200ms;
      // background-color: skyblue;}
      .lineHigh {
        color: #ffd700;
      }
    }
  }
}
.content{
  position: absolute;
  left: -10px;
}
</style>