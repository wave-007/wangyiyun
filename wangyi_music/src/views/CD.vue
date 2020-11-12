<template>
  <div>
    <!-- 导航 -->
    <div class="nav">
      <van-nav-bar @click-left="onClickLeft" fixed :border="false">
        <template #left>
          <van-icon name="down" />
          <span>数字专辑</span>
        </template>
      </van-nav-bar>
    </div>
    <!-- 轮播 -->
    <div class="banner">
      <van-swipe :autoplay="5000" indicator-color="red">
        <van-swipe-item
          v-for="(item, index) in newData.slice(0, 6)"
          :key="index"
          @click="handleToDetail(item.albumId)"
        >
          <img v-lazy="item.coverUrl" width="100%" height="140px" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 快捷入口 -->
    <div class="quick_entry">
      <div class="quick_entry_box">
        <router-link to="/cdtop">
          <van-icon class="quick_entry_icon" name="bar-chart-o" size="24" />
          <div class="quick_entry_title">畅销榜</div>
        </router-link>
      </div>
      <div class="quick_entry_box">
        <router-link to="/cdstyle">
          <van-icon class="quick_entry_icon" name="apps-o" size="24" />
          <div class="quick_entry_title">语种风格馆</div>
        </router-link>
      </div>
      <div class="quick_entry_box">
         <router-link to="/cdbuy">
        <van-icon class="quick_entry_icon" name="shopping-cart-o" size="24" />
        <div class="quick_entry_title">已购</div>
         </router-link>
      </div>
    </div>
    <!-- 最新上架 -->
    <div class="new mt20">
      <div class="cell">
        <van-cell to="/cdstyle" :border="false">
          <template #title>
            <span>最新上架</span>
            <van-icon name="arrow" size="20px" />
          </template>
        </van-cell>
      </div>
      <van-grid :column-num="3" :border="false">
        <van-grid-item
          v-for="(item, index) in newData.slice(0, 6)"
          :key="index"
          :to="`/cddetail/${item.albumId}`"
        >
          <van-image :src="item.coverUrl" lazy-load alt="缺省图" />
          <p>{{ item.albumName }}</p>
          <p>{{ item.artistName }}</p>
          <p>￥{{ item.price }}</p>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 数字专辑榜and数字单曲榜 -->
    <div
      class="album mt20"
      v-for="(item, index) in albumList"
      :key="index + '1'"
    >
      <div class="cell">
        <van-cell to="/cdtop" :border="false">
          <template #title>
            <span>{{ item.title }}</span>
            <van-icon name="arrow" size="20px" />
          </template>
        </van-cell>
      </div>
      <van-tabs :v-model=index >
        <van-tab
          :title="item.title"
          v-for="(item, index) in item.data"
          :key="index">
          <!-- 日榜周榜总榜内容 -->
          <van-swipe :loop="false" :width="350">
            <van-swipe-item>
              <div class="content">
                <van-row
                  type="flex"
                  v-for="(item, index) in item.data.slice(0, 4)"
                  :key="index"
                  @click="handleToDetail(item.albumId)">
                  <van-col span="3">
                    <van-image :src="item.coverUrl" lazy-load alt="缺省图" />
                  </van-col>
                  <van-col span="2">
                    <p>{{ index + 1 }}</p>
                  </van-col>
                  <van-col span="14">
                    <p>{{ item.albumName }}</p>
                    <p>{{ item.artistName }}</p>
                  </van-col>
                  <van-col span="5">
                    <button  >支持</button>
                    <!-- <button  @click="show = true" @click.stop>支持</button> -->
                                        <!-- <van-overlay :show="show" @click="show = false" /> -->
                  </van-col>
                </van-row>
              </div>
            </van-swipe-item>
            <van-swipe-item>
              <div class="content">
                <van-row
                  type="flex"
                  v-for="(item, index) in item.data.slice(4, 8)"
                  :key="index"
                  @click="handleToDetail(item.albumId)"
                >
                  <van-col span="3">
                    <van-image :src="item.coverUrl" lazy-load alt="缺省图" />
                  </van-col>
                  <van-col span="2">
                    <p>{{ index + 5 }}</p>
                  </van-col>
                  <van-col span="14">
                    <p>{{ item.albumName }}</p>
                    <p>{{ item.artistName }}</p>
                  </van-col>
                  <van-col span="5">
                    <button>支持</button>
                  </van-col>
                </van-row>
              </div>
            </van-swipe-item>
            <van-swipe-item>
              <div class="content">
                <van-row
                  type="flex"
                  v-for="(item, index) in item.data.slice(8, 12)"
                  :key="index"
                  @click="handleToDetail(item.albumId)"
                >
                  <van-col span="3">
                    <van-image :src="item.coverUrl" lazy-load alt="缺省图" />
                  </van-col>
                  <van-col span="2">
                    <p>{{ index + 9 }}</p>
                  </van-col>
                  <van-col span="14">
                    <p>{{ item.albumName }}</p>
                    <p>{{ item.artistName }}</p>
                  </van-col>
                  <van-col span="5">
                    <button>支持</button>
                  </van-col>
                </van-row>
              </div>
            </van-swipe-item>
          </van-swipe>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 获取华语，欧美，日韩三个分类 -->
    <div class="new mt20" v-for="(item, index) in list" :key="index">
      <div class="cell">
        <van-cell :border="false" :value="item.title" />
      </div>
      <van-grid :column-num="3" :border="false">
        <van-grid-item
          v-for="(item, index) in item.data.slice(0, 3)"
          :key="index"
          :to="`/cddetail/${item.albumId}`"
        >
          <van-image :src="item.coverUrl" lazy-load alt="缺省图" />
          <p>{{ item.albumName }}</p>
          <p>{{ item.artistName }}</p>
          <p>￥{{ item.price }}</p>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 遮罩层 -->
    <!-- <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
             <div class="block" />
        </div>
    </van-overlay> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      // show: false,
      newData: [],
      albumList: [],
      albumType: [
        { name: "数字专辑榜", type: "0" },
        { name: "数字单曲榜", type: "1" },
      ],
      type: [
        { name: "日榜", type: "daily" },
        { name: "周榜", type: "week" },
        { name: "总榜", type: "total" },
      ],

      list: [],
      cd: [
        { name: "华语新生力量", area: "Z_H" },
        { name: "欧美品质大碟", area: "E_A" },
        { name: "日韩风向牌", area: "KR" },
      ],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    handleToDetail(id) {
      this.$router.push({
        path: `/cddetail/${id}`,
      });
    },
  },
  mounted() {
    //获取数字专辑最近上架
    this.axios({
      url: `/album/list?limit=6`,
    }).then((res) => {
      this.newData = res.data.products;
      // console.log(this.newData);
    });

    //获取榜单
    this.albumType.forEach((i) => {
      let arr = [];
      this.type.forEach((item) => {
        this.axios({
          url: `/album/songsaleboard?type=${item.type}&albumType=${i.type}`,
        }).then((res) => {
          this.datas = res.data.products;
          let obj = {};
          obj.title = item.name;
          obj.data = this.datas;
          arr.push(obj);
        });
      });
      let obj = {};
      obj.title = i.name;
      obj.data = arr;
      this.albumList.push(obj);
    });
    // console.log(this.albumList);

    //获取华语，欧美，日韩三个分类
    this.cd.forEach((item) => {
      this.axios({
        url: `/album/list/style?area=${item.area}&limit=3`,
      }).then((res) => {
        this.datas = res.data.albumProducts;
        let obj = {};
        obj.title = item.name;
        obj.data = this.datas;
        this.list.push(obj);
      });
    });
    // console.log(this.list);
  },
};
</script>
<style scoped>
/* .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

.block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  } */
.mt20 {
  margin-top: 20px;
}
/* 导航 */
.nav /deep/ .van-nav-bar .van-icon {
  color: #000;
  transform: rotate(90deg);
  font-size: 22px;
  margin-right: 20px;
}
.nav /deep/ .van-nav-bar__left {
  font-size: 16px;
  padding: 0 10px;
}
/* 轮播 */
.banner {
  padding: 5px 10px;
  margin-top: 46px;
}
.banner /deep/ img {
  border-radius: 5px;
}
/* 快捷入口 */
.quick_entry {
  border-bottom: 1px solid #c0c0c0;
}
.quick_entry_box {
  display: inline-block;
  margin: 15px 37px;
}
.quick_entry_title {
  margin-top: 5px;
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
/* 所有的cell */
.cell /deep/ .van-cell {
  padding-left: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
}
.cell /deep/ .van-icon {
  vertical-align: sub;
  padding-left: 8px;
}
/* 最新上架 */
.new /deep/ .van-grid-item__content {
  text-align: left;
  padding: 7px 10px;
  display: block;
}
.new /deep/ .van-image__img {
  border-radius: 5px;
  width: 105px;
  height: 105px;
}
.new /deep/ p {
  overflow: hidden;
  width: 85px;
  height: 20px;
  line-height: 20px;
  font-size: 13px;
  margin: 0;
}
.new /deep/ p:nth-child(3) {
  font-size: 10px;
  color: #c0c0c0;
}
.new /deep/ p:last-child {
  color: #e4463e;
  font-size: 12px;
}
/* 数字专辑榜 */
.album {
  position: relative;
  margin-left: 10px;
}
.album /deep/ .cell {
  position: absolute;
  width: 50%;
  margin-bottom: -45px;
  z-index: 1;
}
.album /deep/ .van-cell {
  padding-left: 0;
}
.album /deep/ .van-swipe__indicator {
  width: 0;
  height: 0;
}
.album /deep/ .van-tabs__wrap {
  width: 50%;
  margin-left: 50%;
}
.album /deep/ .van-tab--active {
  color: #e4463e;
  font-weight: bolder;
}
.album /deep/ .van-tabs__line {
  background-color: transparent;
}
.album /deep/ .van-row--flex {
  border-bottom: 1px solid #c0c0c0;
  align-items: center;
  padding: 3px 0px;
}
.album /deep/ .van-row--flex:first-child {
  border-top: 1px solid #c0c0c0;
}
.album /deep/ p {
  margin: 5px 0;
}
.album /deep/ button {
  border-radius: 30px;
  border: 1px solid #e4463e;
  padding: 4px 12px;
  color: #e4463e;
  font-size: 13px;
  background-color: #fff;
  z-index: 5;
}
.album /deep/ .van-image__img {
  display: inline-block;
  border-radius: 5px;
  width: 43px;
  height: 43px;
}
.album /deep/ .van-col--2 {
  font-size: 12px;
  font-weight: bolder;
}
.album /deep/ .van-col--14 {
  font-size: 12px;
  text-align: left;
}
.album /deep/ .van-col--14 p:nth-child(2) {
  font-size: 10px;
  color: #c0c0c0;
}
</style>
