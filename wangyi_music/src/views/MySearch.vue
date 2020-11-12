<template>
  <div class="home-search">
    <div class="_header">
      <div
        class="_header-control"
        :class="{ '_header-control-focus': isActive }"
      >
        <div class="_header-control-input">
          <van-icon name="search" />
          <input
            type="text"
            :placeholder="search.dftxt"
            ref="searchinput"
            v-model="search.key"
            @keyup.enter="doSearch"
            @focus="focusflag = true"
            @mouseleave="focusflag = false"
          />
        </div>
        <van-icon class="iconfont quick_entry_icon"
              class-prefix="icon" name="zhuye" @click="$router.go(-1)"></van-icon>
      </div>
      <div
        class="_header-banner"
        :class="{ '_header-banner-focus': isActive }"
      ></div>
    </div>
    <div class="_contain" :class="{ '_contain-focus': isActive }">
      <div class="_contain-unsearch" v-show="!hasKey">
        <!-- <div class="_title">
          <span>历史记录</span>
          <i class="van-icon van-icon-delete"></i>
        </div>
        <ul class="_history">
          <li>林俊杰</li>
          <li>林俊杰</li>
          <li>林俊杰</li>
        </ul>-->
        <div class="_title">热搜榜</div>
        <ul class="_hot">
          <li
            v-for="(item, index) in search.hot"
            :class="{ _info: index + 1 < 4 }"
            :key="index"
            @click="search.key = item.searchWord"
          >
            <span>{{ index + 1 }}</span>
            <div>
              <a class="text-truncate">{{ item.searchWord }}</a>
              <p class="text-truncate">{{ item.content }}</p>
            </div>
          </li>
        </ul>
      </div>
      <van-tabs
        v-model="nav.active"
        class="_contain-search"
        swipeable
        animated
        background="rgba(0,0,0,0)"
        v-if="hasKey"
      >
        <van-tab
          v-for="(item, index) in nav.list"
          :key="index"
          :title="item.text"
        >
          <HsMix :navHanlder="changeNavActive" :keyword="search.key" />
          <!-- <div :is="item.comp" :navHanlder="changeNavActive" :keyword="search.key"></div> -->
        </van-tab>
      </van-tabs>
    </div>
    <MiniPlayer v-if="song_info.id"/>
  </div>
</template>

<script>
// import { dfSearchTxt, tinyHotSearch, fullHotSearch } from "../api/else";

import HsMix from "../components/MySearch/HsMix";
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
  name: "homesearch",
  components: {
    HsMix,
  },
  data() {
    return {
      focusflag: false,
      nav: {
        list: [{ text: "综合", comp: "HsMix" }],
        active: 0,
      },
      search: {
        key: "",
        oldkey: "",
        dftxt: "",
        hot: [],
      },
      song_info: current || { playlist:[] },
    };
  },
  computed: {
    allowedSearch() {
      let { key, oldkey, dftxt } = this.search;
      return key != oldkey && key != "";
    },
    hasKey() {
      return this.search.key !== "";
    },
    isActive() {
      return this.focusflag || this.search.key !== "";
    },
  },
  mounted() {
    this.mainRequest();
  },
  methods: {
    mainRequest() {
      this.dfSearchTxt().then((res) => {
        this.search.dftxt = res.data.data.realkeyword;
      });
      this.fullHotSearch().then((res) => {
        this.search.hot = res.data.data;
      });
    },
    //=======开始搜索===========
    doSearch() {
      let { dftxt, key } = this.search;
      if (dftxt != "" && key === "") {
        this.search.key = dftxt;
      } else if (!this.allowedSearch) {
        return;
      }
      this.nav.active = 0;
      this.$refs.searchinput.blur();
      this.focusflag = false;
    },
    changeNavActive(key) {
      this.nav.active = key;
    },
    //======默认====
    dfSearchTxt() {
      return this.axios(`/search/default`);
    },
    fullHotSearch() {
      return this.axios(`/search/hot/detail`);
    },
  },
};
</script>

<style lang="less" scoped>
.home-search {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 800;
  overflow: hidden;

  ._header {
    position: relative;
    width: 100%;
    height: 160px;

    ._header-control {
      position: relative;
      padding-left: 20px;
      display: grid;
      grid-template-columns: 1fr 80px;
      height: 38px;
      z-index: 3;
      transition: all 0.3s;
      transform: translateY(24px);

      &._header-control-focus {
        transform: translateY(16px);
      }

      ._header-control-input {
        display: grid;
        grid-template-columns: 40px 1fr;
        border-radius: 12px;
        background: #fff;
        align-items: center;
        justify-items: center;

        i {
          font-size: 1.125rem;
          color: #717171;
        }

        input[type="text"] {
          box-sizing: border-box;
          padding: 10px;
          padding-left: 0;
          width: 100%;
          height: 100%;
          background: none;
          border: none;
          font-size: 0.875rem;
        }
      }

      & > i {
        align-self: center;
        justify-self: center;
        font-size: 1.875rem;
        color: #fff;
      }
    }

    ._header-banner {
      position: absolute;
      top: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background: url(../assets/img/search-bg.jpg) no-repeat center/cover;
      transform: scale(1);
      transition: all 0.3s;

      &._header-banner-focus {
        transform: scale(1.2);
      }
    }
  }

  ._contain {
    position: absolute;
    top: 0;
    box-sizing: border-box;
    padding-bottom: 50px;
    width: 100%;
    height: calc(100vh - 120px);
    border-radius: 24px 24px 0 0;
    background: #fff;
    z-index: 3;
    overflow: hidden;
    transition: all 0.3s;
    transform: translateY(120px);

    &._contain-focus {
      transform: translateY(70px);
      height: calc(100vh - 50px);
    }

    ._contain-unsearch {
      width: 100%;
      height: 100%;
      overflow-y: scroll;

      ._title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 16px;
        font-weight: 600;
        font-size: 15px;

        i {
          font-size: 22px;
          color: #ddd;
        }
      }

      ._hot {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        margin-bottom: 100px;

        li {
          width: 100%;
          padding: 0 16px;
          margin: 10px 0;
          box-sizing: border-box;
          height: 40px;
          display: grid;
          grid-template-columns: 28px 1fr;
          &._info {
            span {
              color: crimson;
            }
          }
          &:active {
            background: rgba(0, 0, 0, 0.1);
          }

          span {
            align-self: center;
            color: #777;
          }

          div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 100%;
            height: 100%;
            overflow: hidden;

            a {
              font-size: 15px;
            }

            p {
              font-size: 11px;
              color: #777;
            }
          }
        }
      }

      ._history {
        margin: 0 16px;
        margin-bottom: 26px;

        li {
          display: inline-flex;
          margin-right: 8px;
          padding: 4px 10px;
          font-size: 12px;
          background: #eee;
          border-radius: 14px;
        }
      }
    }

    ._contain-search {
      width: 100%;
      height: 100%;
      overflow: hidden;

      & /deep/ .van-tabs__wrap {
        background: #fff;
        z-index: 33;
      }

      & /deep/.van-tabs__content {
        width: 100%;
        height: 100%;
        .van-tab__pane {
          position: absolute;
          height: 100%;
          overflow: hidden;
        }
      }
    }
  }
}
.popup > p,
ul {
  margin: 0px;
}
.miniplay{
  z-index: 10;
}
</style>
