<template>
    <div id="app">
       <!-- 导航 -->
       <div class="nav">
            <van-nav-bar @click-left="onClickLeft" fixed :border="false">
                <template #left>
                    <van-icon name="down" />
                    <span style="height:24px;overflow:hidden;">{{artistName}}《{{albumName}}》</span>
                </template>
            </van-nav-bar>
        </div>
       <!-- 专辑样子 -->
       <div class="album" >
           <van-cell :border="false">
               <template #title>
                   <van-image
                    width="18px"
                    height="18px"
                    fit="contain"
                    style="vertical-align:middle;border-radius:30px"
                    
                   :src="require('../assets/icons/log.png')" />
                   <span style="vertical-align:middle">网易云音乐</span>
               </template>
           </van-cell>
           <van-image 
           width="200px"
           height="200px"
           :src="coverUrl" 
           />
           <p>{{albumName}}</p>
           <p>{{artistName}}</p>
       </div>
       <!-- 立即支持 -->
       <div class="support">
           <van-cell center>
               <template #title>
                   ￥<span style="letter-spacing: 0;">{{product.price}}</span>
                </template>
               <template #label>
                   已售
                   <span style="color:#FFF;vertical-align: middle;">{{product.saleNum}}</span>
                   张专辑
                </template>
               <template #default>
                    <button  @click="show = true" >立即支持</button>
                    <van-overlay :show="show" @click="show = false" />
               </template>
           </van-cell>
       </div>
       <!-- 小细节 -->
       <div class="tags">
           <van-grid :gutter="10" direction="horizontal" :column-num="2" :border="false">
               <van-grid-item v-for="(item,index) in tags" :key="index"> 
                   <van-icon name="checked" />
                   {{item}}
               </van-grid-item>
           </van-grid>
       </div>
       <!-- 遮罩层 -->
        <van-overlay :show="show" @click="show = false">
            <div class="wrapper" @click.stop>
                <div class="block">
                    <p>{{albumName}}</p>
                    <p>{{artistName}}</p>
                    <div>
                        <table border="1">
                            <tr>
                                <td >数量:</td>
                                <td @click="dec">-</td>
                                <td >{{albumnum}}</td>
                                <td @click="inc">+</td>
                            </tr>
                        </table>
                    </div>
                    <p>支付金额：￥{{product.price*albumnum}}</p>
                    <div>
                        <button @click="add"><van-icon name="alipay" />支付宝支付</button>
                        <button @click="add"><van-icon name="wechat" />微信支付</button>
                    </div>
                </div>
            </div>
            <div class="x">
                <van-icon name="close" size="24" color="#C0C0C0"/>
            </div>
        </van-overlay>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex';
