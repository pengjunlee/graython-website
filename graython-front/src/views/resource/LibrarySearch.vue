<template>
  <div class="gw-search-root">
    <!-- 合集选择下拉框 -->
    <div class="search-item">
      <el-select
        v-model="selectedCollectionId"
        clearable
        placeholder="合集"
        style="width: 150px"
      >
        <el-option
          v-for="item in collections"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRaw } from "vue";
import type {
  Collection,
} from "@/types/gw.resources";
import {
  listCollectionApi,
} from "@/api/resources";

const collections = ref<Collection[]>();

const selectedCollectionId = ref<number>();
const emit = defineEmits<{
  (event: "change", value: number | undefined): void;
}>();


onMounted(async () => {
  await listCollectionApi().then((rsp) => {
    if (rsp.data) {
      collections.value = rsp.data;
    }
  });
});

watch(
  () =>
    selectedCollectionId.value,
  (newCollection) => {
    // 在这里可以执行一些逻辑，例如检查新值是否满足某些条件
    emit("change", newCollection);
  },
  { deep: true, immediate: true }
);
</script>

<style type="scss" scoped>
/* 样式可以根据需要进行调整 */
.gw-search-root {
  margin: 5px 0;
  display: flex;
  width: 100%;
  height: 40px;
  flex-direction: row;
  z-index: 2000;
}

.search-item {
  display: inline-flex;
  margin-right: 5px;
}
</style>
