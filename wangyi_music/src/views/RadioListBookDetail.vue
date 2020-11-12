<template>
  <div>
    <!-- 上半部分 图片背景部分开始 -->
    <div
      ref="BgImg"
      class="topPart"
      :style="{ backgroundImage: 'url(' + data.content.picUrl + ')' }"
    >
      <div class="bg">
        <!-- 导航部分开始 -->
        <div class="nav">
          <van-nav-bar
            :title="myTitle"
            left-arrow
            class="navBar"
            ref="navBar"
            :border="false"
            fixed
            @click-left="back"
            :style="{ backgroundImage: BgColor ,backgroundSize:'375px' }" 
          >
            <template #right>
              <van-image
                width="24px"
                height="24px"
                fit="contain"
                :src="require('../assets/icons/zhuanfa_2.png')"
                @click="showShare = true"
              />
              <!-- 弹出分享面板 -->
              <van-share-sheet
                v-model="showShare"
                title="立即分享给好友"
                :options="options"
                @select="onSelect"
              />
              <van-image
                width="24px"
                height="24px"
                fit="contain"
                :src="require('../assets/icons/music_right_top.png')"
                @click="bofang"
              />
            </template>
          </van-nav-bar>
        </div>
        <!-- 导航部分结束 -->
        <!-- 书名部分开始 -->
        <div class="bookPart">
          <div class="content_left">
            <h4 class="content_name">{{ data.content.name }}</h4>
            <span class="content_text" v-if="data.content.feeDesc != null">{{
              data.content.rcmdText
            }}</span>
            <span class="content_text" v-else
              >{{ data.content.subCount }} 人订阅</span
            >
          </div>
          <div class="content_right" v-if="data.content.feeDesc != null">
            <div class="price">
              购买：¥{{ (data.content.price / 100).toFixed(1) }}/期
            </div>
            <p class="price_text">最新上架</p>
          </div>
          <div class="content_right" v-else>
            <van-button round type="info" class="buy"
              ><van-icon name="star-o" color="#fff" />订阅</van-button
            >
          </div>
          <!-- 蒙一层结束 -->
        </div>
        <!-- 书名部分结束 -->
      </div>

      <!-- 上半部分 图片背景部分结束 -->
    </div>
    <!-- 下半部分详情开始 -->
    <div class="box">
      <div class="downPart">
        <!-- 详情tab开始 -->
        <van-tabs
          v-model="active"
          animated
          title-active-color="#e4463b"
          :border="true"
          sticky
          swipeable
          :offset-top="46"
        >
          <!-- *****************薛栋修改****************** -->
          <!-- **************script中所有需要传给子组件的数据前加data************** -->
          <van-tab
            v-for="(item, index) in nav.list"
            :key="index"
            :title="item.text"
          >
            <div :is="item.comp" :data="data" @change-active="changeActive"></div>
          </van-tab>
          <!-- <van-tab :title="`节目` + freeProgramLength" name="program">
            <Program :data='data'/>
            <DtDetails :data='data'/>

          </van-tab> -->
        </van-tabs>
        <!-- 详情tab结束 -->
        <!-- 下半部分详情结束 -->
      </div>
    </div>
  </div>
