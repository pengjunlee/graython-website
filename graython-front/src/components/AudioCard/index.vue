<template>
  <div class="audio-player">
    <div class="top">
      <div :class="isPlaying ? 'playing onplay' : 'playing'">
        <div class="greenline line-1"></div>
        <div class="greenline line-2"></div>
        <div class="greenline line-3"></div>
        <div class="greenline line-4"></div>
        <div class="greenline line-5"></div>
      </div>
      <div class="audio-name">{{ name }}</div>
      <svg t="1728709721504" @click="download"
          style="float: right;margin-right: 10px;"
          class="control-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12683" width="20px" height="20px"><path d="M85.333333 585.813333a42.666667 42.666667 0 0 1 42.666667 42.666667v185.642667a42.666667 42.666667 0 0 0 42.666667 42.666666h682.666666a42.666667 42.666667 0 0 0 42.666667-42.666666V628.48a42.666667 42.666667 0 1 1 85.333333 0v185.642667a128 128 0 0 1-128 128H170.666667a128 128 0 0 1-128-128V628.48a42.666667 42.666667 0 0 1 42.666666-42.666667z" fill="#75C82B" p-id="12684"></path><path d="M341.333333 128a42.666667 42.666667 0 0 1 42.666667-42.666667h256a42.666667 42.666667 0 0 1 42.666667 42.666667v247.168h128a42.666667 42.666667 0 0 1 28.330666 74.581333l-298.666666 264.832a42.666667 42.666667 0 0 1-56.618667 0l-298.666667-264.832A42.666667 42.666667 0 0 1 213.333333 375.168h128V128z m85.333334 42.666667v247.168a42.666667 42.666667 0 0 1-42.666667 42.666666H325.76L512 625.621333l186.24-165.12H640a42.666667 42.666667 0 0 1-42.666667-42.666666V170.666667h-170.666666z" fill="#75C82B" p-id="12685"></path></svg>
       
    </div>
    <div class="controls">
      <div>
        <svg
          v-if="isPlaying"
          @click="togglePlay"
          t="1728707317333"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="8107"
          width="20px"
          height="20px"
        >
          <path
            d="M924.8 337.6c-22.6-53.3-54.9-101.3-96-142.4-41.1-41.1-89.1-73.4-142.4-96C631.1 75.8 572.5 64 512 64S392.9 75.8 337.6 99.2c-53.3 22.6-101.3 54.9-142.4 96s-73.4 89.1-96 142.4C75.8 392.9 64 451.5 64 512s11.8 119.1 35.2 174.4c22.6 53.3 54.9 101.3 96 142.4 41.1 41.1 89.1 73.4 142.4 96C392.9 948.2 451.5 960 512 960s119.1-11.8 174.4-35.2c53.3-22.6 101.3-54.9 142.4-96 41.1-41.1 73.4-89.1 96-142.4C948.2 631.1 960 572.5 960 512s-11.8-119.1-35.2-174.4zM662 867.1c-47.5 20.1-98 30.3-150 30.3s-102.5-10.2-150-30.2c-45.8-19.3-87-47.1-122.5-82.6-35.5-35.5-63.3-76.7-82.6-122.5-20.1-47.5-30.3-98-30.3-150s10.2-102.5 30.2-150c19.3-45.8 47.1-87 82.6-122.5 35.5-35.5 76.7-63.3 122.5-82.6 47.5-20.1 98-30.3 150-30.3s102.5 10.2 150 30.2c45.8 19.3 87 47.1 122.5 82.6C819.9 275 847.7 316.2 867 362c20.1 47.5 30.3 98 30.3 150s-10.2 102.5-30.2 150c-19.3 45.8-47.1 87-82.6 122.5-35.5 35.4-76.7 63.2-122.5 82.6z"
            fill="#6495ED"
            p-id="8108"
          ></path>
          <path
            d="M621.7 326.1H402.3c-42 0-76.2 34.2-76.2 76.2v219.3c0 42 34.2 76.2 76.2 76.2h219.3c42 0 76.2-34.2 76.2-76.2V402.3c0.1-42-34.1-76.2-76.1-76.2z m12.6 76.2v219.3c0 6.9-5.7 12.6-12.6 12.6H402.3c-6.9 0-12.6-5.7-12.6-12.6V402.3c0-6.9 5.7-12.6 12.6-12.6h219.3c7 0 12.7 5.7 12.7 12.6z"
            fill="#6495ED"
            p-id="8109"
          ></path>
        </svg>

        <svg
          v-else
          t="1728707282880"
          @click="togglePlay"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5227"
          width="20px"
          height="20px"
        >
          <path
            d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64z m0 80c-203.24 0-368 164.76-368 368s164.76 368 368 368 368-164.76 368-368-164.76-368-368-368z m-80 197.427a32 32 0 0 1 16 4.288l240.003 138.573c15.305 8.836 20.549 28.407 11.712 43.713a32 32 0 0 1-11.712 11.711L448.001 678.285c-15.306 8.837-34.877 3.594-43.713-11.711A32 32 0 0 1 400 650.573V373.427c0-17.673 14.327-32 32-32z"
            fill="#5090F1"
            p-id="5228"
          ></path>
        </svg>
 </div>
    </div>
    <!-- 控制条 -->
    <div class="progress_bar">
      <div class="time-info">
        <span>{{ formatTime(currentTime) }}</span>
        <input
          type="range"
          min="0"
          :max="actualDuration"
          step="0.1"
          v-model="currentTime"
        />
        <span>{{ formatTime(actualDuration) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from "vue";
import FileSaver from "file-saver";

interface AudioProps {
  url: string;
  name: string;
  duration: number;
}

const props = defineProps<AudioProps>();
const { url, name, duration } = toRefs(props);

const actualDuration = ref(duration.value);

// 是否第一次点击播放
const isFirstPlay = ref(true);

// 音频控制状态
const isPlaying = ref(false);
const currentTime = ref(0);
const showOverlay = ref(false); // 是否显示遮罩

// 格式化时间
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

import { onBeforeUnmount } from "vue";

// 模拟音频频谱的条数
const bars = Array.from({ length: 10 });

let audioContext: AudioContext | null; // Moved to be initialized after user interaction
const audioBuffer = ref<AudioBuffer | null>(null);
const audioSource = ref<AudioBufferSourceNode | null>(null);

let updateInterval: any | undefined;

// Initialize AudioContext on user gesture
const initializeAudioContext = async () => {
  if (!audioContext) {
    audioContext = new window.AudioContext();
  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  if (audioBuffer.value) {
    playAudio();
  } else {
    await loadAudio(url.value); // 替换为你的远程音频文件地址
    playAudio();
  }
};

// 切换播放和暂停
const togglePlay = () => {
  if (isFirstPlay.value) {
    initializeAudioContext();
    isFirstPlay.value = false;
  } else {
    if (isPlaying.value) {
      pauseAudio();
    } else {
      playAudio();
    }
  }
};

const playAudio = async () => {
  if (audioBuffer.value) {
    if (audioContext!.state === "suspended") {
      audioContext!.resume();
      console.log("播放中");
      isPlaying.value = true;
      // 继续更新播放进度
      updateInterval = setInterval(() => {
        if (audioContext!.state === "running") {
          currentTime.value = audioContext!.currentTime;
        }
      }, 100);
    } else {
      audioSource.value = audioContext!.createBufferSource();
      audioSource.value.buffer = audioBuffer.value;
      audioSource.value.connect(audioContext!.destination);
      audioSource.value.start();
      console.log("播放中...");
      isPlaying.value = true;
      // 继续更新播放进度
      updateInterval = setInterval(() => {
        if (audioContext!.state === "running") {
          currentTime.value = audioContext!.currentTime;
        }
      }, 100);
      audioSource.value.onended = () => {
        console.log("播放结束");
        isPlaying.value = false;
        clearInterval(updateInterval);
        currentTime.value = 0;
        audioContext = null;
        if (audioSource.value) {
          audioSource.value.stop(); // 停止当前音频
          audioSource.value = null; // 重置 sourceNode
        }
        isFirstPlay.value = true;
      };
    }
  }
};

const pauseAudio = () => {
  if (audioContext!.state === "running") {
    audioContext!.suspend().then(() => {
      console.log("已暂停");
      isPlaying.value = false;
      clearInterval(updateInterval);
    });
  }
};

// 加载远程音频文件
const loadAudio = async (url: string) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  audioBuffer.value = await new Promise<AudioBuffer>((resolve, reject) => {
    audioContext!.decodeAudioData(arrayBuffer, (buffer) => {
      if (buffer) {
        actualDuration.value = buffer.duration;
        resolve(buffer); // 解析成功，返回buffer
        console.log("音频已加载，准备播放");
      } else {
        reject(new Error("音频解码失败"));
      }
    });
  });
};

onBeforeUnmount(() => {
  if (audioSource.value) {
    audioSource.value.stop();
  }
  if (updateInterval) {
    clearInterval(updateInterval);
  }
});

function download() {
  fetch(url.value)
    .then((response) => response.blob())
    .then((blob) => {
      FileSaver.saveAs(blob, name.value); // 下载后的文件名
    })
    .catch((error) => console.error("下载音频异常:", error));
}
</script>

<style scoped>
.audio-player {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--gw-bg-active);
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--gw-bg-basic);
  padding: 5px;
  &:hover {
    cursor: default;
  }
}

