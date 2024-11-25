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

export const musicRefreshApi = (params: any): Promise<R<any>> => {
  return rq.post<R<any>>('/music/refresh',params)
}

export const musicListApi = (params: any): Promise<R<any>> => {
  return rq.post<R<any>>('/music/list',params)
}

export const musicLikeApi = (params: any): Promise<R<any>> => {
  return rq.get<R<any>>('/music/like/'+ params)
}

export const musicAddPlaylistApi = (params: any): Promise<R<any>> => {
  return rq.get<R<any>>('/music/playlist/add/'+ params)
}

/**
 * 分页获取
 * @param params
 * @returns
 */
export const pageMusicApi = (params:any): Promise<R<any>> => {
  return rq.post<R<any>>('/music/page',{...params})
}

/**
 * 获取随机音乐
 * @param params
 * @returns
 */
export const randomMusicApi = (param: any ): Promise<R<any>> => {
  return rq.get<R<any>>('/music/random/' + param )
}


/**
 * 新增歌手
 * @param params
 * @returns
 */
export const addMusicianApi = ( params: FormData ): Promise<R<any>> => {
  // 定义请求的配置
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  return rq.post<R<any>>('/music/musician/add', params,config)
}