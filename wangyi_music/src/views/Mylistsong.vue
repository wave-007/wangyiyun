<template>
  <div>
    <!-- 顶部导航 -->
    <div>
      <!-- 个人id信息 -->
      <div class="my">
        <!-- cell需要加点击事件跳转到我的信息页面 -->
        <van-cell is-link class="avatar_cell" title-class="avatar_title">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <div class="avatar_img">
              <img :src="avatar_info.avatarUrl" alt="" style="width: 100%" />
            </div>
            <div class="avatar_name">
              <p class="custom-title">{{ avatar_info.nickname }}</p>
              <!-- vip icon需要加点击事件跳转到开通vip页面 -->
              <p>
                <van-icon
                  class="iconfont"
                  class-prefix="icon"
                  name="VIP"
                  size="30"
                />
                <span></span>
              </p>
            </div>
          </template>
        </van-cell>
      </div>
      <!-- 很多icon -->
      <div class="moreicon">
        <ul class="moreicon_details">
          <li>
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="ziyuan-"
              size="30"
            />
            <p>本地音乐</p>
          </li>
          <li>
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="cloudupload-fill"
              size="30"
            />
            <p>上传</p>
          </li>
          <li>
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="check-circle-fill"
              size="30"
            />
            <p>已购</p>
          </li>
          <li>
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="playcircle-fill"
              size="30"
            />
            <p>最近播放</p>
          </li>
          <li>
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="userplus-fill"
              size="30"
            />
            <p>我的好友</p>
          </li>
          <li>
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="collection-fill"
              size="30"
            />
            <p>收藏和赞</p>
          </li>
          <li>
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="diantai"
              size="30"
            />
            <p>我的电台</p>
          </li>
          <li>
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="plus-circle-fill"
              size="30"
            />
            <p>音乐应用</p>
          </li>
        </ul>
      </div>
      <!-- 我喜欢的音乐 -->
      <div class="mylike">
        <div class="like_background">
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="xihuan1"
            size="20"
          />
        </div>
        <div>
          <p>我喜欢的音乐</p>
          <!-- 拿到我喜欢音乐列表的长度 -->
          <p>{{ trackcount }}首</p>
        </div>
        <!-- 需要点击事件点击心动可以播放我喜欢的音乐 -->
        <button class="heartbeat">
          <div>
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="huaban"
              size="30"
            />
          </div>
          <p>心动模式</p>
        </button>
      </div>
      <!-- 歌单 -->
      <div>
        <van-tabs v-model="listsong">
          <van-tab title="创建歌单">
            <div class="creat">
              <div class="playlist">
                <p>创建歌单({{ createdlists.length }}个)</p>
                <div>
                  <van-icon
                    class="iconfont"
                    class-prefix="icon"
                    name="jia"
                    size="20"
                  />
                </div>
                <div>
                  <van-icon
                    class="iconfont"
                    class-prefix="icon"
                    name="gengduo"
                    size="20"
                  />
                </div>
              </div>
              <ul>
                <!-- 初步想法用v-for渲染 -->
                <li v-for="(item, index) in createdlists" :key="index">
                  <router-link :to="`/songlist/${item.id}`">
                    <!-- 歌单封面 -->
                    <div class="playlists">
                      <div class="list_cover">
                        <img :src="item.coverImgUrl" alt="" width="100%" />
                      </div>
                      <!-- 歌单名字 -->
                      <span>
                        <!-- 歌单名字 -->
                        <p>{{ item.name }}</p>
                        <!-- 歌单歌曲的数量 -->
                        <p>{{ item.trackCount }}首</p>
                      </span>
                      <div>
                        <van-icon
                          class="iconfont"
                          class-prefix="icon"
                          name="gengduo"
                          size="20"
                          @click="showMore"
                        />
                        <van-popup
                          v-model="show"
                          round
                          position="bottom"
                          :style="{ height: '30%' }"
                        />
                      </div>
                    </div>
                  </router-link>
                </li>
                <li class="insert-list">
                  <van-icon
                    class="iconfont"
                    class-prefix="icon"
                    name="daoru"
                    size="50"
                  />
                  <p>导入外部歌单</p>
                </li>
              </ul>
            </div>
          </van-tab>
          <van-tab title="收藏歌单">
            <div class="creat">
              <div class="playlist">
                <span>收藏歌单({{ subscribedlists.length }}个)</span>
                <div>
                  <van-icon
                    class="iconfont"
                    class-prefix="icon"
                    name="jia"
                    size="20"
                  />
                </div>
                <div>
                  <van-icon
                    class="iconfont"
                    class-prefix="icon"
                    name="gengduo"
                    size="20"
                  />
                </div>
              </div>
              <ul>
                <!-- v-for渲染 -->
                <li v-for="(item, index) in subscribedlists" :key="index">
                  <!-- 歌单封面 -->
                  <router-link :to="`/songlist/${item.id}`">
                    <div class="playlists">
                      <div class="list_cover">
                        <img :src="item.coverImgUrl" alt="" width="100%" />
                        <!-- 歌单名字 -->
                      </div>

                      <span>
                        <!-- 歌单名字 -->
                        <p>{{ item.name }}</p>
                        <!-- 歌单歌曲的数量 -->
                        <p>{{ item.trackCount }}首</p>
                      </span>
                      <van-icon
                        class="iconfont"
                        class-prefix="icon"
                        name="gengduo"
                        size="20"
                      />
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </van-tab>
          <van-tab title="歌单助手">
            <p>歌单助手</p>
            <p>你可以从歌单中筛选出</p>
            <button>试试看</button>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <MiniPlayer v-if="song_info.id"/>
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
      /*导航标签切换变量*/
      active: 0,
      /*歌单导航切换变量*/
      listsong: 0,
      //创建歌单的变量
      createdlists: [],
      subscribedlists: [],
      show: false,
      avatar_info: {
        avatarUrl: "",
        nickname: "",
      },
      trackcount: 0,
      song_info: current || { playlist:[] },
    };
  },
  methods: {
    showMore() {
      this.show = true;
    },
  },
  mounted() {
    let uphone = localStorage.getItem("phone");
    let upassword = localStorage.getItem("password");
    let userId = '';
    this.axios({
      url: `/login/cellphone?phone=${uphone}&password=${upassword}`,
      withCredentials: true,
    }).then((res) => {
      // console.log(res);
      userId = res.data.profile.userId;
      this.avatar_info.avatarUrl = res.data.profile.avatarUrl;
      this.avatar_info.nickname = res.data.profile.nickname;
      this.axios({
        url: `/user/playlist?uid=${userId}&limit=200`,
        withCredentials: true,
      }).then((res) => {
        // console.log(res.data);
        let arr = res.data.playlist;
        this.trackcount = arr[0].trackCount;
        arr.forEach((item) => {
          // console.log(item.subscribed)
          if (item.creator.userId == userId) {
            this.createdlists.push(item);
          } else {
            this.subscribedlists.push(item);
          }
        });
        this.createdlists.shift();
        //console.log(this.createdlists)
        //console.log(this.subscribedlists)
      });
    });
  },
};
</script>
<style scoped>
.iconplace {
  display: flex;
  justify-content: center;
}
.content {
  padding: 16px 16px 160px;
}
.avatar_cell {
  height: 60px;
  margin: 10px 0px;
  padding: 10px 30px;
}
.avatar_title {
  display: flex;
}
.avatar_img {
  position: relative;
  left: 0px;
  height: 50px;
  width: 50px;
  overflow: hidden;
  border-radius: 50%;
}
.avatar_name > p {
  text-align: left;
  margin: 2px 10px;
}
.moreicon {
  width: 350px;
  margin: 15px auto;
}
.moreicon_details {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.moreicon_details > li {
  width: 65px;
  height: 65px;
  margin: 0 5px;
}
.moreicon_details .iconfont {
  color: #e4463e;
}
.jia_style {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 auto;
  color: gray;
  background-color: #e6e6e6;
  font-size: 15px;
}
.moreicon_details > li > p {
  font: 10px gray;
}
.mylike {
  display: flex;
  width: 300px;
  height: 50px;
  position: relative;
  margin: 10px 20px;
  padding: 10px 10px;
}
.like_background {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: pink;
  line-height: 50px;
}
.mylike .iconfont {
  color: #e4463e;
}
.mylike > div > p {
  font-size: 10px;
  margin: 2px 5px;
}
.mylike > div > p:first-child {
  position: absolute;
  top: 20%;
  font-size: 15px;
}
.mylike > div > p:last-child {
  position: absolute;
  bottom: 20%;
}
.heartbeat {
  position: absolute;
  right: 10%;
  top: 25%;
  border-radius: 20px;
  font-size: 10px;
  background-color: #ffffff;
  border: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
}
.creat {
  margin: 20px 20px;
  padding: 0 10px;
  position: relative;
}
.playlist {
  text-align: left;
  display: flex;
  height: 32px;
}
.playlist > p {
  font-size: 10px;
  color: #bfbfbf;
}
.playlist > div:nth-child(2) {
  position: absolute;
  right: 15%;
  line-height: 32px;
}
.playlist > div:nth-child(3) {
  position: absolute;
  right: 5%;
  line-height: 32px;
}
a {
  color: black;
}
.playlists {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.playlists > span {
  margin: 0 5px;
  display: block;
  text-align: left;
  width: 200px;
}
.playlists > span > p {
  font-size: 15px;
}
.playlists > span > p:first-child {
  margin-top: 20px;
}
.playlists > span > p:last-child {
  font-size: 10px;
  color: #bfbfbf;
}
.list_cover {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  overflow: hidden;
}
.insert-list {
  display: flex;
}
.insert-list > p {
  margin-left: 50px;
}
</style>