.progress_bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  color: green;
}

.progress_bar .time-info {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.progress_bar .time-info span {
  flex-grow: 1;
  font-size: small;
  text-align: center;
}

.progress_bar .time-info input[type="range"] {
  flex-grow: 1;
  margin: 10px;
}

/* 在屏幕宽度小于 400px 时隐藏文字，只显示图标 */
@media (max-width: 1200px) {
  .progress_bar .time-info span {
    display: none;
  }
}

.top {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.playing {
  display: flex;
  position: relative;
  justify-content: center;
  gap: 1px;
  width: 30px;
  height: 20px;
}

.greenline {
  background-color: #1db954;
  height: 20px;
  width: 2px;
  position: relative;
  transform-origin: bottom;
}

.onplay {
  .line-1 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0.2s;
  }

  .line-2 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0.5s;
  }

  .line-3 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0.6s;
  }

  .line-4 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0s;
  }

  .line-5 {
    animation: infinite playing 1s ease-in-out;
    animation-delay: 0.4s;
  }
}

@keyframes playing {
  0% {
    transform: scaleY(0.1);
  }

  33% {
    transform: scaleY(0.6);
  }

  66% {
    transform: scaleY(0.9);
  }

  100% {
    transform: scaleY(0.1);
  }
}

.audio-name {
  flex: 1; /* Text takes up remaining space */
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflowing text */
  text-overflow: ellipsis; /* Add ellipsis (...) for overflow */
  text-align: center;
}

.controls {
  text-align: center;
  width: 100%;
  margin-top: 10px;
}

.control-icon {
  width: 20px;
  &:hover {
    cursor: pointer;
  }
}
.icon:hover {
  cursor: pointer;
}
</style>
