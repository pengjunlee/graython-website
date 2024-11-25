<script setup lang="ts">
import DayNight from "../DayNight/index.vue";
import Fullscreen from "../Fullscreen/index.vue";
import ToTop from "../ToTop/index.vue";

const moreRef = ref();
const props = defineProps({
  toTop: {
    type: Boolean,
    default: false,
  },
});
const { toTop } = toRefs(props);
const isContainerVisible = ref(false);

const toggleContainer = () => {
  colorAnimation();
  if(isContainerVisible.value){
    isContainerVisible.value = false;
    moreRef.value.classList.add("hide");
  }else{
    isContainerVisible.value = true;
    moreRef.value.classList.remove("hide");
  }
  
};
const colorAnimation = () => {
  const circle = document.getElementById("menu-icon");
  circle?.classList.add("active");
  setTimeout(function () {
    circle?.classList.remove("active");
  }, 1000);
};
// 自定义事件
const emit = defineEmits(["ReadingMode"]);

onMounted(() => {
  console.log(toTop.value);
});
</script>

<template>
  <div class="toolbox_div">
    <div ref="moreRef" class="hide">
      <DayNight></DayNight>
      <Fullscreen></Fullscreen>
    </div>
    <div class="rotate-box" @click="toggleContainer">
      <el-tooltip effect="light" content="更多功能" placement="left">
        <span id="menu-icon" class="iconfont icon-menu"></span>
      </el-tooltip>
    </div>
    <div class="mb-4">
      <ToTop v-if="toTop" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.toolbox_div {
  z-index: 7777;
  position: fixed;
  bottom: 7rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

.hide {
  opacity: 0;
  height: auto;
  transition: all 0.5s;
  transform: translate(9rem, 0);
}

.visible {
  height: auto;
  opacity: 1;
  transform: translate(0, 0); /* 当添加 .visible 类时，容器滑入 */
  transition: all 0.5s;
}

.rotate-box {
  animation: rotating 3s linear infinite;
}


</style>
