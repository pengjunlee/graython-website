<template>
  <div class="music-root-container">
    <el-container class="layout-container-demo">
      <el-aside>
        <el-menu :default-active="activeIndex" @select="handleSelect">
          <el-menu-item
            index="1"
            :class="activeIndex === '1' ? 'selectTab' : ''"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="歌手专辑"
              placement="right"
            >
              <SvgIcon size="22px" icon-class="musician" />
            </el-tooltip>
            <div style="margin-left: 10px"></div>
          </el-menu-item>
          <el-menu-item
            index="2"
            :class="activeIndex === '2' ? 'selectTab' : ''"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="全部歌曲"
              placement="right"
            >
              <SvgIcon size="22px" icon-class="music" />
            </el-tooltip>
          </el-menu-item>
          <el-menu-item
            index="3"
            :class="activeIndex === '3' ? 'selectTab' : ''"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="我喜欢的"
              placement="right"
            >
              <SvgIcon size="22px" icon-class="favorite" />
            </el-tooltip>
          </el-menu-item>
          <el-menu-item
            index="4"
            :class="activeIndex === '4' ? 'selectTab' : ''"
          >
            <el-tooltip
              class="item"
              effect="dark"
              content="播放列表"
              placement="right"
            >
              <SvgIcon size="22px" icon-class="music-list" />
            </el-tooltip>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container class="right-container">
        <div v-if="activeIndex === '4'" class="tab-body">
          <div
            class="row-card"
            style="
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid var(--gw-bg-font-01);
            "
          >
            <el-input v-model="musicName3" placeholder="歌曲名称"> </el-input>
          </div>
          <div
            class="row-card"
            style="border-bottom: 1px solid var(--gw-bg-font-01)"
          >
            <span
              style="
                font-size: 2rem;
                cursor: pointer;
                transform: rotate(180deg);
              "
              @click="previousMusic"
              class="iconfont icon-next"
            ></span>

            <span
              style="font-size: 2rem; cursor: pointer"
              @click="playSelectedMusic(filterMusicList)"
              class="iconfont icon-play"
            ></span>

            <span
              style="font-size: 2rem; cursor: pointer"
              @click="nextMusic()"
              class="iconfont icon-next"
            ></span>
          </div>
          <GWMusicSortableTable
            :table-data="musicList"
            :current-music="currentMusic"
            :click-t="playSelectedMusic"
            :page-change="pageChange"
          ></GWMusicSortableTable>
        </div>
        <div v-else-if="activeIndex === '3'" class="tab-body">
          <div
            class="row-card"
            style="
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid var(--gw-bg-font-01);
            "
          >
            <el-input v-model="musicName2" placeholder="歌曲名称" />
          </div>
          <div
            class="row-card"
            style="border-bottom: 1px solid var(--gw-bg-font-01)"
          >
            <span
              style="
                font-size: 2rem;
                cursor: pointer;
                transform: rotate(180deg);
              "
              @click="previousMusic"
              class="iconfont icon-next"
            ></span>

            <span
              style="font-size: 2rem; cursor: pointer"
              @click="playSelectedMusic(filterMusicList)"
              class="iconfont icon-play"
            ></span>

            <span
              style="font-size: 2rem; cursor: pointer"
              @click="nextMusic()"
              class="iconfont icon-next"
            ></span>
          </div>
          <GWMusicSortableTable
            :table-data="allMusic"
            :current-music="currentMusic"
            :click-t="playSelectedMusic"
            :page-change="pageChange"
          ></GWMusicSortableTable>
        </div>

        <div v-else-if="activeIndex === '2'" class="tab-body">
          <div
            class="row-card"
            style="
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid var(--gw-bg-font-01);
            "
          >
            <el-input v-model="musicName1" placeholder="歌曲名称" />
          </div>
          <div
            class="row-card"
            style="border-bottom: 1px solid var(--gw-bg-font-01)"
          >
            <span
              style="
                font-size: 2rem;
                cursor: pointer;
                transform: rotate(180deg);
              "
              @click="previousMusic"
              class="iconfont icon-next"
            ></span>

            <span
              style="font-size: 2rem; cursor: pointer"
              @click="playSelectedMusic(filterMusicList)"
              class="iconfont icon-play"
            ></span>

            <span
              style="font-size: 2rem; cursor: pointer"
              @click="nextMusic()"
              class="iconfont icon-next"
            ></span>
          </div>
          <GWMusicSortableTable
            :table-data="allMusic"
            :current-music="currentMusic"
            :click-t="playSelectedMusic"
            :page-change="pageChange"
          ></GWMusicSortableTable>
        </div>
        <div v-else="activeIndex === '1'" class="tab-body">
          <div v-if="singerTab == 1">
            <div
              class="row-card"
              style="
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid var(--gw-bg-font-01);
              "
            >
              <el-input style="width: 80%;" v-model="singerName" placeholder="歌手名字" />
              <span class="iconbl bl-upload--line" style="font-size: 2rem" @click="dialogVisible = true;"></span>
            </div>
            <div
              class="col-card"
              v-for="singer in filteredList"
              @click="singerCollection(singer)"
            >
              <Avatar
                size="xlarge"
                :src="
                  getWebsiteApiBaseUrl() +
                  'thumbnail/music/' +
                  singer.name +
                  '.png'
                "
              >
              </Avatar>
              <div class="name">{{ singer.name }}</div>
            </div>
          </div>
          <div v-else-if="singerTab == 2" class="row-card">
            <div
              class="row-card"
              style="
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid var(--gw-bg-font-01);
              "
            >
              <Avatar
                size="xlarge"
                :src="
                  getWebsiteApiBaseUrl() +
                  'thumbnail/music/' +
                  currentSinger.name +
                  '.png'
                "
              >
              </Avatar>
              <div
                class="pc-show"
                style="flex-grow: 1; font-weight: bold; font-style: italic"
              >
                {{ currentSinger.name }}
              </div>
              <div
                style="
                  background-color: var(--gw-bg-active);
                  padding: 5px;
                  border-radius: 5px;
                "
                @click="singerTab = 1"
              >
                <span
                  style="font-size: 2rem"
                  class="iconfont icon-back-filled"
                ></span>
              </div>
            </div>
            <div class="row-card">
              <GWTitleCard
                v-for="collection in singerCollectionList"
                :image="
                  getWebsiteApiBaseUrl() +
                  'preview/' +
                  collection.value +
                  '/' +
                  collection.name +
                  '.jpg'
                "
                :card-data="collection"
                :title="collection.name"
                :click-t="enterCollection"
              ></GWTitleCard>
            </div>
          </div>
          <div v-else>
            <div
              class="row-card"
              style="
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid var(--gw-bg-font-01);
              "
            >
              <img
                style="width: 100px; height: 100px; border-radius: 10px"
                :src="
                  getWebsiteApiBaseUrl() +
                  'preview/' +
                  currentCollection.value +
                  '/' +
                  currentCollection.name +
                  '.jpg'
                "
              />
              <div
                class="pc-show"
                style="flex-grow: 1; font-weight: bold; font-style: italic"
              >
                {{ currentCollection.name }}
              </div>
              <div
                style="
                  background-color: var(--gw-bg-active);
                  padding: 5px;
                  border-radius: 5px;
                "
                @click="singerTab = 2"
              >
                <span
                  style="font-size: 2rem"
                  class="iconfont icon-back-filled"
                ></span>
              </div>
            </div>
            <div
              class="row-card"
              style="border-bottom: 1px solid var(--gw-bg-font-01)"
            >
              <span
                style="
                  font-size: 2rem;
                  cursor: pointer;
                  transform: rotate(180deg);
                "
                @click="previousMusic"
                class="iconfont icon-next"
              ></span>

              <span
                style="font-size: 2rem; cursor: pointer"
                @click="playSelectedMusic(filterMusicList)"
                class="iconfont icon-play"
              ></span>

              <span
                style="font-size: 2rem; cursor: pointer"
                @click="nextMusic"
                class="iconfont icon-next"
              ></span>

              <span
                style="font-size: 2rem; cursor: pointer"
                @click="refresh(currentCollection)"
                class="iconfont icon-refresh"
              ></span>
            </div>
            <GWSortableTable
              :current-music="currentMusic"
              :table-data="collectionMusicList"
              :page-change="pageChange"
              :click-t="playSelectedMusic"
            ></GWSortableTable>
          </div>
        </div>
      </el-container>
    </el-container>
    <!-- 模态框 -->
  <el-dialog
    style="padding: 30px; max-height: 500px; overflow: scroll"
    title="上传头像"
    v-model="dialogVisible"
    width="500px"
    @close="dialogVisible = false;"
  >
    <el-form
      ref="musicianFormRef"
      :model="form"
      label-width="auto"
      :rules="rules"
    >
      <ImageUpload :image-url="form.avatar" @select-file="onFileChange"></ImageUpload>
      <el-form-item label="歌手名字：" prop="name">
        <!-- 库名称 -->
        <el-input v-model="form.name" placeholder="请输入歌手名字"></el-input>
      </el-form-item>
      <!-- 操作按钮 -->
      <el-form-item style="flex-direction: column">
        <el-button @click="dialogVisible = false;">取消</el-button>
        <el-button type="primary" @click="handleConfirm(musicianFormRef)"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import type { FormRules, FormInstance } from "element-plus";
