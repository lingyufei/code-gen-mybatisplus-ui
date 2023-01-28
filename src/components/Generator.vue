<template>
    <v-form>
      <div class="wrapper">
        <v-switch v-model="mode" :label="mode ? '自定义配置' : '默认配置'"></v-switch>
      </div>
      
      <v-divider></v-divider>

      <div class="wrapper">
        <h3>通用配置</h3>
        <v-row>
          <v-col cols="2">
            <v-text-field
              v-model="firstname"
              :counter="10"
              label="包名 如 com.lyf"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="firstname"
              :counter="10"
              label="作者 如 LYF"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <v-divider></v-divider>

      <div class="wrapper">
        <h3>可选配置</h3>
        <v-row>
          <v-col cols="2">
            <v-checkbox
              v-model="ex4"
              label="添加线程池"
              color="info"
            ></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox
              v-model="ex4"
              label="添加日志AOP"
            />
          </v-col>
        </v-row>
      </div>

      <v-divider></v-divider>
      <div class="wrapper"  v-if="mode">
        <TableSelector/>
      </div>
      
      <v-divider></v-divider>
      <div class="wrapper"  v-if="mode">
        <ColumnConfig/>
      </div>

      <v-divider></v-divider>

      <div class="wrapper">
        <v-btn class="gen-button" color="primary">开始生成</v-btn>
      </div>
    </v-form>
    <div id="bottom-div"></div>
    
</template>
  
<script setup lang='ts'>
import { ref, watch, watchEffect } from 'vue';
import TableSelector from "@/components/TableSelector.vue"
import ColumnConfig from "@/components/ColumnConfig.vue"

  const mode = ref(true)
  const ex4 = ref([])
  watchEffect(() =>{
    console.log(ex4.value);
  })
</script>
  
<style scoped>
.wrapper{
  margin-left: 20px;
  margin-top: 10px;
}

#bottom-div{
  height: 50px;
  width: 100%;
}

</style>