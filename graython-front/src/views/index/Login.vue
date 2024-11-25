<template>
  <div class="login-root" id="login-background-div">
    <bl-col just="center" class="logo" height="auto">
      <img src="/favicon.png" style="width: 12rem" />
    </bl-col>
    <div class="form">
      <div class="input-field">
        <input
          type="text"
          v-model="username"
          placeholder="输入用户名"
          required
        />
        <span class="iconbl bl-user-line"></span>
      </div>
      <div class="input-field">
        <input
          type="password"
          v-model="password"
          placeholder="输入密码"
          required
        />
        <span class="iconbl bl-a-Securitypermissions-line"></span>
      </div>

      <div
        class="input-field"
        style="
          display: inline-flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <el-button size="default" @click="toRoute('/home')">返　回</el-button>
        <el-button size="default" @click="handleLogin">登　录</el-button>
      </div>
      <div class="icons">
        <span class="iconbl wl-gitee"></span>
        <span class="iconbl wl-github"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toRoute } from "@/router";
import { login } from "@/utils/auth";

const username = ref('');
const password = ref('');

const handleLogin = () => {
  
  login(username.value, password.value);
};
</script>

<style scoped lang="scss">
.login-root {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url('/dark-bg.png');
  background-size: cover; /* 背景图片覆盖整个div */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 背景图片不重复 */

}

.form {
  display: flex;
  position: relative;
  transform: scale(1.1);
  color: var(--gw-bg-font);
  padding: 2rem 2rem;
  font-size: 1.4rem;
  flex-direction: column;
}

.input-field {
  position: relative;
  height: 5rem;
  width: 25rem;
  margin-top: 1.5rem;
}

.input-field input {
  outline: none;
  position: absolute;
  height: 100%;
  width: 100%;
  padding: 0 6rem;
  border: 1px solid var(--gw-bg-basic);
  border-radius: 1rem;
  /* border-bottom: 2.5px solid #ffffff; */
  transition: all 0.2s ease;
}

// input[type="text"],
// input[type="password"] {
//   background-color: transparent;
// }

.input-field .iconbl {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gw-bg-font);
  transition: all 0.2s ease;
  padding-left: 2rem;
}

/*Animation*/
.input-field input:focus + .iconbl {
  transform: translateY(-2rem);
  transition: transform 0.3s ease-in-out;
}
</style>
