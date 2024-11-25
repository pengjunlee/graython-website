import { defaultRequest as rq } from './request_website'
import type { R } from './request_website'
export const movieCoverApi = ( params: FormData ): Promise<R<any>> => {
  // 定义请求的配置
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  return rq.post<R<any>>('/movie/cover', params,config)
}

export const movieRefreshApi = (): Promise<R<any>> => {
  return rq.get<R<any>>('/movie/refresh')
}

export const movieCategoriesApi = (params:any): Promise<R<any>> => {
  return rq.post<R<any>>('/movie/categories',{...params})
}

/**
 * 分页获取
 * @param params
 * @returns
 */
export const pageMovieApi = (params:any): Promise<R<any>> => {
  return rq.post<R<any>>('/movie/page',{...params})
}

export const m3u8MovieApi = (params:any): Promise<R<any>> => {
  return rq.post<R<any>>('/movie/m3u8',{...params})
}