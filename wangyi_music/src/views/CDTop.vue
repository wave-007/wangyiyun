<template>
    <div>
        <!-- 导航 -->
        <div class="nav">
            <van-nav-bar @click-left="onClickLeft" fixed :border="false">
                <template #left>
                    <van-icon name="down" />
                    <span>畅销榜</span>
                </template>
            </van-nav-bar>
        </div>
        <!-- 标签页 -->
        <div class="styles" >
            <!-- 数字专辑榜and单曲榜  -->
            <van-tabs v-model="active"> 
                <van-tab :title=item.title v-for="(item,index) in albumList" :key="index">
                    <!-- 日/周/年/总榜 -->
                    <van-tabs :v-model=index class="type">
                        <van-tab :title=item.title v-for="(item,index) in item.data" :key="index">
                            <!-- 内容 -->
                            <van-row type="flex" align="center" v-for="(item,index) in (item.data)" :key="index" @click="handleToDetail(item.albumId)">
                                <van-col span="3">
                                    <p>{{index+1}}</p>
                                </van-col>
                                <van-col span="6">
                                     <van-image :src="item.coverUrl" lazy-load alt="缺省图"/>
                                </van-col>
                                <van-col span="9" offset="1">
                                    <p>{{item.albumName}}</p>
                                    <p>{{item.artistName}}</p>
                                    <p>已售{{item.saleNum}}张</p>
                                </van-col>
                                <van-col span="6">
                                    <button>支持</button>
                                </van-col>
                            </van-row>
                        </van-tab>
                    </van-tabs>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active:0,
            albumList:[],
            albumType:[
                {name:"数字专辑榜",type:"0"},
                {name:"数字单曲榜",type:"1"},
            ],
            type:[
                {name:"日榜",type:"daily"},
                {name:"周榜",type:"week"},
                {name:"年榜",type:"year"},
                {name:"总榜",type:"total"}
            ], 
        }
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
         handleToDetail(id){
            this.$router.push({
               path: `/cddetail/${id}`,
            })
        }
    },
    mounted() {
        //获取榜单
        this.albumType.forEach((i)=>{
            let arr=[];
            this.type.forEach((item)=>{
                this.axios({
                    url:`/album/songsaleboard?type=${item.type}&albumType=${i.type}`,
                }).then((res)=>{
                    this.datas = res.data.products;
                    let obj = {};
                    obj.title=item.name;
                    obj.data=this.datas;
                    arr.push(obj);
                 })
            });
            let obj={};
            obj.title=i.name;
            obj.data=arr;
            this.albumList.push(obj);
        });
            // console.log(this.albumList);    
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
/* 标签页 */
.styles{
    margin-top: 46px;
}
/* 数字专辑榜and单曲榜 */
.styles /deep/ .van-tab--active {
    color: #FFF;
    background-color: #C0C0C0;
    border-radius: 30px;
}
.styles /deep/ .van-tabs__wrap{
    width: 60%;
    padding-left: 20%;
    height: 38px;
}
.styles /deep/ .van-tabs__nav{
    border: 1px solid #C0C0C0;
    border-radius: 30px;
    padding-bottom: 0px;
    height: 28px;
}
.styles /deep/ .van-tabs__line{
    height: 0;
}
/* 日/周/年/总榜 */
.styles /deep/ .type .van-tab--active {
    color:  #e4463e;
    background-color: #fff;
    border-radius: 0;
}
.styles /deep/ .type .van-tabs__wrap {
    width: 100%;
    padding-left: 0px;
    height: 44px;
}
.styles /deep/ .type .van-tabs__nav{
    border-top: 1px solid #ededed;
    border-bottom: 1px solid #ededed;
    border-left:0 ;
    border-right:0 ;
    border-radius: 0;
    /* padding-bottom: 15px; */
    height: 80%;
}
.styles /deep/ .type .van-tabs__line{
    height: 2px;
    width: 50px;
    bottom: 0px;
}
/* 内容 */
.styles /deep/ .van-row--flex {
    padding: 3px 0;
    /* margin-top: 20px; */
}
.styles /deep/ .van-col{
    color: #C0C0C0;
    font-size: 10px;   
}
.styles /deep/ .van-col--3 {
    font-size: 16px;
}
.styles /deep/ .van-row--flex:nth-child(-n+3) .van-col--3{
    color:  #e4463e;
}
.styles /deep/ .van-image__img{
    width: 80px;
    height: 80px;
    border-radius: 5px;
}
/* .styles /deep/ .van-col--9,.styles /deep/ .van-col--6:last-child{
    border-bottom: 1px solid #C0C0C0;
} */
.styles /deep/ .van-col--9 p {
    text-align: left;
    overflow: hidden;
    /* width: 85px; */
    height: 20px;
    line-height: 20px;
    margin:5px 0;
}
.styles /deep/ .van-col--9 p:first-child {
    font-size: 15px;
    color: #000;
}
.styles /deep/ button{
    border-radius: 30px;
    border: 1px solid #e4463e;
    padding: 4px 15px;
    color: #e4463e;
    font-size: 13px;
    background-color: #fff;
} 
</style>