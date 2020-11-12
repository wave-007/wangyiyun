<template>
  <div>
    <!-- 头部导航栏 -->
    <div class="nav">
      <van-nav-bar
        left-text=""
        left-arrow
        placeholder
        fixed
        class="navbar"
        @click-left="$router.go(-1)"
      >
      <template #right>
        <!-- <van-button type="primary" @click="checkAll">全选</van-button> -->
        <van-button type="info" @click="toggleAll">全选</van-button>
      </template>
      </van-nav-bar>
    </div>

    <!-- 歌曲 -->
    <div>
      <div class="content">
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <van-checkbox :name="index"  v-for="(item,index) of song" :key=index>
            <span>{{item.name}}</span>
            <div v-for="(item1,index1) in after" :key="index1" class="small">   
              <span v-if="item1.songId==item.id" >{{item1.reason}}</span>
            </div>
            <p>{{item.ar[0].name}}-{{item.al.name}}</p>
          </van-checkbox>    
        </van-checkbox-group>
      </div>
    </div>
    <!-- 底部功能栏 -->
    <div class="bottom">
      
      <van-row type="flex" justify="space-around">
        <van-col span="6">
          <van-icon name="play-circle-o" />
          <p>播放</p>
        </van-col>
        <van-col span="6">
          <van-icon name="add-o" />
          <p>加入歌单</p>
        </van-col>
        <van-col span="6">
          <van-icon name="down" />
          <p>下载</p>
        </van-col>
        <van-col span="6">
          <van-icon name="close" />
          <p>删除下载</p>
        </van-col>
      </van-row>
      
    </div>
    


  </div>

</template>

<style scoped>
  .van-nav-bar--fixed{
    height: 50px;
  }
  .van-checkbox{
    margin-left: 10px;
  }
  .nav /deep/ .van-nav-bar__text{
    color: #000;
    font-size: 18px;
    margin-left: 10px;
  }
  .nav /deep/ .van-icon-arrow-left{
    color: #000;
    font-size: 20px;
  }
  .nav /deep/ .van-button{
    background-color: transparent;
    color: #000;
    border: 0px solid;
    font-size: 15px;
  }
  .content /deep/ span{
    font-size: 17px;
    float: left;
    margin-left: 5px;
    color: #000;
  }
  .content /deep/ p{
    font-size: 13px;
    color: #8e8e8e;
    text-align-last: left;
    margin-left: 5px;
  }
  .small{
    width: 100%;
    float: right;
  }
  .small span{
    color: #E94C57 !important;
    background-color: #FFE2E2;
    font-size: 12px !important;
  }
  .bottom{
    border: 1px solid #f3efef;
    
  }
  .bottom .van-icon{
    font-size: 23px;
  }
  .bottom p{
    color: #8e8e8e;
    font-size: 14px;
    margin: 5px;
  }
</style>

<script>
export default {
  data(){
    return{
      song:[],
      after:[],
      result: [],
    }
  },

  methods:{
    //返回
    onClickLeft() {
      this.$router.back();
    },
    //全选和取消
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
  },
  
  mounted(){
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
        
        // console.log(res);
      });
    });
  },


}
</script>