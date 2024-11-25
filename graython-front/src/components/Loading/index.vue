<template>
  <div class="loading loading-active" v-show="false">
    <div class="load-box">
      <img class="loading-img" src="https://image.kuailemao.xyz/blog/loading/loading-gif.gif" alt="Loading">
      <span>小花猫正在带着数据走向你~~</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoadingStore from "@/stores/loading";
const loadingStore = useLoadingStore()

</script>

<style scoped lang="scss">

.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  background: var(--gw-bg-basic);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  .load-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .loading-img{
      // 不可拖动
      user-select: none;
      -webkit-user-drag: none;
    }

    span{
      margin-top: 1rem;
      font-size: 1rem;
      font-weight: bold;
    }
  }
}
</style>
