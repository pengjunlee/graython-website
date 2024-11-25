<template>
  <div class="container">
    <svg class="text" width="900px" height="150px">
      <!-- 定义渐变颜色 -->
      <defs>
        <linearGradient id="geekColor" gradientTransform="rotate(90)">
          <stop offset="0%" stop-color="#91bd3a">
            <!-- 渐变动画 -->
            <animate
              attributeName="stop-color"
              values="#91bd3a;#12cad6;#91bd3a"
              dur="10s"
              begin="3s"
              repeatCount="indefinite"
            ></animate>
          </stop>

          <stop offset="100%" stop-color="#12cad6">
            <animate
              attributeName="stop-color"
              values="#12cad6;#91bd3a;#12cad6"
              dur="10s"
              begin="3s"
              repeatCount="indefinite"
            ></animate>
          </stop>
        </linearGradient>
      </defs>
      <text class="logo_text" x="0" y="100">Graython个人工作站</text>
    </svg>
  </div>
</template>

<script setup lang="ts">
interface Props {
  demos: string;
}

// 定义 props
const props = defineProps<Props>();
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 100vw;
}

.logo_text {
  font-family: "PingFang SC";
  font-size: 84px;
  fill: none;
  stroke: url("#geekColor");
  stroke-width: 1;
  stroke-dasharray: 10 800;
  stroke-dashoffset: 10;

  animation: 3s linear 0s drawing forwards;
}

/* 绘画动画 */
@keyframes drawing {
  to {
    stroke-dasharray: 800;
    stroke-dashoffset: 0;
  }
}
</style>
