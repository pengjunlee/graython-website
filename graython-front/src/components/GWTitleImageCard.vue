<template>
  <div
    class="gw-card"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    @click="clickThis"
  >
    <!-- 新建卡片 -->
    <div
      v-if="blankCard"
      style="
        align-items: center;
        text-align: center;
        height: 100%;
        width: 100%;
        display: inline-grid;
      "
    >
      <div>
        <slot name="add-btn">
          <SvgIcon size="50px" icon-class="add" />
        </slot>
      </div>
    </div>
    <div style="width: 100%; height: 100%; position: relative" v-else>
      <!-- 背景图片 -->
      <div
        class="card-image"
        :style="{ backgroundImage: 'url(' + imgSrc() + ')' }"
      ></div>

      <!-- 标题和按钮 -->
      <div class="card-content">
        <h3 class="card-title">{{ title }}</h3>
      </div>

      <div v-show="isHovered" class="card-btn" >
        <slot name="customize-btn"> </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getWebsiteApiBaseUrl } from "@/utils/env";
import { ref, toRefs, toRaw, computed } from "vue";

interface CardProps {
  blankCard: boolean;
  image?: String;
  title?: String;
  cardData?: Record<string, any>; // 组件对应的数据
  clickT?: (data: Record<string, any>) => void | Promise<void>;
}

const isHovered = ref(false);

const props = defineProps<CardProps>();

const { blankCard, image, title } = toRefs(props);

const imgSrc = () => {
  if(image.value?.startsWith("http")){
    return image.value;
  }

  return getWebsiteApiBaseUrl() + image.value;
}

// 点击卡片时调用父组件的回调函数
function clickThis() {
  if (props?.clickT) {
    const param = props.cardData ? toRaw(props.cardData) : {};
    props?.clickT(param);
  }
}
</script>

<style scoped lang="scss">
.gw-card {
  border: var(--el-border);
  position: relative;
  width: 250px;
  height: 200px;
  overflow: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px var(--gw-bg-active);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gw-card:hover {
  transform: scale(1.05);
}

.card-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  object-fit: cover; /* 保证图片按比例填充容器 */
}

.card-content {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  text-align: center;
  background-color: var(--gw-bg-active-05);
  color: var(--gw-bg-font);
  transition: all 0.3s ease;
}

.card-title {
  margin: 0;
  font-size: 36px;
  transition: transform 0.3s ease;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  white-space-collapse: collapse;
  overflow: hidden;
  white-space: nowrap;
}

.card-btn {
  position: absolute;
  right: 8px;
  top: 8px;
  color: var(--gw-bg-font);
  display: flex;
  flex-direction: column;
}
</style>
