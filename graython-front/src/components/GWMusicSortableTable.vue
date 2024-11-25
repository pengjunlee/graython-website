<template>
  <div class="grid">
    <table>
      <thead>
        <tr>
          <th 
            :class="['pc-show',sort === 'trackNumber' ? 'sorted':'']"
            @click="sortBy('trackNumber')"
          >
            #
          </th>
          <th 
          :class="{ sorted: sort === 'title' }" @click="sortBy('title')">
            Title
          </th>
          <th 
          :class="[sort === 'artist' ? 'sorted':'']"  @click="sortBy('artist')">
            Artist
          </th>
          <th 
          :class="['pc-show',sort === 'album' ? 'sorted':'']"   @click="sortBy('album')">
            Album
          </th>
          <th class="pc-show">Size</th>
          <th class="pc-show">Ext</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rowData, index) in sortedData">
          <td class="pc-show">{{ rowData.trackNumber }}</td>
          <td @click="clickThis(rowData)">
            <div
              :class="
                rowData.id == currentMusicId
                  ? 'music-title active'
                  : 'music-title'
              "
            >
              {{ rowData.title }}
            </div>
          </td>
          <td>
              {{ rowData.artist }}
          </td>
          <td class="pc-show">
              {{ rowData.album }}
          </td>
          <td class="pc-show">{{ rowData.prettySize }}</td>
          <td class="pc-show">
            <div class="ext-div">{{ rowData.ext }}</div>
          </td>
          <td style="display: flex">
            <el-tooltip
              v-if="rowData.favorite == '否'"
              class="item"
              effect="dark"
              content="添加到我喜欢"
              placement="right"
            >
              <SvgIcon
                size="20px"
                icon-class="mine_heart"
                @click="likeThis(index, rowData)"
              />
            </el-tooltip>
            <el-tooltip
              v-else
              class="item"
              effect="dark"
              content="从我喜欢移除"
              placement="right"
            >
              <SvgIcon
                size="20px"
                icon-class="heart-break"
                @click="likeThis(index, rowData)"
              />
            </el-tooltip>
            <el-tooltip
              v-if="rowData.playlist == '否'"
              class="item"
              effect="dark"
              content="添加到播放列表"
              placement="right"
            >
              <SvgIcon
                style="margin-left: 10px"
                size="20px"
                icon-class="list"
                @click="addThis(index, rowData)"
              />
            </el-tooltip>
            <el-tooltip
              v-else
              class="item"
              effect="dark"
              content="从播放列表移除"
              placement="right"
            >
              <SvgIcon
                style="margin-left: 10px"
                size="20px"
                icon-class="delete"
                @click="addThis(index, rowData)"
              />
            </el-tooltip>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="controls">
      <button class="btn btn-sm" :disabled="!hasPage(-1)" @click="prevPage">
        ←
      </button>
      <button class="btn btn-sm" :disabled="!hasPage(1)" @click="nextPage">
        →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, toRaw, computed, onMounted } from "vue";
import { getWebsiteApiBaseUrl } from "@/utils/env";
import { ElMessage } from "element-plus";
import { musicAddPlaylistApi, musicLikeApi } from "@/api/music";
interface TableProps {
  currentMusic: any;
  tableData: any[]; // 组件对应的数据
  clickT?: (data: any) => void | Promise<void>;
  pageChange?:(data: any) => void | Promise<void>;
}

const props = defineProps<TableProps>();

let currentMusicId = computed(()=>{
  return props.currentMusic ? props.currentMusic.id: -1;
});

// 点击卡片时调用父组件的回调函数
function clickThis(rowData: any) {
  if (props?.clickT) {
    props?.clickT([rowData]);
  }
}

async function likeThis(index: number, rowData: any) {
  // 调后台接口
  await musicLikeApi(rowData.id)
    .then((rsp) => {
      if (rsp.data) {
        sortedData.value[index].favorite = sortedData.value[index].favorite == '是' ? '否':'是';
        ElMessage({
          type: "info",
          message: "歌曲添加到我喜欢",
        });
      }
    })
    .finally(() => {});
}

