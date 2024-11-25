<script setup lang="ts">
import { throttle } from "@/utils/optimize";
defineProps({
  // 接收父组件传递过来的图标高度
  fontSize: {
    type: String,
    default: "3rem",
  },
});

// 距离顶部高度
const top = ref(0);
window.addEventListener(
  "scroll",
  throttle(() => {
    top.value =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
  }, 100)
);

// 返回顶部
function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
</script>

<template>
  <transition name="el-zoom-in-bottom">
    <div style="margin-top: 1rem" v-if="top >= 800" @click="backToTop">
      <el-tooltip effect="light" content="回到顶部" placement="left">
        <span
          :style="{ fontSize }"
          class="iconfont icon-caps-unlock-filling"
        ></span>
      </el-tooltip>
    </div>
  </transition>
</template>

<style scoped lang="scss">

</style>
