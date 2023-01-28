/// <reference types="vite/client" />

declare interface TableInfoResponse {
  tableName: string,
  tableComment?: string,
  engine: string,
  createTime: Date
}

declare interface ColumnInfoResponse {
  columnName: string,
  dataType: string,
  columnComment?: string,
  columnKey?: string,
  extra?: string,
}
