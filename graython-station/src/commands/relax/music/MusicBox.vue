<template>
  <div>
    <iframe
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      width="330"
      height="86"
      :src="frameSrc"
    ></iframe>
    <div v-if="errorHint">{{ errorHint }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue";
import { randomMusicApi } from "../../../api/terminal";

const frameSrc = ref();

const errorHint = ref("");

onMounted(async () => {
  // 搜索音乐
  const res: any = await randomMusicApi();
  if (res?.code === 20000) {
    const music = res.data;
    frameSrc.value = `//music.163.com/outchain/player?type=2&auto=1&height=66&id=`+music['mid'];
  } else {
    errorHint.value = "未找到音乐";
  }
});
</script>

<style scoped></style>
