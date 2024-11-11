<template>
  <main>
    <div class="container text-left">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        <div v-if="filteredProducts.length > 0" v-for="product in filteredProducts" :key="product.id"
          class="col d-flex justify-content-center">
          <Card :product="product" />
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { useStore } from 'vuex';
import Card from '../components/Card.vue';
import { computed } from 'vue';
const store = useStore();
const filteredProducts = computed(() => store.getters.filteredPageProducts);
</script>

<style scoped>
.col {
  margin-bottom: 1rem;
}
</style>
