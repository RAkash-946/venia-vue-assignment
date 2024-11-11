<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

function increment(productId) {
  store.dispatch('incrementProductQuantity', productId);
}

function decrement(productId) {
  store.dispatch('decrementProductQuantity', productId);
}

function remove(productId) {
  store.dispatch('removeProductFromCart', productId);
}

const cartTotal = computed(() => store.getters.cartTotal);
</script>

<template>
  <div class="cart-overlay">
    <div class="cart-modal">
      <section class="h-100 h-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-start h-100">
            <div class="col-12">
              <div class="card card-registration card-registration-2">
                <div class="card-body p-0">
                  <div class="row g-0">
                    <div class="d-flex justify-content-between align-items-center mb-5">
                      <h1 class="fw-medium mb-0 mx-auto">Your Cart</h1>
                      <button @click="$emit('close')" class="btn"><i class="fas fa-times" id="closeCart"
                          style="font-size: 35px"></i></button>
                    </div>
                    <div v-if="store.state.cart.length > 0" class="d-flex flex-column flex-lg-row justify-content-center align-items-start" style="display: flex;justify-content: center;align-items: center;">                    
                      <div class="col-lg-8 cart-icon">
                      <div class="p-5 px-3">
                        <div class="ms-3 mb-4 d-flex justify-content-between align-items-start cart-order-heading">
                          <div class="col-3 col-md-2 col-lg-2 col-xl-2">
                            <h5 class="text-muted">PRODUCT</h5>
                          </div>
                          <div class="col-md-2 col-lg-2 col-xl-2">
                            <!-- Empty column for spacing consistency -->
                          </div>
                          <div class="col-3 col-md-2 col-lg-2 col-xl-2 ms-4">
                            <h5 class="text-muted">PRICE</h5>
                          </div>
                          <div class="col-4 col-md-3 col-lg-2 col-xl-2 d-flex">
                            <h5 class="text-muted">QUANTITY</h5>
                          </div>
                          <div class="col-3 col-md-2 col-lg-2 col-xl-2 ms-5">
                            <h5 class="text-muted">TOTAL</h5>
                          </div>
                          <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                          </div>
                        </div>

                        <hr class="my-4" />

                        <div class="my-50 row d-flex justify-content-between align-items-center"
                          v-for="products in store.state.cart">
                          <div class="col-md-2" style="flex: 0 0 12%; max-width: 15%">
                            <img :src="products.images[0]" class="img-fluid rounded-3" alt="Cotton T-shirt" />
                          </div>
                          <div class="col-4 col-md-3">
                            <h6 class="mb-0">{{ products.title }}</h6>
                            <h6 class="text-muted">{{ products.tags[0] }}</h6>
                          </div>
                          <div class="col-3 col-md-2" style="flex: 0 0 auto; max-width: 13%">
                            <h6 class="mb-0">€ {{ products.price }}</h6>
                          </div>
                          <div class="col-4 col-md-3 d-flex justify-content-around align-items-center">
                            <button class="btn px-2" @click="decrement(products.id)">
                              <i class="fas fa-minus"></i>
                            </button>
                            <span>{{ products.quantity }}</span>
                            <button :disabled='products.quantity >= products.stock' class="btn"
                              @click="increment(products.id)">
                              <i class="fas fa-plus"></i>
                            </button>
                          </div>
                          <div class="col-4 col-md-2">
                            <h6 class="mb-0">€ {{ (products.quantity * products.price).toFixed(2) }}</h6>
                          </div>
                          <div class="col-1 text-end">
                            <button class="btn" @click="remove(products.id)"><i class="fas fa-times"></i></button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4 cart-order-summary"
                      >
                      <div class="py-4 px-5 bg-light">
                        <h3 class="fw-bold mb-3">Order Summary</h3>
                        <hr class="my-4" />

                        <div class="d-flex justify-content-between mb-2">
                          <h5 class="text-muted">Subtotal</h5>
                          <h5 class="text-muted">€ {{ cartTotal }}</h5>
                        </div>
                        <div class="d-flex justify-content-between">
                          <h5 class="text-muted">Shipping</h5>
                          <h5 class="text-muted">Free</h5>
                        </div>
                        <div>
                          <h6 class="mb-5">
                            <a href="#!" class="text-success" style="text-decoration: none">
                              Add coupon code
                              <i class="fa-solid fa-arrow-right"></i>
                            </a>
                          </h6>
                        </div>
                        <div class="d-flex justify-content-between">
                          <h5 class="text-uppercase">Total price</h5>
                          <h5>€ {{ cartTotal }}</h5>
                        </div>
                      </div>
                      <button type="button" class="checkout w-100 mt-2">
                        Checkout
                      </button>
                    </div>
                  </div>
                    <div v-else class="d-flex justify-content-center align-items-center w-100"><h1 style="text-align: center;">Add something to your cart</h1></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
.cart-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.cart-modal {
    background: white;
    border-radius: 10px;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
}

.cart-item-details {
    display: flex;
    align-items: center;
}

.cart-item-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    margin-right: 15px;
}

.cart-item-info {
    max-width: 200px;
}

.cart-item-quantity {
    display: flex;
    align-items: center;
}

.cart-item-quantity input {
    width: 50px;
    text-align: center;
    margin: 0 10px;
}

.cart-item-total {
    min-width: 100px;
    text-align: right;
}

.cart-item-remove {
    text-align: center;
}

.cart-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.btn {
    cursor: pointer;
    padding: 5px 10px;
}

.btn-danger {
    background-color: red;
    color: white;
}
.checkout {
    background-color: rgb(71, 126, 9);
    color: #ffffff;
    font-size: 18px;
    border: none;
    padding: 10px;
}

/* Media Queries */
@media (min-width: 1025px) {
    .h-custom {
        height: 100vh !important;
    }
}

@media (min-width: 1025px) {
    .cart-order-heading {
        font-size: 16px;
    }
    .cart-order-heading h4 {
        font-size: 16px;
    }
    .cart-icon button i {
        font-size: 12px;
    }
    .my-50 {
        margin: 7% 0;
    }
    .cart-order-summary h5 {
        font-size: 16px;
    }
    .checkout {
        background-color: rgb(71, 126, 9);
        color: #ffffff;
        font-size: 18px;
        border: none;
        padding: 10px;
    }
    .clr-btn {
        background-color: rgb(21, 22, 20);
        color: #ffffff;
        font-size: 18px;
        border: none;
        padding: 10px 20px;
    }
    .apply-btn {
        background-color: rgb(27, 214, 152);
        color: #ffffff;
        font-size: 18px;
        border: none;
        padding: 10px 20px;
    }
}
.card{
    border: none;
}
</style>