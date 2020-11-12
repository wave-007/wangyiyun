<template>
  <div>
    <!-- 顶部搜索栏 -->
    <div class="video_top">
      <van-image
        class="video_top_img"
        :src="require('../assets/icons/video_left_top.png')"
      />
      <van-search
        class="video_search"
        placeholder="猜你喜欢  我不配做你的男朋友"
        shape="round"
      />
      <van-image
        class="video_top_img"
        :src="require('../assets/icons/music_right_top.png')"
      />
    </div>
    <!-- 顶部标签页 -->
    <div>
      <!-- <van-tabs
        class="top_label"
        v-model="active"
        title-inactive-color="#000"
        title-active-color="#e4463b"
        color="#e4463b"
      > -->
      <!-- 视频内容开始 -->
      <!-- <van-tab title="推荐"> -->
      <div
        v-for="(item, index) in video_data"
        :key="index"
        v-lazy="item"
        class="video_data"
      >
        <!-- 视频封面图片 -->
        <!-- <van-image
              class="video_img"
              radius="8px"
              :src="item.data.coverUrl"
            /> -->

        <!-- 视频 -->
        <video
          controller
          disablePictureInPicture
          controlslist="nodownload noremoteplayback"
          @click="playOrPause(index)"
          width="400px"
          height="206px"
          class="video"
          :poster="item.data.coverUrl"
          src="../assets/video.mp4"
        ></video>
        <!-- 视频标题 -->
        <p class="video_title">{{ item.data.title }}</p>
        <!-- 作者头像和昵称 -->
        <div class="video_author" v-if="item.data.creator != null">
          <p>
            <!-- 头像 -->
            <van-image
              radius="20"
              width="25px"
              :src="item.data.creator.avatarUrl"
            ></van-image>
            <span>{{ item.data.creator.nickname }}</span>
          </p>
          <!-- 视频评论次数和点赞次数 -->
          <p>
            <!-- 点赞和评论图标 -->
            <van-image
              width="15px"
              :src="require('../assets/icons/zan.png')"
            ></van-image>
            <span>{{ item.data.commentCount }}</span>
            <van-image
              width="15px"
              :src="require('../assets/icons/pinglun.png')"
            ></van-image>
            <span>{{ item.data.praisedCount }}</span>
          </p>
          <!-- 右下角更多图标 -->
          <p>
            <van-icon
              class="video_data_bottom"
              name="weapp-nav"
              @click="tan(item.data.vid)"
            />
          </p>
        </div>
        <!-- 播放按钮 -->
        <van-image
          @click="playOrPause(index)"
          class="start_button"
          ref="video_swich"
          :src="require('../assets/icons/video_play.png')"
        ></van-image>

        <!-- 视频播放次数 -->
        <span class="video_playTime">
          <van-image
            :src="require('../assets/icons/bofang.png')"
            width="10px"
          ></van-image>
          {{ item.playTime }}
        </span>
        <!-- 视频持续时间 -->
        <span class="video_durationms" id="video_durationms">
          <!-- 视频持续时间左边的图标 -->
          <van-image
            :src="require('../assets/icons/music_right_top.png')"
            width="10px"
          ></van-image>
          {{ moment.unix(item.data.durationms).format("MM:DD") }}
        </span>
      </div>
      <!-- </van-tab> -->
      <!-- </van-tabs> -->
    </div>
    <!-- 分享部分 -->
    <div>
      <van-share-sheet
        lazy-render
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
        @select="onSelect"
      />
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      active: 0,
      video: [59107],
      video_data: [],
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          {
            name: "收藏",
            icon:
              "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3389746184,368592583&fm=26&gp=0.jpg",
            id: "",
            share: 0,
          },
        ],
      ],
      tan_id: "",
    };
  },
  methods: {
    tan(id) {
      this.showShare = true;
      this.options[1][0].id = id;
    },

    onSelect(option) {
      this.showShare = false;
      let id = option.id;
      let share_t = this.options[1][0].share;
      if (option.name == "收藏") {
        if (this.options[1][0].share == "0") {
          this.options[1][0].share = 1;
          this.axios({
            url: `/video/sub?id=${id}&t=${this.options[1][0].share}`,
            withCredentials: true,
          }).then((res) => {
            Toast.success(res.data.message);
            // console.log(res)
            // console.log(option.share);
          });
        }
        // else{
        //     Toast.success('已收藏');
        // }
          // this.options[1][0].share = 0;
      }
    },
    playOrPause(index) {
      let video_durationms = document.getElementsByClassName(
        "video_durationms"
      )[index];
      let video_playTime = document.getElementsByClassName("video_playTime")[
        index
      ];
      let video_switch = document.getElementsByClassName("start_button")[index];
      let videoEle = document.getElementsByClassName("video")[index];
      video_durationms.style.opacity = "0";
      video_playTime.style.opacity = "0";
      videoEle.setAttribute("controls", "controls");
      videoEle.style.opacity = "1";
      if (videoEle.paused || videoEle.ended) {
        videoEle.play();
        video_switch.style.opacity = "0";
      } else {
        videoEle.pause();
        video_switch.style.opacity = "0.8";
      }
    },
  },
  mounted() {
    // this.axios({
    //   url: `/login/cellphone?phone=18868785883&password=xiaobinli1993831`,
    //   withCredentials: true,
    // }).then((res) => {
    //   //  (res)
    //   console.log(localStorage.getItem('phone'));

    this.axios({
      url: `/video/group/list`,
      withCredentials: true,
    }).then((res) => {
      this.video.forEach((item) => {
        this.axios({
          url: `/video/group?id=${item}`,
          withCredentials: true,
        }).then((res) => {
          let datas = res.data.datas;
          this.video_data = datas;
          this.video_data.forEach((item) => {
            let playTime = item.data.playTime;
            let steingTime = playTime.toString();
            if (playTime > 10000) {
              steingTime = steingTime.slice(0, -4) + "万";
              item.playTime = steingTime;
            } else {
              item.playTime = steingTime;
            }
          });
          this.video_data.forEach((item) => {
            this.axios({
              url: `/video/url?id=${item.data.vid}`,
              withCredentials: true,
            }).then((res) => {
              item.url = res.data.urls[0].url;
            });
          });
        });
      });
    });
  },
};
</script>
<style>
/* 导航栏底部横杆样式 */
video::-webkit-media-controls-mute-button {
  display: none !important;
}
/* 视频播放数量 */
.video_playTime {
  display: inline-block;
  align-content: left;
  width: 50px;
  position: relative;
  color: #fff;
  font-size: 10px;
  top: -140px;
  left: -150px;
}
/* 右下角视频时间样式 */
.video_durationms {
  position: relative;
  top: -140px;
  color: #fff;
  font-size: 10px;
  left: 95px;
}
/* 播放按钮 */
.start_button {
  opacity: 0.8;
  position: relative;
  top: -200px;
  left: 48px;
  width: 50px;
}
/* 点赞和评论部分 */
.video_data_bottom {
  padding-left: 30px;
}
/* 头像和昵称 */
.video_author {
  display: flex;
  justify-content: space-between;
}
/* 点赞数和评论数 */
.video_author > p:nth-child(2) > span {
  margin-left: 8px;
  padding-right: 15px;
}
.video_author > p:nth-child(2) {
  width: 120px;
}
/* 第3个p标签 */
.video_author > p:last-child {
  padding-right: 8px;
  font-size: 20px;
}

/* 头像和昵称之间的距离 */
.video_author > p:first-child > span {
  width: 120px;
  text-align: left;
  padding-left: 10px;
}
.video_author p {
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 10px;
}
/* 视频内容部分 */
.video_data {
  padding: 4px;
  height: 290px;
  /* padding-bottom: 20px; */
}
/* 视频标题 */
.video_title {
  text-align: left;
  font-size: 12px;
  font-weight: bold;
  color: black;
  padding-bottom: 12px;
  border-bottom: 1px solid rgb(151, 151, 151);
}

/* 视频部分 */
.video {
  margin: 0 auto;
  border-radius: 4px;
}

/* 顶部横向标签页底部样式 */
.top_label /deep/ .van-tabs__line {
  bottom: 20px;
}

/* 顶部搜索栏样式 */
.video_top {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 顶部搜索框 */
.video_search {
  width: 280px;
  color: rgb(68, 53, 53);
}

/* 顶部左右两侧的图片 */
.video_top_img {
  width: 30px;
  height: 22px;
  margin: 0px -3px;
}
</style>