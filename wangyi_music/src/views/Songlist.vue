<template>
  <div class="song-list-page" style="background:#bdb7b7">
    <!-- 导航栏 -->
    <div class="song-list-nav">
      <van-nav-bar left-text="歌单" left-arrow @click-left="$router.go(-1)" :border="false">
        <template #right>
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="search"
            size="20"
            color="#fff"
          />
          <van-icon
            class="iconfont"
            class-prefix="icon"
            name="gengduo"
            size="20"
            color="#fff"
          />
        </template>
      </van-nav-bar>
    </div>

    <div class="song-list-body">
      <div class="list_detail">
        <!-- 歌单信息详情 -->
        <div>
          <div class="list_cover">
            <img :src="cover" alt="" width="100%" />
          </div>
          <div class="playcount">
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="iconset0481"
              size="5"
              color="#fff"
            />
            <span>{{ playcount }}</span>
          </div>
        </div>
        <div class="info">
          <p>{{ playlistName }}</p>
          <div class="creator_info">
            <div class="creator_cover">
              <img :src="creator_cover" alt="" width="100%" />
            </div>
            <span><van-cell :title="avatarName" is-link to="index" /></span>
          </div>
          <p>
            <van-cell
              :title="description"
              is-link
              to="index"
              title-class="info_description"
            />
          </p>
        </div>
      </div>
      <div>
        <ul class="more_icon">
          <li>
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="comment"
              size="30"
            />
          </li>
          <li>
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="share"
              size="30"
            />
          </li>
          <li>
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="download1"
              size="30"
            />
          </li>
          <li>
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="duoxuan"
              size="30"
            />
          </li>
        </ul>
      </div>
      <div class="viptotal">
        <van-cell value="首开VIP仅5元" is-link :border="false">
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <!-- vip歌曲数据暂时未找到 -->
            <span class="custom-title">含7首VIP专享歌曲</span>
          </template>
        </van-cell>
        <div class="play_view">
          <div class="shoucangjia">
            <!-- 播放icon -->
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="iconset0481"
              size="25"
            />
            <p>
              播放全部<span>(共{{ trackCount }}首)</span>
            </p>
            <!-- 收藏icon -->
            <div>
              <van-icon
                class="iconfont"
                class-prefix="icon"
                name="shoucangjia1"
                size="15"
              />
              <span>{{ subscribedCount }}</span>
            </div>
          </div>
          <ul @click="handlePlaysong">
            <li
              v-for="(song, index) in song_info.playlist"
              :key="index"
              :data-key="index"
            >
              <div class="playsong">
                <span>{{ index + 1 }}</span>
                <div>
                  <p>{{ song.name }}</p>
                  <p>{{ song.ar[0].name }}-{{ song.al.name }}</p>
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
        </div>
      </div>
    </div>

    <!--歌曲播放组件 -->
    <MiniPlayer v-if="song_info.id"/>
  </div>
</template>
<script>
import {
  // methods
  loadList,
  events,
  play,
  pause,
  current,
  getMusicItem
} from "@/plugins/player";

export default {
  data() {
    return {
      //播放器组件是否显示
      ishaveplayer: false,
      cover: "",
      playcount: 0,
      subscribedCount: 0,
      trackCount: 0,
      playlistName: "",
      avatarName: "",
      description: "",
      songsId: [],
      // songs: [],
      creator_cover: "",
      song_info: current || { playlist:[] },
    };
  },
  methods: {
    handlePlaysong(ev) {
      const li = ev.path.find((nodeName) => {
        return nodeName.tagName === "LI";
      });
      const index = (this.song_info.index = li.dataset.key);
      const playlist = this.song_info.playlist;
      const item = playlist[index];
      // console.log(index,item)
      const playItem = getMusicItem(item, index);

      play(this.song_info = playItem);

      //播放器器组件显示
      this.ishaveplayer = true;
    },
  },

  async mounted() {
    // console.log(events)
    events.$on('play', () => this.current = current);
    // 保证请求状态
    await this.axios({
      url: `/login/cellphone?phone=17603017770&password=woshiklde1993`,
      withCredentials: true,
    });

    let id = this.$route.params.id;

    // 请求歌单
    const res = await this.axios({
      url: "/playlist/detail?id=" + id,
      withCredentials: true,
    });

    // console.log(res);
    const resList = res.data.playlist;

    this.cover = resList.coverImgUrl;
    this.creator_cover = resList.creator.avatarUrl;
    //console.log(this.cover)
    this.playlistName = resList.name;
    this.avatarName = resList.creator.nickname;
    this.description = resList.description;
    this.playcount = (resList.playCount % 10000) + "万";
    this.subscribedCount = resList.subscribedCount;
    this.trackCount = resList.trackCount;

    let arr = resList.trackIds;
    const songsIds = arr.map((it) => it.id);

    //console.log(this.songId)
    // 请求全部歌曲详情
    this.axios({
      url: "/song/detail?ids=" + songsIds.toString(),
      withCredentials: true,
    }).then((res) => {
      // this.songs = res.data.songs;
      const list = (this.song_info.playlist = res.data.songs);
      loadList(list);
    });
  },
};
</script>
<style lang="less">
.song-list-page {
  .song-list-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;  
  }
  .song-list-nav .van-nav-bar{
    background: #bdb7b7;
  } 
  .song-list-nav .van-nav-bar .van-icon,.van-nav-bar__text{
      color:#ffffff;
  }
  .song-list-body {
    margin-top: 46px;
    padding-top: 10px;

    .list_detail {
      margin: 10px 20px;
      display: flex;
      align-items: center;
    }
    .list_detail > div:first-child {
      position: relative;
    }
    .list_cover {
      width: 150px;
      height: 150px;
      overflow: hidden;
    }
    .playcount {
      position: absolute;
      top: 0;
      right: 0;
    }
    .playcount > span {
      font-size: 10px;
      color: #ffffff;
    }
    .info {
      text-align: left;
      margin-left: 10px;
      height: 150px;
    }
    .info > p:first-child {
      font-size: 20px;
      font-weight: bolder;
      margin: 0;
    }
    .creator_info {
      display: flex;
      align-items: center;
    }
    .creator_cover {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
    }
    .info > p:last-child {
      margin: 0;
    }
    .info > p:last-child > .van-cell {
      padding: 10px 0;
    }
    .info .van-cell {
      background: transparent;
    }
    
    .info_description {
      font-size: 5px;
      width: 150px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .more_icon {
      margin: 20px 20px;
      display: flex;
      justify-content: space-around;
    }
    .viptotal {
      box-sizing: border-box;
      width: 100%;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      background-color:#dcdcdc;
    }
    .viptotal > .van-cell {
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;
      background-color: #dcdcdc;
    }
    .play_view {
      box-sizing: border-box;
      border-top-left-radius: 25px;
      border-top-right-radius: 25px;

      background-color: #ffffff;
    }
    .shoucangjia {
      display: flex;
      margin: 0 20px;
      align-items: center;
      justify-content: space-around;
    }
    .shoucangjia > p > span {
      font-size: 10px;
      color: #bfbfbf;
    }
    .playsong {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 0 20px;
    }

    .playsong > div {
      margin: 0 5px;
      display: block;
      text-align: left;
      width: 200px;
    }

    .playsong > div > p {
      font-size: 15px;
      margin: 8px 0;
    }

    .playsong > div > p:last-child {
      font-size: 10px;
      color: #9c9c9c;
    }
  }
}
</style>