<template>
    <footer>
      <div>
        <button
          type="button"
          class="btn navigation-btn"
          @click="changePage(currentPage - 1)"
          :disabled="currentPage <= 0"
        >
          &lt;
        </button>
        <span>{{ currentPage + 1 }}</span>
        <button
          type="button"
          class="btn navigation-btn"
          @click="changePage(currentPage + 1)"
          :disabled="currentPage >= totalPages - 1"
        >
          &gt;
        </button>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const currentPage = computed(() => store.state.page);
  const totalPages = computed(() => store.getters.totalPages);
  
  function changePage(page) {
    if (page >= 0 && page < totalPages.value) {
      store.dispatch('setPage', page);
      window.scroll(0,0)
    }
  }
  </script>
  
  <style scoped>
  footer {
    display: flex;
    justify-content: center;
    margin: 20px;
  }
  
  .navigation-btn {
    margin: 20px;
    border-radius: 50%;
    width: auto;
    font-size: large;
    font-weight: bold;
    border: 3px solid black;
    font-size: 20px;
    cursor: pointer;
  }
  
  .navigation-btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  </style>
    