<template>
    <div>
        <!-- 导航 -->
        <div class="nav">
            <van-nav-bar @click-left="onClickLeft" fixed :border="false">
                <template #left>
                    <van-icon name="down" />
                    <span>语种风格馆</span>
                </template>
            </van-nav-bar>
        </div>
        <!-- 标签页 -->
        <div class="styles">
            <van-tabs v-model="active" >
                <van-tab :title=item.title v-for="(item,index) in list" :key="index">
                   <van-grid  :column-num="2" :border="false" > 
                        <van-grid-item v-for="(item,index) in item.data" :key="index" :to="`/cddetail/${item.albumId}`"> 
                            <van-image :src="item.coverUrl" lazy-load alt="缺省图"/>
                            <p>{{item.albumName}}</p>
                            <p>{{item.artistName}}</p>
                            <p>￥{{item.price}}</p>
                        </van-grid-item>
                    </van-grid> 
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
            list:[],
            cd:[
                {name:"华语",area:"Z_H"},
                {name:"欧美",area:"E_A"},
                {name:"韩国",area:"KR"},
                {name:"日本",area:"JP"}
            ],
            
        }
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
    },
    mounted() {
        this.cd.forEach((item) => {
            this.axios({
                url:`/album/list/style?area=${item.area}`
            }).then((res)=>{
                // console.log(res);
                this.datas = res.data.albumProducts;
                let obj = {};
                obj.title=item.name;
                obj.data=this.datas; 
                this.list.push(obj);
            })
        });
            //  console.log(this.list);
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
    background-color: #f7f7f7;
}
.styles /deep/ .van-tabs__wrap {
    height: 35px;
    border-bottom: 1px solid #c0c0c0;
}
.styles /deep/ .van-tabs__nav{
    background-color: #f7f7f7;
}
.styles /deep/  .van-tab--active {
    color:#e4463e;
    font-weight: 500;
}
.styles /deep/ .van-tabs__nav--line {
    height: 80%;
}
.styles /deep/ .van-tabs__line {
    width: 35px;
    height: 2px;
}
.styles /deep/ .van-grid-item__content{
    text-align: left;
    padding: 10px 25px;
    display: block;
    background-color: #f7f7f7;
}
.styles /deep/ .van-image__img{
    border-radius: 5px;
    width:130px;
    height:130px;
}
.styles /deep/ p{
    overflow: hidden;
    width: 85px;
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    margin: 0;
}
.styles /deep/ p:nth-child(3){
    font-size: 10px;
    color: #C0C0C0;
}
.styles /deep/ p:last-child{
    color: #e4463e;
    font-size: 12px;
}

</style>
