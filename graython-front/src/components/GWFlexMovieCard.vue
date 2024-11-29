<template>
  <div class="gw-flex-item">
    <div class="gw-flex-card">
      <div class="img-card">
        <img
          :onclick="clickThis"
          :src="getWebsiteApiBaseUrl() + movie.coverUrl"
          onerror="this.onerror=null;this.src='';"
          alt="Sorry, something went wrong"
        />
        <div class="overlay" :style="{ display: showSeries ? 'flex' : 'none' }">
          <el-tooltip
            class="item"
            effect="dark"
            :content="item.title"
            placement="top"
            v-for="(item, key) in seriesData"
            :key="key"
          >
            <div
              class="overlay-item"
              :onclick="choosePlay"
              :fileName="item.value"
            >
              {{ item.chapter }}
            </div>
          </el-tooltip>
        </div>
      </div>
      <div class="gw-flex-info">
        <el-tooltip
          class="item"
          effect="dark"
          :content="movie.title + size"
          placement="bottom"
        >
          <h3 class="movie-title">{{ movie.title }}{{ size }}</h3>
        </el-tooltip>

        <h3
          v-if="movie.series == '是'"
          class="movie-play"
          :onclick="toogleSeries"
        >
          剧集
        </h3>
        <h3 v-else class="movie-play" :onclick="playThis">Play</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from "@/types/gw.resources";
import { getWebsiteApiBaseUrl } from "@/utils/env";
import { ref, toRefs, toRaw, computed } from "vue";
import { PreviewerApi } from "@/components/Previewer/index";
interface ItemProps {
  movie: Movie; // 组件对应的数据
  click?: (data: any) => void | Promise<void>;
}

const props = defineProps<ItemProps>();

const { movie } = toRefs(props);
const currentVideUrl = ref<string>(movie.value.previewUrl);
const currentVideName = ref<string>(movie.value.title);
const showSeries = ref(false);

let size = computed(() => {
  if (movie.value.size) {
    if (movie.value.series == "是") {
      return " [共" + movie.value.size + "集]";
    } else {
      let sz = movie.value.size / 1024;
      if (sz < 1024) return " [" + sz.toFixed(2) + "KB]";
      sz = sz / 1024;
      if (sz < 1024) return " [" + sz.toFixed(2) + "MB]";
      sz = sz / 1024;
      if (sz < 1024) return " [" + sz.toFixed(2) + "GB]";
    }
  }
});

// 点击卡片时调用父组件的回调函数
function clickThis() {
  if (props?.click) {
    const param = toRaw(movie.value);
    props.click(param);
  }
}
function toogleSeries() {
  showSeries.value = !showSeries.value;
}

function choosePlay(event: { target: any }) {
  // 获取点击目标
  const target = event.target;
  currentVideName.value = movie.value.title + "_" + target.innerHTML;
  currentVideUrl.value =
    movie.value.previewUrl + "/" + target.getAttribute("fileName");
  playThis();
}
function playThis() {
  PreviewerApi.previewVideo(getWebsiteApiBaseUrl() +currentVideUrl.value,currentVideName.value);
}

let seriesData = computed(() => {
  if (movie.value.files) {
    return movie.value.files.map((item) => {
      const [part1, part2] = item.name.split("-");
      return { ...item, chapter: part1, title: part2 };
    });
  }
});
</script>

<style scoped lang="scss">
.img-card {
  position: relative;
  width: 100%;
  height: 100%;
}
img {
  overflow-clip-margin: content-box;
  vertical-align: middle;
  border-style: none;
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem 0.5rem 0 0;
  overflow: hidden;
  max-height: 100% !important;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
}

.gw-flex-info {
  background: var(--gw-bg-active-05);
  border-radius: 0 0 0.5rem 0.5rem;
  padding: 1rem !important;
  align-items: center !important;
  justify-content: space-between !important;
  display: flex !important;
}

.movie-title {
  color: var(--gw-bg-font);
  padding: 0.5rem;
  font-size: 1rem;
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 使用省略号表示超出部分 */
}

.movie-play {
  background: var(--gw-bg-active);
  color: orange;
  text-align: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  min-width: 55px;
  &:hover {
    cursor: pointer;
  }
}

.overlay {
  position: absolute;
  padding: 10px;
  flex-wrap: wrap;
  align-items: start;
  align-content: start;
  justify-content: space-around;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--gw-bg-active-05); /* 半透明黑色遮罩 */
  opacity: 0.5; /* 可调节透明度 */
  overflow-y: scroll;
  gap: 1rem;
  max-height: 100%;
  display: none;
  &:hover {
    opacity: 1; /* 可调节透明度 */
  }
  .overlay-item {
    background-color: var(--gw-bg-basic);
    width: 60px;
    font-size: 12px;
    padding: 5px;
    text-align: center;
    border-radius: 2px;
    border: 1px solid var(--gw-bg-font);
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 隐藏超出部分 */
    text-overflow: ellipsis; /* 使用省略号表示超出部分 */
    &:hover {
      cursor: pointer;
      background-color: var(--gw-bg-active);
    }
  }
}

.gw-flex-item {
  position: relative;
}
@media (min-width: 768px) {
  .gw-flex-item {
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 0 0 50%;
  }
}

@media (min-width: 992px) {
  .gw-flex-item {
    -ms-flex: 0 0 25%;
    flex: 0 0 25%;
    max-width: 25%;
  }
}

@media (min-width: 1200px) {
  .gw-flex-item {
    -ms-flex: 0 0 20%;
    flex: 0 0 20%;
    max-width: 20%;
  }
}
</style>
