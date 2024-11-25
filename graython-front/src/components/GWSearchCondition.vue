<template>
  <div class="gw-search-root">
    <div class="left-items">
      <slot name="left-items"></slot>
    </div>
    <div class="right-items">
      <slot name="right-items"></slot>
    </div>

  </div>
</template>

<script setup lang="ts">

</script>

<style type="scss" scoped>
/* 样式可以根据需要进行调整 */
.gw-search-root {
  margin: 1rem 0;
  display: flex;
  width: 100%;
  height: 40px;
  flex-direction: row;
  z-index: 2000;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 520px) {

  .right-items {
    display: none;
  }
}
</style>
