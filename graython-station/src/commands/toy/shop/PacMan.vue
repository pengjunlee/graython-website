<template>
  <div class="container">
    <div class="main">
      <span class="pacman"></span>
      <span class="dot"></span>
      <span class="eye"></span>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 300px;
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
  width: 300px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.pacman {
  width: 100%;
  height: 100%;
  position: absolute;
}
.pacman::before,
.pacman::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 50%;
  background: #f1c40f;
  animation: eat 1s linear infinite;
}
.pacman::before {
  top: 0;
  border-radius: 300px 300px 0 0; /* 利用不同边的圆角画出半圆 */
  transform-origin: 50% 100%; /* 定位变型原点为底部中央*/
  transform: rotate(-45deg);
}
.pacman::after {
  bottom: 0;
  border-radius: 0 0 300px 300px;
  transform-origin: 50% 0; /* 定位变型原点为顶部中央 */
  transform: rotate(45deg);
}
@keyframes eat {
  50% {
    transform: rotate(0);
  }
}
.dot { /* 圈定原点的进入和消失范围 */
  width: 400px;
  height: 60px;
  position: absolute;
  right: -50%;
  top: 50%;
  transform: translateY(-50%);
  overflow: hidden;
  z-index: -1;
}
.dot::before,
.dot::after { /* 原点的默认位置移到范围外 */
  content: "";
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  background: #f39c12;
  transform: translateY(-50%);
  right: -40px;
}
.dot::before {
  animation: move 2s linear infinite;
}
.dot::after {
  animation: move 2s linear infinite 1s; /* 延迟进场~*/
}
@keyframes move {
  100% {
    right: 100%;
  }
}

.eye { /* 随便画个眼睛 */
  width: 40px;
  height: 40px;
  background: black;
  border-radius: 50%;
  position: absolute;
  top: 20%;
  left: 50%;
}

</style>
