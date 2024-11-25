<template>
  <div>
    <ul>
      <li v-for="(toy, index) in toys" :key="index">
        <a href="#" @click="$emit('itemClickEvent','toy '+ (index+1))">【 {{ index + 1 }} 】 {{ toy.name }}：{{ toy.desc }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  toys: ToyType[];
}

// 定义 props
const props = defineProps<Props>();
</script>

<style scoped>
li {
  list-style-type: none;
  padding: 8px;
  border-bottom: 1px solid #ccc;
}

li:last-child {
  border-bottom: none;
}
</style>
