<template>
    <div class="main">
      <ul>
        <li v-for="(item, index) in taskList" :key="index">
          <div class="taskDiv">
          <!-- 切换完成状态 -->
          <input type="checkbox" :id="'label'+index" v-model="item.isFinished" :checked="item.isFinished">
          <label :for="'label'+index">
            <span>已完成</span>
            <span>未完成</span>
          </label>
            <span>
              <!-- 显示任务描述 -->
              <div style ="width:700px;word-wrap: break-word;white-space: pre-wrap;" :class="{ completed: item.isFinished }">{{ item.name }}</div>
              <div style ="color: aqua;font-size: small;font-style: italic;" :class="{ completed: item.isFinished }"> 创建时间：{{
                  MyDayjs(item.createTime).format("YYYY-MM-DD HH:mm:ss")
                }}</div>
            </span>
          </div>

          <!-- 删除按钮 -->
          <button class="deleteBtn" @click="doDelete(index)">删除</button>
        </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useTodoStore } from "./todoStore";
import MyDayjs from "../../../plugins/myDayjs";

interface TodoBoxProps {
  today: boolean;
}

const props = withDefaults(defineProps<TodoBoxProps>(), {});
const { today } = toRefs(props);

const { taskList, deleteTask } = useTodoStore();

const doDelete = (index: number) => {
  deleteTask(index);
};
</script>

<style scoped>
.taskDiv {
  display: inline-flex;
  width: 800px;
  align-items: center;
  vertical-align: middle;
  color: greenyellow;
}
.taskDiv .completed{
  color:grey;
}
li {
  list-style: none;
}

input{ /* 隐藏input默认的复选框 */
    display:none;
}

label {
  margin-right: 20px;
}

label span{
    padding: 1px;
    border-radius: 5px;
}

label span:nth-child(1){ /* 第一个span元素，对应文字ON */
    display:none;
}
label span:nth-child(2){ /* 第二个span元素，对应文字OFF */
    display:block;
    background-color: goldenrod;
    color: white;
    text-shadow: 0 0 1px goldenrod,
                0 0 2px goldenrod;
}
input:checked ~ label span:nth-child(2){ /* 当复选框选中时，第一个span元素 */
    display:none;
}
input:checked ~ label span:nth-child(1){ /* 当复选框选中时，第二个span元素 */
    display:block;
}
input:checked ~ label{ /* 当复选框选中时，label的样式设置 */
    background:#2ed573;
    box-shadow:0 0 5px #2ed573,
               0 0 10px #2ed573,
               0 0 20px #2ed573;
}

.deleteBtn {
  background-color: red;
  border-radius: 5px;
}

</style>
