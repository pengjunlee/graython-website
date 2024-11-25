import http from "../utils/http";
import { PageResult, ListResult, QueryResult } from "./api-types";

/** 随机壁纸 */
export const randomBgApi = () => {
  return http.get<QueryResult>("/terminal/bg/random");
};

/** 随机音乐 */
export const randomMusicApi = () => {
  return http.get<QueryResult>("/terminal/music/random");
};


/** 百度翻译 */
export const baiduTranslateApi = (data: any) => {
  return http.post<QueryResult>("/terminal/translate/baidu", data);
};