</template>
<script>
import Program from "../components/RadioListBookDetail/Program";
import DtDetails from "../components/RadioListBookDetail/DtDetails";
export default {
  components: {
    Program,
    DtDetails,
  },
  data() {
    return {
      nav: {
        list: [
          { text: "详情", comp: "DtDetails" },
          { text: "节目", comp: "Program" },
        ],
      },
      active: 0,
      data: {
        content: {},
        dj: {},
        loading: false,
        finished: false,
        freeProgram_d: [], //节目倒序
        freeProgram: [], //免费试听
        radioDesc: [], //电台内容简介
        freeProgramLength:0,
      },
      // freeProgramLength: 0,
      BgColor: "transparent",
      BgImg: "",
      myTitle:"",
      // 分享弹出框
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: 'QQ', icon: 'qq' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
      ],
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    zhuanfa() {
      // 暂时先这样写，后期修改
      // this.$router.push("/radioList");
    },
    bofang() {
      // 暂时先这样写，后期修改
      // this.$router.push("/fullscreenplayer");
    },
    //接收子组件传过来的值
    changeActive(data){
      this.active=data;
    },
    //分享弹出页面
    onSelect(option) {
      if(option.name=='复制链接'){
        this.$toast(option.name);
      }else{
        this.$toast('分享到'+option.name);
      }
      this.showShare = false;
    },
    //***************薛栋修改****************
    //添加监听事件
    scrollHandle(e) {
      // console.log(e)
      this.BgImg = this.$refs.BgImg;
      // console.log(this.BgImg.style.backgroundImage);
      let top = e.srcElement.scrollingElement.scrollTop; // 获取页面滚动高度
      // console.log(top)
      if (top >= 275) {
        // console.log(1)
        this.BgColor = this.BgImg.style.backgroundImage;
        this.myTitle=this.data.content.name;
      } else {
        this.BgColor = "";
        this.myTitle="";
      }
    },
  },
  mounted() {
    
    //////////////////////////////////////////
    window.addEventListener("scroll", this.scrollHandle, true); // 绑定页面的滚动事件
    /////////////////////////////////////////////
    let rid = this.$route.params.rid;
    //获取的是每一个电台的详情内容
    this.axios({
      url: `/dj/detail?rid=` + rid,
    }).then((res) => {
      // console.log(res);
      // this.content = res.data.djRadio;
      this.data.content = res.data.data;
      this.data.radioDesc = this.data.content.desc.split(/\n/);
      this.data.dj = this.data.content.dj;
      //获取节目列表
      // 第01集到最新
      this.axios({
        url: "/dj/program?rid=" + this.data.content.id + "&asc=true&limit=1000",
      }).then((result) => {
        // console.log(result);
        this.data.freeProgram = result.data.programs;
        let arr = this.data.freeProgram;
        this.data.freeProgram_d = [...arr].reverse(); //将获得的列表倒序
        this.data.freeProgramLength = result.data.count; //节目的总集数
        //*********************薛栋修改 */
        this.nav.list[1].text += this.data.freeProgramLength; //修改列表节目后的数量显示
        this.data.freeProgram.forEach((item) => {
          //获取每一集的详情
          this.axios({
            url: "/dj/program/detail?id=" + item.id,
          }).then((resu) => {
            // console.log(resu);
            item.likedCount = resu.data.program.likedCount; //点赞数量
            item.listenerCount = resu.data.program.listenerCount; //播放次数
            item.commentCount = resu.data.program.commentCount; //评论数
            item.createTime = resu.data.program.createTime; //创建时间
            let time = resu.data.program.duration; //时长
            let min = Math.floor(time / 1000 / 60);
            let second = Math.floor((time / 1000) % 60);
            item.duration = min + ":" + second;
          });
        });
      });
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollHandle, true);
  },
};
</script>
<style scoped>
.topPart {
  height: 350px;
  background-size: cover;
  background-position: center 0;
  position: relative;
}
.topPart .bg {
  height: 350px;
  background-color: rgba(0, 0, 0, 0.1);
}
.nav {
  background-color: transparent;
  padding-top: 25px;
}
.nav /deep/ .van-nav-bar__title{
  color:#fff;
}
.navBar {
  background-color: transparent;
}
.nav /deep/ .van-nav-bar .van-icon {
  color: #fff;
  font-size: 22px;
}
.nav /deep/ .van-image {
  margin-left: 18px;
}
.bookPart {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  height: 100px;
  width: 375px;
  color: #fff;
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
}
.bookPart .content_left {
  text-align: left;
}
.bookPart .content_name {
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.bookPart .content_right .price {
  width: 120px;
  height: 33px;
  border-radius: 30px;
  background-color: #e4463b;
  line-height: 33px;
  font-size: 14px;
}
.bookPart .content_text,
.bookPart .price_text {
  color: rgba(255, 255, 255, 0.7);
  margin-top: 10px;
  font-size: 14px;
}
/* 订阅 */
.bookPart .content_right .buy {
  width: 90px;
  height: 25px;
  background-color: #e4463b;
  border: none;
  line-height: 25px;
  font-size: 15px;
  margin-top: 20px;
}
.bookPart .content_right .buy .van-icon {
  margin-right: 6px;
}
/* 下半部分 */
.downPart {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
  /* position: absolute; */
  margin-top: -20px;
}
.downPart /deep/ .van-tabs__wrap {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom: 1px black;
}
</style>