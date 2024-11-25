<template>
  <div class="notfound-root">
    <div class="notfount">404</div>
    <div class="desc">您可能想前往....</div>
    <div class="router">
      <div class="item" @click="toRoute('/home')"><span class="iconbl bl-a-home1-line"></span>首页</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRoute } from '@/router'
</script>

<style scoped lang="scss">
.notfound-root {
  width: 100%;
  height: 100vh;
  @include flex(column, center, center);
  overflow: hidden;
  background-color: var(--gw-bg-basic);

  .notfount {
    @include font(260px, 700);
    color: var(--gw-bg-font);
  }

  .desc {
    @include font(30px, 300);
    color: var(--gw-bg-font);
    padding-bottom: 10px;
  }

  .router {
    font-weight: 300;
    color: var(--gw-bg-font);

    img {
      margin-right: 5px;
    }

    .item {
      @include flex(row, flex-start, center);
      margin-top: 10px;
      height: 35px;
      cursor: pointer;

      img {
        margin: 5px 10px 5px 0;
      }

      .iconbl {
        font-size: 30px;
        padding-right: 5px;
        color: var(--gw-bg-font);
      }
    }
  }
}
</style>
