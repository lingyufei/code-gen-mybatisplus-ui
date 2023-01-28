<template>
    <h3>字段信息配置</h3>

    <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">
          TableName
        </th>
        <th class="text-left">
          ColumnName
        </th>
        <th class="text-left">
          DataType
        </th>
        <th class="text-left">
          ColumnComment
        </th>
        <th class="text-left">
          ColumnKey
        </th>
        <th class="text-left">
          Extra
        </th>
        <th class="text-left">
          ignoreEntity
        </th>
        <th class="text-left">
          ignoreRequest
        </th>
        <th class="text-left">
          ignoreResponse
        </th>
        <th class="text-left">
          ignoreBo
        </th>
      </tr>
    </thead>
    <tbody>
      <template
        v-for="(tableConfig, index) in tableConfigRequestList"
        :key="tableConfig.tableName"
      >
        <tr v-for="(column, index) of tableConfig.columnConfigRequests" :key="column.columnName">
          <td :rowspan="tableConfig.columnConfigRequests.length" v-if="index == 0">{{tableConfig.tableName}}</td>
          <td>{{ column.columnName }}</td>
          <!-- 字段基本信息，不可变 -->
          <td>{{ tableColumnInfos[tableConfig.tableName][column.columnName]["dataType"] }}</td>
          <td>{{ tableColumnInfos[tableConfig.tableName][column.columnName]["columnComment"] }}</td>
          <td>{{ tableColumnInfos[tableConfig.tableName][column.columnName]["columnKey"] }}</td>
          <td>{{ tableColumnInfos[tableConfig.tableName][column.columnName]["extra"] }}</td>
          <!-- 字段配置信息 -->
          <td> <v-checkbox v-model="column.ignoreEntity" color="info" density="compact"></v-checkbox></td>
          <td> <v-checkbox v-model="column.ignoreRequest" color="info" density="compact"></v-checkbox></td>
          <td> <v-checkbox v-model="column.ignoreResponse" color="info" density="compact"></v-checkbox></td>
          <td> <v-checkbox v-model="column.ignoreBo" color="info" density="compact"></v-checkbox></td>
        </tr>
      </template>
    </tbody>
  </v-table>
  <v-btn color="primary" @click="log">查询字段信息</v-btn>

</template>
  
<script setup lang='ts'>
import { useDbInfo } from '@/composable/useDbInfo';
import { useConfigStore } from '@/stores/config';
import { storeToRefs } from 'pinia';
import { computed, ref, watchEffect } from 'vue';

  const config = useConfigStore()
  const {tableConfigRequestList} = storeToRefs(config)
  const {tableColumnInfoMap} = useDbInfo()
  
  const tableColumnInfos = computed(() =>{
    let record: Record<string, Record<string, ColumnInfoResponse>> = {};

    for(let tableName in tableColumnInfoMap.value){
      let columnInfoResponses = tableColumnInfoMap.value[tableName]
      record[tableName] = {};
      for(let columnInfoResponse of columnInfoResponses){
        let columnName = columnInfoResponse.columnName
        record[tableName][columnName] = columnInfoResponse;
      }
    }
    console.log("computed", tableColumnInfos);
    return record;
  })

  const log = () =>{
    config.generate()
  }

</script>
  
<style scoped>
</style>