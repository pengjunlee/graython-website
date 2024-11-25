import axios from "../plugins/myAxios";

class Http {
  // 发送 get 请求
  get<T>(url: string, params?: any): Promise<T> {
    return axios
      .get(url, { params })
      .then((response) => response as unknown as T);
  }

  // 发送 post 请求
  post<T>(url: string, data: any): Promise<T> {
    return axios.post(url, data).then((response) => response as unknown as T);
  }

  // 可以继续添加其他请求方法，如 put、delete 等
}

export default new Http();
export const wrapperUrl = (url: string) => `${url}`;
