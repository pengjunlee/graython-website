<template>
  <div class="card-container" v-if="!$common.isEmpty(resourcePathList)">
    <div
      v-for="(resourcePath, index) in resourcePathList"
      :key="index"
      class="card-item shadow-box-mini"
    >
      <div class="card-image">
        <el-image
          class="my-el-image"
          style="width: 100%; height: 100%"
          lazy
          :preview-src-list="[resourcePath.cover]"
          :src="getWebsiteApiBaseUrl() + resourcePath.cover"
          fit="cover"
        >
          <div slot="error" class="image-slot"></div>
        </el-image>
      </div>
      <div class="card-body">
        <div class="card-desc">
          {{ resourcePath.title }}
        </div>
        <div class="card-time">
          Date: {{ $common.getDateDiff(resourcePath.createTime) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { getWebsiteApiBaseUrl } from '@/utils/env';
const $common: any = inject('$common');

// 组件的 props 类型定义
const props = defineProps({
  resourcePathList: {
    type: Array as () => { cover: string; title: string; createTime: string }[],
    required: true,
  },
});

</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  padding: 1px;
}

.card-item {
  position: relative;
  overflow: hidden;
  margin: 1.5rem;
  flex-shrink: 0;
  width: calc(100% / 3 - 30px);
  cursor: pointer;
  animation: zoomIn 0.8s ease-in-out;
  padding: 1.3rem 1.3rem 1.5rem;
  background: var(--gw-bg-basic);
  border-radius: 1.5rem;
  transition: all 0.2s;
}

.card-image {
  width: 100%;
  height: 400px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(147, 147, 147, 0.61);
  margin-bottom: 1rem;
}

.card-image >>> .el-image__inner {
  transition: all 1s;
}

.card-image >>> .el-image__inner:hover {
  transform: scale(1.2);
}

.card-body {
  padding: 10px 5px;
}

.card-desc {
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--gw-bg-font);
  letter-spacing: 1px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  margin-bottom: 1rem;
  -webkit-box-orient: vertical;
}

.card-time {
  position: absolute;
  bottom: 15px;
  color: #999999;
  font-weight: 500;
}

@media screen and (max-width: 1300px) {
  .card-item {
    width: calc(100% / 2 - 30px);
  }
  .card-image {
    height: 375px;
  }
}

@media screen and (max-width: 750px) {
  .card-item {
    width: 100%;
    margin: 15px 0;
  }
}

@media screen and (max-width: 450px) {
  .card-item {
    height: 350px;
  }

  .card-image {
    height: 250px;
  }
}
.shadow-box-mini {
  box-shadow: 1px 1px 3px var(--gw-bg-font-05);
}
</style>
