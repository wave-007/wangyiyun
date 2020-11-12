<template>
    <div>
         <!-- 导航 -->
        <div class="nav">
            <van-nav-bar @click-left="onClickLeft" fixed :border="false">
                <template #left>
                    <van-icon name="down" />
                    <span>我的数字专辑</span>
                </template>
            </van-nav-bar>
        </div>
        <!-- 已购专辑 -->
        <div class="buy">
            <van-grid :column-num="2" :border="false">
                <van-grid-item v-for="(album,index) in albums" :key="index">
                    <van-image :src="album.coverUrl" lazy-load alt="缺省图" />
                    <p>{{ album.albumName }}</p>
                    <p>{{ album.artistName }}</p>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    computed:{
        ...mapState([
            'albums',
        ]),
    },
    methods: {
        onClickLeft() {
            this.$router.push("/cd");
        },
    },
    mounted() {
        // console.log(this.albums);
    },
    
}
</script>
<style scoped>
/* 导航 */
.nav /deep/ .van-nav-bar .van-icon {
    color: #000;
    transform: rotate(90deg);
    font-size: 22px;
    margin-right: 20px;
}
.nav /deep/ .van-nav-bar__left{ 
    font-size: 16px;
    padding: 0 10px;
}
/* 已购 */
.buy{
    margin-top: 47px;
}
.buy /deep/ .van-grid-item__content {
  text-align: left;
  padding: 10px 15px;
  display: block;
}
.buy /deep/ .van-image__img {
  border-radius: 5px;
  width: 150px;
  height: 150px;
}
.buy /deep/ p {
  overflow: hidden;
  width: 150px;
  height: 18px;
  line-height: 20px;
  font-size: 15px;
  margin: 0;
  padding: 3px 0;
}
.buy /deep/ p:last-child{
    color: #C0C0C0;
    font-size: 12px;
}

</style>