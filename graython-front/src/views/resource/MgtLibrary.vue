<template>
  <div class="root-container">
    <el-container class="layout-container-demo">
      <el-aside width="200px">
        <el-menu :default-active="activeIndex" @select="handleSelect">
          <el-menu-item
            index="1"
            :class="activeIndex === '1' ? 'selectTab' : ''"
          >
            <template #title>
              <el-icon><List /></el-icon>全部
              <span
                style="text-align: right; display: inline-block; width: 100%"
                >{{ total }}</span>
            </template></el-menu-item
          >
          <el-menu-item
            index="2"
            :class="activeIndex === '2' ? 'selectTab' : ''"
            ><template #title>
              <el-icon><Collection /></el-icon>待分类图片
              <span
                style="text-align: right; display: inline-block; width: 100%"
                >{{ unclassified }}</span
              >
            </template></el-menu-item
          >
        </el-menu>
      </el-aside>

      <el-container class="right-container">
        <div v-if="activeIndex === '1'" class="resource-gallery">
          <GWResourceCard
            v-for="(resource, index) in resources"
            :key="index"
            :resource="resource"
            :on-preview="openPreview"
            :on-cover="setCover"
            :on-delete="refreshData"
          ></GWResourceCard>

          <div style="width: 100%">
            <el-pagination
              style="flex-direction: row-reverse"
              background
              layout="prev, pager, next"
              :total="total"
              :pager-count="5"
              :page-size="pageSize"
              :current-page="pageNo"
              @current-change="handlePageChange"
            />
          </div>
          <GWPreviewImage
            v-if="isPreviewImageVisible"
            :resource="currentResource.previewUrl"
            :name="currentResource.name"
            :on-close="closePreview"
          ></GWPreviewImage>
          <GWPreviewVideo
            v-if="isPreviewVideoVisible"
            :url="currentResource.previewUrl"
            :name="currentResource.name"
            :on-close="closePreview"
          ></GWPreviewVideo>
          <el-dialog
            style="padding: 30px; min-height: 200px"
            title="音频预览"
            v-model="isPreviewAudioVisible"
            @close="closeDialog()"
          >
            <GWAudioPreview
              ref="audioPreviewRef"
              :name="currentResource.name"
              :duration="currentResource.duration"
              :url="currentResource.previewUrl"
              class="img-item"
            ></GWAudioPreview>
          </el-dialog>
        </div>
        <GWClassifyImage v-else></GWClassifyImage>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {
  pageResourceApi,
  setLibraryCoverApi,
  statisticsLibraryApi,
} from "@/api/resources";
import {
  Menu as IconMenu,
  List,
  Collection,
  Setting,
} from "@element-plus/icons-vue";
import type { Resource } from "@/types/gw.resources";
import GWAudioPreview from "@/components/GWAudioPreview.vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";

// 获取路由对象
const route = useRoute();

// 获取路径参数 (在路由配置中用 :id 表示)
const libraryId = route.params.id;

const activeIndex = ref("1");
const total = ref(0);
const unclassified = ref(0);
const pageNo = ref(1);
const pageSize = ref(20);

// 选择菜单
const handleSelect = function (key: any, keyPath: any) {
  activeIndex.value = key;
};

// 资源数据
const resources = ref<Resource[]>();

// 预览状态和当前图片
const isPreviewImageVisible = ref(false);
const isPreviewVideoVisible = ref(false);
const isPreviewAudioVisible = ref(false);

const audioPreviewRef = ref();
// 计算当前预览的图片
const currentResource = ref<any>({});

const openPreview = (resource: any) => {
  if (resource.resourceType === "视频") {
    previewVideo(resource);
  } else if (resource.resourceType === "音频") {
    previewAudio(resource);
  } else {
    previewImage(resource);
  }
};

// 打开预览
const previewImage = (image: any) => {
  currentResource.value = image;
  isPreviewImageVisible.value = true;
};

// 打开预览
const previewVideo = (video: any) => {
  isPreviewVideoVisible.value = true;
  currentResource.value = video;
};

// 打开预览
const previewAudio = (video: any) => {
  isPreviewAudioVisible.value = true;
  currentResource.value = video;
};

// 关闭预览
const closePreview = () => {
  isPreviewImageVisible.value = false;
  isPreviewVideoVisible.value = false;
};

const closeDialog = () => {
  audioPreviewRef.value.reset();
  isPreviewAudioVisible.value = false;
};

// 设置库封面
const setCover = async (resource: Resource) => {
  let params = { id: libraryId, cover: resource.id };
  await setLibraryCoverApi(params).then((rsp: any) => {
    ElMessage({
      type: "info",
      message: "库封面设置成功",
    });
  });
};

const refreshData = async () => {
  await pageResourceApi({
    pageNo: pageNo.value,
    pageSize: pageSize.value,
    libraryId: libraryId,
  }).then((rsp) => {
    resources.value = rsp.data.result;
    total.value = rsp.data.total;
  });
};

const handlePageChange = (newPage: number) => {
  pageNo.value = newPage;
  refreshData();
};

// 挂载处理
onMounted(async () => {
  refreshData();
  // 更新统计数据
  await statisticsLibraryApi({ libraryId: libraryId, resourceTypes: [0,3],unclassified: true }).then((rsp) => {
    unclassified.value = rsp.data.unclassified;
  });
});
</script>

<style scoped lang="scss">
.root-container {
  background-color: var(--gw-bg-basic);
  @include box(100%, 100%);
  position: relative;
  overflow: scroll;
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
  width: 200px;
  height: calc(100vh - 65px);
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
}

.resource-gallery {
  background-color: var(--gw-bg-basic);
  @include box(100%, 100%);
  position: relative;
  overflow: scroll;
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
