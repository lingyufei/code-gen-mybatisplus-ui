//定义type
declare interface OptionalConfigRequest {
  ignoreThreadPool: boolean,
  ignoreLogInterceptor: boolean,
}

declare interface TableConfigRequest {
  tableName: string,
  columnConfigRequests: ColumnConfigRequest[]
}

declare interface ColumnConfigRequest {
  columnName: string,
  ignoreEntity: boolean,
  ignoreRequest: boolean
  ignoreResponse: boolean
  ignoreBo: boolean
}

declare interface ConfigRequest {
  packageName: string,
  author: string,
  optionalConfigRequest?: OptionalConfigRequest,
  tableConfigRequestList?: TableConfigRequest[]
}