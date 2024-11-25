<template>
  <div class="container">
    <div class="pointer-wrap">
      <img
        ref="pointerRef"
        id="pointer"
        src="./green_bottle.png"
        alt="pointer"
      />
    </div>
    <div class="btn-wrap">
      <button ref="btnRef" id="btn" class="btn">Run</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const btnRef = ref();
const pointerRef = ref();

onMounted(() => {
  let angle = 0;
  const pointer = pointerRef.value;
  const btn = btnRef.value;

  btn.addEventListener("click", function () {
    angle = angle + 2 * 360 + Math.random() * 360;
    pointer.style.transform = `rotate(${angle}deg)`;
  });
});
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
.pointer-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
#pointer {
  height: 300px;
  transition: transform 3000ms ease-in-out;
}
.btn-wrap {
  text-align: center;
}
.btn {
  width: 150px;
  height: 40px;
  background-color: cornflowerblue;
  border: none;
  border-radius: 20px;
  box-shadow: 2px 2px 2px #ccc;
  cursor: pointer;
}
</style>
