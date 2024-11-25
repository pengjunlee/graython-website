<template>
  <div
    class="resource-card"
    @mouseover="isHovered = true"
    @mouseleave="mouseLeave"
  >
    <!-- 图片展示 -->
    <img
      :src="getThumbnailUrl()"
      :alt="resource.name"
      class="image"
      @click="click"
    />
    <div class="more-options">
      <button @click="toggleOptions" class="more-btn">⋮</button>
      <div v-if="isOptions" class="options-div">
        <div id="triangle_bottom"></div>
        <!-- 操作选项下拉菜单 -->
        <div class="options-menu">
          <ul>
            <li v-if="resource.thumbnail === '是'">
              <el-tooltip
                class="box-item"
                effect="dark"
                content="库封面"
                placement="right"
              >
                <span @click="cover" class="iconbl bl-star-line"></span>
              </el-tooltip>
            </li>
            <!-- 可以在这里添加更多选项 -->
            <li>
              <el-tooltip
                class="box-item"
                effect="dark"
                content="下载"
                placement="right"
              >
                <span
                  @click="
                    downloadImage(
                      getWebsiteApiBaseUrl() + resource.previewUrl,
                      resource.name
                    )
                  "
                  class="iconbl bl-download--line"
                ></span>
              </el-tooltip>
            </li>
            <li>
              <el-tooltip
                class="box-item"
                effect="dark"
                content="删除"
                placement="right"
              >
                <span @click="deleteThis" class="iconbl bl-delete-line"></span>
              </el-tooltip>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileSaver from "file-saver";
import { ref, toRefs, onMounted } from "vue";
import { getWebsiteApiBaseUrl } from "@/utils/env";
import { ElMessage } from "element-plus";
import type { Resource } from "@/types/gw.resources";
import { deleteResourceApi } from "@/api/resources";

interface CardProps {
  resource: Resource; // 组件对应的数据
  onPreview?: (data: Resource) => void | Promise<void>;
  onCover?: (data: Resource) => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
}

const isHovered = ref(false);

const isOptions = ref(false);

const props = defineProps<CardProps>();

const { resource } = toRefs(props);
onMounted(() => {});

const getThumbnailUrl = () => {
  if (resource.value.thumbnailUrl) {
    return getWebsiteApiBaseUrl() + resource.value.thumbnailUrl;
  }
  return "/music.jpeg";
};

// 点击卡片时调用父组件的回调函数
function click() {
  if (props.onPreview) {
    props.onPreview(props.resource);
  }
}
// 点击卡片时调用父组件的回调函数
function cover() {
  if (props.onCover) {
    props.onCover(props.resource);
  }
}

function mouseLeave() {
  isHovered.value = false;
  isOptions.value = false;
}

// 切换操作选项菜单的显示
const toggleOptions = () => {
  isOptions.value = !isOptions.value;
};

const deleteThis = async () => {
  if (props.resource.id) {
    await deleteResourceApi(props.resource.id).then((rsp) => {
      if (rsp.data > 0) {
        ElMessage({
          type: "info",
          message: "删除成功",
        });
        if (props.onDelete) {
          props.onDelete();
        }
      } else {
        ElMessage({
          type: "error",
          message: "文件删除失败",
        });
      }
    });
  }
};

// 下载文件的方法
const downloadImage = (url: string, name: string) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      FileSaver.saveAs(blob, name); // 下载后的文件名
    })
    .catch((error) => {
      console.error("Error fetching file:", error);
      ElMessage({
        type: "error",
        message: "文件下载异常",
      });
    });
};
</script>

<style scoped lang="scss">
.resource-card {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: var(--gw-bg-basic);
  transition: transform 0.3s, box-shadow 0.3s;
}

.resource-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  .more-options {
    display: block;
  }
}

.image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 保证图片按比例填充容器 */
  transition: transform 0.3s;
}

.resource-card:hover .image {
  transform: scale(1.1); /* 鼠标悬停时放大图片 */
}

.more-options {
  position: absolute;
  top: 8px;
  right: 8px;
  display: none;
}

.more-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  color: var(--gw-bg-font);
  &:hover {
    background: var(--gw-bg-active);
    border-radius: 50%;
    .more-options {
      display: inline;
    }
  }
}

.options-menu {
  position: absolute;
  top: 35px;
  right: 0;
  background-color: var(--gw-bg-basic);
  color: var(--gw-bg-font);
  border: 1px solid var(--gw-bg-active);
  box-shadow: 0 2px 8px var(--gw-bg-font-01);
  border-radius: 5px;
  z-index: 100;
}

.options-menu ul {
  list-style: none;
  padding: 8px 0;
  margin: 0;
}

.options-menu li {
  padding: 3px 8px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 12px;
}

.options-menu li:hover {
  background-color: var(--gw-bg-active);
}

#triangle_bottom {
  height: 0px;
  width: 0px;
  margin-left: 9px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid var(--gw-bg-basic);
}
</style>
