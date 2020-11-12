<template>
  <div>
    <!-- <p>我的音乐界面--厉乐标</p> -->
    <div>
      <!-- <h1>vant-ui layout栅格布局</h1>  -->
      <van-row class="row">
        <van-col span="4"
          ><van-icon name="arrow" size="30px" color="#fff"
        /></van-col>
        <van-col span="16">我的音乐</van-col>
        <van-col span="4"
          ><van-icon name="music-o" size="30px" color="#fff"
        /></van-col>
      </van-row>
    </div>
    <div>
      <!-- <h1>cell单元格布局</h1> -->
      <van-cell title="本地音乐" icon="location-o" value="21" is-link />
      <van-cell title="最近播放" icon="location-o" value="65" is-link />
      <van-cell title="我的电台" icon="location-o" value="0" is-link />
      <van-cell
        title="我的收藏"
        icon="location-o"
        value="专辑/歌手/视频"
        is-link
      />
    </div>
    <div>
      <!-- <h1>歌单折叠面板 list面板</h1> -->
      <van-collapse v-model="activeNames">
        <van-collapse-item title="我创建的歌单" name="1" icon="arrow" class="playlist">
          
          <!-- 用插槽slot改变右边的图标 -->
          <template #right-icon >
            <!-- 点击图标出现提示 -->
            <div>
              <van-cell @click="showPopup" class="more"><van-icon name="ellipsis"   /></van-cell>
            </div>
            <div>
              <van-popup
                v-model="show"
                round
                position="bottom"
                :style="{ height: '30%',}"
                class="popup"
              >
              <p>我创建的歌单()</p>
              <ul>
                <li>
                  <van-icon name="add-o" />
                  <span>创建新歌单</span>
                </li>
                <li>
                  <van-icon name="orders-o" />
                  <span>歌单管理</span>
                </li>
                <li>
                  <van-icon name="exchange" />
                  <span>导入外部歌单</span>
                </li>
                <li>
                  <van-icon name="underway-o" />
                  <span>恢复歌单</span>
                </li>
              </ul>
              </van-popup>
            </div>
          </template>
          <!-- 用户登录时获取个人信息歌单列表 -->
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </van-collapse-item>
        
      </van-collapse>
    </div>
    <div>
      <!-- <p>底部用公共组件</p> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: ["1"],
      list: [],
      loading: false,
      finished: false,
      show: false,
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  },
};
</script>
<style>
.row {
  /*margin-top: 10px;*/
  background-color: #e4463b;
  padding: 5px 5px;
  line-height: 25px;
  color: #fff;
}
.more{
  padding: 0;
  background-color: gray;
  font-size: 16px;
  line-height: inherit;
}
.playlist{
  text-align: left;
}
.playlist>.van-cell{
  background-color: gray;

}

.popup{
  text-align: left;
  padding-left: 20px;
}
.popup>p,ul{
  margin: 10px;
}
.popup>ul>li{
  display: flex;
  padding: 5px;
}
.popup>ul>li>.van-icon{
  line-height: inherit;
}
.popup>ul>li>span{
  margin-left: 5px;
  align-items: center;
}
</style>