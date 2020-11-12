//state 代表状态，把需要存储的数据定义在这里
import { playMode } from '.././player_config.js'
const state = {
    //singer: {}, //定义网易云音乐 歌手 信息的对象 
    //播放器内核 数据状态
    playing: false, //播放状态
    fullScreen: false, //是否全屏
    playList: [], //播放列表
    sequenceList: [], //顺序列表
    mode: playMode.sequence, //0 顺序播放  1 单曲循环  2 随机播放
    currentIndex: -1, //当前播放曲目 

    
  }
  
  export default state;