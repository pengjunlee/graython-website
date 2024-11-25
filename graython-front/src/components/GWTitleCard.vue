<template>
  <div class="card" @click="clickThis">
    <div class="card_image">
      <img :src="image" />
      <div class="card_title title-white">
      <p>{{ title }}</p>
    </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, toRaw, computed } from "vue";

interface CardProps {
  image: string;
  title: string;
  cardData?: any; // 组件对应的数据
  clickT?: (data: any) => void | Promise<void>;
}

const props = defineProps<CardProps>();

const { image, title } = toRefs(props);


// 点击卡片时调用父组件的回调函数
function clickThis() {
  if (props?.clickT) {
    const param = props.cardData ? toRaw(props.cardData) : {};
    props?.clickT(param);
  }
}
</script>

<style scoped lang="scss">
.card {
  width: 150px;
  height: 150px;
  border-radius: 40px;
box-shadow: 5px 5px 20px 7px rgba(0,0,0,0.25), -5px -5px 20px 7px rgba(0,0,0,0.22);
  cursor: pointer;
  transition: 0.4s;
}

.card .card_image {
  width: inherit;
  height: inherit;
  border-radius: 40px;
}

.card .card_image img {
  width: inherit;
  height: inherit;
  border-radius: 20px;
  object-fit: cover;
}

.card .card_title {
  text-align: center;
    border-radius: 0 0 20px 20px;
    font-family: sans-serif;
    font-weight: bold;
    font-size: 20px;
    height: 30px;
    margin-top: -55px;
    background-color: var(--gw-bg-active);
    p {
      text-overflow: ellipsis;
      text-wrap: nowrap;
      white-space-collapse: collapse;
      overflow: hidden;
      white-space: nowrap;
      padding: 0 10px;
    }
}

.card:hover {
  transform: scale(0.9, 0.9);
  box-shadow: 5px 5px 20px 15px rgba(0,0,0,0.25), 
    -5px -5px 20px 15px rgba(0,0,0,0.22);
}

</style>
