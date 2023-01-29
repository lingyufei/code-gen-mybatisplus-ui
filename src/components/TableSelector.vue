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
    <Alert ref="alertRef"></Alert>
  </div>
</template>
  
<script setup lang='ts'>
import Alert from "@/components/Alert.vue"
import { useDbInfo } from '@/composable/useDbInfo';
import { onMounted, ref, watchEffect } from 'vue';
  
  const {tableInfos, getTableInfo, getColumnInfoOfTables} = useDbInfo();
  const selectedTable = ref<string[]>([]);
  const alertRef = ref();

  /**
   * 查询table的字段信息
   */
  const queryColumnInfoOfTables = async () =>{
    try{
      alertRef.value.errorInfo = "";
      await getColumnInfoOfTables(selectedTable.value)
    }catch(e){
      alertRef.value.errorInfo = e + "";
    }
  }

  /**
   * 查询表信息
   */
  const queryTableInfo = async () =>{
    try{
      alertRef.value.errorInfo = "";
      await getTableInfo();
    }catch(e){
      alertRef.value.errorInfo = e + "";
    }
  }

  onMounted(() =>{
    queryTableInfo()
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