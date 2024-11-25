<template>
  <div
    class="container"
    ref="contaionerRef"
    @keydown="handleKeydown"
    tabindex="0"
  >
    <div class="class-items">
      分类列表
    <br/>
    -------
    <br/>
      <div v-for="classification in classifications" :key="classification.value" >[ {{ classification.value }} ] {{ classification.name }}</div>
    </div>
    <div ref="slideRef" id="slide">
      <div
        class="item"
        v-for="image in images"
        :style="{
          backgroundImage: `url('${getWebsiteApiBaseUrl() + image.previewUrl}')`,
        }"
      ></div>
      <div class="buttons">
        <div class="left" @click="left()">< Prev</div>
        
        <div class="right" @click="right()">Next ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Resource, IntEnumOption } from "@/types/gw.resources";
import { getWebsiteApiBaseUrl } from "@/utils/env";
import { pageResourceApi, resourcesClassificationsApi, resourceClassifyApi } from "@/api/resources";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";

// 获取路由对象
const route = useRoute();

// 模拟图片数据
const images = ref<Resource[]>([]);
let openClick = true; // 节流处理 (保证动画执行过程，按钮不被重复点击)

// 获取路径参数 (在路由配置中用 :id 表示)
const libraryId = route.params.id;
const pageNo = ref(1);

const slideRef = ref();
const contaionerRef = ref();
const classifications = ref<IntEnumOption[]>();
let classificationMap: Map<number, string>;

const left = () => {
  if (openClick) {
    openClick = false; // 触发点击后，禁用按钮
    const items = document.querySelectorAll(".item");
    slideRef.value.prepend(items[items.length - 1]);

    setTimeout(() => (openClick = true), 1000); // 1s 再开放按钮的点击
  }
};

const right = () => {
  if (openClick) {
    openClick = false;
    const items = document.querySelectorAll(".item");
    slideRef.value.appendChild(items[0]);

    setTimeout(() => (openClick = true), 1000);
  }
};
// 监听键盘按下事件的处理函数
const handleKeydown = async (event: KeyboardEvent) => {
  const key = event.key;
  // 检查是否按下的是数字键 0-9
  if (/^[0-9]$/.test(key)) {
    console.log(`按下了数字键：${key}`);
    if (images.value) {
      // 调用后台接口处理数据
      let params = { id: images.value[0].id, classification: classificationMap.get(Number.parseInt(key)) };
      await resourceClassifyApi(params);
      images.value.shift();
      if (images.value.length === 5) {
        refreshData(2,5);
      }
    }
  }else if(event.key.toLowerCase() === 'n'){
    right();
  }else if( event.key.toLowerCase() === 'p'){
    left();
  }
};

const refreshData = async (pageNo:number, pageSize: number) =>{
  await pageResourceApi({ pageNo: pageNo, pageSize: pageSize, libraryId: libraryId, resourceTypes: [0,3],unclassified: true }).then(
    (rsp) => {
      images.value?.push(...rsp.data.result);

    }
  );
}

// 使 div 能够监听键盘事件，需要添加 tabindex
onMounted(async () => {
  if (contaionerRef.value) {
    slideRef.value.focus(); // 让 div 获取焦点，保证键盘事件能够被捕获
  }

  refreshData(1,10);

  await resourcesClassificationsApi().then((rsp) => {
    if(rsp.data){
      classifications.value = rsp.data;
    // 使用 reduce 将对象数组转换为 Map
    classificationMap = new Map(classifications.value.map(item => [item.value, item.name]));
    }

  });
});
</script>

<style scoped lang="scss">
/* 模态框样式 */
.container {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  background: var(--gw-bg-basic);
  z-index: 3000;
  gap: 5px;
  overflow: hidden;
  border-radius: 10px;
  display: inline-flex;
  &:focus {
    border: 1px solid var(--gw-bg-font);
    background: var(--gw-bg-active-05);
  }
}

#slide {
  width: 100%;
  position: relative;
  height: 100%;
}
.item {
  width: 240px;
  height: 160px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  border-radius: 10px;
  box-shadow: 0 30px 50px #505050;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: 1s;
}

.item:nth-child(1) {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: translateY(0);
  box-shadow: none;
  border-radius: 10px;
}

.item:nth-child(2) {
  left: 70%;
}

.item:nth-child(3) {
  left: calc(70% + 250px);
}

.item:nth-child(4) {
  left: calc(70% + 500px);
}

.item:nth-child(n + 5) {
  left: calc(70% + 750px);
  opacity: 0;
}

.buttons {
  width: 100%;
  position: absolute;
  bottom: 50px;
  text-align: center;
  display: flex;
  justify-content: center;
}

.buttons div {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
  margin: 0 25px;
  transition: 0.5s;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  color: var(--gw-bg-font);
  background-color: var(--gw-bg-basic);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
}
.class-items {
  border-radius: 10px;
  border: 1px solid var(--gw-bg-active);
  width: 120px;
  height: 100%;
  text-align: center;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
    padding: 10px;
    font-weight: bold;
  div {
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 2px;
    margin: 5px 0;
    transition: 0.5s;
    cursor: pointer;
    user-select: none;
    font-size: 14px;
    color: var(--gw-bg-font);
    background-color: var(--gw-bg-active);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  }
}
</style>
