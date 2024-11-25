<template>
  <div class="pdf-preview">
    <div class="pdf-header">
      <p class="title">{{ title }}</p>
      <div class="page-tool">
        <div class="page-tool-item" @click="lastPage">上一页</div>
        <div class="page-tool-item" @click="nextPage">下一页</div>
        <div class="page-tool-item">{{ pageNum }}/{{ pages }}</div>
        <div class="page-tool-item" @click="download">下载</div>
        <div class="page-tool-item" @click="closePreview">关闭</div>
      </div>
    </div>
    <div class="pdf-container">
      <vue-pdf-embed
        class="paper-pdf"
        :source="url"
        :page="pageNum"
      ></vue-pdf-embed>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, toRefs } from "vue";
import VuePdfEmbed from "vue-pdf-embed";
import FileSaver from "file-saver";
interface PdfProps {
  title: string;
  url: string;
  doc: string;
  pages: number;
}
const props = defineProps<PdfProps>();

const { title, url, doc, pages } = toRefs(props);

const emits = defineEmits(["close"]);

// 点击图片时调用父组件的回调函数
function closePreview() {
 emits("close");
}


function download() {
  fetch(doc.value)
    .then((response) => response.blob())
    .then((blob) => {
      FileSaver.saveAs(blob, title.value); // 下载后的文件名
    })
    .catch((error) => console.error("下载图片异常:", error));
}
const pageNum = ref(1);

function lastPage() {
  if (pageNum.value > 1) {
    pageNum.value -= 1;
  }
}
function nextPage() {
  if (pageNum.value < pages.value) {
    pageNum.value += 1;
  }
}
</script>
<style lang="css" scoped>
.pdf-preview {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  box-sizing: border-box;
  z-index: 3000;
  background-color: var(--gw-bg-basic);
  box-shadow: 0px 0px 0px #c8c8c8;
  &.hidden {
    display:none;
  }
}

.pdf-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid var(--gw-bg-active);

  .title {
    font-size: 18px;
    color: var(--gw-bg-font);
    margin-left: 10px;
    text-align: center;
    line-height: 52.5px;
  }

  .page-tool {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    color: var(--gw-bg-font);
    user-select: none;

    .page-tool-item {
      border-radius: 5px;
      padding: 8px 15px;
      margin: 10px;
      background-color: var(--gw-bg-active);
      cursor: pointer;
    }
  }
}

.pdf-container {
  display: flex;

  .paper-pdf {
    padding: 50px 0;
    width: 800px;
    margin: 0 auto;
  }
}
</style>
