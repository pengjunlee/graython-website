<template>
  <div class="movie-root-container">
    <GWSearchCondition>
      <template v-slot:left-items>
        <div class="flex-item">
          <el-select
            v-model="folderName"
            clearable
            placeholder="分类"
            style="width: 150px"
          >
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
          <el-input
            style="margin-left: 10px"
            v-model="movieName"
            placeholder="电影名称"
          ></el-input>
        </div>
      </template>
      <template v-slot:right-items>
        <div class="flex-item">
          <span style="font-size: small; color: var(--gw-bg-font)"
            >影片数量: </span
          ><span
            style="
              font-size: small;
              color: var(--gw-bg-font);
              font-style: italic;
              font-weight: bold;
              text-decoration: underline;
            "
            >{{ total }}</span
          >
          <div class="flex-item" style="margin-left: 20px">
            <SvgIcon
              size="20px"
              icon-class="m3u8"
              class="svg-icon"
              :onclick="handleM3u8"
            />
            <span width="30px"></span>
            <SvgIcon
              size="20px"
              icon-class="refresh"
              class="svg-icon"
              :onclick="reloadData"
            />
          </div>
        </div>
      </template>
    </GWSearchCondition>
    <FlexContainer style="justify-content: space-around">
      <template v-slot:flex-items>
        <GWFlexMovieCard
          v-for="(movie, index) in movies"
          :click="clickThis"
          :play="playThis"
          :movie="movie"
        ></GWFlexMovieCard>
      </template>
      
    </FlexContainer>
    <div v-if="movies?.length > 0" style="width: 100%;margin-top: 1rem;">
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
    <!-- 图片选择器 -->
    <input
      ref="fileselectRef"
      style="display: none"
      type="file"
      accept="image/*"
      @change="onFileChange"
    />
    <GWPreviewVideo
      v-if="previewShow"
      :url="currentMovieUrl"
      :name="currentMovieName"
      :on-close="closePreview"
    ></GWPreviewVideo>
    
  </div>
  <!-- 模态框 -->
  <el-dialog
    style="padding: 30px; max-height: 500px; overflow: scroll"
    title="m3u8解析"
    v-model="dialogVisible"
    width="500px"
    @close="handleClose"
  >
    <el-form ref="m3u8FormRef" :model="form" label-width="auto" :rules="rules">
      <el-form-item label="电影名称：" prop="name">
        <!-- 库名称 -->
        <el-input v-model="form.name" placeholder="请输入电影名称"></el-input>
      </el-form-item>
      <el-form-item label="所属分类：" prop="folderName">
        <el-select
          v-model="form.folderName"
          filterable
          placeholder="请选择所属分类"
          style="width: 200px"
        >
          <el-option
            v-for="item in categories"
            :key="item.value"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="解析地址：" prop="url">
        <el-input
          size="small"
          type="textarea"
          placeholder="解析地址"
          v-model="form.url"
          resize="none"
          :rows="4"
        ></el-input>
      </el-form-item>
      <!-- 操作按钮 -->
      <el-form-item style="flex-direction: column">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm(m3u8FormRef)"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import type { Movie } from "@/types/gw.resources";
import {
  movieCoverApi,
  movieRefreshApi,
  pageMovieApi,
  movieCategoriesApi,
  m3u8MovieApi,
} from "@/api/movie";
import FlexContainer from "@/components/Flex/FlexContainer.vue";
import { ElMessage } from "element-plus";
import type { FormRules, FormInstance } from "element-plus";
import GWFlexMovieCard from "@/components/GWFlexMovieCard.vue";

const router = useRouter();

const total = ref(0);
const pageNo = ref(1);
const pageSize = ref(10);

const movies = ref<Movie[]>([]);

const previewShow = ref<boolean>(false);

const currentMovieName = ref<string>();
const currentMovieUrl = ref<string>();
const currentMovieId = ref<number>();

const categories = ref<any[]>();
const m3u8FormRef = ref<FormInstance>();
const folderName = ref<string>();
const movieName = ref<string>();

const form = ref<any>({
  name: "",
  folderName: "",
  url: "",
});

const rules = reactive<FormRules<any>>({
  name: [
    {
      required: true,
      message: "请输入电影名称",
      trigger: "blur",
    },
  ],
  folderName: [
    {
      required: true,
      message: "请选择电影所属分类",
      trigger: "blur",
    },
  ],
  url: [
    {
      required: true,
      message: "请输入m3u8 url地址",
      trigger: "blur",
    },
  ],
});

// 对话框是否可见
const dialogVisible = ref(false);
// 关闭对话框
const handleClose = () => {
  dialogVisible.value = false;
};

const handleM3u8 = () => {
  dialogVisible.value = true;
};

const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      m3u8MovieApi(form.value);
      handleClose();
    } else {
      console.log("error submit!", fields);
    }
  });
};

const clickThis = (item:Movie) => {
  currentMovieName.value = item.title;
  currentMovieUrl.value = item.previewUrl;
  currentMovieId.value = item.id;
  fileselectRef.value.click();
};

const playThis = (item: {name:string,url:string}) => {
  currentMovieName.value = item.name;
  currentMovieUrl.value = item.url;
  previewShow.value = true;
};

const handlePageChange = (newPage: number) => {
  pageNo.value = newPage;
  refreshData();
};

const refreshData = async () => {
  await pageMovieApi({
    pageNo: pageNo.value,
    pageSize: pageSize.value,
    folderName: folderName.value,
    name: movieName.value,
  }).then((rsp) => {
    movies.value = rsp.data.result;
    total.value = rsp.data.total;
  });
};

const fileselectRef = ref();

// 处理文件选择，转换为Base64格式进行预览
const onFileChange = async (event: Event) => {
  if (currentMovieId.value) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      let image;
      reader.onload = (e: ProgressEvent<FileReader>) => {
        image = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
      let formData = new FormData();
      formData.append("file", input.files[0]);
      formData.append("id", currentMovieId.value + "");
      await movieCoverApi(formData)
        .then((rsp) => {
          if (rsp.data) {
            ElMessage({
              type: "info",
              message: "电影海报已更新，请刷新页面查看",
            });
          }
        })
        .finally(() => {});
    }
  }
};

// 关闭预览
const closePreview = () => {
  previewShow.value = false;
};
watch(
  () => [folderName.value, movieName.value],
  () => {
    refreshData();
  },
  { deep: true, immediate: true }
);

const reloadData = () => {
  movieRefreshApi();
};

// 挂载处理
onMounted(async () => {
  refreshData();
  await movieCategoriesApi({type:1}).then((rsp) => {
    categories.value = rsp.data;
  });
});
</script>

<style scoped lang="scss">
.movie-root-container {
  background-color: var(--gw-bg-basic);
  width: 100vw;
  min-height: calc(100vh - 60px);
  margin-top: 60px;
  padding: 0 1rem;
  overflow: scroll;
}

.flex-item {
  display: inline-flex;
  margin-right: 5px;
}

.svg-icon {
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
}
</style>
