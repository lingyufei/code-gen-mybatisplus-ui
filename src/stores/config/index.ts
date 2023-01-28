import { ref, computed, toRaw } from 'vue'
import { defineStore } from 'pinia'

//pinia store
export const useConfigStore = defineStore('config', () => {
  const packageName = ref("")
  const author = ref("")

 const optionalConfigRequest = ref<OptionalConfigRequest>({
  ignoreThreadPool: false,
  ignoreLogInterceptor: false
 })

 const tableConfigRequestList = ref<TableConfigRequest[]> ([])

 function generate(){
  console.log(tableConfigRequestList.value);
  
 }

 /**
  * 基于table的字段信息，初始化 config
  * @param tableColumnInfoMap 
  */
 function initTableConfigRequest(tableColumnInfoMap: Record<string, ColumnInfoResponse[]>){
    tableConfigRequestList.value.splice(0, tableConfigRequestList.value.length)

    //遍历map中所有table的column信息
    for(let tableName in tableColumnInfoMap){
      let columnInfoResponses = tableColumnInfoMap[tableName]
      //字段为空，跳过
      if(!columnInfoResponses?.length) return;

      //遍历每一个column，构建新的columnInfoResponse
      const columnList: ColumnConfigRequest[] = [];
      columnInfoResponses?.forEach(columnInfoResponse =>{
        columnList.push({
          columnName: columnInfoResponse.columnName,
          ignoreEntity: false,
          ignoreRequest: false,
          ignoreResponse: false,
          ignoreBo: false
        } as ColumnConfigRequest)
      })

      tableConfigRequestList.value.push({
        tableName: tableName,
        columnConfigRequests: columnList
      } as TableConfigRequest)
    }
    console.log("pinia", tableConfigRequestList.value);
 }

 return {packageName, author, generate, tableConfigRequestList, initTableConfigRequest}
})