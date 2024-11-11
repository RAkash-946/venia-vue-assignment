<script setup>
import { ref } from "vue";
import { useStore } from "vuex"; // Import useStore properly from Vuex
import Filter from "./Filter.vue";

const store = useStore();
const searchTerm = ref("");
const filterVisible = ref(false);
function onClick() {
  filterVisible.value = !filterVisible.value;
}
function onSearch() {
  store.dispatch('setSearchQuery', searchTerm.value);
}
</script>

<template>
  <div class="search-container d-flex">
    <form class="d-flex w-100" role="search" @submit.prevent="onSearch">
      <input
        class="form-control me-2 rounded-0"
        type="search"
        placeholder="Search for Products, Brands and More"
        aria-label="Search"
        v-model="searchTerm"
      />
      <button type="button" class="btn search-btn" @click="onSearch">
        <i class="fa-solid fa-magnifying-glass" style="color: #ffffff"></i>
        <span class="btn-label">Search again</span>
      </button>
    </form>
    <button class="btn filter-btn" type="button" @click="onClick">
      <i class="fa-solid fa-filter" style="color: #ffffff"></i>
      <span class="btn-label">Filter</span>
    </button>
  </div>
  <Filter v-if="filterVisible" @close="filterVisible=false"/>
</template>

<style scoped>
.search-container {
  width: 90%;
  margin: 20px auto;
  padding: 0%;
}

.search-btn {
  color: white;
  background-color: rgb(212, 141, 7);
  width: 230px;
  border-radius: 0;
}

.search-btn:hover {
  background-color: rgb(170, 113, 6);
  color: white;
}

.filter-btn {
  color: white;
  background-color: rgb(95, 139, 37);
  width: 150px;
  border-radius: 0;
  margin-left: 50px;
  border: none;
}

.filter-btn:hover,
.filter-btn:active {
  background-color: rgb(63, 92, 26);
  color: white;
}

.card-registration .select-input.form-control[readonly]:not([disabled]) {
  font-size: 1rem;
  line-height: 2.15;
  padding-left: 0.75em;
  padding-right: 0.75em;
}

.card-registration .select-arrow {
  top: 13px;
}
@media (width<700px) {
  .btn-label {
    display: none;
  }
  .search-btn, .filter-btn {
    width: 50px !important;

  }
}
</style>
