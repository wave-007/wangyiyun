import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import index from '../views/index'
import RadioList from '../views/RadioList'
import RadioListBook from '../views/RadioListBook.vue'
import RadioListBookDetail from '../views/RadioListBookDetail.vue'
import Songlist from '../views/Songlist.vue'
import songPlay from '../views/songPlay.vue'

//厉乐标mylist,mylistsong引入
import Mylistsong from '../views/Mylistsong.vue'
import Mylist from '../views/Mylist.vue'
import Video from '../views/Video.vue'
import Login from '../views/Login.vue'
import Fullscreenplayer from "../views/fullscreen-player.vue"
import Collect from "../views/Collect.vue"

//赵珊珊引入组件
import CD from '../views/CD.vue'
import CDStyle from '../views/CDStyle.vue'
import CDTop from '../views/CDTop.vue'
import CDDetail from '../views/CDDetail.vue'
import CDBuy from '../views/CDBuy'

//程永引入组件
import Account from '../views/Account.vue'
import MyMessage from '../views/MyMessage.vue'
import Search from '../views/Search.vue'
import EveryDay from '../views/EveryDay.vue'
import SongTitle from '../views/SongTitle.vue'
import Ranklist from '../components/home/Ranklist'
import MusicSquare from '../views/MusicSquare'
import PlayAll from '../views/PlayAll'

//搜索测试
import Mysearch from '../views/MySearch.vue';
Vue.use(VueRouter)


const routes = [
  {
    path:'/collect',
    component:Collect
  },
  //搜索测试url
  {
    path:'/search',
    component:Mysearch
  },
  {
    path:'/musicsquare',
    component:MusicSquare
  },
  {
    path:'/ranklist',
    component:Ranklist
  },
  {
    path:'/',
    component: Login
  },
  {
    path:'/video',
    component: Video
  },
  {
    path:'/fullscreenplayer',
    component: Fullscreenplayer
  },
  {
    path: "/songplay/:songId",
    component: songPlay
  },
  {
    path: '/songlist/:id',
    component: Songlist
  },
  {
    path: '/mylistsong',
    component : Mylistsong
  },
  {
    path:'/mylist',
    component: Mylist
  },
  {
    path : '/home',
    component : Home
  },
  {
    path: '/radioList',
    component: RadioList
  },
  {
    path: '/radioListBook/:cateId/:name',
    component: RadioListBook
  },
  {
    path: '/radioListBookDetail/:rid',
    component: RadioListBookDetail
  },
  {
    path:'/cd',
    component:CD
  },
  {
    path:'/cdtop',
    component:CDTop
  },
  {
    path:'/cdstyle',
    component:CDStyle
  },
  {
    path:'/cddetail/:id',
    component:CDDetail
  },
  {
    path:'/cdbuy',
    component:CDBuy
  },
  {
    path: '/account',
    component: Account
  },
  {
    path: '/mymessage',
    component: MyMessage
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/everyday',
    component: EveryDay
  },
  {
    path: '/playall',
    component: PlayAll
  },
  {
    path: '/songtitle',
    component: SongTitle
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
