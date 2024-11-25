<template>
  <div>
    <button id="copyBtn" @click="copyJson">{{ btnName }}</button>
    <pre id="preDiv" v-if="jsonData" v-html="jsonData"></pre>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { ref } from "vue";

const btnName = ref("点击复制");
let jsonData = ref("");

interface Props {
  rawJson: string;
}

// 定义 props
const props = defineProps<Props>();

// 在 computed 中处理 props
const formattedJson = onMounted(() => {
  jsonData.value = JSON.stringify(JSON.parse(props.rawJson), null, 2);
});

// 复制格式化的 JSON 到剪贴板的函数
const copyJson = () => {
  const el = document.createElement("textarea");
  el.value = jsonData.value;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  // document.body.removeChild(el);
  btnName.value = "文本已复制";
};
</script>

<style scoped>
pre {
  white-space: pre-wrap;
  font-family: monospace;
  width: 100%;
}
#copyBtn {
  float: right;
  background-color: green;
  margin: 3px 0px;
  font-size: 12px;
}
</style>