async function addThis(index: number, rowData: any) {
  // 调后台接口
  // 调后台接口
  await musicAddPlaylistApi(rowData.id)
    .then((rsp) => {
      if (rsp.data) {
        sortedData.value[index].playlist = sortedData.value[index].playlist == '是' ? '否':'是';
        ElMessage({
          type: "info",
          message: "歌曲添加到播放列表",
        });
      }
    })
    .finally(() => {});
}

const sort = ref<string>("trackNumber");
const sortDir = ref<string>("asc");
const page = ref<number>(0);
const pageSize = ref<number>(5);

const sortBy = (s: string) => {
  if (s === sort.value) {
    sortDir.value = sortDir.value === "asc" ? "desc" : "asc";
  } else {
    sortDir.value = "asc";
  }
  sort.value = s;
};

const hasPage = function (dir: number) {
  if (dir === -1 && page.value > 0) return true;
  if (dir === 1 && (page.value + 1) * pageSize.value < props.tableData.length)
    return true;
  return false;
};
const prevPage = () => {
  if (hasPage(-1)) page.value--;

  if(props.pageChange) props.pageChange(sortedData.value);
};
const nextPage = () => {
  if (hasPage(1)) page.value++;
  if(props.pageChange) props.pageChange(sortedData.value);
};

const capitalize = (v: string) => {
  if (!v) return "";
  v = v.toString();
  return v.charAt(0).toUpperCase() + v.slice(1);
};

let sortedData = computed(() => {
  return props.tableData
    .sort((a, b) => {
      let dir = sortDir.value === "asc" ? 1 : -1;
      if (a[sort.value] < b[sort.value]) {
        return -1 * dir;
      } else if (a[sort.value] > b[sort.value]) {
        return 1 * dir;
      } else {
        return 0;
      }
    })
    .filter((row, idx) => {
      let s = page.value * pageSize.value;
      let e = (page.value + 1) * pageSize.value;
      return idx >= s && idx < e;
    });
});

onMounted(() =>{
    setTimeout(()=>{
      if(props.pageChange){
        props.pageChange(sortedData.value);
      }
    },1000);
});
</script>

<style scoped lang="scss">
table {
  width: 100%;
  margin: 0 0 2rem 0;
  border-spacing: 0;
}
table td,
table th {
  border-bottom: 0.1rem solid var(--gw-bg-active-05);
}
table th {
  padding: 2rem 1rem;
  text-align: left;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
}
table th.sorted {
  color: #ffc207;
}
table td {
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
}
table tr:hover td {
  background: rgba(0, 0, 0, 0.03);
}
.controls {
  width: 100%;
  text-align: center;
}
.btn {
  display: block;
  margin: 0 20px;
  padding: 10px 30px;
  color: var(--gw-bg-font);
  background: transparent;
  border: 1px solid var(--gw-bg-font);
  outline: 0;
  border-radius: 10px;
  font: inherit;
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  user-select: none;
  transition: all 0.25s ease;
}
.btn.btn-sm {
  display: inline-block;
}
.btn:visited {
  color: var(--gw-bg-font-01);
}
.btn:disabled,
.btn:disabled:hover {
  color: var(--gw-bg-font-01);
  border: 0.1rem solid var(--gw-bg-font-01);
  cursor: initial;
}
.btn:hover,
.btn:focus {
  background-color: var(--gw-bg-active);
}
.grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.music-title {
  max-width: 160px;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  white-space-collapse: collapse;
  overflow: hidden;
  padding: 0 10px;
  color: #ff8aa9;
  white-space: nowrap;
  &:hover {
    cursor: pointer;
  }
}

.music-title.active {
  color: #ffc207;
}

.ext-div {
  border: 1px solid var(--gw-bg-active);
  text-align: center;
  border-radius: 0.5rem;
  background-color: var(--gw-bg-active);
}

@media screen and (max-width: 500px) {

.pc-show {
  display: none;
}
}
</style>
