<script setup>
import { ref } from 'vue';

const navItems = ref([
  { name: 'Tops', dropdown: true },
  { name: 'Bottoms', dropdown: true },
  { name: 'Dresses', dropdown: false },
  { name: 'Accessories', dropdown: true },
  { name: 'Shop The Look', dropdown: true },
  { name: 'New Products', dropdown: false }
]);
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="navbar navbar-expand-lg bg-white">
        <div class="container-fluid">
          <a class="navbar-brand me-5 ms-5" href="#">
            <img src="https://venia.magento.com/VeniaLogo-n77.svg" alt="Venia Logo" width="102" height="18" />
          </a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-5">
              <li v-for="(item, index) in navItems" :key="index" class="nav-item mb-3" :class="{ dropdown: item.dropdown }">
                <a :class="['nav-link', item.dropdown ? 'dropdown-toggle' : '']" role="button" href="#"
                   :data-bs-toggle="item.dropdown ? 'dropdown' : ''">
                  {{ item.name }}
                </a>
                <ul v-if="item.dropdown" class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Subcategory 1</a></li>
                  <li><a class="dropdown-item" href="#">Subcategory 2</a></li>
                  <li><a class="dropdown-item" href="#">Subcategory 3</a></li>
                </ul>
              </li>
            </ul>
            <div class="d-flex align-items-center nav-icons ms-auto ">
              <a href="#" class="me-3">
                <i class="fas fa-search" style="color: #000;"></i> Search
              </a>
              <a href="#" class="me-3">
                <i class="far fa-user" style="color: #000;"></i> Sign in
              </a>
              <button class="btn cart-button" @click="onClick" >
                <span v-if='total>0'class="cart-total">{{ total }}</span>
                <i class="fas fa-shopping-bag" style="color: #000;"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
<style scoped>
nav ul {
    margin-top: 15px;
}
a{
  text-decoration: none;
  color: black;
}
.cart-button{
  position: relative;
}
.cart-total{
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  border-radius: 50%;
  width: 20px;
  color: white;
  font-size: 0.75rem;

}
</style>