<template>
  <div class="gw-flex-container">
    <slot name="flex-items"></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.gw-flex-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  gap: 1rem;
}
</style>
