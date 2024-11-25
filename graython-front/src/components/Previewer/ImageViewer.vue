<template>
  <!-- 模态框 用来预览-->
  <div v-show="visible" class="preview-container" @wheel="handleWheel">
    <div class="preview-btns">
      <span
        style="font-size: 24px"
        @click="closePreview"
        class="iconfont icon-plus-circle-fill"
      ></span>
      <span
        style="font-size: 24px"
        @click="downloadImage"
        class="iconfont icon-download1"
      ></span>
      <span
        style="font-size: 24px"
        @click="enterFullscreen"
        class="iconfont icon-a-ScreenExpand"
      ></span>
    </div>

    <div class="preview-content" @click="closePreview">
      <img
        :src="src"
        :alt="name"
        :style="{ transform: `scale(${scale})` }"
        class="preview-image"
        ref="previewImageRef"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import FileSaver from "file-saver";

interface ImagePreviewerProps {
  src: string;
  name: string;
  visible: boolean;
}

const props = defineProps<ImagePreviewerProps>();

const { src, name, visible } = toRefs(props);

const emits = defineEmits(["close"]);

// 点击图片时调用父组件的回调函数
function closePreview() {
  emits("close");
}

// 下载图片的方法
const downloadImage = () => {
  if (src.value) {
    fetch(src.value)
      .then((response) => response.blob())
      .then((blob) => {
        FileSaver.saveAs(blob, name.value || "image.png"); // 下载后的文件名
      })
      .catch((error) => console.error("下载图片异常:", error));
  }
};

const previewImageRef = ref();

// 进入全屏模式的函数
const enterFullscreen = () => {
  const imageElement = previewImageRef.value;
  if (imageElement) {
    if (imageElement.requestFullscreen) {
      imageElement.requestFullscreen();
    } else if ((imageElement as any).webkitRequestFullscreen) {
      (imageElement as any).webkitRequestFullscreen();
    } else if ((imageElement as any).mozRequestFullScreen) {
      (imageElement as any).mozRequestFullScreen();
    } else if ((imageElement as any).msRequestFullscreen) {
      (imageElement as any).msRequestFullscreen();
    }
  }
};

// 缩放比例
const scale = ref(1);

// 缩放步长
const zoomStep = 0.1;

// 最小和最大缩放比例
const minScale = 0.5;
const maxScale = 3;

// 处理鼠标滚轮事件进行缩放
const handleWheel = (event: WheelEvent) => {
  event.preventDefault(); // 阻止默认的滚动行为
  if (event.deltaY < 0) {
    zoomIn();
  } else {
    zoomOut();
  }
};

// 放大图片
const zoomIn = () => {
  if (scale.value < maxScale) {
    scale.value += zoomStep;
  }
};

// 缩小图片
const zoomOut = () => {
  if (scale.value > minScale) {
    scale.value -= zoomStep;
  }
};
</script>

<style scoped lang="scss">
/* 模态框样式 */
.preview-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--gw-bg-active-05);
  z-index: 3000;
}

.preview-content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 45px;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: 0 auto;
}

.preview-btns {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 3999;
  display: flex;
  flex-direction: column;
  .iconfont {
    &:hover {
      background-color: var(--gw-bg-basic);
    }
    background-color: var(--gw-bg-basic-5);
    border-radius: 50%;
    padding: 5px;
  }
}
</style>
