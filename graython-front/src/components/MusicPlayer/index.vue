<script setup lang="ts">
import emitter from "@/utils/mitt";
import { randomMusicApi } from "@/api/music"
import { getWebsiteApiBaseUrl } from '@/utils/env'
import { ro } from "element-plus/es/locales.mjs";
const isPlaying = ref(false);
const currentMusic = ref({id: '',
          name: '',
          src: '',
          img: "./favicon.png",
          artist: '',
          lyrics: ''
        });
const musicList = ref<any[]>([
]);
const showPlayer = ref(false);
const musicPlayerRef = ref();
const showLyrics = ref<boolean>(false);


const audioRef = ref();
const musicImgRef = ref();
const musicNameRef = ref();
const musicAuthorRef = ref();
const lyricContentRef = ref();

const musicInfoRef = ref();
const infoLeftRef = ref();
const lyricMaskRef = ref();
const playerProgressRef = ref();
const musicTimeRef = ref();
const soundProgressRef = ref();
const roundRef = ref();
const soundProgressBarRef = ref();

const firstTimeMusicLyric = ref(true);


let musicImageSrc = computed(() => {
  return "./favicon.png";
});

let timer: any;
let duration: number,
  nowPlayIndex = 0;
// 加载完MP3需要设置时间显示与进度条监听
function canPlay() {
  if (timer) {
    clearInterval(timer);
  }
  duration = audioRef.value.duration;
  timer = setInterval(function () {
    timeAndProgress();
  }, 1000);
}

// 处理时间显示进度条
function timeAndProgress() {
  if (showPlayer.value && playerProgressRef.value) {
    playerProgressRef.value.style.width =
      (audioRef.value.currentTime / audioRef.value.duration) * 100 + "%";
    let time: number = audioRef.value.duration - audioRef.value.currentTime;
    let minue = parseInt(String(time / 60));
    let second = parseInt(String(time % 60));
    let str = `${minue < 10 ? "0" + minue : minue}:${
      second < 10 ? "0" + second : second
    }`;
    musicTimeRef.value.innerHTML = str;
    lycSlide();
  }
}

// 获取歌词
let timeArr: any[] = [];
let lrcArr: string[] = [];

// 歌词正常滚动
function lycSlide() {
  if (showLyrics.value) {
    let index = binarySearch(timeArr, Math.floor(audioRef.value.currentTime));
    if(index < 0 ) index = 0;
    lyricContentRef.value.style.top = index * -21 + 150 + "px";
    [...lyricContentRef.value.children].forEach((item) => {
      item.style.color = "var(--gw-bg-font)";
    });
    lyricContentRef.value.children[index].style.color = "aqua";
  }
}

function lyricInit() {
  // 获取歌词
  let insertLrcStr = "";
  timeArr = [];
  lrcArr = [];
  let lyricStr = currentMusic?.value.lyrics;
  if(!lyricStr) {
    insertLrcStr += '<li>未发现歌词</li>';
    timeArr = [0];
  }else{
    try {
    const str = lyricStr.split("\n");
    str.forEach((item: any) => {
      const splitLyc = item.split("::");
      timeArr.push(splitLyc[0]);
      lrcArr.push(splitLyc[1]);
      insertLrcStr += `<li>${lrcArr[lrcArr.length - 1]}</li>`;
    });
  } catch (e) {
    insertLrcStr += '<li>歌词格式不正确</li>';
    timeArr = [0];
  }
  }
  

  if (showPlayer.value) {
    lyricContentRef.value.innerHTML = insertLrcStr;
  }
}

// 格式化时间
function timeFormat(timeStr: string) {
  if (timeStr) {
    const timeStrArr = timeStr.split(":");
    const minute = timeStrArr[0];
    const second = timeStrArr[1];
    return parseInt(minute) * 60 + parseInt(second);
  }
}

// 设置播放的音乐和图片
function setMusic(index: number) {
  if (musicList.value.length > 0) {
    let music = musicList.value[index];
    currentMusic.value = music;
    // musicImgRef.value.src = music.img;
    audioRef.value.src = music.src;
    emitter.emit('musicChanged',currentMusic.value);
    firstTimeMusicLyric.value = true;
    if (showPlayer.value) {
      musicAuthorRef.value.innerHTML = music.artist;
      musicNameRef.value.innerHTML = music.title;
      if(showLyrics.value){
        lyricInit();
      }
    }
  }
}
// 播放音乐
function playMusic() {
  audioRef.value.play();
  isPlaying.value = true;
}

