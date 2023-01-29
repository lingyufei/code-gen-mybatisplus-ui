<template>
  <v-alert v-if="errorInfo.length > 0"
  closable dense border="start" title="Error" type="error"> {{errorInfo}} </v-alert>
</template>
  
<script setup lang='ts'>
  import { ref } from 'vue';

  const errorInfo = ref("");
  defineExpose({errorInfo});
</script>
  
<style>
  
</style>