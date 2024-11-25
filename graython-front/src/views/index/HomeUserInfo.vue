<template>
  <div class="home-userinfo-root">
    <div class="userinfo-desc">
      <div class="avatar">
        <img :src="userStore.userinfo.avatar ? userStore.userinfo.avatar:'./favicon.png'" alt="头像" />
      </div>
      <div class="info">
        <div class="name">{{ userStore.userinfo.nickName }}</div>
      </div>
    </div>

    <div class="userinfo-content">
      <div class="userinfo-content-btns">
        <ul>
          <li @click="toRoute('/articles')">所有文章 <span class="iconbl bl-sendmail-line"></span></li>
          <li>

            <div class="desc">文章数:{{ userStore.userinfo.articleCount }} | 总字数:{{ userStore.userinfo.articleWords }}</div>

          </li>
        </ul>
      </div>

      <!-- 操作按钮及图标 -->
      <div class="userinfo-content-charts">
        <ChartHeatmap></ChartHeatmap>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRoute } from '@/router'
import { useUserStore } from '@/stores/user'
import { toView } from '@/utils/util'
import { isNotBlank } from '@/utils/obj'
import ChartHeatmap from './ChartHeatmap.vue'

const userStore = useUserStore()

</script>

<style scoped lang="scss">
.home-userinfo-root {
  @include box(100%, 100%);
  @include flex(column, center, center);
  font-family: 'Jetbrains Mono';
  color: var(--gw-bg-font);
  .userinfo-desc {
    @include flex(row, flex-start, flex-end);

    .avatar {
      img {
        @include box(100px, 100px);
        border-radius: 10px;
        object-fit: cover;
      }
    }

    .info {
      text-align: left;
      padding-left: 20px;

      .name {
        @include font(38px, 300);
        height: 65px;
        
        letter-spacing: 5px;
        text-shadow: 3px 3px 5px var(--gw-bg-active-05);
      }

      .desc {
        @include font(13px, 300);
        height: 20px;
        color: var(--gw-bg-font);
        letter-spacing: 1px;
      }
    }
  }

  .userinfo-content {
    padding-top: 5px;
    text-align: center;

    // 操作按钮
    .userinfo-content-btns {
      @include flex(row, flex-start, center);
      margin-left: 30px;
      margin-top: 10px;

      ol,
      ul {
        @include font(15px, 300);
        text-align: left;

        li {
          transition: color 1s;
          cursor: pointer;
          line-height: 25px;

          &:hover {
            color: var(--gw-bg-font);
            text-shadow: 3px 3px 10px var(--gw-bg-active);
          }
        }
      }
    }

    &-charts {
      margin-left: -10px;
    }
  }
}
</style>
