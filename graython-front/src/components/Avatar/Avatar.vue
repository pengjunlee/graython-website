<template>
  <div :class="['avatar', size]">
    <img
      :src="src"
      alt=""
    /></div
></template>
<script lang="ts" setup>
  import { computed } from "vue";

  let props = defineProps({
  // 按钮大小 xlarge large medium small
  size: {
    type: String,
    default: 'medium'
  },
  src: {
    type: String,
    default: './favicon.png'
  }
});
</script>
<style scoped>
:root {

  --checkd-color: #04C93F;
  --box-shadow: 1px 3px 8px rgba(0, 0, 0, 0.2);
  --default-svg: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" fill="rgba(137,137,137,1)"/></svg>')
}
  /* avatar设置font-size非常关键 */
  .avatar {
    width: var(--avatar-medium-size);
    height: var(--avatar-medium-size);
    border-radius: 50%;
    position: relative;
    background-color: var(--bg, #d6d6d6);
    box-shadow: 1px 3px 12px -4px var(--bg, rgba(0, 0, 0, 0.4));
    font-size: var(--avatar-medium-size);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .avatar.large {
    width: var(--avatar-large-size);
    height: var(--avatar-large-size);
    font-size: var(--avatar-large-size);
  }

  .avatar.xlarge {
    width: var(--avatar-xlarge-size);
    height: var(--avatar-xlarge-size);
    font-size: var(--avatar-xlarge-size);
  }

  .avatar.small {
    width: var(--avatar-small-size);
    height: var(--avatar-small-size);
    font-size: var(--avatar-small-size);
  }

  .avatar img {
    width: 100%;
    height: 100%;
    border-radius: var(--avatar-medium-size);
    object-fit: cover;
  }

  .avatar.xlarge img {
    border-radius: var(--avatar-xlarge-size);
  }

  .avatar.large img {
    border-radius: var(--avatar-large-size);
  }

  .avatar.small img {
    border-radius: var(--avatar-small-size);
  }

  .avatar span {
    color: #fff;
    font-size: 0.5em;
  }

  /* 巧用:empty伪类实现空状态图标填充 */
  .avatar:empty {
    background: #d6d6d6 var(--default-svg) center no-repeat;
    background-size: 52% auto;
  }

  .avatar .reddot,
  .avatar .dot {
    width: calc(1em * 0.3);
    height: calc(1em * 0.3);
    border-radius: calc(1em * 0.3);
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .avatar.online .dot {
    background: linear-gradient(
      134.57deg,
      rgba(4, 201, 63, 1) 0%,
      rgba(3, 166, 52, 1) 100%
    );
  }

  .avatar.offline .dot {
    background: linear-gradient(
      137.1deg,
      rgba(191, 191, 191, 1) 0%,
      rgba(156, 156, 156, 1) 100%
    );
  }

  .avatar.offline img {
    filter: saturate(0.3);
    opacity: 0.8;
  }

  .avatar.notice .reddot {
    right: 0;
    top: 0;
    background-color: #f22727;
  }
  /* 因为dot的宽高要利用font-sie的继承值，所以这里使用伪元素， 单独设置font-size */
  .avatar.notice .reddot::after {
    content: attr(data-count);
    width: 100%;
    height: 100%;
    font-size: calc(0.5 * 0.3em);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

  .avatar .checked {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--checkd-color);
    position: absolute;
    right: -2px;
    bottom: -4px;
    font-size: 16px;
    color: #fff;
  }

  .avatar.checked::before {
    content: "";
    width: 110%;
    height: 110%;
    border-radius: 50%;
    position: absolute;
    border: 2px solid var(--checkd-color);
  }

  .avatar-group .avatar {
    border: 2px solid #fff;
    margin-left: calc(-0.3em);
    box-shadow: unset;
  }

  .card {
    width: 200px;
    padding: 12px;
    display: flex;
    align-items: center;
    border: 1px solid #f1f1f1;
    border-radius: 4px;
    margin-bottom: 12px;
  }

  .card .content {
    color: rgba(20, 20, 20, 0.4);
    font-size: 12px;
    margin-left: 12px;
  }

  .card .title {
    color: #333;
    font-size: 14px;
  }

  .card.offline .title {
    color: rgba(20, 20, 20, 0.6);
  }
</style>
