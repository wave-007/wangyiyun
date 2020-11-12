<template>
  <div>
    <!-- 顶部导航 -->
    <div>
      <van-notice-bar  left-icon="arrow-left" color="#fff" background="red" @click="$router.go(-1)">
          <div class="song_info">
              <p>{{song_info.song_name}}</p>
              <p>
                {{song_info.song_singer}}
              </p>
          </div>
          <template #right-icon>
              <van-icon class="iconfont" class-prefix="icon" name="share" size="20" color="#fff"/>
          </template>
      </van-notice-bar>
      <!-- 中间封面 -->
      <div>
          <div class="zheng"><img src="../assets/zheng.png" alt="" width="100%"></div>
          <div class="pian">
            <img :src="song_info.song_cover" alt="" width="100%">
            <span class="mask"></span>
          </div>
          
      </div>
      <!--小功能 -->
      <!-- 点击时间 -->
      <div class="smallfun">
        <van-icon class="iconfont" class-prefix="icon" name="xihuan" size="25"/>
        <van-icon class="iconfont" class-prefix="icon" name="download1" size="25"/>
        <van-icon class="iconfont" class-prefix="icon" name="share" size="25"/>
        <van-icon class="iconfont" class-prefix="icon" name="comment" size="25"/>
        <van-icon class="iconfont" class-prefix="icon" name="gengduo" size="25"/>
      </div>
      <div class="progress_all">
          <p>1</p>
          <div>
          <van-progress :percentage="50" class="progress"/>
          </div>
          <p>2</p>
      </div>
      <div class="playfun">
        <van-icon class="iconfont" class-prefix="icon" name="xunhuan" size="30"/>
        <van-icon class="iconfont" class-prefix="icon" name="shangyishoushangyige" size="30"/>
        <van-icon class="iconfont" class-prefix="icon" name="iconset0481" size="50"/>
        <van-icon class="iconfont" class-prefix="icon" name="xiayigexiayishou" size="30"/>
        <van-icon class="iconfont" class-prefix="icon" name="bofangliebiao" size="30"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      song_info:{
        song_name:"",
        song_singer:"",
        song_cover:""
      }
    }
  },
  mounted() {
    let id = this.$route.params.songId;
    // console.log(id);
    this.axios({
      url: "/song/detail?ids=" +id,
      withCredentials: true,
    }).then(res =>{
        // console.log(res);
        this.song_info.song_name = res.data.songs[0].name;
        this.song_info.song_singer = res.data.songs[0].ar[0].name;
        this.song_info.song_cover = res.data.songs[0].al.picUrl;
    })
  },
}
</script>
<style scoped>
.smallfun .iconfont{
    margin: 0 20px;
}
.playfun .iconfont{
    margin: 0 15px;
}
.progress_all{
    display: flex;
    justify-content: center;
    margin: 20px 0;
}
.progress{
    width: 200px;
    margin: 0 10px;
    position: relative;
    bottom: -22px;
}
.zheng{
  position: relative;
  width: 100px;
  height: 150px;
  top: 5%;
  left:50%; 
  overflow: hidden;
}
.pian{
  width: 140px;
  height: 140px;
  margin: 0 auto 20px;
  position: relative;
  
}
.mask{
  display: block;
  width: 250px;
  height: 250px;
  background: url(.././assets/singlecover.png) no-repeat;
  position: absolute;
  top: -70px;
  left: -35px;
}
.pian>img{
  position: relative;
  top: -35px;
  border-radius: 10px;
}
.song_info>p{
  margin: 0;
}
.smallfun{
  margin-top: 100px;
}
.playfun{
  display: flex;
  justify-content: space-around;
  align-items: center;
}

</style>