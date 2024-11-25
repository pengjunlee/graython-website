<template>
  <div class="formatterDiv">
    <textarea
      ref="textareaRef"
      v-model="formatterData"
      class="textarea"
    ></textarea>
    <div class="top-right">
      <button class="button-top-right" @click="formatter">格式化</button>
      <button
        v-if="copyBtn"
        id="copyBtn"
        class="button-top-right"
        @click="copyJson"
      >
        {{ btnName }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const copyBtn = ref(false);
const btnName = ref("点击复制");
let formatterData = ref(``);

// 在 computed 中处理 props
const formatter = () => {
  if (formatterData.value.length < 2) {
    alert("数据不能为空");
  }
  formatterData.value = JSON.stringify(
    JSON.parse(formatterData.value),
    null,
    2
  );
  copyBtn.value = true;
};
// 复制格式化的 JSON 到剪贴板的函数
const copyJson = () => {
  const el = textareaRef.value;
  el?.select();
  document.execCommand("copy");
  // document.body.removeChild(el);
  btnName.value = "文本已复制";
};
</script>

<style scoped>
.formatterDiv {
  position: relative;
}

.textarea {
  background-color: unset;
  color: white;
  resize: none; /* 禁止调整大小 */
  width: 100%;
  height: 200px;
}
.top-right {
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
}
.button-top-right {
  margin-left: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
