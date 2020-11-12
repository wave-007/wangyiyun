import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    playList: [],
    playContent: {},
    current: "",

    // 赵珊珊
    albumnum:1,//专辑数量
    albums:[],//专辑
}
const getters = {

}
const mutations = {
    setLyric(state, payload) {
        state.playContent.lyric = payload
    },

    //赵珊珊
    //专辑添加购买数量
    album_inc(state){
        state.albumnum++;
      },
    //专辑减少购买数量
    album_dec(state){
        if(state.albumnum>1){
          state.albumnum--;
        } 
    },
    //添加专辑数组
    addAlbum(state,payload){
        state.albums.push(payload);
    }
}
const actions = {
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})