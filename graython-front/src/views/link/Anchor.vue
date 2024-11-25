<template>
  <div class="library-container">
    <GWSearchCondition>
      <template v-slot:left-items>
        <div class="flex-item">
          <el-select
            v-model="groupType"
            clearable
            placeholder="分组"
            style="width: 150px"
          >
            <el-option
              v-for="item in groupTypes"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </div>
      </template>
    </GWSearchCondition>
    <div class="graython-Link-root">
      <GWTitleImageCard :blankCard="true" :onClick="createLink">
        <!-- <template v-slot:add-btn>
        <p>这里是插槽内容。</p>
      </template> -->
      </GWTitleImageCard>
      <GWTitleImageCard
        :blankCard="false"
        v-for="(link, index) in links"
        :key="index"
        :image="link.coverUrl"
        :title="link.name"
        :card-data="link"
      >
        <template v-slot:customize-btn>
          <span
            @click="editLink(link)"
            style="color: green"
            class="customize-btn iconbl bl-a-fileedit-line"
          ></span>
          <span
            @click="deleteLink(link)"
            style="color: red"
            class="customize-btn iconbl bl-delete-line"
          ></span>
        </template>
      </GWTitleImageCard>
    </div>
    <!-- 模态框 -->
    <el-dialog
      style="padding: 30px; height: 600px; overflow: scroll"
      title="管理网址"
      v-model="dialogVisible"
      width="600px"
      @close="handleClose"
    >
      <el-form
        ref="anchorFormRef"
        :model="form"
        label-width="auto"
        :rules="rules"
      >
        <ImageUpload
          :size="150"
          :image-url="form.coverUrl"
          @select-file="onFileChange"
        ></ImageUpload>
        <el-form-item label="封面：" prop="cover">
          <el-input v-model="form.cover" placeholder="请输入封面URL"></el-input>
        </el-form-item>
        <el-form-item label="名称：" prop="name">
          <el-input v-model="form.name" placeholder="请输入网址名称"></el-input>
        </el-form-item>
        <el-form-item label="描述：" prop="remark">
          <el-input
            type="textarea"
            :rows="2"
            v-model="form.remark"
            placeholder="请输入网址描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="网址：" prop="url">
          <el-input v-model="form.url" placeholder="请输入网址URL"></el-input>
        </el-form-item>
        <el-form-item label="分组：" prop="groupType">
          <el-select
            v-model="form.groupType"
            filterable
            placeholder="请选择分组"
            style="width: 200px"
          >
            <el-option
              v-for="item in groupTypes"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- 操作按钮 -->
        <el-form-item style="flex-direction: column">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleConfirm(anchorFormRef)"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormRules, FormInstance } from "element-plus";
import {
  addLinkApi,
  listLinkApi,
  deleteLinkApi,
  groupTypesApi,
} from "@/api/link";
import type { Link, IntEnumOption } from "@/types/gw.resources";
import GWTitleImageCard from "@/components/GWTitleImageCard.vue";
import ImageUpload from "@/components/ImageUpload.vue";
import GWSearchCondition from "@/components/GWSearchCondition.vue";

const isCanRequest = ref(true);

const anchorFormRef = ref<FormInstance>();

// 库数据
const links = ref<Link[]>();
const groupTypes = ref<IntEnumOption[]>();

const groupType = ref<number>();

onMounted(async () => {
  await groupTypesApi().then((rsp) => {
    groupTypes.value = rsp.data;
  });
  refreshData(groupType.value);
});

const refreshData = async (params: any) => {
  groupType.value = params;
  await listLinkApi(groupType.value ? groupType.value : -1).then((rsp) => {
    links.value = rsp.data;
  });
};

// 对话框是否可见
const dialogVisible = ref(false);
const form = reactive<Link>({
  name: "",
  remark: "",
  url: "",
  cover: "",
  coverUrl: "",
  groupType: 0,
});

let file: File;

const rules = reactive<FormRules<Link>>({
  name: [
    {
      required: true,
      message: "请输入网站名称",
      trigger: "blur",
    },
  ],
  remark: [
    {
      required: true,
      message: "请输入网站描述",
      trigger: "blur",
    },
  ],
  url: [
    {
      required: true,
      message: "请输入网站链接",
      trigger: "blur",
    },
  ],
});

// 重置form对象
const resetForm = (link?: Link) => {
  if (link) {
    form.id = link.id;
    form.name = link.name;
    form.remark = link.remark;
    form.url = link.url;
    form.cover = link.cover;
    form.coverUrl = link.coverUrl;
    form.groupType = link.groupType;
  } else {
    form.id = undefined;
    form.name = "";
    form.remark = "";
    form.url = "";
    form.cover = "";
    form.coverUrl = undefined;
    form.groupType = 0;
  }
};

// 新建库
const createLink = () => {
  resetForm();
  dialogVisible.value = true;
};

// 编辑库
const editLink = (Link: Link) => {
  resetForm(Link);
  dialogVisible.value = true;
};

// 删除库
function deleteLink(Link: Link) {
  ElMessageBox.confirm("确定要删除合集[" + Link.name + "]吗？", "确认删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await deleteLinkApi(Link.id).then(() => {
        refreshData(groupType.value);
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
  resetForm();
};

const handleConfirm = async (formEl: FormInstance | undefined) => {
  if (!isCanRequest.value) return;
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      isCanRequest.value = false;
      let formData = new FormData();
      formData.append("file", file);
      formData.append(
        "entity",
        JSON.stringify({
          id: form.id,
          name: form.name,
          remark: form.remark,
          url: form.url,
          cover: form.cover,
          groupType: form.groupType,
        })
      );

      await addLinkApi(formData)
        .then((rsp) => {
          isCanRequest.value = true;
          resetForm();
          handleClose();
          refreshData(groupType.value);
        })
        .finally(() => {
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

watch(
  () => groupType.value,
  (newGroup) => {
    refreshData(groupType.value);
  },
  { deep: true, immediate: true }
);
</script>

<style scoped lang="scss">
.library-container {
  width: 100%;
  height: calc( 100vh - 60px);
  margin-top: 60px;
  padding: 5px 20px;
  overflow: scroll;
}
.graython-Link-root {
  padding: 10px 0;
  position: relative;
  display: flex;
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
}

.Link-card {
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

.Link-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px calc(--gw-bg-font-01);
}

.add-Link {
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-icon {
  font-size: 36px;
  margin-bottom: 10px;
}

.Link-cover {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
}

.Link-name {
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
