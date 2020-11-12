<template>
  <div class="quick_entry" ref="scrollBox" id="fileDownloadedBox">
    <Scroll scrollX momentum>
      <div class="quick_entry_icon_box">
        <div class="icon_box">
          <!-- <div class="quick_entry_icon van-icon van-icon-award "></div> -->
          <router-link to="/everyday">
            <van-icon
              class="iconfont quick_entry_icon"
              class-prefix="icon"
              name="rili"
              size="20"
            ></van-icon>
            <div class="queci_entry_title">每日推荐</div>
          </router-link>
        </div>
        <div class="icon_box">
          <!-- <div class="quick_entry_icon van-icon van-icon-manager"></div> -->
          <van-icon
            class="iconfont quick_entry_icon"
            class-prefix="icon"
            name="fm"
            size="20"
          ></van-icon>
          <div class="queci_entry_title">私人FM</div>
        </div>
        <div class="icon_box">
          <!-- <div class="quick_entry_icon van-icon van-icon-umbrella-circle"></div> -->
          <router-link to="/musicSquare">
          <van-icon
            class="iconfont quick_entry_icon"
            class-prefix="icon"
            name="gedan"
            size="20"
          ></van-icon>
          <div class="queci_entry_title">歌单</div>
          </router-link>
        </div>
        <div class="icon_box">
          <router-link to="/ranklist">
            <!-- <div class="quick_entry_icon van-icon iconfont" class-prefix="icon" name="paixingbang"></div> -->
            <van-icon
              class="iconfont quick_entry_icon"
              class-prefix="icon"
              name="paixingbang"
              size="20"
            ></van-icon>
            <div class="queci_entry_title">排行榜</div>
          </router-link>
        </div>
        <div class="icon_box">
          <!-- <div class="quick_entry_icon van-icon van-icon-live"></div> -->
          <van-icon
            class="iconfont quick_entry_icon"
            class-prefix="icon"
            name="live"
            size="20"
          ></van-icon>
          <div class="queci_entry_title">直播</div>
        </div>
        <div class="icon_box">
          <router-link to="/radioList">
            <!-- <div class="quick_entry_icon van-icon van-icon-manager"></div> -->
            <van-icon
              class="iconfont quick_entry_icon"
              class-prefix="icon"
              name="diantai"
              size="20"
            ></van-icon>
            <div class="queci_entry_title">电台</div>
          </router-link>
        </div>
        <div class="icon_box">
          <router-link to="/cd">
          <!-- <div class="quick_entry_icon van-icon van-icon-manager"></div> -->
          <van-icon
            class="iconfont quick_entry_icon"
            class-prefix="icon"
            name="shuzizhuanjibiaoshi"
            size="20"
          ></van-icon>
          <div class="queci_entry_title">数字专辑</div>
          </router-link>
        </div>
      </div>
      <!-- <van-grid :border="false" class="quick_entry_box" column-num="4">
        <van-grid-item icon="manager" text="私人FM" />
        <van-grid-item icon="award" text="每日推荐" />
        <van-grid-item icon="umbrella-circle" text="歌单" />
        <van-grid-item icon="bar-chart-o" text="排行榜" />
        <van-grid-item icon="bar-chart-o" text="排行榜" />
        <van-grid-item icon="bar-chart-o" text="排行榜" />
      </van-grid> -->
    </Scroll>
  </div>
</template>

<style scoped>
.icon_box {
  display: inline-block;
  margin: 15px 15px;
  /* display: flex; */
  /* justify-content: center; */
  /* align-content: center; */
}
.queci_entry_title {
  margin-top: 30px;
  font-size: 12px;
  color: #2c3e50;
}
.quick_entry_icon {
  padding: 10px 11px;
  background-color: #e4463e;
  border-radius: 50%;
  color: #fff;
  font-size: 24px;
  margin-bottom: 10px;
}
</style>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.axios({
      url: "/homepage/block/page",
      withCredentials: true,
    }).then((res) => {
      // console.log(res)
    });
  },
};
</script>