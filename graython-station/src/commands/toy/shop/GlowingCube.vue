<template>
  <div class="container">
    <div class="box">
      <div class="top"></div>
      <div>
        <span style="--n: 0"></span>
        <span style="--n: 1"></span>
        <span style="--n: 2"></span>
        <span style="--n: 3"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

onMounted(() => {});
</script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: unset;
  overflow: hidden;
  animation: anime 5s linear infinite;
}

.box div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.box div span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(#222, #2bf82b);
  opacity: 0.8;
  transform: rotateY(calc(90deg * var(--n))) translateZ(150px);
  border: 5px solid green;
}

.box {
  position: relative;
  width: 300px;
  height: 300px;
  transform-style: preserve-3d;
  transform: rotateX(-30deg);
  animation: rotate 5s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotateX(-30deg) rotateY(0deg);
  }
  100% {
    transform: rotateX(-30deg) rotateY(360deg);
  }
}

.top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #333;
  box-shadow: 0 0 10px 5px green, 0 0 200px 7px greenyellow,
    0 0 200px 20px lightgreen, 0 0 30px 25px green;
  transform: rotateX(90deg) translateZ(150px);
}

.top::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 120px rgba(0, 255, 0, 0.2), 0 0 200px rgba(0, 255, 0, 0.4),
    0 0 200px rgba(0, 255, 0, 0.4), 0 0 200px rgba(0, 255, 0, 0.4);
  filter: blur(20px);
  transform: translateZ(-350px);
}
</style>
