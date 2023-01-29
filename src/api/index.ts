import blobRequest from "./blobRequest";
import request from "./request";

export const reqTableList = (tableName?: string) =>{
  return request({url: '/db/table/list',params: tableName , method: 'get'});
}

export const reqColumnOfTables = (tables: string[]) =>{
  return request({url: `/db/column/list?tables=${tables.join()}`, method: 'get'});
}

export const reqGenerate = (configRequest: ConfigRequest) =>{
  return blobRequest({url: '/db/generate', data: configRequest, method: 'post'});
}

export const reqGenerateByDefault = (configRequest?: ConfigRequest) =>{
  return blobRequest({url: '/db/generate/default', data: configRequest, method: 'post'});
}