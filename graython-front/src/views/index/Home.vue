<template>
  <div class="gray-home-root">
    <div class="banner-div">
      <div class="round-div-1"></div>
      <div class="round-div-2"></div>
      <div class="pic-div">
        <img id="bannerImg" src="" style="z-index: 888" alt="banner image" />
        <!-- 使用 printer 组件 -->
        <Printer class="printer"
          :printerInfo="textToPrint"
          :working="isPrinting"
          :duration="500"
          :delay="500"
          :once="false"
        >
          <template #paper="{ content }">
            <h3>{{ content }}<span class="cursor">|</span></h3>
          </template>
        </Printer>
      </div>
      <!-- 波浪 -->
      <!-- <Wave></Wave> -->
      <div id="bannerWave1"></div>
      <div id="bannerWave2"></div>
    </div>
    <!-- <photo :resourcePathList="photoList"></photo> -->
  </div>
</template>

<script setup lang="ts">
import Printer from '@/components/Printer/index.vue';
import emitter from '@/utils/mitt';


const dayImage = './light.png';
const nightImage = './dark.png';
// const photoList = ref([
//   {
//     "id": 137,
//     "title": "佳能M50",
//     "cover": "/preview/1/wallpaper/%E7%94%B5%E8%84%91%E5%A3%81%E7%BA%B8/12.png",
//     "createTime": "2023-07-17 11:37:15"
//   },
//   {
//     "id": 136,
//     "title": "苹果14pro",
//     "cover": "/preview/1/wallpaper/%E7%94%B5%E8%84%91%E5%A3%81%E7%BA%B8/41.png",
//     "createTime": "2023-07-17 11:36:43"
//   },
//   {
//     "id": 135,
//     "title": "苹果16pro",
//     "cover": "/preview/1/wallpaper/%E7%94%B5%E8%84%91%E5%A3%81%E7%BA%B8/9.JPG",
//     "createTime": "2023-07-17 11:36:43"
//   }
// ]);

// 定义响应式数据
const textToPrint = ref('技术造就艺术!');
const isPrinting = ref(true);

const handleDayNightChange = async (isDark: any) => {
  console.log('主题又变了');
  let bannerImg = document.getElementById('bannerImg');
  if (bannerImg instanceof HTMLImageElement) {
    bannerImg.src = isDark ? nightImage : dayImage;
  }
};

onMounted(() => {
  handleDayNightChange(document.documentElement.classList.contains('dark'));
  emitter.on('dayNightChanged', (isDark) => {
    handleDayNightChange(isDark);
  });
});

onUnmounted(() => {
  emitter.off('dayNightChanged', handleDayNightChange);
});
</script>

<style scoped lang="scss">
.gray-home-root {
  @include box(100%, 100%);
  @include flex(column, center, center);
  position: relative;
  overflow: hidden;
}
.banner-div {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.pic-div {
  display: flex;
  flex-direction: row-reverse;
  width: 100vw;
  height: 100vh;
  img {
    width: 100%;
    height: auto;
    object-fit: scale-down;
  }
}

.round-div-1 {
  background: var(--gw-banner-round-1);
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  position: absolute;
  left: 5rem;
  top: 5rem;
}

.round-div-2 {
  background: rgba(227, 126, 15, 0.2);
  border-radius: 50%;
  width: 20rem;
  height: 20rem;
  position: absolute;
  right: 10rem;
  top: 10rem;
}

#bannerWave1 {
  height: 84px;
  background: var(--gw-banner-wave-1);
  position: absolute;
  width: 200%;
  bottom: 0;
  z-index: 890;
  animation: gradientBG 120s linear infinite;
}

#bannerWave2 {
  height: 100px;
  background: var(--gw-banner-wave-2);
  position: absolute;
  width: 400%;
  bottom: 0;
  z-index: 889;
  animation: gradientBG 120s linear infinite;
}

.printer {
  cursor: pointer;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  position: absolute;
  bottom: 2rem;
  left: 50%;
  z-index: 900;
  transform: translate(-50%, -50%); /* 使用 transform 来平移 50% 使元素真正居中 */

}
</style>
