<template>
  <div class="container">
    <div class="main">
      <div class="up"></div>
      <div class="down"></div>
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 200px;
  animation: turn 6s linear infinite;
}
.up,
.down {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 4px solid #2c3e50;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 0 10px #f1c40f, 0 0 20px #f1c40f, inset 0 0 10px #3498db,
    inset 0 0 20px #3498db, inset 0 0 40px #3498db;
}
.up {
  top: 0;
  border-bottom-left-radius: 45% 100%; /* 调整边框的外形 */
  border-bottom-right-radius: 45% 100%;
  border-bottom: none;
  border-top: 6px solid #c0392b;
}
.down {
  bottom: 0;
  border-top-left-radius: 45% 100%;
  border-top-right-radius: 45% 100%;
  border-top: none;
  border-bottom: 6px solid #c0392b;
}
.up::before,
.down::before {
  content: "";
  position: absolute;
  width: 100%;
  background: #f1c40f;
  filter: blur(4px);
  bottom: 0;
  z-index: -1;
}
.up::before {
  height: 100%;
  animation: fillup 6s linear infinite;
}
.down::before {
  height: 0;
  animation: filldown 6s linear infinite;
}
@keyframes turn {
  /* 旋转main */
  0%,
  40% {
    transform: translate(-50%, -50%);
  }
  50%,
  90% {
    transform: translate(-50%, -50%) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes fillup {
  /* 翻转后调整伪类的位置 */
  40%,
  50% {
    height: 0;
  }
  90%,
  100% {
    top: 0;
    height: 100%;
  }
}
@keyframes filldown {
  40%,
  50% {
    height: 100%;
  }
  90%,
  100% {
    top: 0;
    height: 0;
  }
}

</style>
