<template>
  <div>
    <!-- 顶部搜索栏 -->
        <div class="songtitle-top">
          <van-search class="video-search" placeholder="猜你喜欢  我不配做你的男朋友" shape="round" background="#E4463B"/>
          <h1>取消</h1>
        </div>
    <!-- 你可能感兴趣 -->
        <div class="songtitle-you">
          <p>你可能感兴趣</p>
        </div>
    <!-- 搜索内容 -->
          <div class="songtitle-song">
          <van-cell  is-link>
            <template #title>
              <van-image
                        width="24px"
                        height="24px"
                        :src="require('../assets/icons/fenlei.png')"
                        />
              <span class="custom-title">歌手:薛之谦</span>
            </template>
          </van-cell>
          
        </div>
  </div>
</template>
<style  scoped>
.songtitle-top{
    background:#E4463B;
    display: flex;
    justify-content: center;
    align-items: center;
}
.songtitle-you p{
  font-size: 15px;
  color: #555;
  padding: 10px;
  margin-left: -250px;
}
h1{
  color: #fff;
  font-size: 15px;
}
.songtitle-song /deep/ .van-image__img{
margin-left: -115px;
margin-top: 5px;
}
.songtitle-song /deep/ .custom-title{
  color: rgb(115, 115, 185);
  font-size: 17px;
}
</style>