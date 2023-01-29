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
              v-model="packageName"
              :counter="10"
              label="包名 如 com.lyf"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="author"
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
              label="添加线程池"
              color="info"
              @click="optionalConfigRequest.ignoreThreadPool= !optionalConfigRequest.ignoreThreadPool"
            ></v-checkbox>
          </v-col>
          <v-col cols="2">
            <v-checkbox
              @click="optionalConfigRequest.ignoreLogInterceptor= !optionalConfigRequest.ignoreLogInterceptor"
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
        <v-btn ref="genButtonRef" class="gen-button" :loading="loading" :disabled="loading"
        @click="generate" color="primary">开始生成</v-btn>
      </div>
      <div class="alert">
        <Alert ref="alertRef"/>
      </div>
    </v-form>
    <div id="bottom-div"></div>
    
</template>
  
<script setup lang='ts'>
import { ref } from 'vue';
import TableSelector from "@/components/TableSelector.vue"
import ColumnConfig from "@/components/ColumnConfig.vue"
import Alert from "@/components/Alert.vue"
import { useConfigStore } from '@/stores/config';
import { storeToRefs } from 'pinia';
import { downloadBlob, handleBlobError } from '@/utils/BlobUtils';

  const config = useConfigStore();
  const {packageName, author, optionalConfigRequest} = storeToRefs(config)
  const mode = ref(true)

  const loading = ref(false)
  const alertRef = ref();

  /**
   * 生成代码
   */
  const generate = async () =>{
    try{
      loading.value = true;
      alertRef.value.errorInfo = ""
      let res = await config.generate(mode.value);
      downloadBlob(res)
    }catch(e){
      console.log(e);
      alertRef.value.errorInfo = "导出文件异常, " + e
    }finally{
      loading.value = false;
    }
  }
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

.alert{
  margin-top: 10px;
}


</style>