// 暂停音乐
function pauseMusic() {
  audioRef.value.pause();
  isPlaying.value = false;
}

// 上一首
function previousMusic() {
  if (nowPlayIndex == 0) {
    nowPlayIndex = musicList.value.length - 1;
  } else {
    nowPlayIndex--;
  }
  setMusic(nowPlayIndex);
  playMusic();
}

// 下一首
function nextMusic() {
  if (nowPlayIndex == musicList.value.length - 1) {
    nowPlayIndex = 0;
  } else {
    nowPlayIndex++;
  }
  setMusic(nowPlayIndex);
  playMusic();
}

// 二分查找
function binarySearch(arr: any, target: any, left = 0, right = arr.length - 1) {
  if (left > right) return left - 1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] > target) {
    return binarySearch(arr, target, left, mid - 1);
  } else {
    return binarySearch(arr, target, mid + 1, right);
  }
}

function toogleLyrics() {
  if(firstTimeMusicLyric.value){
    lyricInit();
    firstTimeMusicLyric.value = false;
  }
  if (!showLyrics.value) {
    musicInfoRef.value.style.display = "block";
    lyricMaskRef.value.style.display = "block";
    infoLeftRef.value.style.width = "100%";
    showLyrics.value = true;
  } else {
    musicInfoRef.value.style.display = "flex";
    lyricMaskRef.value.style.display = "none";
    infoLeftRef.value.style.width = "40%";
    showLyrics.value = false;
  }
}

function adjustProgress(e: any) {
  audioRef.value.currentTime = (e.offsetX / e.target.offsetWidth) * duration;
  timeAndProgress();
}

// 点击声音条更改声音大小
function adjustSound(e: any) {
  audioRef.value.volume = e.offsetX / e.target.offsetWidth;
  soundProgressRef.value.style.width =
    (e.offsetX / e.target.offsetWidth) * 100 + "%";
}

// 声音拖动
function roundMouseDown() {
  let soundBarLength = soundProgressBarRef.value.offsetWidth;

  // 鼠标移动
  document.onmousemove = function (ev) {
    let myEvent = ev || event;
    let disX =
      myEvent.clientX - soundProgressBarRef.value.getBoundingClientRect().left;
    if (disX > soundBarLength) {
      disX = soundBarLength;
    } else if (disX == 0) {
      disX = 0;
    }
    soundProgressRef.value.style.width = (disX / soundBarLength) * 100 + "%";
    audioRef.value.volume = disX / soundBarLength;
  };

  // 鼠标抬起
  document.onmouseup = function () {
    document.onmousemove = null;
    document.onmouseup = null;
  };
}

const isDragging = ref(false); // 判断是否正在拖动
let width = 0;
let height = 0;
// 开始拖动
const startDrag = (event: MouseEvent) => {
  isDragging.value = true;
  if (musicPlayerRef.value) {
    let rect = musicPlayerRef.value.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
  }

  // 监听鼠标移动和释放事件
  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
};

// 拖动过程
const onDrag = (event: MouseEvent) => {
  if (isDragging.value && musicPlayerRef.value) {
    musicPlayerRef.value.style.left = event.clientX + width / 2 - 18 + "px";
    musicPlayerRef.value.style.top = event.clientY + height / 2 - 18.75 + "px";
  }
};

// 停止拖动
const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
};
onMounted( () => {
  const instance = getCurrentInstance();
  if (instance) {
    // 可以访问组件实例
    window._MusicPlayer = instance.proxy; // 通过 proxy 获取到组件实例
  }

  setMusic(0);
  emitter.on("playMusic", () => {
    playMusic();
  });
  emitter.on("previousMusic", () => {
    previousMusic();
  });
  emitter.on("nextMusic", () => {
    nextMusic();
  });
  emitter.on("setMusic", (index:any) => {
    setMusic(index);
  });
  emitter.on("playSelectedMusic", (rows:any) => {
    musicList.value.unshift(...rows.map((music: any) => {
        return {
          id: music.id,
          name: music.title,
          src: getWebsiteApiBaseUrl() + music.previewUrl.replace("//","/"),
          img: music.artistThumbnail ? getWebsiteApiBaseUrl() + music.artistThumbnail:"./favicon.png",
          artist: music.artist,
          lyrics: music.lyrics
        }}));
  });
});

onUnmounted(() => {
  delete window._MusicPlayer;
  emitter.off("playMusic");
  emitter.off("previousMusic");
  emitter.off("nextMusic");
  emitter.off("setMusic");
  emitter.off("playSelectedMusic");
});
import { defineExpose } from 'vue';
// 使用 defineExpose 暴露 playMusic 方法
defineExpose({
  playMusic,
});
</script>

