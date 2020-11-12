<template>
  <div class="account">
    <!-- 顶部会员中心 -->
      <div class="account-top">
        <p class="account-top-1">开通黑胶VIP<button>会员中心</button></p>
        <p class="account-top-2">加入黑胶VIP, 立享超17项专属特权</p>
        <p class="account-top-3">黑胶VIP仅5元, 享超17项专属特权</p>
      </div>
    <!-- 布局 -->
    <div class="account-flex">
      <div class="account-flex-1">  
        <p><img src="../../assets/icons/fensi.png" alt="">云贝中心</p>
      </div>
      <div class="account-flex-1">
        <p><img src="../../assets/icons/fensi.png" alt="">消息中心</p>
      </div>
    </div>
    <!-- 创作者中心 -->
    <div class="account-create">
      <van-cell title="创作者中心" icon="fire">
        <template #right-icon>
        <van-icon name="arrow"  />
        </template>
      </van-cell>
    </div>
    <!-- 内容 -->
    <div class="account-content" >
      <van-cell-group title="音乐服务">
        <van-cell title="听歌识曲" icon="volume-o"  :border="false"/>
        <van-cell title="云村有票" icon="bookmark-o" :border="false"/>
        <van-cell title="商城" icon="cart-o" :border="false"/>
        <van-cell title="游戏专区" icon="hot-o" :border="false"/>
        <van-cell title="口袋彩铃" icon="gift-o" :border="false"/>
      </van-cell-group>
      <van-cell-group title="其他">
        <van-cell title="个性装扮" icon="contact" :border="false"/>
        <van-cell title="定时关闭" icon="underway-o" :border="false"/>
        <van-cell title="扫一扫" icon="scan" :border="false"/>
        <van-cell title="边听边存" icon="service-o" :border="false"/>
        <van-cell title="在线听歌免流量" icon="tv-o" :border="false"/>
        <van-cell title="音乐黑名单" icon="close" :border="false"/>
        <van-cell title="青少年模式" icon="passed" :border="false"/>
        <van-cell title="音乐闹钟" icon="underway-o" :border="false"/>
      </van-cell-group>
      <van-cell-group title=" ">
        <van-cell title="我的订单" icon="description" :border="false"/>
        <van-cell title="优惠券" icon="refund-o" :border="false"/>
        <van-cell title="帮助与反馈" icon="question-o" :border="false"/>
        <van-cell title="关于" icon="info-o" :border="false"/>
      </van-cell-group>
    </div>

    <!-- 底部导航栏 -->
    <div class="account-down">
      <van-row type="flex" justify="space-between">
        <van-col span="12"><van-icon name="eye-o" />夜间模式</van-col>
        <van-col span="6"><van-icon name="setting-o" />设置</van-col>
        <van-col span="6">
          <van-icon name="circle" />
          <span @click="onclick">退出</span>
        </van-col>
      </van-row>
      
    </div>


  </div>
</template>

<style scoped>
.account{
  background-color: #f7f7f7;
  width: 100%;
}
.account-top{
  border-radius: 20px;
  background-color: #000;
  color: #fff;
  height: 100px;
  /* width: 360px; */
  width: 90%;
  margin-left: 7px;
  background-image: linear-gradient(-90deg, #b8b8b8 0%, #8a8a8a 100%);
}
.account-top /deep/ button{
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 25px;
  font-size: 13px;
  font-weight: lighter;
  margin-right: -50px;
}
.account-top-1{
  font-weight: bold;
  font-size: 16px;
  margin-right: 135px;
  padding-top: 15px;
}
.account-top-2{
  color: #dbdbdb;
  font-size: 12px;
  margin-right: 60px;
  margin-top: -10px;
  margin-bottom: 25px;
}
.account-top-3{
  color: #dbdbdb;
  font-size: 12px;
  margin-right: 60px;
}
.van-cell-group__title{
  font-size: 12px;
  display: flex;
}
.account-flex{
  display :flex;
  justify-content: center;
}
.account-flex-1{
  width: 200px;
  width: 90%;
  /* height: 50px; */
}
.account-flex-1 /deep/ img{
  /* width: 25px; */
  /* height: 25px; */
  margin-right: 20px;
}
.account-create{
  margin: 10px 10px;
  width: 90%;
}
.account-content{
  margin: 10px 10px;
  width: 90%;
  padding-bottom: 20px;
}
.account-content /deep/ .van-cell__title{
  text-align: left;
}

.account-create /deep/ .van-cell__title{
  text-align: left;
  font-size: 15px;
}

.account-down{
 position:fixed;
 width: 100%;
 height: 35px;
}
.account-down /deep/ .van-col{
  margin-right: 20px;
  font-size: 15px;
  margin-top: 5px;
}
.account-down /deep/ .van-icon{
  margin-right: 5px;
}
.account-down /deep/ span{
  margin-top: 10px;
}
</style>

<script>
export default {
  data(){
    return{
      
    }
  },
  methods:{
    onclick(){
      this.$router.push("/")
      // localStorage.removeItem('phone','password')
      localStorage.clear()
    }
  }
}
</script>