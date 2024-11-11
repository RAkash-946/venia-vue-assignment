<script setup>
import { RouterView } from 'vue-router'
import {useStore} from 'vuex'
import { onMounted } from 'vue';
import PrimaryNavbar from './components/PrimaryNavbar.vue';
import SecondaryNavbar from './components/SecondaryNavbar.vue';
const store = useStore();
onMounted(()=>{
  store.dispatch('fetchData')
})
</script>
<template>
  <PrimaryNavbar/>
  <SecondaryNavbar/>
  <RouterView />
</template>
