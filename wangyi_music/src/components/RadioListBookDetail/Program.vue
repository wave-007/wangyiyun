<template>
  <div>
    <!-- 排序部分开始 -->
    <div class="sort">
      <div class="sort_left">共{{data.freeProgramLength}}期</div>
      <div class="sort_right" @click="sort">
        <span v-if="sort_down==true">升序</span>
        <span v-else>降序</span>
      </div>
    </div>
    <!-- 排序部分结束 -->
    <!-- 列表内容开始 -->
    <div class="book_content">
      <van-list
        :finished="data.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item, index) in arr" :key="index">
          <router-link to="/fullscreenplayer">
            <div class="p_item">
              <div class="p_left">
                <p>
                  {{
                    item.serialNum > 9 ? item.serialNum : "0" + item.serialNum
                  }}
                </p>
                <div class="p_two">
                  <div class="p_title">{{ item.name }}</div>
                  <div class="p_other">
                    <div>
                      {{ moment.unix(item.createTime / 1000).format("MM-DD") }}
                    </div>
                    <div>
                      <van-icon name="play-circle-o" />{{ item.listenerCount }}
                    </div>
                    <div><van-icon name="clock-o" />{{ item.duration }}</div>
                  </div>
                </div>
              </div>
              <div class="p_right">
                <van-image
                  width="24px"
                  height="24px"
                  fit="contain"
                  :src="require('../../assets/icons/more_2.png')"
                />
               
              </div>
            </div>
          </router-link>

        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  name: "program",
  props: ["data"],
  data() {
    return {
      arr:this.data.freeProgram_d,
      sort_down:true,//当是true的时候说明是降序，从最新到第一集
    };
  },
  mounted() {
    
  },
  methods: {
    onLoad() {},
    sort(){
      if(this.sort_down){
        this.arr=this.data.freeProgram;
        this.sort_down=false;
      }else{
        this.arr=this.data.freeProgram_d;
        this.sort_down=true;
      }
      
    }
  },
};
</script>

<style scoped>
.sort{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  padding: 5px 20px;
  font-size: 14px;
  background-color:#6f71743b;
}
.book_content {
  padding: 10px 20px;
  text-align: left;
}
/* 节目标签页 */
.p_item {
  display: flex;
  justify-content: space-between;
  color: #2c3e50;
  padding: 10px 0;
}
.p_item .p_left {
  display: flex;
}
.p_item .p_left .p_title {
  font-size: 14px;
}
.p_item .p_left .p_other {
  margin-top: 4px;
  display: flex;
  font-size: 14px;
}
.p_item .p_left .p_other div {
  margin-right: 10px;
  height: 20px;
  line-height: 20px;
}
.p_item .p_left .p_other div .van-icon {
  margin-right: 5px;
}
.p_item .p_left p {
  margin-right: 15px;
  color: rgba(0, 0, 0, 0.4);
  font-weight: bold;
}
</style>