import { movieCategoriesApi } from "@/api/movie";
import { musicRefreshApi, musicListApi, pageMusicApi, addMusicianApi } from "@/api/music";
import Avatar from "@/components/Avatar/Avatar.vue";
import GWTitleCard from "@/components/GWTitleCard.vue";
import GWSortableTable from "@/components/GWSortableTable.vue";
import GWMusicSortableTable from "@/components/GWMusicSortableTable.vue";
import { getWebsiteApiBaseUrl } from "@/utils/env";
import emitter from "@/utils/mitt";

// 对话框是否可见
const dialogVisible = ref(false);
const form = reactive<any>({});
const musicianFormRef = ref();
// 获取路由对象
const route = useRoute();
const activeIndex = ref("1");

const isCanRequest = ref(true);
let file :File;

const rules = reactive<FormRules<any>>({
  name: [
    {
      required: true,
      message: "请输入歌手名字",
      trigger: "blur",
    },
  ]
});

const onFileChange = (f: File) => {
  file = f;
};

const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (! isCanRequest.value) return;
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      isCanRequest.value = false;
      let formData = new FormData();
      formData.append('file', file);
      formData.append('entity', JSON.stringify({name:form.name}));

      await addMusicianApi(formData).then((rsp) => {
        isCanRequest.value = true;
        form.name = "";
        form.avatar = '';
        dialogVisible.value = false;
      }).finally(()=>{
        isCanRequest.value = true;
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

// 选择菜单
const handleSelect = function (key: any, keyPath: any) {
  activeIndex.value = key;
  if (key == "1") {
    singerTab.value = 1;
  } else if (key == "2") {
    pageMusic();
  } else if (key == "3") {
    pageMusic({ favorite: 1 });
  } else if (key == "4") {
    pageMusic({ playlist: 1 });
  }
};

async function pageMusic(param?: any) {
  await pageMusicApi({
    pageNo: 1,
    pageSize: 500,
    name: param?.musicName,
    favorite: param?.favorite,
    playlist: param?.playlist,
  }).then((rsp) => {
    allMusic.value = rsp.data.result;
  });
}

const pageMusicName = function (param: any) {
  pageMusic({ musicName: param });
};

const currentMusic = ref<any>();

//变量
const singerTab = ref<number>(1);
const currentSinger = ref<any>();
const currentCollection = ref<any>();
const singerName = ref<string>("");
const musicSearchName = ref<string>("");
const musicName1 = ref<string>();
const musicName2 = ref<string>();
const musicName3 = ref<string>();

const singerList = ref<any[]>([]);
const collectionMusicList = ref<any[]>([]);
const sortedCollectionMusicList = ref<any[]>([]);

const singerCollectionList = ref<any[]>([]);

const musicList = ref<any[]>([]);
const filterMusicList = ref<any[]>([]);
const allMusic = ref<any[]>([]);

watch(
  () => musicName1.value,
  (newName1) => {
    pageMusicName(newName1);
  }
);
watch(
  () => musicName2.value,
  (newName2) => {
    pageMusicName(newName2);
  }
);
watch(
  () => musicName3.value,
  (newName3) => {
    pageMusicName(newName3);
  }
);

const previousMusic = () => {
  emitter.emit("previousMusic");
};

const nextMusic = () => {
  emitter.emit("nextMusic");
};

const setMusic = (index: number) => {
  emitter.emit("setMusic", index);
};

const playMusic = () => {
  emitter.emit("playMusic");
};

const playSelectedMusic = (rows: any) => {
  emitter.emit("playSelectedMusic", rows);
  setMusic(0);
  playMusic();
};
const pageChange = function (musics: any[]) {
  filterMusicList.value = musics;
};

const singerCollection = async (singer: any) => {
  currentSinger.value = singer;
  singerTab.value = 2;

  await movieCategoriesApi({ type: 4, folderPath: singer.value }).then(
    (rsp) => {
      singerCollectionList.value = rsp.data;
    }
  );
};

const enterCollection = async (collection: any) => {
  singerTab.value = 3;
  currentCollection.value = collection;
  await musicListApi({ folderPath: collection.value }).then((rsp) => {
    collectionMusicList.value = rsp.data;
  });
};

const refresh = (collection: any) => {
  musicRefreshApi({ folderPath: collection.value });
};

let filteredList = computed(() => {
  return singerList.value.filter((singer) => {
    return singer.name.toLowerCase().includes(singerName.value.toLowerCase());
  });
});

onMounted(async () => {
  await movieCategoriesApi({ type: 3 }).then((rsp) => {
    singerList.value = rsp.data;
  });
  await pageMusicApi({
    pageNo: 1,
    pageSize: 5,
    musicName: musicSearchName.value,
    playlist: 1,
  }).then((rsp) => {
    musicList.value = rsp.data.result;
  });
  emitter.on("musicChanged", (music: any) => {
    currentMusic.value = music;
  });
});

onUnmounted(() => {
  emitter.off("musicChanged");
});
</script>

<style scoped lang="scss">

.music-root-container {
  background-color: var(--gw-bg-basic);
  width: 100%;
  min-height: calc(100vh - 60px);
  position: relative;
  margin-top: 60px;
  display: flex;
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
}

.selectTab {
  background-color: var(--gw-bg-active);
}

.layout-container-demo .el-aside {
  color: var(--gw-bg-font);
  background: var(--gw-bg-basic);
  border-right: 1px solid var(--gw-bg-active);
  width: 70px;
  height: calc(100vh - 85px);
}

.layout-container-demo {
  height: 100%;

  .el-menu {
    border-right: none;
  }
}

.right-container {
  position: relative;
  color: var(--gw-bg-font);
  background: var(--gw-bg-basic);
  border-right: 1px solid var(--gw-bg-active);
  height: 100%;
  display: flex;
}

.tab-body {
  font-size: 12px;
  flex-grow: 1;
  position: relative;
  overflow-y: scroll;
}

.row-card {
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  cursor: pointer;
  flex-wrap: wrap;
}

.col-card {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.name {
  padding: 5px;
  font-weight: bold;
}

.el-table__row {
  background-color: var(--gw-bg-basic) !important;
  /* 设置表格背景透明 */
}

/* 取消悬停行的背景颜色 */
.transparent-table .el-table__row:hover {
  background-color: transparent !important;
  /* 悬停行背景透明 */
}

@media screen and (max-width: 400px) {
  .pc-show {
    display: none;
  }
}
</style>
