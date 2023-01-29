import { ref, computed, toRaw } from 'vue'
import { defineStore } from 'pinia'
import { reqGenerate, reqGenerateByDefault } from '@/api'
import { downloadBlob } from '@/utils/BlobUtils'

//pinia store
export const useConfigStore = defineStore('config', () => {
  const packageName = ref("")
  const author = ref("")

 const optionalConfigRequest = ref<OptionalConfigRequest>({
  ignoreThreadPool: true,
  ignoreLogInterceptor: true
 })

 const tableConfigRequestList = ref<TableConfigRequest[]> ([])

 async function generate(mode: boolean){
  debugger
  if(mode){
    return await doGenerate();
  }else{
    return await doGenerateByDefault();
  }
 }

 /**
  * 基于配置生成
  */
 async function doGenerate(){
  console.log("doGenerate");
  if(!tableConfigRequestList.value?.length){
    throw new Error("请先进行生成器配置，再尝试提交")
  }
  return await reqGenerate({
    packageName: packageName.value, 
    author: packageName.value,
    optionalConfigRequest: optionalConfigRequest.value,
    tableConfigRequestList: tableConfigRequestList.value
  });
 }

 /**
  * 默认生成
  */
 async function doGenerateByDefault(){
  console.log("doGenerateByDefault");
  return await reqGenerateByDefault({
    packageName: packageName.value, 
    author: packageName.value,
    optionalConfigRequest: optionalConfigRequest.value
  });
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

 return {packageName, author, generate, optionalConfigRequest, tableConfigRequestList, initTableConfigRequest}
})