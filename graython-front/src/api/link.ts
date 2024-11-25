import type { Link, IntEnumOption } from '@/types/gw.resources'
import { defaultRequest as rq } from './request_website'
import type { R } from './request_website'

/**
 * 新增
 * @param params
 * @returns
 */
export const addLinkApi = ( params: FormData ): Promise<R<any>> => {
  // 定义请求的配置
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  return rq.post<R<any>>('/link/add', params,config)
}

/**
 * 获取列表
 * @param params
 * @returns
 */
export const listLinkApi = (param:any): Promise<R<Link[]>> => {
  return rq.get<Link[]>('/link/list/'+param)
}

/**
 * 获取列表分组
 * @param params
 * @returns
 */
export const groupLinkApi = (): Promise<R<any>> => {
  return rq.get<any>('/link/group')
}

/**
 * 删除资源合集
 * @param params
 * @returns
 */
export const deleteLinkApi = ( params: any ): Promise<R<any>> => {
  return rq.post<R<any>>('/link/delete/'+params)
}


/**
 * 获取资源类型列表
 * @param params
 * @returns
 */
export const groupTypesApi = (): Promise<R<IntEnumOption[]>> => {
  return rq.get<IntEnumOption[]>('/link/groups')
}
