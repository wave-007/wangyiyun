<template>
  <div>
    <div class="book_content">
      <!-- 主播信息 -->
      <!-- <router-link to="/radioList"> -->
      <div class="avatar" v-if="data.content.feeDesc == null">
        <h5>主播</h5>
        <div class="avatar_t">
          <van-image
            round
            width="60px"
            height="60px"
            :src="data.dj.avatarUrl"
          />
          <span class="avatar_name">{{ data.dj.nickname }}</span>
        </div>
      </div>
      <!-- </router-link> -->
      <!-- 电台简介 -->
      <div class="desc">
        <h5>电台内容简介</h5>
        <div
          class="desc_t"
          v-for="(item, index) of data.radioDesc"
          :key="index"
        >
          <p>{{ item }}</p>
        </div>
      </div>
      <!-- 免费试听 -->
      <div class="freeListen" v-if="data.content.feeInfo != null">
        <h5>免费试听</h5>
        <div class="freeList">
          <van-list
            :finished="data.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div
              v-for="(item, index) in data.freeProgram.slice(0, 5)"
              :key="index"
              class="freeCon"
            >
              <router-link to="/radioListBook">
                <div class="freeList_item">
                  <div class="item_left">
                    <div class="item_title">{{ item.name }}</div>
                    <div class="item_other">
                      <div>
                        <van-icon name="good-job-o" />{{ item.likedCount }}
                      </div>
                      <div>
                        <van-icon name="chat-o" />{{ item.commentCount }}
                      </div>
                      <div>
                        <van-icon name="play-circle-o" />{{
                          item.listenerCount
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="item_right">
                    <van-icon name="play-circle-o" />
                  </div>
                </div>
              </router-link>
            </div>
          </van-list>
        </div>
        <div class="lookMore">
          <!-- <router-link to="/radioListBook"> -->
            <div class="text" @click="goToProgram">查看更多></div>
          <!-- </router-link> -->
        </div>
      </div>
      <!-- 免费试听结束 -->
      <!-- 购买须知 -->
      <div class="buyNote" v-if="data.content.feeInfo != null">
        <h5>购买须知</h5>
        <p>1.本电台为付费产品，购买后支持移动、PC、web等多种方式收听。</p>
        <p>2.购买成功后不可退款，同时不支持转让，敬请谅解。</p>
        <p>3.购买过程中遇到任何问题，请私信联系@云音乐客服。</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dtdetails",
  props: ["data"],
  methods: {
    onLoad() {},
    goToProgram(){
      this.$emit('change-active',1);//向父组件传值，改变active的值
    }
  },
  mounted() {

  },
};
</script>

<style scoped>
.book_content {
  padding: 20px;
  text-align: left;
}
.avatar {
  color: #2c3e50;
}
.avatar .avatar_t {
  display: flex;
}
.avatar .avatar_t .avatar_name {
  margin-left: 10px;
  font-size: 16px;
}
.desc .desc_t {
  font-size: 14px;
  margin-top: -10px;
}
.desc {
  margin-bottom: 45px;
}
.freeList .freeCon {
  border-top: 1px solid rgba(0, 0, 0, 0.137);
}
.freeList .van-list:last-child {
  border-bottom: 1px solid rgba(0, 0, 0, 0.137);
}
.freeListen .freeList_item {
  display: flex;
  justify-content: space-between;
  color: #2c3e50;
  padding: 10px 0;
}
.freeList_item .item_left .item_title {
  font-weight: 500;
}
.freeList_item .item_left .item_other {
  margin-top: 10px;
  display: flex;
  font-size: 14px;
}
.freeList_item .item_left .item_other div {
  margin-right: 10px;
  height: 20px;
  line-height: 20px;
}
.freeList_item .item_left .item_other .van-icon {
  margin-right: 5px;
}
.freeList_item .item_right .van-icon {
  font-size: 35px;
  color: #2c3e50;
}
/* 查看更多 */
.lookMore {
  text-align: center;
  margin-top: 10px;
}
.lookMore .text {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
}
/* 购买须知 */
.buyNote p {
  font-size: 14px;
  margin-bottom: -8px;
}
</style>