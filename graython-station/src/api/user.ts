import http from "../utils/http";
import { PageResult, ListResult, QueryResult } from "./api-types";

/** 用户登录 */
export const loginApi = (data?: object) => {
  return http.post<QueryResult>("/user/login", data);
};

/** 用户注册 */
export const registerApi = (data?: object) => {
  return http.post<QueryResult>("/user/register", data);
};

/** 获取当前登录用户信息 */
export const currentApi = () => {
  return http.get<QueryResult>("/user/current");
};

/** 注销登录 */
export const logoutApi = () => {
  return http.get<QueryResult>("/user/logout");
};
