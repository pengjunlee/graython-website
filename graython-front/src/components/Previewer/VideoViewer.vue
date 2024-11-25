<template>
  <!-- 模态框 用来预览-->
  <div v-show="visible" class="preview-container">
    <div class="preview-btns">
      <span
        style="font-size: 30px"
        @click="closePreview"
        class="iconfont icon-plus-circle-fill"
      ></span>
    </div>
    <div class="preview-content">
      <video
        id="videoPlayer"
        controls
        :src="src"
        @pause="handleVideoPause"
        @ended="handleVideoEnd"
        @abort="handleVideoAbort"
      >
        你的浏览器不支持视频播放。
      </video>
    </div>
  </div>
</template>

<script setup lang="ts">
interface VideoPreviewerProps {
  src: string;
  name: string;
  visible: boolean;
}

const props = defineProps<VideoPreviewerProps>();

const { src, name, visible } = toRefs(props);

const emits = defineEmits(["close"]);

// 点击图片时调用父组件的回调函数
function closePreview() {
  emits("close");
}

// 处理视频暂停事件
const handleVideoPause = () => {
  console.log("视频暂停");
};
// 处理视频播放结束事件
const handleVideoEnd = () => {
  console.log("视频播放结束");
};
// 处理视频加载中止事件
const handleVideoAbort = () => {
  console.log("视频加载被中止");
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
  padding: 0;
  margin: 0;
}

#videoPlayer {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 让视频内容覆盖整个区域 */
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
  opacity: 0;
  transition: opacity 1s ease;
  &:hover {
    opacity: 1;
  }
}
</style>
