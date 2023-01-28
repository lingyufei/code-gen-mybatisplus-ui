<template>
  <h3>请选择生成的Table</h3>
  <v-btn color="primary" @click="queryTableInfo">查询表信息</v-btn>
    <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">
          Selector
        </th>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          TableComment
        </th>
        <th class="text-left">
          Engine
        </th>
        <th class="text-left">
          CreateTime
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in tableInfos" :key="item.tableName">
        <td> <v-checkbox v-model="selectedTable" :value="item.tableName" color="info" density="compact"></v-checkbox></td>
        <td>{{ item.tableName }}</td>
        <td>{{ item.tableComment }}</td>
        <td>{{ item.engine }}</td>
        <td>{{ item.createTime }}</td>
      </tr>
    </tbody>
  </v-table>
  <v-btn color="primary" @click="queryColumnInfoOfTables">查询字段信息</v-btn>

  <div style="width: 75%;">
    <v-alert v-if="errorInfo.length > 0"
    closable dense border="start" title="Error" type="error"> {{errorInfo}} </v-alert>
  </div>
</template>
  
<script setup lang='ts'>
import { useDbInfo } from '@/composable/useDbInfo';
import { onMounted, ref, watchEffect } from 'vue';
  
  const {tableInfos, getTableInfo, getColumnInfoOfTables} = useDbInfo();
  const selectedTable = ref<string[]>([]);
  const errorInfo = ref("");

  /**
   * 查询table的字段信息
   */
  const queryColumnInfoOfTables = async () =>{
    try{
      errorInfo.value = "";
      await getColumnInfoOfTables(selectedTable.value)
    }catch(e){
      errorInfo.value = e + "";
    }
  }

  const queryTableInfo = async () =>{
    try{
      errorInfo.value = "";
      await getTableInfo();
    }catch(e){
      errorInfo.value = e + "";
    }
  }

  onMounted(() =>{
    getTableInfo()
  })

  watchEffect(() =>{
    console.log(selectedTable.value);
  })

</script>
  
<style scoped>
  .v-btn{
    margin-bottom: 13px;
  }
</style>