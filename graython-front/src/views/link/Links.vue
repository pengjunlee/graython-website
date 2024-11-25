<template>
  <div class="gray-link-root">
    <LinkGroup
      v-for="(group, index) in linkGroups"
      :key="index"
      :title="group.name"
      :items="group.links"
    ></LinkGroup>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import LinkGroup from "@/components/LinkGroup/index.vue";
import { groupLinkApi } from "@/api/link";

const linkGroups = ref<any>([]);

onMounted(async () => {
  await groupLinkApi().then((rsp) => {
    linkGroups.value = rsp.data;
  });
});

const getFontSize = (name: string) => {
  if (name.length >= 10) {
    return "1.8rem";
  }
  return "2.4rem";
};
</script>

<style scoped lang="scss">
.gray-link-root {
  width: 100%;
  min-height: calc(100vh - 60px);
  @include flex(row, flex-start, flex-start);
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 0 2rem;
  margin-top: 60px;
}
</style>
