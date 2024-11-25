<template>
  <div
    :class="['gw-header-root', wrapHeader ? 'hide' : '']"
    style="backdrop-filter: blur(6px)"
  >
    <div
      class="header-background"
      :style="{ opacity: headerBackgroundOpacity - 0.05 }"
    ></div>
    <bl-row class="head-row mobile-menu" style="width: auto">
      <el-popover
        popper-class="popper-dark"
        placement="bottom-start"
        trigger="hover"
        :show-arrow="false"
        :hide-after="0"
        :offset="-5"
        open-delay="2000"
        close-delay="2000"
        transition="el-zoom-in-top"
      >
        <template #reference>
          <div
            @click="drawer = true"
            class="iconbl bl-indent-increase"
            style="font-size: 2rem"
          ></div>
        </template>
        <div v-if="drawer" class="popper-content">
          <div
            v-for="(tab, index) in filterTabs"
            :key="index"
            :class="['item', 'tab', selectedTab === tab.name ? 'active' : '']"
            @click="selectTab(index, tab.name)"
          >
            <span
              :class="['iconfont', tab.icon]"
              style="color: var(--gw-bg-font);"
            ><span style="padding: 0 1rem;">{{
              tab.title
            }}</span></span>

          </div>
        </div>
      </el-popover>
    </bl-row>
    <bl-row
      class="head-row logo-menu"
      style="width: auto; justify-content: center"
    >
      <div class="gw-logo" @click="toRoute('Home')">
        <img :src="logo()" :style="getThemeLogoStyle()" />
      </div>
      <div class="project-name" @click="toRoute('Home')">{{ sysName() }}</div>
    </bl-row>
    <bl-row class="head-row tabs pc-menu" style="font-size: 2rem">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab', selectedTab === tab.name ? 'active' : '']"
        @click="selectTab(index, tab.name)"
      >
        <span
          :class="['iconfont', tab.icon]"
          style="color: var(--gw-bg-font); font-size: 2rem"
        ></span>
        <span class="tab-text" style="margin-left: 3px">{{ tab.title }}</span>
      </div>
    </bl-row>
    <bl-row class="head-row" width="'auto'">
      <el-popover
        v-if="userStore.auth && userStore.auth.status === '已登录'"
        popper-class="popper-dark"
        placement="bottom-start"
        trigger="click"
        :show-arrow="false"
        :hide-after="0"
        :offset="-5"
        transition="el-zoom-in-top"
      >
        <template #reference>
          <span class="iconbl bl-user-line" style="font-size: 2rem"></span>
        </template>
        <div class="popper-content">
          <div class="item" @click="toRoute('/todo')">
            <span class="iconbl bl-a-labellist-line"></span>待办事项
          </div>
          <div class="item" @click="toRoute('/plan')">
            <span class="iconbl bl-calendar-line"></span>日历计划
          </div>
          <div class="item" @click="toRoute('/note')">
            <span class="iconbl bl-note-line"></span>便签
          </div>
          <div class="item-divider"></div>
          <div class="item" @click="handlLogout">
            <span class="iconbl bl-logout-circle-line"></span>退出登陆
          </div>
        </div>
      </el-popover>
      <span
        v-else
        @click="toRoute('Login')"
        class="iconbl bl-login-circle-line popper-target"
      ></span>
    </bl-row>
  </div>
</template>

<script setup lang="ts">
import { toRoute } from "@/router";
import { useUserStore } from "@/stores/user";
import { logout } from "@/utils/auth";
import { throttle } from "@/utils/optimize";
import { getSysName, getThemeLogoStyle } from "@/utils/env";
import { isNotBlank } from "@/utils/obj";
import type { Tab } from "@/types/gw.props";

interface TabProps {
  tabs: Tab[];
  selectedTab: string;
}
const drawer = ref(true);
const props = defineProps<TabProps>();

const { tabs, selectedTab } = toRefs(props);

const emit = defineEmits<{
  (event: "update:selectedTab", value: string): void;
}>();

function selectTab(index: number, tab: string) {

  emit("update:selectedTab", tab);
}

const userStore = useUserStore();

const sysName = () => {
  if (userStore.userParams.WEB_LOGO_NAME) {
    return userStore.userParams.WEB_LOGO_NAME;
  }
  return getSysName();
};

const logo = () => {
  if (
    userStore.userParams.WEB_LOGO_URL &&
    isNotBlank(userStore.userParams.WEB_LOGO_URL)
  ) {
    return userStore.userParams.WEB_LOGO_URL;
  }
  return "favicon.png";
};

const handlLogout = () => {
  logout();
  toRoute("Home");
};

// 透明度控制
const top = ref(0);
window.addEventListener(
  "scroll",
  throttle(() => {
    top.value =
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
  }, 100)
);
let headerBackgroundOpacity = computed(() => {
  return top.value < 60 ? 0 : top.value > 360 ? 1 : (top.value - 60) / 300;
});

let wrapHeader = computed(() => {
  return top.value > 360;
});

let filterTabs = computed( () => {
  return tabs.value.filter(item => {
    return item.title != '资源';
  })
});
</script>

<style lang="scss">
.gw-header-root {
  @include box(100%, 60px);
  @include flex(row, space-between, center);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 0 3rem;
  transition: all 0.3s;
  &.hide {
    top: -60px;
  }
  .gw-logo {
    @include box(40px, 40px);
    cursor: pointer;
    img {
      @include box(40px, 40px);
    }
  }

  .project-name {
    font-size: 2rem;
    width: 10rem;
    height: 100%;
    margin-left: 10px;
    text-shadow: 3px 3px 5px var(--gw-bg-basic);
    cursor: pointer;
    color: transparent;
    font-family: current, sans-serif;
    letter-spacing: 1px;
    background: linear-gradient(
      90deg,
      var(--gw-bg-header),
      var(--gw-bg-font),
      var(--gw-bg-header)
    );
    background-clip: text;
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
.header-background {
  width: 100%;
  height: 100%;
  background-color: var(--gw-bg-basic);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  position: absolute;
  left: 0;
  z-index: -1;
  border-bottom: 1px solid rgba(11, 25, 38, 0.08);
  transition: all 0.3s;
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
  text-shadow: 1px 1px 2px var(--gw-bg-basic);
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
  margin: 5px;
  width: calc(100% - 10px);
}

.gw-header-bg {
  box-shadow: 0 1px 8px 1px var(--gw-bg-basic);
}

.head-row.tabs {
  margin: 0 80px;
}

.tab {
  font-family: ChillDuanSans_Light;
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

.head-row.mobile-menu {
  display: none;
}

@media (max-width: 780px) {
  .head-row.mobile-menu {
    display: block;
  }
  .head-row.pc-menu {
    display: none;
  }
  .head-row.logo-menu {
    flex-grow: 1;
    width: 100%;
    justify-content: center;
  }
}

/* 在屏幕宽度小于 400px 时隐藏文字，只显示图标 */
@media (max-width: 1075px) {
  .tab-text {
    display: none;
  }
}
</style>
