<template>
  <div :class="['graython-header-root', props.bg ? 'graython-header-bg' : '']">
    <bl-row class="head-row" width="auto" height="100%">
      <div class="graython-logo" @click="toRoute('Home')">
        <img :src="logo()" :style="getThemeLogoStyle()" />
      </div>
      <div class="project-name" @click="toRoute('Home')">{{ sysName() }}</div>
    </bl-row>
    <bl-row class="head-row tabs" width="100%" height="100%">
      <div :class="tabClass('Home')" @click="clickTab($event)" name="Home">
        <homeIcon class="iconbl bl-a-home1-line tab-target"></homeIcon>
        <span class="tab-text">首页</span>
        </div>
      <div :class="tabClass('Articles')" @click="clickTab($event)"  name="Articles">
        <blogIcon class="iconbl bl-pen-line tab-target"></blogIcon>
        <span class="tab-text">博文</span>
        </div>
      <div :class="tabClass('Links')" @click="clickTab($event)"  name="Links">
        <locationIcon class="iconbl bl-link-m tab-target"></locationIcon>
        <span class="tab-text">导航</span>
      </div>
    </bl-row>
    <bl-row class="head-row" width="auto" height="100%">
      <day-night-switch :size="60" v-model="isDark"></day-night-switch>
      <el-popover
        popper-class="popper-dark"
        placement="bottom-start"
        trigger="click"
        :show-arrow="false"
        :hide-after="0"
        :offset="-5"
        transition="el-zoom-in-top">
        <template #reference>
          <div v-show="userStore.auth && userStore.auth.status === '已登录'" class="popper-target icon-circle">
            <span class="iconbl bl-apps-line"></span>
          </div>
        </template>
        <div class="popper-content">
          <div class="item" @click="toRoute('/todo')"><span class="iconbl bl-a-labellist-line"></span>待办事项</div>
          <div class="item" @click="toRoute('/plan')"><span class="iconbl bl-calendar-line"></span>日历计划</div>
          <div class="item" @click="toRoute('/note')"><span class="iconbl bl-note-line"></span>便签</div>
        </div>
      </el-popover>
      <div class="icon-circle">
          <span  @click="handlLogout" v-if="userStore.auth && userStore.auth.status === '已登录'" class="iconbl bl-logout-circle-line popper-target"></span>
          <span v-else @click="toRoute('Login')" class="iconbl bl-login-circle-line popper-target"></span>
      </div>
    </bl-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toRoute } from '@/router'
import { toView } from '@/utils/util'
import { useUserStore } from '@/stores/user'
import { logout } from '@/utils/auth'
import { getLinks, getSysName, getThemeLogoStyle } from '@/utils/env'
import { isNotBlank } from '@/utils/obj'
import type { RouteRecordName } from 'vue-router'
import { useRoute } from 'vue-router'
import DayNightSwitch from "@/components/DayNight.vue";
import {useDark} from "@vueuse/core";
import homeIcon from '@/assets/icons/home.svg'
import locationIcon from '@/assets/icons/location.svg'
import blogIcon from '@/assets/icons/blog.svg'

let isDark = useDark();
const route = useRoute();

const curRoute = ref<RouteRecordName>('Home')
const tabClass = (name:string) => {
  if (curRoute.value === name){
    return "tab active";
  }
  return "tab";
}

const userStore = useUserStore()

const props = defineProps({
  bg: {
    type: Boolean,
    default: false
  }
})

let recount: NodeJS.Timeout | undefined
const tryLoginCount = ref(0)

const toLogin = () => {
  tryLoginCount.value += 1
  if (!recount) {
    recount = setTimeout(() => {
      tryLoginCount.value = 0
      clearTimeout(recount)
      recount = undefined
    }, 5000)
  }
  if (tryLoginCount.value === 7) {
    toRoute('/login')
  }
}

const sysName = () => {
  if (userStore.userParams.WEB_LOGO_NAME) {
    return userStore.userParams.WEB_LOGO_NAME
  }
  return getSysName()
}

const logo = () => {
  if (userStore.userParams.WEB_LOGO_URL && isNotBlank(userStore.userParams.WEB_LOGO_URL)) {
    return userStore.userParams.WEB_LOGO_URL
  }
  return 'favicon.png'
}

