<template>
  <div class="container">
    <div id="year" ref="yearRef"></div>
    <div class="main">
      <span ref="monthRef" id="month"></span>
      <span ref="dayRef" id="day"></span>
      <span ref="hourRef" id="hour"></span>
      <span ref="minRef" id="min"></span>
      <span ref="secRef" id="sec"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const yearRef = ref();
const monthRef = ref();
const dayRef = ref();
const hourRef = ref();
const minRef = ref();
const secRef = ref();

onMounted(() => {
  var monbox = monthRef.value;
  var daybox = dayRef.value;
  var hourbox = hourRef.value;
  var minbox = minRef.value;
  var secbox = secRef.value;
  var yeardiv = yearRef.value;
  setInterval(() => {
    clock(yeardiv, monbox, daybox, hourbox, minbox, secbox);
  }, 1000);
});

const clock = (
  yeardiv: HTMLElement,
  monbox: HTMLElement,
  daybox: HTMLElement,
  hourbox: HTMLElement,
  minbox: HTMLElement,
  secbox: HTMLElement
) => {
  var d = new Date();
  var mon = d.getMonth();
  var day = d.getDate();
  var hour = d.getHours();
  var min = d.getMinutes();
  var sec = d.getSeconds();
  var year = d.getFullYear();

  monbox.style.setProperty("--s", String((mon / 12) * 100) + "%");
  monbox.setAttribute("datatext", ("0" + (mon + 1)).slice(-2));

  var allday = new Date(year, mon + 1, 0).getDate() ;
  daybox.style.setProperty("--s", String((day / allday) * 100) + "%");
  daybox.setAttribute("datatext", ("0" + day).slice(-2));

  hourbox.style.setProperty("--s", String((hour / 24) * 100) + "%");
  hourbox.setAttribute("datatext", ("0" + hour).slice(-2));

  minbox.style.setProperty("--s", String((min / 60) * 100) + "%");
  minbox.setAttribute("datatext", ("0" + min).slice(-2));

  secbox.style.setProperty("--s", String((sec / 60) * 100) + "%");
  secbox.setAttribute("datatext", ("0" + sec).slice(-2));

  yeardiv.innerText = year.toString();
};
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
.main {
  position: absolute;
  width: 80vw;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}
span {
  width: 10vw;
  height: 20vh;
  border: 2px solid white;
  margin: 1vw;
  border-radius: 1vw;
  position: relative;
}
span::after {
  content: "";
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid transparent;
  bottom: 0;
  border-radius: 1vw;
  filter: blur(2px);
  transition: 1s linear;
  height: var(--s);
  z-index: -1;
}
#month::after {
  background: #8854d0;
}
#day::after {
  background: #3867d6;
}
#hour::after {
  background: #20bf6b;
}
#min::after {
  background: #d1d8e0;
}
#sec::after {
  background: #4b6584;
}

span::before {
  content: attr(datatext); /*  直接注释掉这行可以不显示文字哦 */
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  color: white;
  font-size: 5vw;
  top: 20%;
  text-shadow: 0 0 1px black, 0 0 10px gray;
}
#year {
  position: absolute;
  font-size: 30vw;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fed330;
  filter: blur(0.5vw);
}

</style>
