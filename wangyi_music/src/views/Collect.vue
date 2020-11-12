<template>
  <div>
      <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup
      v-model="show"
      position="right"
      class="login-popup"
      closeable
      close-icon="arrow-left"
      close-icon-position="top-left"
    ></van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    
    showPopup() {
      this.show = true;
      this.axios({
        url:`/mv/sublist`,
        withCredentials: true,
      }).then(res=>{
        console.log(res)
      })
    },

  },
  created(){
  }
};
</script>