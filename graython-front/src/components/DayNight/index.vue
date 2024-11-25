<script setup lang="ts">
import {useDark} from "@vueuse/core";
import emitter from '@/utils/mitt';

let isDark = useDark();

const toogleTheme = () =>{
  isDark.value = !isDark.value;
  emitter.emit('dayNightChanged',isDark.value);
}
</script>

<template>
    <div style="margin-bottom: 1rem; " @click="toogleTheme">
      <el-tooltip effect="light" content="日夜切换" placement="left">
        <span v-if="isDark"
          class="iconfont icon-sun"
        ></span>
        <span v-else
          class="iconfont icon-moon"
        ></span>
      </el-tooltip>
    </div>
</template>

<style scoped lang="scss">
</style>
