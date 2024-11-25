<template>
  <gray-terminal
    ref="terminalRef"
    :user="loginUser"
    full-screen
    :on-submit-command="onSubmitCommand"
  />
</template>

<script setup lang="ts">
import { doCommandExecute } from "../commands/core/commandExecutor";
import { onMounted, ref } from "vue";
import { useUserStore } from "../commands/user/userStore";
import { storeToRefs } from "pinia";

const terminalRef = ref();

const onSubmitCommand = async (inputText: string) => {
  if (!inputText) {
    return;
  }
  const terminal = terminalRef.value.terminal;
  await doCommandExecute(inputText, terminal);
};

const userStore = useUserStore();
const { loginUser } = storeToRefs(userStore);

onMounted(() => {});
</script>

<style></style>