const links = () => {
  return [{URL:"https://www.baidu.com",LOGO:"https://www.baidu.com/favicon.ico",NAME:"baidu"}] ;
  // if (isNotBlank(userStore.links)) {
  //   return JSON.parse(userStore.links)
  // } else {
  //   getLinks()
  // }
}

const handlLogout = () => {
  logout();
  const redirectTo = route.name || 'Home';
  toRoute(redirectTo)
}

const clickTab = (event: MouseEvent) => {
  // 获取所有带有 'my-button' 类的按钮元素
  const tabs = document.querySelectorAll('.head-row.tabs .tab');

  // 移除所有按钮的 'active' 类
  tabs.forEach((tab: { classList: { remove: (arg0: string) => void } }) => {
    tab.classList.remove('active');
  });

  const target = event.currentTarget as HTMLElement;
  // 为当前点击的按钮添加 'active' 类
  target?.classList.add('active');

  // 获取当前点击按钮的 path 属性值
  const name = target.getAttribute('name');
  toRoute(name);
}
</script>

<style lang="scss">
.graython-header-root {
  background-color: var(--gw-bg-basic);
  border-bottom: var(--el-border);
  @include box(100%, 60px);
  @include flex(row, space-between, center);
  padding: 10px 10px;
  z-index: 2000;

  .head-row {
    line-height: 40px;
  }

  .graython-logo {
    @include box(40px, 40px);
    cursor: pointer;

    img {
      @include box(40px, 40px);
    }
  }

  .project-name {
    @include box(auto, 100%);
    margin-left: 10px;
    text-shadow: 3px 3px 5px var(--gw-bg-basic);
    cursor: pointer;
    color: transparent;
    font-family: current, sans-serif;
    letter-spacing: 1px;
    background: linear-gradient(90deg, var(--gw-bg-header), var(--gw-bg-font), var(--gw-bg-header));
    -webkit-background-clip: text;
    animation: glow 10s linear infinite;
    transition: 1.5s;
    background-size: 300%;
    @keyframes glow {
      to {
        background-position: -300%;
      }
    }
  }
}

.tab-target {
  height: 100%;
  font-size: 20px;
  color: var(--gw-bg-font);
  text-shadow: 3px 3px 5px var(--gw-bg-basic);
  user-select: none;
  transition: color 0.3s;
  vertical-align: sub;
  &:hover {
    color: var(--gw-bg-font);
  }
}

.popper-target {
  height: 100%;
  font-size: 15px;
  color: #909090;
  padding: 0 10px;
  text-shadow: 3px 3px 5px var(--gw-bg-basic);
  user-select: none;
  transition: color 0.3s;

  &:hover {
    color: var(--gw-bg-font);
  }

  .iconbl {
    font-size: 18px;
  }
}

.icon-circle:hover {
  border-radius: 50%;
  background-color: var(--gw-bg-active);
}

.item {
  @include flex(row, flex-start, center);
  padding: 0 10px;
  color: var(--bl-font-active-color);
  border-radius: 5px;
  transition: 0.3s;
  white-space: pre-line;
  cursor: pointer;

  .iconbl {
    font-size: 20px;
    margin-right: 10px;
  }

  &:hover {
    color: var(--gw-bg-font);
    text-shadow: 3px 3px 5px var(--gw-bg-font);
  }
}

.item-divider {
  border-top: 1px solid #5c5c5c;
  margin-top: 5px;
  padding-bottom: 5px;
}

.graython-header-bg {
  box-shadow: 0 1px 8px 1px var(--gw-bg-basic);
}

.head-row.tabs {
  margin: 0 80px;
}

.tab {
  font-family: QianTuXiaoTu;
  font-weight: 400;
  border-radius: 5px;
  padding: 3px 20px;
  margin: 0 5px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: var(--gw-bg-active);
  }
}

.tab.active {
  background: var(--gw-bg-active);
  color: var(--gw-bg-font);
  font-weight: bold;
}
/* 在屏幕宽度小于 400px 时隐藏文字，只显示图标 */
@media (max-width: 750px) {
  .tab-text {
    display: none;
  }
}
</style>