export default {
    data() {
        return {
            show: false,
            //专辑图片
            coverUrl:"",
            //歌曲名
            albumName:"",
            //歌手名
            artistName:"",
            //专辑id
            albumId:"",
            //支持里所需数组
            product:[],
            //小细节里所需数组
            tags:[],
        }
    },
    computed:{
        ...mapState([
            'albumnum',
            'albums',
        ]),
    },
    
    methods: {
        onClickLeft() {
            this.$router.back();
        },
        ...mapMutations(['addAlbum']),
        ...mapMutations({
            plus:'album_inc',
            minus:'album_dec',
        }),
        //专辑添加购买数量
        inc(){
            this.plus();
        },
        //专辑减少购买数量
        dec(){
            this.minus();
        },
        // 支付添加专辑数组
        add(){
            let obj={
                coverUrl:this.coverUrl,
                albumName:this.albumName,
                artistName:this.artistName,
                albumId:this.albumId,
            }
            // console.log(this.albums);
            if(this.albums.length==0){
                this.addAlbum(obj);
                this.$router.push('/cdbuy');
            }else{
                // console.log(this.albums);
                let bool=false;
                this.albums.forEach((item) => {
                    if(this.albumId==item.albumId){
                        // item.albumId!=this.albumId;
                        // this.$router.push('/cdbuy');
                        bool=false;
                    }else{
                        bool=true;     
                    }
                });
                if(bool){
                    this.addAlbum(obj);
                }
                this.$router.push('/cdbuy');
            }
            
            // if(this.albums.albumId==this.albumId){
            //     this.albums.albumId!==this.albumId
            //     this.$router.push('/cdbuy');
            // }else{
            //     this.addAlbum(obj);
            //     this.$router.push('/cdbuy');
            // } 
        }
    },
    mounted() {
        let id = this.$route.params.id;
        this.axios({
            url:`/album/detail?id=`+ id,
        }).then((res)=>{  
            // console.log(res);
            this.product=res.data.product;//立即支持
            // console.log(this.product);
            this.tags=res.data.product.tags;//获取小细节
            // console.log(this.tags);
            //专辑样子
            this.coverUrl=res.data.album.coverUrl;//专辑图片
            this.albumName=res.data.album.albumName;//歌曲名
            this.artistName=res.data.album.artistName;//歌手名
            this.albumId=res.data.album.albumId;//专辑id
            // console.log(this.albumId);
            // console.log(this.albums);
            
            
        })
    },
}
</script>
<style scoped>
/* 背景颜色 */
#app{
    background: linear-gradient(#282828,#363636);
    color:  #C0C0C0;
    z-index:5;
}
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
    color: #000;
    /* overflow: hidden; */
}
/* 专辑样子 */
.album{
    margin-top: 46px;
    color: #FFF; 
    padding-bottom: 10px;   
}
/* 网易云音乐 */
.album /deep/ .van-cell{
    width: 31%;
    padding: 10px 11px; 
    background-color:transparent;
    color: #FFF; 
    margin-bottom: 20px;
}
.album /deep/ .van-cell .van-image {
    margin-right: 5px;
}
.album /deep/ .van-cell .van-image__img{
    border-radius:30px;
}
/* p标签 */
.album /deep/ :nth-child(3){
    font-size: 17px;
}
.album /deep/ :nth-child(4){
    font-size: 13px;
    color:  #C0C0C0;
}
/* 立即支持 */
.support /deep/ .van-cell{
    background-color:transparent;
    padding: 20px 20px;
    border-top: 1px solid #424242;
}
.support /deep/ .van-cell__title{
    color:  #e4463e;
    text-align: start;
    letter-spacing: 4px;
    font-size: 17px;
}
.support /deep/ button{
    border-radius: 30px;
    border: 1px solid #e4463e;
    padding: 0 20px;
    color:#fff;
    font-size: 13px;
    background-color: #e4463e;
} 
/* 小细节 */
.tags{
    padding: 20px 0 200px;
    border-top: 1px solid#424242;
}
.tags /deep/ .van-grid-item__content{
    background-color:transparent;
    font-size: 12px;
    justify-content: left;
    padding: 0px 8px;
}
.tags /deep/ .van-icon{
    margin-right: 8px;
}
/* 遮罩层 */
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.block {
    width: 300px;
    height: 260px;
    border-radius: 5px;
    background-color: #fff;
    color: #000;
}
.block /deep/ table{
    border-collapse:collapse;
    margin: 25px auto;
}
.block /deep/ table,td,tr{
    border: 1px solid #C0C0C0;
    border-radius: 5px;
}
.block /deep/ table td{
    width: 50px;
    height: 30px;
    text-align:center;
    vertical-align:middle;
}
.block /deep/ .van-icon{
    margin-right: 5px;
    vertical-align: middle;
}
.block /deep/ button {
  padding: 6px 12px;
  font-size: 13px;
  margin: 10px ;
  width: 110px;
  height: 30px;
  border: 0px;
  border-radius: 5px;
  color: #FFF;
}
.block /deep/ button:first-child{
    background-color: #0b91eb;
}
.block /deep/ button:last-child{
    background-color: #04b102;
}
.x{
    display: inline-block;
    position: relative;
    bottom: 180px;
}
</style>