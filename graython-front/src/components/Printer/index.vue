<template>
  <div>
    <slot name="paper" :content="content"></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, defineProps, onMounted } from 'vue';

// 定义 Props
const props = defineProps({
  printerInfo: {
    type: String,
    default: ""
  },
  duration: {
    type: Number,
    default: 100
  },
  delay: {
    type: Number,
    default: 3000
  },
  working: {
    type: Boolean,
    default: true
  },
  once: {
    type: Boolean,
    default: false
  }
});

// 定义响应式数据
const content = ref('');
const cursor = ref(0);
const timer = ref<any>(null);
const timeout = ref<any>(null);
const print = ref(true);

// 监听 props 变化
watch(() => props.working, toBegin);
watch(() => props.printerInfo, toBegin);
watch(cursor, (newCursor) => {
  content.value = props.printerInfo.slice(0, newCursor);
});

// 生命周期钩子
onBeforeUnmount(() => {
  if (timer.value) clearInterval(timer.value);
  if (timeout.value) clearTimeout(timeout.value);
});

// 方法
function start(work: Function) {
  timeout.value = setTimeout(() => {
    timer.value = setInterval(() => {
      work();
      if (cursor.value === 0 || (cursor.value === props.printerInfo.length && !props.once)) {
        clearInterval(timer.value!);
        start(work);
      } else if (cursor.value === props.printerInfo.length && props.once) {
        clearInterval(timer.value!);
      }
    }, props.duration);
  }, props.delay);
}

function work() {
  let currentCursor = cursor.value;
  currentCursor += print.value ? 1 : -1;
  if (print.value) {
    if (currentCursor === props.printerInfo.length + 1) {
      currentCursor -= 2;
      print.value = !print.value;
    }
  } else {
    if (currentCursor === -1) {
      currentCursor += 2;
      print.value = !print.value;
    }
  }
  cursor.value = currentCursor;
}

function toBegin() {
  cursor.value = 0;
  if (timeout.value !== null) {
    clearTimeout(timeout.value);
    if (timer.value !== null) {
      clearInterval(timer.value);
    }
  }
  if (props.working) {
    start(work);
  } else {
    content.value = props.printerInfo;
  }
}

// 初始化
onMounted(()=>{
  if (props.working) {
  start(work);
} else {
  content.value = props.printerInfo;
}
});
</script>
