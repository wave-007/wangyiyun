<template>
  <div>
    <!-- <van-nav-bar title="所有榜单" left-text="返回" left-arrow lazy-load /> -->
    <BreakHeader title="所有榜单"/>
    <div >
      <div class="top_list">
        <van-image
          :src="item.coverImgUrl"
          width="100"
          height="100"
          v-for="(item, index) in ranklist"
          :key="index"
          @click-left="$router.go(-1)"
        >
        <p class="ranklistName">{{item.name}}</p>
        <p class="subtitle">{{item.updateFrequency}}</p>
        </van-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ranklist: [],
      toplist: [],
      totallist: [],
    };
  },
  mounted() {
    this.axios({
      url: "/toplist",
      // url:'/homepage/dragon/ball',
      withCredentials: true,
    }).then((res) => {
      // console.log(res);
      this.ranklist = res.data.list;
      this.ranklist.forEach((ele) => {
        if (ele.ToplistType !== undefined) {
          this.toplist.push(ele);
        } else {
          this.totallist.push(ele);
        }
      });
      // console.log(this.toplist);//官方榜
      // console.log(this.totallist);
      // console.log(this.ranklist)
    });
  },
};
</script>

<style scoped>

.top_list {
  /* width: 375px; */
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
  align-content: space-around;
}
.van-image{
  margin: 5px 0 30px 0;
}
.top_list /deep/ img{
  border-radius: 5px;
}
.ranklistName{
  font-size: 12px;
}
.subtitle{ 
  position: absolute;
  top: 75px;
  font-size: 8px;
  color: #fff;
  left: 5px;
}
</style>