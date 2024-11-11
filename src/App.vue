<script setup>
import { RouterView } from 'vue-router'
import {useStore} from 'vuex'
import { onMounted } from 'vue';
const store = useStore();
onMounted(()=>{
  store.dispatch('fetchData')
})
</script>
<template>
  <RouterView />
</template>
