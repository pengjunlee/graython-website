import { defaultRequest as rq } from './request_blossom'
import type { R } from './request_blossom'

export const noteAllApi = (params?: object): Promise<R<any>> => {
  return rq.get<R<any>>('/note/list', { params })
}

export const noteAddApi = (data?: object): Promise<R<any>> => {
  return rq.post<R<any>>('/note/add', data)
}

export const noteUpdApi = (data?: object): Promise<R<any>> => {
  return rq.post<R<any>>('/note/upd', data)
}

export const noteDelApi = (data?: object): Promise<R<any>> => {
  return rq.post<R<any>>('/note/del', data)
}

export const noteTopApi = (data?: object): Promise<R<any>> => {
  return rq.post<R<any>>('/note/top', data)
}
