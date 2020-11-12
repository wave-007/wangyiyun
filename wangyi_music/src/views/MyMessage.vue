<template>
  <div>
    <!-- 导航栏开始 -->
        <div class="mymessage">
          <van-nav-bar title="消息" class="mymessage-top">
            <template #left>
              <van-icon name="arrow-left" color="#000" size="25px"/>
            </template>
            <template #right>
              <button>标为已读</button>
              <van-icon name="search" color="#000" size="25px" />
            </template>
          </van-nav-bar>
        </div>
    <!-- 标签页 -->
        <div class="message-top">
          <van-grid :column-num="2">
            <van-grid-item text="文字">
              <van-image width="100" height="100" src="../assets/icons/fensi.png" />
            </van-grid-item>
            <van-grid-item text="文字" badge="99+">
              <van-image width="100" height="100" src="../assets/icons/pinglun_4.png" />
            </van-grid-item>
            <van-grid-item text="文字" badge="99+">
              <van-image width="100" height="100" src="../assets/icons/@.png" />
            </van-grid-item>
            <van-grid-item text="文字" badge="99+">
              <van-image width="100" height="100" src="../assets/icons/tongzhi.png" />
            </van-grid-item>
          </van-grid>
        </div>
  </div>
</template>

<style scoped>
.mymessage{
  background-color: #fff;
    padding-top: 10px;
}
.mymessage /deep/ .van-nav-bar__title{
  margin-left: 55px;
}
.mymessage /deep/ button{
  background-color: #fff;
  border: 1px solid #8d8d8d;
  border-radius: 25px;
}
.mymessage /deep/ .van-ellipsis{
	color: #000 !important;
    font-size: 18px;
}
.tab /deep/ {
	color: #4e4b4b !important;
  font-size: 14px;
  margin: 10px 10px;
}
.mymessage-top{
  display: flex;
}
</style>

<script>
export default {
  data() {
    return{
      limit:[],
    }
  },
  methods:{

  },
  mounted(){
    // 
    // this.axios({
    //         url:`/msg/notices?limit=3`,
    //     }).then((res)=>{
    //         // this.keywords = res.data.data.showKeyword;
    //         console.log(res);
    //     })
  },
}
</script>
