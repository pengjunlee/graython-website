import axios from "axios";
import { getToken, setToken, removeToken } from "./auth";
import { globalConfig } from "./globalConfig";

console.log(process.env.NODE_ENV);
export const getBaseUrl = function (){
  if(process.env.NODE_ENV === "spring"){
    return ".."
  }
  return process.env.NODE_ENV === "production"
  ? globalConfig.apiHost
  : "/website-api";
} 
// 自定义 axios 实例
const myAxios = axios.create({
  baseURL:getBaseUrl()
    
});

myAxios.defaults.withCredentials = true;

// 添加请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
myAxios.interceptors.response.use(
  function (response) {
    console.log(response);
    if (response.data?.success) {
      setToken(response.headers["authorization"]);
    }
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 假设后端返回的 token 过期状态码是 401
    if (error.response && error.response.status === 401) {
      // 清除过期的 token
      removeToken();
      // 可根据项目需求进行其他操作，例如跳转到登录页面等
    }
    return Promise.reject(error);
  }
);

export default myAxios;
