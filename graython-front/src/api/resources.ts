import type { Library,Collection, IntEnumOption } from '@/types/gw.resources'
import { defaultRequest as rq } from './request_website'
import type { R } from './request_website'

/**
 * 获取资源目录列表
 * @param params
 * @returns
 */
export const resourcesDirectoriesApi = (): Promise<R<any>> => {
  return rq.get<any>('/resource/directories')
}

/**
 * 获取资源类型列表
 * @param params
 * @returns
 */
export const resourcesTypesApi = (): Promise<R<IntEnumOption[]>> => {
  return rq.get<IntEnumOption[]>('/resource/types')
}

/**
 * 获取资源分类列表
 * @param params
 * @returns
 */
export const resourcesClassificationsApi = (): Promise<R<IntEnumOption[]>> => {
  return rq.get<IntEnumOption[]>('/resource/classifications')
}

/**
 * 新增资源库
 * @param params
 * @returns
 */
export const addLibraryApi = ( params: any ): Promise<R<any>> => {
  return rq.post<R<any>>('/resource/library/add', { ...params })
}

/**
 * 获取资源库列表
 * @param params
 * @returns
 */
export const listLibraryApi = (params: any): Promise<R<Library[]>> => {
  return rq.get<Library[]>('/resource/library/list/'+ params)
}

/**
 * 删除资源库
 * @param params
 * @returns
 */
export const deleteLibraryApi = ( params: any ): Promise<R<any>> => {
  return rq.post<R<any>>('/resource/library/delete/'+params)
}


/**
 * 统计资源库
 * @param params
 * @returns
 */
export const statisticsLibraryApi = ( params: any ): Promise<R<any>> => {
  return rq.post<R<any>>('/resource/library/statistics', params)
}


/**
 * 设置资源库封面
 * @param params
 * @returns
 */
export const setLibraryCoverApi = ( params: any ): Promise<R<any>> => {
  return rq.post<R<any>>('/resource/library/cover',params)
}

/**
 * 设置资源分类
 * @param params
 * @returns
 */
export const resourceClassifyApi = ( params: any ): Promise<R<any>> => {
  return rq.post<R<any>>('/resource/classify',params)
}

/**
 * 同步资源库
 * @param params
 * @returns
 */
export const refreshLibraryApi = ( params: any ): Promise<R<any>> => {
  return rq.post<R<any>>('/resource/library/refresh/'+params)
}



/**
 * 分页获取资源列表
 * @param params
 * @returns
 */
export const pageResourceApi = (params:any): Promise<R<any>> => {
  return rq.post<R<any>>('/resource/page',{...params})
}


/**
 * 新增资源库
 * @param params
 * @returns
 */
export const addCollectionApi = ( params: FormData ): Promise<R<any>> => {
  // 定义请求的配置
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  return rq.post<R<any>>('/resource/collection/add', params,config)
}

/**
 * 获取资源合集列表
 * @param params
 * @returns
 */
export const listCollectionApi = (): Promise<R<Collection[]>> => {
  return rq.get<Collection[]>('/resource/collection/list')
}

/**
 * 删除资源合集
 * @param params
 * @returns
 */
export const deleteCollectionApi = ( params: any ): Promise<R<any>> => {
  return rq.post<R<any>>('/resource/collection/delete/'+params)
}


/**
 * 删除资源
 * @param params
 * @returns
 */
export const deleteResourceApi = ( params: any ): Promise<R<any>> => {
  return rq.post<R<any>>('/resource/delete/'+params)
}

export const blossomApi = (): Promise<R<any>> => {
  return rq.get<R<any>>('/blossom', {})
}