<template>
  <div>&nbsp;&nbsp;&nbsp;&nbsp;关于本站：</div>
  <div>
    &nbsp;&nbsp;&nbsp;&nbsp;Graython个人工作站是一款具有Linux命令终端风格的、专为IT从业人员量身打造的私人工作站！通过执行内置命令你可以方便且快速的完成很多日常繁琐任务，如：在线听歌、代码格式化、在线翻译等等。。。
  </div>
  <div></div>
</template>

<script setup lang="ts">
interface InfoBoxProps {
  seconds: string;
}

const props = withDefaults(defineProps<InfoBoxProps>(), {});
</script>

<style scoped></style>
