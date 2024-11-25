<template>
  <div class="container">
    <div class="glass">
      <div class="main">
        <div class="ball1"></div>
        <div class="ball2"></div>
        <div class="ball3"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: unset;
  overflow: hidden;
  color: black;
  animation: anime 5s linear infinite;
}
.glass {
  border: 5px solid #3498db;
  width: 400px;
  height: 600px;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  border-top-left-radius: 60% 80%;
  border-top-right-radius: 60% 80%;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  overflow: hidden;
  background: linear-gradient(green, red);
  box-shadow: inset 0 0 20px #3498db, inset 0 0 40px #3498db,
    inset 0 0 80px #3498db;
}
.main {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(51, 51, 51, 0.1);
  filter: blur(10px) contrast(10);
}

.ball1,
.ball2,
.ball3 {
  left: 50%;
  position: absolute;
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: -1;
  bottom: 0%;
  background: #e67e22;
}
.ball1 {
  width: 250px;
  height: 250px;
  animation: move 25s ease infinite;
}
.ball2 {
  width: 150px;
  height: 150px;
  animation: move 13s linear infinite;
}
.ball3 {
  width: 200px;
  height: 200px;
  bottom: 0%;
  animation: move 17s linear infinite;
}

@keyframes move {
  50% {
    bottom: calc(100% - 250px);
    background: #34ace0;
  }
}
</style>
