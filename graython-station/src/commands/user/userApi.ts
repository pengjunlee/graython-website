import myAxios from "../../plugins/myAxios";

import { loginApi, currentApi, logoutApi } from "../../api/user";
/**
 * 用户登录
 * @param username
 * @param password
 */
export const userLogin = async (username: string, password: string) => {
  if (!username || !password) {
    return null;
  }
  return await loginApi({ username, password });
};

/**
 * 用户注销
 */
export const userLogout = async () => {
  return await logoutApi();
};

/**
 * 用户注册
 * @param username
 * @param password
 * @param email
 */
export const userRegister = async (
  username: string,
  password: string,
  email: string
) => {
  if (!username || !password || !email) {
    return null;
  }
  return await myAxios.post("/user/register", { username, password, email });
};

/**
 * 获取当前登录用户
 */
export const getLoginUser = async () => {
  return await currentApi();
};
