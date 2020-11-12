<template>
  <div>
    <div class="scrollx-block" v-for="(item, index) in block" :key="index">
      <div class="_title" >
        <a>{{item.subTitle.title}}</a>
        <span @click="more">
          了解所有
          <van-icon name="arrow" />
        </span>
      </div>
      <Scroll scrollX class="_contain">
        <slot name="card">
          <div v-for="(items,num) in item.creatives" :key="num" class="box">
            <!-- {{items.uiElement.image}} -->
            <div v-for="(image,number) in items.resources" :key="number" class="img_box">
              <router-link :to="`/songlist/${image.resourceId}`">
              <van-image  style="margin:10px"  :src="image.uiElement.image.imageUrl" width="150" height="150" lazy-load>
              <!-- <img :src="image.uiElement.image.imageUrl" width="150"> -->
              <!-- {{image.uiElement.image.imageUrl}} -->
              <!-- <van-image :src="image.uiElement.image.imageUrl"></van-image> -->
                <div class="my_title">{{image.uiElement.mainTitle.title}}</div>
              </van-image>
              </router-link>
            </div>
          </div>
          <!-- <PlayList ></PlayList> -->
        </slot>
      </Scroll>
    </div>
  </div>
</template>
<style scoped>
.img_box /deep/ .van-image{
  width: 150px;
  height: 150px;
  margin-bottom: 30px;
}
.van-image /deep/ img{
  border-radius: 5px;
}
.warrper /deep/ .content{
  display: flex;
}
.box{
  display: inline-block;
}
.warrper /deep/.my_title{
  color: #000;
  font-size: 12px;
  text-align: left;
  height: 30px;
  margin-top: 5px;
}
._title{
  height: 50px;
}
.nav-aside {
  font-size: 32px;
  display: inline-block;
  margin: 10px 100px;
}
</style>
<script>
export default {
  name: "scrollxblock",
  data() {
    return {
      title: "",
      AlbumPics: [],
      blocks: [],
      block:[],
    };
  },
  mounted() {
    let uphone = localStorage.getItem("phone");
    let upassword = localStorage.getItem("password");
    this.axios({
      url: `/login/cellphone?phone=${uphone}&password=${upassword}`,
      withCredentials: true,
    }).then((res) => {
      // console.log(res.data);
      this.axios({
        // url:`/homepage/dragon/ball`,
        url: `/homepage/block/page`,
        // url:`/recommend/resource`,
        // url:`/recommend/songs`,
        withCredentials: true,
      }).then((res) => {
        let results = res.data.data.blocks;
        results.splice(-1,1);
        this.blocks = results;
        // console.log(this.blocks)
        results.forEach((element,index,arr) => {
          this.block.push(element.uiElement)
          this.block[index].creatives = element.creatives;
          // console.log(this.block)
          // console.log(element.creatives)
          // console.log(this.block[index])
          // this.block[0].push(element.creatives)
        })
        // console.log(this.blocks[0].creatives);
        // console.log(this.block)
      });
    });
  },
  methods:{
    more(){
      this.$router.push(`/musicsquare`)
    }
  }
};
</script>

<style lang="less" scoped>
.scrollx-block {
  width: 100%;
  color: #000;
  ._title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-weight: 600;
    padding-left: 18px;
    a {
      font-size: 18px;
    }
    span {
      margin-right: 10px;
      display: flex;
      align-items: center;
      padding: 2px 4px;
      font-size: 12px;
      color: #a8bbbc;
      i {
        margin-left: 4px;
      }
    }
  }
  ._contain {
    margin-top: 20px;
    width: 100%;
  }
}
</style>
