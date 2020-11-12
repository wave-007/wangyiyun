<template>
  <div>
    <!-- 顶部搜索栏 -->
    <div>
      <van-search
        v-model="value"
        :placeholder="keywords"
        left-icon="arrow-left"
        @search="onSearch"
        @cancel="onCancel"
          />
    </div>
    <!-- 热搜 -->
    <div class="search-hot">
      <!-- 热搜栏 -->
      <div>
          <van-cell title="热搜榜" >
          <template #default>
            <van-button round icon="play" type="default">播放全部</van-button>
          </template>
          </van-cell>
        
      <!-- 热搜内容 -->
        <van-grid direction="horizontal" :column-num="2">
          <van-grid-item v-for="(item,index) of list1.slice(0,10)" :key="index" >
            <p>{{index+1}}</p>
            <p>{{list1[index].searchWord}}</p>
            <van-image  :src="list1[index].iconUrl" v-if="item.iconUrl !=null" />
          </van-grid-item>
          <!-- 展开 -->
          <div class="">
            
          </div>
        </van-grid>
        
        
        <!-- <van-image  :src="list1[1].iconUrl" /> -->
      </div>
    </div>
    <!-- 专区 -->
    <div>

    </div>
  </div>
</template>


<style scoped>
  .search-hot /deep/ .van-cell__title{
    text-align: left;
    font-weight: bolder;
    font-size: 14px;
  }
  .search-hot /deep/ .van-button{
    font-size: 13px;
    width: 104px;height: 24px;
  }
  .search-hot /deep/ .van-image__img{
    position: relative;
    width: 30%;
  }
  .search-hot /deep/ .van-grid-item__content{
    position: relative;
    margin-bottom: -5px;
    margin-right: -5px;
  }
  
  .search-hot /deep/ p:nth-child(1){
    margin: 0 auto;
    color: #9e9e9e;
    margin-left: 7px;
  }
  .search-hot /deep/ p:nth-child(2){
    position: absolute;
    left: 40px;
    font-size: 15px;
  }
  .search-much{
    border: 1px solid transparent;
    width: 373px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #9e9e9e;
  }

</style>


<script>

export default {
  data(){
    return{
      value: '',
      keywords:'',
      list1:[],
    }
  },
  methods:{
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast('取消');
    },
  },

  mounted(){
    //获取默认搜索关键词keywords
    this.axios({
            url:`/search/default`,
        }).then((res)=>{
            this.keywords = res.data.data.showKeyword;
            // console.log(this.keywords);
        })
    //获取热搜列表
    this.axios({
      url:`/search/hot/detail`,
    }).then((res)=>{
      this.list1=res.data.data;
      // console.log(this.list1);
    })
    //获取底部专栏
    // this.axios({
    //   url:`/search?keywords= 海阔天空`,
    // }).then((res)=>{
    //   // this.list1=res.data.data;
    //   console.log(res);
    // })

  },

  

}
</script>