<template>
  <div class="container">
    <div class="main">
      <div class="text">
        <div style="--t:1">G</div>
        <div style="--t:2">R</div>
        <div style="--t:3">A</div>
        <div style="--t:4">Y</div>
        <div style="--t:5">T</div>
        <div style="--t:6">H</div>
        <div style="--t:7">O</div>
        <div style="--t:8">N</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: unset;
  overflow: hidden;
  color: black;
  animation: anime 5s linear infinite;
}
.main {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  width: 200px;
  perspective: 1000px; /*设置观察者距离*/
  padding-top: 50px;
}
.text {
  width: 100%;
  transform-style: preserve-3d; /*变型方式为3D变型*/
  animation: roll 20s linear infinite;
}
.text div {
  font-size: 100px;
  position: absolute;
  width: 100%;
  color: rgba(51, 51, 51, 0); /* 使用rgba方式让文字透明化 */
  text-align: center;
  transform: rotateY(calc(45deg * var(--t) - 45deg)) translateZ(241px); /* 旋转及在纵深方向位移 拼成完整的环形 */
  border-top: 5px solid white;
  border-bottom: 5px solid white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  animation: light 20s linear infinite calc(20s / 8 * (var(--t) - 1)); /* 依次点亮文字 */
}
@keyframes roll {
  100% {
    transform: rotateY(-360deg);
  }
}
@keyframes light { /* 12.5%为 100%/8 计算得出 */
  0%,
  12.5% {
    color: white;
    text-shadow: 0 0 20px #2980b9, 0 0 40px #2980b9, 0 0 80px #2980b9;
  }
  87.5%,
  100% {
    filter: hue-rotate(360deg);
    color: rgba(51, 51, 51, 0);
  }
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20vw;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #2980b9;
  filter: blur(0.5vw);
}
</style>
