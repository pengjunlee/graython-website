<template>
  <div class="gray-home-root">
    <div class="banner-div">
      <div class="round-div-1"></div>
      <div class="round-div-2"></div>
      <div class="pic-div">
        <img id="bannerImg" src="" style="z-index: 888" alt="banner image" />
      </div>
      <!-- 波浪 -->
      <Wave></Wave>
    </div>
  </div>
</template>

<script setup lang="ts">
import Wave from "@/components/Wave/index.vue";
import emitter from "@/utils/mitt";

const dayImage = "./light.png";
const nightImage = "./dark.png";

const handleDayNightChange = async (isDark: any) => {
  console.log("主题又变了");
  let bannerImg = document.getElementById("bannerImg");
  if (bannerImg instanceof HTMLImageElement) {
    bannerImg.src = isDark ? nightImage : dayImage;
  }
};

onMounted(() => {
  handleDayNightChange(document.documentElement.classList.contains("dark"));
  emitter.on("dayNightChanged", (isDark) => {
    handleDayNightChange(isDark);
  });
});

onUnmounted(() => {
  emitter.off("dayNightChanged", handleDayNightChange);
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
</style>
