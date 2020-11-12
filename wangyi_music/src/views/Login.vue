<template>
  <div class="login">
    <!-- 登陆页面的log图 -->
    <van-image
      class="login-top-img"
      radius="50"
      :src="require('../assets/icons/log.png')"
    />

    <!-- 登陆的外层 -->
    <div class="login-data">
      <van-form @submit="onSubmit">
        <!-- 自动登陆的手机号码,从LocalStorage中获得 -->
        <span class="auto-login-phone">{{ user_phone }}</span>

        <!-- 当前手机号右边的图,有进入手动登陆页面功能 -->
        <van-image
          :src="require('../assets/icons/autoplay.png')"
          @click="showPopup"
          width="13px"
        ></van-image>

        <!-- 账号密码登录界面 -->
        <!-- 右侧弹出 -->
        <van-popup
          v-model="show_popup"
          position="right"
          class="login-popup"
          closeable
          close-icon="arrow-left"
          close-icon-position="top-left"
        >
          <!-- 顶部标签 -->
          <div class="phone-login">
            <van-nav-bar title="手机号登录"></van-nav-bar>
            <h1>登录体验更多精彩</h1>
            <p>未注册手机号登陆后将自动创建账号</p>
          </div>

          <!-- 输入手机号 -->
          <van-field
            v-model="phone"
            name="phone"
            label="手机号"
            placeholder="请输入手机号码"
            :rules="[{ required: true }]"
          />

          <!-- 输入密码 -->
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="请输入密码"
            :rules="[{ required: true }]"
          />

          <!-- 登录按钮 -->
          <van-button
            round
            type="info"
            native-type="submit"
            class="login-button"
          >
            下一步
          </van-button>
        </van-popup>
      </van-form>

      <!-- 手动登录结束 -->

      <!-- 自动登录开始 -->
      <div style="margin: 16px">
        <van-button
          round
          type="info"
          native-type="submit"
          class="login-button-a"
          @click="on_Submit"
        >
          一键登录
        </van-button>
      </div>
      <!-- 自动登录结束 -->

      <!-- 服务条例开始 -->
      <div class="clause">
        <van-checkbox
          class="agreement"
          v-model="checked"
          checked-color="#ccc"
          icon-size="15px"
        >
          同意
        </van-checkbox>
        <router-link class="clause-first-a" to="">《服务条款》</router-link>
        <router-link to="">《隐私政策》</router-link>
        <router-link to="">《儿童隐私政策》</router-link>
        <router-link class="clause-last-a" to=""
          >《中国移动认证服务协议》</router-link
        >
      </div>
      <!-- 服务条例结束 -->
    </div>
  </div>
</template>
<style>
/* 手动登陆提示文字 */
.phone-login > p {
  font-size: 5px;
  color: #888;
  text-align: left;
  margin-left: 15px;
}

/* 手动登陆文字 */
.phone-login > h1 {
  margin-top: 20px;
  font-weight: 700;
  text-align: left;
  margin-left: 15px;
}
/* 手动登陆弹出页的大小 */
.login-popup {
  height: 100vh;
  width: 100vw;
}
/* 自动获取手机号码 */
.auto-login-phone {
  font-size: 15px;
  color: #fff;
  margin-right: 10px;
}
/* 底部条例的第一个和最后一个的位置 */
.clause-first-a,
.clause-last-a {
  padding-left: 45px;
}
/* 底部服务条例的样式 */
.clause {
  display: flex;
  justify-content: inherit;
  flex-wrap: wrap;
  font-size: 10px;
}
/* 底部服务条例的颜色 */
.clause > a {
  padding-top: 4px;
  color: #fff;
}
/* 底部勾选的位置 */
.agreement {
  position: relative;
  left: 40px;
  color: #fff;
}
/* 手动登陆按钮 */
.login-button {
  width: 300px;
  margin-top: 10px;
  color: #fff;
  background: #e4463b;
  border: 0;
}
/* 一键登录的颜色 */
.login-button-a {
  background: #fff;
  color: #e4463b;
  border: 1px solid #fff;
  margin-bottom: 50px;
}
/* 立即体验的颜色 */
.login-button-b {
  background: #e4463b;
  border: 1px solid #fff;
}
/* 2个按钮的样式 */
.login-button-a,
.login-button-b {
  width: 300px;
  margin-bottom: 20px;
}
/* 全局背景颜色 */
.login {
  width: 375px;
  height: 667px;
  background: #e4463b;
}
/* 登陆部分的位置 */
.login-data {
  position: relative;
  top: 240px;
}
/* log的位置和样式 */
.login-top-img {
  position: relative;
  width: 100px;
  top: 120px;
}
</style>
<script>
import { Toast } from "vant";

export default {


  data() {
    return {
      phone: "",
      user_phone: "",
      password: "",
      checked: true,
      show_popup: false,
    };
  },
  
  beforeMount() {
    if (localStorage.getItem('phone') && localStorage.getItem('password') != '') {
      this.$router.push("/home");
    }
  },
  
  
  methods: {
    showPopup() {
      this.show_popup = true;
    },
    login(phone, password) {
      this.axios({
        url: `/login/cellphone?phone=${phone}&password=${password}`,
        withCredentials: true,
      }).then((res) => {
        if (res.data.code == "200") {
          let now = new Date();
          let token = 1;
          now.setMonth(now.getMonth() + 100);
          localStorage.setItem("phone", phone);
          localStorage.setItem("password", password);
          document.cookie = `phone=${phone};expires=${now};password=${password};token:${token}`;
          Toast.success("登陆成功");
          this.$router.push("/home");
        } else {
          Toast.fail("登陆失败");
        }
      });
    },
    onInput(value) {
      Toast(value);
    },
    onDelete() {
      Toast("删除");
    },
    onSubmit(value) {
      this.login(value.phone, value.password);
    },
    on_Submit() {
      if (localStorage.getItem("phone") && localStorage.getItem("password")) {
        this.login(
          localStorage.getItem("phone"),
          localStorage.getItem("password")
        );
      }
    },
  },
  
  
  
  mounted() {
    if (localStorage.getItem("phone") && localStorage.getItem("password")) {
      let phone = localStorage.getItem("phone");
      let a = phone.slice(0, 3);
      let b = phone.slice(7, 11);
      this.user_phone = a + "****" + b;
    }
  },
  
};
</script>