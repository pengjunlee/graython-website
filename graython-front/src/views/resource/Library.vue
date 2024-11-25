<template>
  <div class="library-container">
    <LibrarySearch @change="librarySearch"></LibrarySearch>
    <div class="graython-library-root">
   
   <GWTitleImageCard :blankCard="true" :onClick="createLibrary">
     <!-- <template v-slot:add-btn>
       <p>这里是插槽内容。</p>
     </template> -->
   </GWTitleImageCard>
   <GWTitleImageCard
     :blankCard="false"
     v-for="(library, index) in librarys"
     :key="index"
     :image="library.coverUrl"
     :title="library.name"
     :card-data="library"
     :click-t="goToManage"
   >
     <template v-slot:customize-btn>
       <span
         @click.stop="editLibrary(library)"
         style="color: green"
         class="customize-btn iconbl bl-a-fileedit-line"
       ></span>
       <span
         @click.stop="refreshLibrary(library)"
         style="color: #13aeff"
         class="customize-btn iconbl bl-refresh-line"
       ></span>
       <span
         @click.stop="deleteLibrary(library)"
         style="color: red"
         class="customize-btn iconbl bl-delete-line"
       ></span>
     </template>
   </GWTitleImageCard>
 </div>
 <!-- 模态框 -->
 <el-dialog
   style="padding: 30px; max-height: 500px; overflow: scroll"
   title="管理库"
   v-model="dialogVisible"
   width="500px"
   @close="handleClose"
 >
   <el-form
     ref="libraryFormRef"
     :model="form"
     label-width="auto"
     :rules="rules"
   >
     <el-form-item label="库名称：" prop="name">
       <!-- 库名称 -->
       <el-input v-model="form.name" placeholder="请输入库名称"></el-input>
     </el-form-item>
     <el-form-item label="合集：" prop="collectionId">
       <el-select
         v-model="form.collectionId"
         filterable
         placeholder="请选择库所属的合集"
         style="width: 200px"
       >
         <el-option
           v-for="item in collections"
           :key="item.id"
           :label="item.name"
           :value="item.id"
         />
       </el-select>
     </el-form-item>

     <el-form-item label="库地址：" prop="folderName">
       <!-- 输入框 -->
       <el-input
         readonly
         v-model="form.folderName"
         placeholder="请选择库对应的文件夹"
       ></el-input>
     </el-form-item>

     <el-form-item>
       <!-- 树形图 -->
       <div style="display: inline-block; margin-left: 79px">
         <el-input
           v-model="filterText"
           style="width: 200px"
           placeholder="搜索文件夹"
         />
         <el-tree
           ref="treeRef"
           style="max-width: 500px; margin: 10px 0"
           class="filter-tree"
           :data="treeData"
           :props="defaultProps"
           accordion
           :filter-node-method="filterNode"
           @node-click="handleNodeChange"
         />
       </div>
     </el-form-item>

     <!-- 操作按钮 -->
     <el-form-item style="flex-direction: column">
       <el-button @click="handleClose">取消</el-button>
       <el-button type="primary" @click="handleConfirm(libraryFormRef)"
         >确定</el-button
       >
     </el-form-item>
   </el-form>
 </el-dialog>
  </div>
  
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, reactive, watch, onMounted } from "vue";
import { ElMessage, ElTree, ElMessageBox } from "element-plus";
import type { FormRules, FormInstance } from "element-plus";
import {
  resourcesDirectoriesApi,
  addLibraryApi,
  listLibraryApi,
  listCollectionApi,
  deleteLibraryApi,
  refreshLibraryApi,
} from "@/api/resources";
import type { Library, Collection } from "@/types/gw.resources";
import GWTitleImageCard from "@/components/GWTitleImageCard.vue";
import LibrarySearch from "./LibrarySearch.vue";

const router = useRouter();

interface Tree {
  [key: string]: any;
}

const libraryFormRef = ref<FormInstance>();

// 库数据
const librarys = ref<Library[]>();
const collections = ref<Collection[]>();

onMounted(() => {
  refreshData();
});

// 跳转到详情页函数
const goToManage = (library: Record<string, any>) => {
  if (library?.id) {
    // router.push({ name: 'MgtLibrary', params: { id:library.id } });
    window.open(
      router.resolve({
        name: "MgtLibrary",
        params: { id: library.id },
      }).href,
      "_blank"
    );
  }
};

const librarySearch = async (params: any) => {
  await listLibraryApi(params ? params : 0).then((rsp) => {
    librarys.value = rsp.data;
  });
};

const refreshData = async () => {
  await listLibraryApi(0).then((rsp) => {
    librarys.value = rsp.data;
  });
  await listCollectionApi().then((rsp) => {
    collections.value = rsp.data;
  });
};

// 对话框是否可见
const dialogVisible = ref(false);
// 搜索文件夹关键词
const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();

watch(filterText, (val) => {
  treeRef.value!.filter(val);
});

const filterNode = (value: string, data: Tree) => {
  if (!value) return true;
  return data.label.includes(value);
};

// 树形图数据
const treeData = ref([]);

const form = reactive<Library>({
  name: "",
});

const rules = reactive<FormRules<Library>>({
  name: [
    {
      required: true,
      message: "请输入库名称",
      trigger: "blur",
    },
  ],
  folderName: [
    { required: true, message: "请选择库对应的文件夹", trigger: "blur" },
  ],
});
// 树形图属性配置
const defaultProps = {
  children: "children",
  label: "name",
};

// 重置form对象
const resetForm = (library?: Library) => {
  if (library) {
    form.id = library.id;
    form.name = library.name;
    form.folderName = library.folderName;
    form.folderPath = library.folderPath;
    form.collectionId = library.collectionId;
  } else {
    form.id = undefined;
    form.name = "";
    form.folderName = "";
    form.folderPath = "";
    form.collectionId = undefined;
  }
};

// 新建库
const createLibrary = async () => {
  resetForm();
  await resourcesDirectoriesApi().then((rsp) => {
    treeData.value = rsp.data;
    dialogVisible.value = true;
  });
};

// 编辑库
const editLibrary = async (library: Library) => {
  resetForm(library);
  await resourcesDirectoriesApi().then((rsp) => {
    treeData.value = rsp.data;
    dialogVisible.value = true;
  });
};

// 删除库
function deleteLibrary(library: Library) {
  ElMessageBox.confirm("确定要删除库[" + library.name + "]吗？", "确认删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await deleteLibraryApi(library.id).then(() => {
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
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await addLibraryApi(form).then((rsp) => {
        resetForm();
        handleClose();
        refreshData();
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

// 刷新库
const refreshLibrary = (library: Library) => {
  refreshLibraryApi(library.id);
  ElMessage({
    type: "success",
    message: "开始同步!",
  });
};

// 处理树节点选择变更
const handleNodeChange = (data: any) => {
  form.folderPath = data.path;
  form.folderName = data.name;
};
</script>

<style scoped lang="scss">
.library-container {
  width: 100%;
  height: calc( 100vh - 60px);
  margin-top: 60px;
  padding: 5px 20px;
  overflow: scroll;
}
.graython-library-root {
  padding: 10px 0;
  position: relative;
  display: flex;
  gap: 20px;

  flex-direction: row;
  flex-wrap: wrap;
}

.library-card {
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

.library-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px calc(--gw-bg-font-01);
}

.add-library {
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-icon {
  font-size: 36px;
  margin-bottom: 10px;
}

.library-cover {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
}

.library-name {
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
