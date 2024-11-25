<template>
  <div class="link-card-root">
    <div class="link-card" style="width: 100%">
      <div class="name" :style="{ fontSize: tsize || '3rem' }">
                {{ title }}
      </div>
      <div class="link-items">
        <a
          :href="linkItem.url"
          target="_blank"
          class="el-card is-hover-shadow link-item"
          v-for="linkItem in items"
          :key="linkItem.url"
        >
          <img
            v-if="linkItem.coverUrl.startsWith('http')"
            :src="linkItem.coverUrl"
            alt="Logo"
            class="img"
          />
          <img v-else :src="getWebsiteApiBaseUrl() + linkItem.coverUrl" alt="Logo" class="img" />
          <div class="link-text">
            <div class="nowrap link-title">{{ linkItem.name }}</div>
            <div class="nowrap" style="font-size: 12px">
              {{ linkItem.remark }}
            </div>
            <!-- <span class="tooltip-text">{{ linkItem.remark }}</span> -->
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardLinkItem } from "@/types/gw.props";
import { toRefs } from "vue";
import { getWebsiteApiBaseUrl } from '@/utils/env'

interface ItemProps {
  title?: String;
  tsize?: string;
  items?: CardLinkItem[];
  isize?: Number;
}

const props = defineProps<ItemProps>();

const { title, tsize, items } = toRefs(props);
</script>

<style scoped lang="scss">
.link-card-root {
  width: 100%;
  margin-bottom: 2rem;
}
.link-items {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  @include box(100%, 100%);
  .link-item {
    height: 10rem;
    padding: 1rem;
    border: 1px solid var(--gw-bg-font-01);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--gw-bg-font);
    .img {
      width: 5rem;
      height: 5rem;
      border-radius: 0.5rem;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      display: inline-block;
    }
    .link-text {
      font-family: ChillDuanSans_Light;
      display: flex;
      padding-left: 1rem;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: flex-start;
      font-size: 1.4rem;
      max-width: 15rem;
    }
  }
  .link-item:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    scale: 1.05;
  }
}
.nowrap {
  width: 15rem;
  padding-top: 0.5rem;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  white-space-collapse: collapse;
  overflow: hidden;
  white-space: nowrap;
}

.name {
  margin: 1.5rem 0;
  font-family: BaoTuXiaoBai;
}
.link-title {
  font-family: ChillDuanSans_Black;
  font-weight: bold;
}
</style>
