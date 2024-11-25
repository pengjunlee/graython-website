<template>
  <div class="gw-search-root">
    <div class="left-items">
      <!-- 类型选择框 -->
      <div class="search-item">
        <el-select
          v-model="selectedResourceTypes"
          multiple
          collapse-tags
          placeholder="资源类型"
          style="width: 10rem"
        >
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.name"
            :value="item.value"
          />
        </el-select>
      </div>
      <!-- 合集选择下拉框 -->
      <div class="search-item">
        <el-select
          v-model="selectedCollectionId"
          clearable
          placeholder="合集"
          style="width: 10rem"
          @change="handleCollectionChange"
        >
          <el-option
            v-for="item in collections"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <!-- 库选择下拉框 -->
      <div class="search-item">
        <el-select
          v-model="selectedLibraryId"
          clearable
          placeholder="库"
          style="width: 10rem"
        >
          <el-option
            v-for="item in libraries"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
     
    </div>
    <div class="right-items">
        <slot name="right-items"></slot>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRaw } from "vue";
import type {
  ResourceSearch,
  Library,
  Collection,
  IntEnumOption,
} from "@/types/gw.resources";
import {
  listLibraryApi,
  resourcesTypesApi,
  listCollectionApi,
} from "@/api/resources";

const types = ref<IntEnumOption[]>();
const libraries = ref<Library[]>();
const collections = ref<Collection[]>();

const selectedResourceTypes = ref<number[]>();
const selectedLibraryId = ref();
const selectedCollectionId = ref<number>();
const emit = defineEmits<{
  (event: "change", value: ResourceSearch): void;
}>();

const handleCollectionChange = async () => {
  if (selectedCollectionId.value) {
    selectedLibraryId.value = null;
    await listLibraryApi(selectedCollectionId.value).then((rsp) => {
      libraries.value = rsp.data;
    });
  }
};
onMounted(async () => {
  await listCollectionApi().then((rsp) => {
    if (rsp.data) {
      collections.value = rsp.data;
    }
  });
  await listLibraryApi(0).then((rsp) => {
    libraries.value = rsp.data;
  });

  await resourcesTypesApi().then((rsp) => {
    types.value = rsp.data;
  });
});

watch(
  () => [
    selectedResourceTypes.value,
    selectedCollectionId.value,
    selectedLibraryId.value,
  ],
  ([newTypes, newCollection, newLibrary]) => {
    // 在这里可以执行一些逻辑，例如检查新值是否满足某些条件
    emit("change", {
      resourceTypes: toRaw(newTypes),
      collectionId: newCollection,
      libraryId: newLibrary,
    });
  },
  { deep: true, immediate: true }
);
</script>

<style type="scss" scoped>
/* 样式可以根据需要进行调整 */
.gw-search-root {
  margin-bottom: 1rem;
  display: flex;
  width: 100%;
  flex-direction: row;
  z-index: 2000;
  justify-content: space-between;
  flex-wrap: wrap;
    gap: 1rem;
}

.search-item {
  display: inline-flex;
  margin-right: 5px;
}

.right-items {
  flex-grow: 1;
    flex-direction: row-reverse;
    display: flex;
}
</style>
