import { reqColumnOfTables, reqTableList } from "@/api";
import { useConfigStore } from "@/stores/config";
import { ref } from "vue";

const tableInfos = ref<TableInfoResponse[]>([]);
const tableColumnInfoMap = ref<Record<string, ColumnInfoResponse[]>>({});

export const useDbInfo = () => {
  /**
   * 获取表信息
   * @param tableName 模糊查询
   */
  const getTableInfo = async (tableName?: string) =>{
      let res: any = await reqTableList(tableName)
      if(res.code === 200){
        tableInfos.value = res.data as TableInfoResponse[]
      }else{
        throw new Error(res.msg);
      }
  }
 
  /**
   * 查询表字段信息
   * @param tables 表名
   */
  const getColumnInfoOfTables = async (tables: string[]) =>{
    let res: any = await reqColumnOfTables(tables)
    if(res.code === 200){
      tableColumnInfoMap.value = res.data

      //填充pinia中的config数据
      const config = useConfigStore()
      config.initTableConfigRequest(tableColumnInfoMap.value)
    }else{
      throw new Error(res.msg);
    }
  }

  return {tableInfos, tableColumnInfoMap, getTableInfo, getColumnInfoOfTables}
}