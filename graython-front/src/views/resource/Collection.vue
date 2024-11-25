<template>
  <div class="graython-Collection-root">
    <GWTitleImageCard :blankCard="true" :onClick="createCollection">
      <!-- <template v-slot:add-btn>
        <p>这里是插槽内容。</p>
      </template> -->
    </GWTitleImageCard>
    <GWTitleImageCard
      :blankCard="false"
      v-for="(collection, index) in Collections"
      :key="index"
      :image="collection.thumbnailUrl"
      :title="collection.name"
      :card-data="collection"
    >
      <template v-slot:customize-btn>
        <span
          @click="editCollection(collection)"
          style="color: green"
          class="customize-btn iconbl bl-a-fileedit-line"
        ></span>
        <span
          @click="deleteCollection(collection)"
          style="color: red"
          class="customize-btn iconbl bl-delete-line"
        ></span>
      </template>
    </GWTitleImageCard>
  </div>
  <!-- 模态框 -->
  <el-dialog
    style="padding: 3rem; max-height: 50rem; overflow: scroll"
    title="管理合集"
    v-model="dialogVisible"
    width="50rem"
    @close="handleClose"
  >
    <el-form
      ref="collectionFormRef"
      :model="form"
      label-width="auto"
      :rules="rules"
    >
      <ImageUpload :image-url="form.thumbnailUrl" @select-file="onFileChange"></ImageUpload>
      <el-form-item label="合集名称：" prop="name">
        <!-- 库名称 -->
        <el-input v-model="form.name" placeholder="请输入合集名称"></el-input>
      </el-form-item>
      <!-- 操作按钮 -->
      <el-form-item style="flex-direction: column">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm(collectionFormRef)"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import { ElMessage, ElTree, ElMessageBox } from "element-plus";
import type { FormRules, FormInstance } from "element-plus";
import {
  addCollectionApi,
  listCollectionApi,
  deleteCollectionApi,
} from "@/api/resources";
import type { Collection } from "@/types/gw.resources";
import GWTitleImageCard from "@/components/GWTitleImageCard.vue";
import ImageUpload from "@/components/ImageUpload.vue";


interface Tree {
  [key: string]: any;
}

const isCanRequest = ref(true);

const collectionFormRef = ref<FormInstance>();

// 库数据
const Collections = ref<Collection[]>();

onMounted(() => {
  refreshData();
});

const refreshData = async () => {
  await listCollectionApi().then((rsp) => {
    Collections.value = rsp.data;
  });
};

// 对话框是否可见
const dialogVisible = ref(false);
const form = reactive<Collection>({
  name: "",
});

let file :File;

const rules = reactive<FormRules<Collection>>({
  name: [
    {
      required: true,
      message: "请输入合集名称",
      trigger: "blur",
    },
  ]
});


// 重置form对象
const resetForm = (collection?: Collection) => {
  if (collection) {
    form.id = collection.id;
    form.name = collection.name;
    form.thumbnailUrl = collection .thumbnailUrl;
  } else {
    form.id = undefined;
    form.name = "";
    form.thumbnailUrl = undefined;
  }
};

// 新建库
const createCollection = () => {
  resetForm();
  dialogVisible.value = true;
};

// 编辑库
const editCollection = (Collection: Collection) => {
  resetForm(Collection);
  dialogVisible.value = true;
};

// 删除库
function deleteCollection(Collection: Collection) {
  ElMessageBox.confirm("确定要删除合集[" + Collection.name + "]吗？", "确认删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await deleteCollectionApi(Collection.id).then(() => {
        refreshData();
      });
      ElMessage({
        type: "success",
        message: "删除成功!",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除",
      });
    });
}

// 关闭对话框
const handleClose = () => {
  dialogVisible.value = false;
};

const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (! isCanRequest.value) return;
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      isCanRequest.value = false;
      let formData = new FormData();
      formData.append('file', file);
      formData.append('entity', JSON.stringify({id:form.id,name:form.name}));

      await addCollectionApi(formData).then((rsp) => {
        isCanRequest.value = true;
        resetForm();
        handleClose();
        refreshData();
      }).finally(()=>{
        isCanRequest.value = true;
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const onFileChange = (f: File) => {
  file = f;
};


</script>

<style scoped lang="scss">
.graython-Collection-root {
  background-color: var(--gw-bg-basic);
  width: 100%;
  height: calc( 100vh - 60px);
  margin-top: 60px;
  position: relative;
  overflow: scroll;
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.Collection-card {
  width: 150px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 8px;
  transition: transform 0.2s ease;
  text-align: center;
}

.Collection-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px calc(--gw-bg-font-01);
}

.add-Collection {
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-icon {
  font-size: 36px;
  margin-bottom: 10px;
}

.Collection-cover {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
}

.Collection-name {
  font-size: 14px;
  font-weight: bold;
}
.customize-btn {
  font-size: 22px;
  padding: 2px;
  border-radius: 3px;
}
.customize-btn.iconbl:hover {
  background-color: var(--gw-bg-font-01);
}
</style>
