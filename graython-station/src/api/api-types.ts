// ##############################    后台响应结果类型声明 Begin  ############################
/**
 * 一般查询响应结果结构声明
 */
export type QueryResult = {
  code: number;
  message: string | null;
  success: boolean;
  data?: any;
};

/**
 * 分页查询响应结果结构声明
 */
export type PageResult = {
  code: number;
  message: string | null;
  success: boolean;
  data: {
    result: Array<any>;
    total: number;
    pageNo: number;
  };
};

/**
 * 列表查询响应结果结构声明
 */
export type ListResult = {
  code: number;
  message: string | null;
  success: boolean;
  data: Array<any>;
};

// ##############################    后台响应结果类型声明 End  ############################
