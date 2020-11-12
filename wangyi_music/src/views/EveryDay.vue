<template>
  <div>
    <!-- 上半部分 图片背景部分开始 -->
    <div
      ref="BgImg"
      class="topPart"
    >
    <!-- 顶部导航开始 -->
    <div class="nav">
      <van-nav-bar
        title="每日推荐"
        left-arrow
        placeholder
        fixed
        class="navbar"
        @click-left="$router.go(-1)"
        @click-right="onClickRight"
      >
      
      <template #right>
        <van-icon name=question-o size="22" color="#000" />
      </template>
      </van-nav-bar>
    </div>
    </div>

    <!-- 下半部分 -->
    <div class="all">
      <div class="box">
        <!-- 播放全部 导航 -->
        <van-nav-bar>
        <template #right>
          <van-icon name="bars" size="18" color="#000" /><span @click="playall">多选</span>
        </template>
        <template #left>
          <van-icon name="play-circle-o" size="22" color="#000" />播放全部
        </template>
        </van-nav-bar>
      </div>
      <!-- 歌曲内容 -->
      <div class="content">
        <van-row v-for="(item,index) of song" :key=index>
          <van-col span="4">
            <van-image width="50px" height="50px" :src="item.al.picUrl" />
          </van-col>
          <van-col span="16" >
            <span>{{item.name}}</span>
            <span v-if="item.alia[0] !=null">({{item.alia[0]}})</span>
              <div v-for="(item1,index1) in after" :key="index1" class="small">
                <span v-if="item1.songId==item.id" >{{item1.reason}}</span>
              </div>
            <p>{{item.ar[0].name}}-{{item.al.name}}</p>
          </van-col>
          <van-col span="2">
            <van-icon name="play-circle-o" size="22" v-if="item.mv !=0" ></van-icon>
          </van-col>
          <van-col span="2">
            <van-icon name="ellipsis" />
          </van-col>
        </van-row>
      </div>
    </div>

  </div>
</template>

<style scoped>
  .topPart{
    background-image: url("http://p4.music.126.net/haSAt06P6NuqKlj2DuCLZg==/109951165325622199.jpg");
    height: 250px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
  }
  .box /deep/ .van-nav-bar{
    border-radius: 30px;
  }
  .van-col{
    margin-bottom: 10px;
  }
  .nav /deep/ .van-icon-arrow-left{
    color: #000;
    font-size: 22px;
  }
  .content /deep/ .van-image__img{
    border-radius: 5px;
    margin: 0 5px;
  }
  .content /deep/ span:nth-child(1){
    font-size: 17px;
    float: left;
    margin-left: 5px;
     
    white-space: nowrap;
  }
  .content /deep/ span:nth-child(2){
    font-size: 15px;
    color: #8e8e8e;
    display: table-caption; 
	  white-space: nowrap;
	  width: 100px; 
	  overflow: hidden; 
	  text-overflow:ellipsis;

  }
  .content /deep/ p{
    font-size: 13px;
    color: #8e8e8e;
    text-align: -webkit-left;
    padding-top: 5px;
    margin-left: 5px;
    display: table-caption; 
	  white-space: nowrap;
	  width: 250px; 
	  overflow: hidden; 
	  text-overflow:ellipsis;
  }
  .content /deep/ .van-icon{
    color: #8e8e8e;
    margin-top: 25px;
  }
  .content /deep/ .van-col--2:last-child .van-icon{
    transform: rotate(90deg);
  }

  .small span{
    color: #E94C57;
    background-color: #FFE2E2;
    font-size: 12px !important;
  }
</style>

<script>
export default {
  data(){
    return{
      song:[],
      after:[],
      songsID:[],
    }
  },

  methods:{
    onClickLeft() {
      this.$toast('返回');
    },
    onClickRight() {
      this.$toast('敬请期待');
    },
    playall() {
      this.$router.push("/playall")
    }
  },

  mounted(){
    //获取账号密码
    let uphone = localStorage.getItem("phone");
    let upassword = localStorage.getItem("password");
    // 获取每日推荐数据
    this.axios({
      url: `/login/cellphone?phone=16637736466&password=cy200010`,
      withCredentials: true,
    }).then((res) => {
      this.axios({
        url: `/recommend/songs`,
        withCredentials: true,
      }).then((res) => {
        this.song = res.data.data.dailySongs;
        // console.log(this.song);
        this.after = res.data.data.recommendReasons;
        // console.log(this.after);
        this.songsID = res.data.data.dailySongs.id;
        // console.log(this.songsID);
        // console.log(res);
      });
    });
  },

}
</script>