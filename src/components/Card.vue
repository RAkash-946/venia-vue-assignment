<template>
    <div class="card" style="width: 18rem">
      <img :src="product.thumbnail" class="card-img-top" alt="Product image" />
      <div class="card-body">
        <h5 class="card-title">{{ product.title }}</h5>
        <p class="card-text">${{ product.price }}</p>
        <div class="card-btn d-flex justify-content-between">
          <button class="btn btn-primary add-to-cart">Add to Cart</button>
          <i class="fa-regular fa-heart"></i>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  const props = defineProps({
    product: {
      type: Object,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .card {
    border: none;
  }
  
  .card h5 {
    font-size: 18px;
    font-weight: 700;
  }
  
  .card-btn {
    display: flex;
  }
  
  .card-btn .add-to-cart {
    padding: 2px 50px;
    border-radius: 20px;
  }
  
  .card-btn i {
    margin-top: 3px;
    margin-left: 30px;
    font-size: 22px;
  }
  
  .card-img-top {
    height: 288px;
  }
  </style>
  