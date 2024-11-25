<template>
  <div class="flex-container">
    <Header
      v-if="showHeader()"
      :tabs="tabs"
      :selectedTab.sync="selectedTab"
      @update:selectedTab="selectTab"
    />
    <router-view v-slot="{ Component }">
      <keep-alive :include="[includeRouter]">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import router from "@/router";
import { toRoute } from "@/router";
import IndexFooter from "./index/IndexFooter.vue";
import type { RouteRecordName } from "vue-router";
import Header from "../components/layout/Header.vue";
import type { Tab } from "@/types/gw.props";

const tabs = ref<Tab[]>([
  { icon: "icon-wangzhanguanli", name: "Collection", title: "合集" },
  { icon: "icon-heji", name: "Library", title: "库" },
  { icon: "icon-wangzhantubiao", name: "Anchor", title: "网址" },
]);
const selectedTab = ref("Library");

const includeRouter = ref<any>(["Library"]);
const curRoute = ref<RouteRecordName>("Library");

watch(
  () => router.currentRoute.value,
  (newRoute) => {
    if (newRoute.name) {
      curRoute.value = newRoute.name;
      selectedTab.value = newRoute.name.toString();
    }
    if (
      newRoute.meta.keepAlive &&
      includeRouter.value.indexOf(newRoute.name) === -1
    ) {
      includeRouter.value.push(newRoute.name);
    }
  },
  { immediate: true }
);
const hideHeaderArray = ["Login"];
const showHeader = () => {
  const currentRoute = router.currentRoute.value;
  if (
    currentRoute?.name &&
    hideHeaderArray.find((ele) => ele === currentRoute.name)
  ) {
    return false;
  }
  return true;
};

const hideFooterArray = ["Login", "Aticles"];
const showFooter = () => {
  const currentRoute = router.currentRoute.value;
  if (
    currentRoute?.name &&
    hideFooterArray.find((ele) => ele === currentRoute.name)
  ) {
    return false;
  }
  return true;
};

const selectTab = (name: string) => {
  selectedTab.value = name;
  toRoute(name);
};
</script>
<style scoped lang="scss">
.flex-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: var(--gw-bg-basic);
  color: var(--gw-bg-font);
  min-height: 100vh;
  overflow: hidden;
}
</style>
