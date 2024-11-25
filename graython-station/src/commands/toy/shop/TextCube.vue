<template>
  <div class="container">
    <div class="cube">
      <div class="side cube-front">
        <h2>Front</h2>
        <p>If you smile upon the wrold, it will smile upon you.</p>
      </div>
      <div class="side cube-back">
        <h2>Back</h2>
        <p>If you smile upon the wrold, it will smile upon you.</p>
      </div>
      <div class="side cube-left">
        <h2>Left</h2>
        <p>If you smile upon the wrold, it will smile upon you.</p>
      </div>
      <div class="side cube-right">
        <h2>Right</h2>
        <p>If you smile upon the wrold, it will smile upon you.</p>
      </div>
      <div class="side cube-top">
        <h2>Top</h2>
        <p>If you smile upon the wrold, it will smile upon you.</p>
      </div>
      <div class="side cube-bottom">
        <h2>Bottom</h2>
        <p>If you smile upon the wrold, it will smile upon you.</p>
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

.cube {
  width: 200px;
  height: 200px;
  position: absolute;
  transform-style: preserve-3d;
  transform: rotateY(0deg) rotateX(-45deg) rotateZ(-45deg);
  animation: cube 8s linear infinite;
}
.cube .side {
  width: 100%;
  height: 100%;
  position: absolute;
  box-sizing: border-box;
  border: 1px solid #000;
  padding: 10px;
  background-color: #ffffffd9;
}
.cube .cube-front {
  transform: rotateY(0deg) translateZ(100px);
}
.cube .cube-back {
  transform: rotateY(180deg) translateZ(100px);
}
.cube .cube-left {
  transform: rotateY(-90deg) translateZ(100px);
}
.cube .cube-right {
  transform: rotateY(90deg) translateZ(100px);
}
.cube .cube-top {
  transform: rotateX(90deg) translateZ(100px);
}
.cube .cube-bottom {
  transform: rotateX(-90deg) translateZ(100px);
}
@keyframes cube {
  0% {
    transform: rotateY(0deg) rotateX(-45deg) rotateZ(-45deg);
  }
  100% {
    transform: rotateY(360deg) rotateX(-45deg) rotateZ(-45deg);
  }
}
.cube:hover {
  animation-play-state: paused;
}
</style>
