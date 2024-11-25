<template>
  <div class="container">
    <div class="main" id="main">
      <h1 class="white">
        {{ year }}
      </h1>
      <!-- 
          vue的使用方法可以详见vue.js的官方主页，
          这里主要用到的是v-for循环,获取数组内容及索引值,
          v-bind:style绑定css变量
          以及使用v-bind:class绑定CSS指定类 
      -->
      <div v-for="(m,k) in month" class="month" v-bind:style="{'--m': k}" v-bind:class="{white:k == 0}">
        {{ m }}
      </div>
      <div v-for="(d,k) in days" class="days" v-bind:style="{'--d':k}" v-bind:class="{white:k == 0}">
        {{ d }}
      </div>
      <div v-for="(h,k) in hours" class="hours" v-bind:style="{'--h':k}" v-bind:class="{white:k == 0}">
        {{ h }}
      </div>
      <div v-for="(min,k) in minutes" class="min" v-bind:style="{'--min':k}" v-bind:class="{white:k == 0}">
        {{ min }}
      </div>
      <div v-for="(s,k) in seconds" class="sec" v-bind:style="{'--s':k}" v-bind:class="{white:k == 0}">
        {{ s }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";

const year = ref("");
const allmonth = reactive<String[]>([
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
]);
const month = ref<String[]>([]);
const days = ref<String[]>([]);
const hours = ref<String[]>([]);
const minutes = ref<String[]>([]);
const seconds = ref<String[]>([]);

onMounted(() => {
  clock;
  setInterval(clock, 1);
});

const clock = () => {
  // 赋值前清除原有数组内的内容（使用push方法会直接增加数组元素)
  month.value = [];
  days.value = [];
  hours.value = [];
  minutes.value = [];
  seconds.value = [];
  var d = new Date();
  var mon = d.getMonth();
  var day = d.getDate();
  var hour = d.getHours();
  var min = d.getMinutes();
  var sec = d.getSeconds();
  year.value = d.getFullYear().toString();
  for (var i = 0; i < 12; i++) {
    let key: number = 0;
    if (mon + i < 12) {
      key = mon + i;
    } else {
      key = mon + i - 12;
    }
    let aaa = allmonth;
    month.value.push(aaa[key]);
  };
  for (var i = 0; i < 31; i++) {
    let val = "";
    if (day + i <= 31) {
      val = String(day + i) + "日";
    } else {
      val = String(day + i - 31) + "日";
    }
    val = "0" + val;
    days.value.push(val.slice(-3));
  }
  for (var i = 0; i < 24; i++) {
    let val = "";
    if (hour + i <= 24) {
      val = String(hour + i) + ":";
    } else {
      val = String(hour + i - 24) + ":";
    }
    val = "0" + val;
    hours.value.push(val.slice(-3));
  }
  for (var i = 0; i < 60; i++) {
    let val = "";
    if (min + i <= 60) {
      val = String(min + i) + ":";
    } else {
      val = String(min + i - 60) + ":";
    }
    val = "0" + val;
    minutes.value.push(val.slice(-3));
  }
  for (var i = 0; i < 60; i++) {
    let val = "";
    if (sec + i <= 60) {
      val = String(sec + i);
    } else {
      val = String(sec + i - 60);
    }
    val = "0" + val;
    seconds.value.push(val.slice(-2));
  }
};
</script>

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
  color: white;
  animation: anime 5s linear infinite;
}
.main {
  width: 600px;
  height: 600px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  background: unset;
}

.white {
  color: greenyellow;
  text-shadow: 2px 2px 4px black;
}
/* 
    关于变型中心点的计算，X轴位移的数值减去宽的一半就是反方向确定变型参考点的值 
    角度的计算可以直接用calc()除以元素数量，即可自动等角度排列，关于css变量的使用可以参考以前的视频。
*/
.main div.month {
  position: absolute;
  transform-origin: -60px;
  transform: translateX(85px) rotateZ(calc(30deg * var(--m)));
  width: 50px;
}
.main div.days {
  position: absolute;
  transform-origin: -110px;
  transform: translateX(130px) rotateZ(calc(360deg / 31 * var(--d)));
  width: 40px;
}
.main div.hours {
  position: absolute;
  transform-origin: -150px;
  transform: translateX(165px) rotateZ(calc(360deg / 24 * (var(--h))));
  width: 30px;
}
.main div.min {
  position: absolute;
  transform-origin: -180px;
  transform: translateX(200px) rotateZ(calc(360deg / 60 * (var(--min))));
  width: 40px;
}
.main div.sec {
  position: absolute;
  transform-origin: -210px;
  transform: translateX(230px) rotateZ(calc(360deg / 60 * (var(--s))));
  width: 40px;
}
</style>
