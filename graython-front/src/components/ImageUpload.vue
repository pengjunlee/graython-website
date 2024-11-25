<template>
  <div
    class="image-upload"
    :style="{ height: size ? size + 'px' : '200px' }"
    @click="selectFile"
  >
    <!-- 图片选择器 -->
    <input
      ref="fileselectRef"
      style="display: none"
      type="file"
      accept="image/*"
      @change="onFileChange"
    />

    <!-- 图片预览 -->
    <div
      class="image-preview"
      :style="{
        border: imageUrl ? 'none' : '1px solid var(--gw-bg-active)',
        width: size ? size + 'px' : '200px',
      }"
    >
      <img
        class="img"
        :style="{ height: size ? size + 'px' : '200px' }"
        v-if="imagePreview()"
        :src="imagePreview()"
        alt="预览图片"
      />
      <SvgIcon v-else size="50px" icon-class="add" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted, onMounted, toRefs } from "vue";
import { getWebsiteApiBaseUrl } from "@/utils/env";

interface ImageProps {
  imageUrl?: string;
  size?: number;
}

const props = defineProps<ImageProps>();

const { size } = toRefs(props);

const imageUrl = ref(props.imageUrl);

// 定义用于存储文件和预览图片的响应式变量
const selectedFile = ref<File | null>(null);
const imagePreview = () => {
  if (imageUrl.value) {
    return imageUrl.value.startsWith("http") ||
      imageUrl.value.startsWith("data")
      ? imageUrl.value
      : getWebsiteApiBaseUrl() + imageUrl.value;
  }
  return "";
};

const fileselectRef = ref();

const emit = defineEmits<{
  (event: "selectFile", value: File): void;
}>();

// 处理文件选择，转换为Base64格式进行预览
const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    selectedFile.value = input.files[0];
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      imageUrl.value = e.target?.result as string;
    };
    reader.readAsDataURL(selectedFile.value);
    emit("selectFile", selectedFile.value);
  }
};

const selectFile = () => {
  fileselectRef.value.click();
};

onUnmounted(() => {
  selectedFile.value = null;
});

onMounted(() => {});
</script>

<style scoped>
.image-upload {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 10px 0;
}

.image-preview {
  align-items: center;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  border-radius: 10px;
}

.image-preview img {
  max-width: 100%;
  width: auto;
  border-radius: 10px;
  object-fit: contain; /* 保证图片按比例填充容器 */
}

button {
  margin-top: 10px;
}

.upload-status {
  margin-top: 10px;
  color: green;
}
</style>
