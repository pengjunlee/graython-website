<template>
  <div class="graython-footer-root">
    <div class="foot-row">
      <div class="custom-info">
        <div v-if="isNotBlank(gwab())" v-html="gwab()"></div>
        <div v-if="isNotBlank(ipc())" style="cursor: pointer" @click="openNew('https://beian.miit.gov.cn/')">
          {{ ipc() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { isNotBlank } from '@/utils/obj'
import { getGwab, getIpc } from '@/utils/env'

const userStore = useUserStore()
const ChartLineWordsRef = ref()
onMounted(() => {
})

const openNew = (url: string) => {
  window.open(url)
}

const gwab = () => {
  if (userStore.userParams.WEB_GONG_WANG_AN_BEI) {
    return userStore.userParams.WEB_GONG_WANG_AN_BEI
  }
  return getGwab()
}

const ipc = () => {
  if (userStore.userParams.WEB_IPC_BEI_AN_HAO) {
    return userStore.userParams.WEB_IPC_BEI_AN_HAO
  }
  return getIpc()
}
</script>

<style scoped lang="scss">
.graython-footer-root {
  background-color: var(--gw-bg-basic);
  border-top: var(--el-border);
  @include box(100%, 60px);
  @include flex(row, center, center);
  z-index: 2003;

  .foot-row {
    line-height: 40px;
  }
}
</style>