<template>
  <div v-show="showPlayer" ref="musicPlayerRef" class="music-player-wrapper">
    <div class="music-player-top">
      <span @mousedown="startDrag" class="iconfont icon-hand"></span>
      <span @click="showPlayer = false" class="iconfont icon--"></span>
    </div>
    <div class="music-player">
      <div class="top-bar">
        <span class="iconfont icon-24gl-volumeMiddle"></span>
        <div ref="soundProgressBarRef" class="progress-bar sound-progress-bar">
          <span @click="adjustSound" class="duration-bar sound-duration"></span>
          <span ref="soundProgressRef" class="progress sound-progress">
            <span
              @mousedown="roundMouseDown"
              ref="roundRef"
              class="round"
            ></span>
          </span>
        </div>
        <span class="iconfont icon-geciweidianji" @click="toogleLyrics"></span>
      </div>

      <div ref="musicInfoRef" class="music-info">
        <div ref="infoLeftRef" class="info-left">
          <img
            ref="musicImgRef"
            class="music-img"
            alt=""
            :src="currentMusic.img"
            onerror="this.src='./favicon.png';"

          />
          <div ref="lyricMaskRef" class="lyric-mask">
            <div class="lyric-wrapper">
              <ul
                ref="lyricContentRef"
                id="lyc-content"
                style="top: 100px"
              ></ul>
            </div>
          </div>
        </div>

        <div class="info-right">
          <div class="music-name">
            <span ref="musicNameRef" class="name">{{ currentMusic.name || '放首歌听听吧' }}</span>
            <span ref="musicAuthorRef" class="musician">{{ currentMusic.artist|| '' }}</span>
          </div>
          <div class="playback-setting">
            <span
              @click="previousMusic"
              class="iconfont icon-next previous"
            ></span>
            <span
              v-if="isPlaying"
              @click="pauseMusic"
              class="iconfont icon-zanting1"
            ></span>
            <span v-else @click="playMusic" class="iconfont icon-bofang"></span>
            <span @click="nextMusic" class="iconfont icon-next next"></span>
          </div>
        </div>
      </div>
      <div @click="adjustProgress" class="progress-bar player-progress-bar">
        <span class="duration-bar play-duration"></span>
        <span ref="playerProgressRef" class="progress player-progress"></span>
        <span ref="musicTimeRef" class="time">00:00</span>
      </div>
    </div>
  </div>
  <div v-show="!showPlayer" class="music-disc">
    <img
      @click="showPlayer = !showPlayer"
      class="music-img"
      :src="currentMusic.img"
      alt="musician logo"
      onerror="this.src='./favicon.png';"
    />
    <div class="info-box">
      <div class="info">
        <div class="text-sm whitespace-nowrap">
          {{ currentMusic?.name || "放首歌来听吧" }}
        </div>
        <div class="text-sm whitespace-nowrap">
          {{ currentMusic?.artist }}
        </div>
      </div>
      <span
        @click="nextMusic"
        style="margin-right: 1rem"
        class="iconfont icon-next"
      ></span>
      <span
        @click="pauseMusic"
        v-if="isPlaying"
        class="iconfont icon-zanting1"
      ></span>
      <span @click="playMusic" v-else class="iconfont icon-bofang"></span>
    </div>
  </div>
  <audio
    src=""
    ref="audioRef"
    @timeupdate="lycSlide"
    @canplay="canPlay"
    @ended="nextMusic"
  ></audio>
</template>

<style lang="scss" scoped>
@import "./style.css";
@import "@/assets/styles/iconfont/player/iconfont.css";

.music-disc {
  position: fixed;
  box-sizing: border-box;
  background-color: var(--gw-bg-active);
  display: flex;
  align-items: center;
  z-index: 9999;
  cursor: pointer;
  transition: left 0.3s;
  bottom: 10rem;
  height: 6rem;
  border-radius: 3rem;
  left: -30px;
  .music-img {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    animation: rotating 5s linear infinite;
  }
  .info-box {
    display: none;
    transition: width 0.2s;
    font-family: ChillDuanSans_Light;
    .info {
      padding: 0 0.5rem;
    }
  }
}
.iconfont:hover {
  color: var(--gw-icon-active-color);
}

.music-disc:hover {
  left: 0;
  padding-right: 2rem;
  .info-box {
    display: flex;
    align-items: center;
  }
}
</style>
