import Vue from 'vue';
const events = new Vue();
const audio = document.createElement('audio');

let musicList = [];
let isPlaying = false;
let current = null;
let percentage = 0;





audio.onplaying = () => {
  isPlaying = true;
  current.totaltime = getTime(audio.duration);
  events.$emit('playing', true,audio.duration);
  // console.log('playing', audio);
};

audio.onpause = () => {
  isPlaying = false;
  events.$emit('playing', false);
  // console.log('playing', false);
};

audio.ontimeupdate = () => {
  percentage = (audio.currentTime / audio.duration) * 100

   events.$emit('timeupdate',audio.currentTime, getTime(audio.currentTime),percentage);
};
 //格式化
function getTime(time) {
  let minutes, second;
  minutes = parseInt(time / 60);
  second = parseInt(time % 60);

  if (second < 10) {
      second = "0" + second;
  }
  return minutes + ":" + second;
}

function loadList(list) {
  musicList = list;
  events.$emit('loadList', list);
  // console.log('Loaded list: ', musicList);
}

function play(musicItem) {
  current = musicItem;
  if (audio.src === musicItem.songUrl) {
    audio.play();
  }
  else {
    audio.src = musicItem.songUrl;
    Vue.nextTick(() => {
      audio.play();
    });
  }
  events.$emit('play', musicItem);
  // console.log('Play: ', musicItem);
}

function pause() {
  audio.pause();
  events.$emit('pause');
  // console.log('Paused');
}

function next() {
  let index = Number(current.index) + 1;
  let musicItem;
  if (index < musicList.length) {
    musicItem = musicList[index];
  }
  else {
    musicItem = musicList[index = 0];
  }
  play(getMusicItem(musicItem, index));
}

function prev() {
  let index = Number(current.index) - 1;
  let musicItem;
  if (index < 0) {
    musicItem = musicList[musicList.length - 1];
  } else {
    musicItem = musicList[index]
  }
  play(getMusicItem(musicItem, index));
}


// 从 list 中的一项 生成可播放的数据项
function getMusicItem(item, index) {
  const id = item.songId = item.id;
  // console.log(id);//////////////////////////////////////////
  item.songUrl = "http://127.0.0.1:3000/" + id + ".mp3";
  item.song_cover = item.al.picUrl;
  item.song_name = item.name;
  item.song_singer = item.ar[0].name;
  item.playlist = musicList;
  item.index = index;
  return item;
}

export {
  // consts
  current,
  isPlaying,
  musicList,
  events,

  // methods
  loadList,
  play,
  pause,
  next,
  prev,
  getTime,

  // utils
  getMusicItem,
};
