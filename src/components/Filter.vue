<template>
    <section class="col-lg-4 p-4" id="filterSection">
        <div class="d-flex mb-5 justify-content-between w-100">
            <h1 class="fw-bold mb-0 mx-auto" style="font-size: 24px;">All Filters</h1>
            <button @click="$emit('close')" class="btn"> <i class="fas fa-times" id="closeFilter"
                    style="font-size: 25px"></i>
            </button>
        </div>
        <hr class="my-3" />
        <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item border-0">
                <h2 class="accordion-header">
                    <button class="accordion-button py-1" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                        aria-controls="panelsStayOpen-collapseOne">
                        Categories
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                    <div class="accordion-body">
                        <div class="form-check" v-for="category in allCategories" :key="category">
                            <input class="form-check-input" type="checkbox" v-model="filter.category" :value="category"
                                :id="'category-' + category">
                            <label class="form-check-label" :for="'category-' + category">
                                {{ category }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <hr />

            <!-- Brand Filter -->
            <div class="accordion-item border-0">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed py-1" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseTwo">
                        Brand
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <div class="form-check" v-for="brand in allBrands" :key="brand">
                            <input class="form-check-input" type="checkbox" v-model="filter.brand" :value="brand"
                                :id="'brand-' + brand">
                            <label class="form-check-label" :for="'brand-' + brand">
                                {{ brand }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="accordion-item border-0">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed py-1" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false"
                        aria-controls="panelsStayOpen-collapseThree">
                        Price
                    </button>
                </h2>
                <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <div class="d-flex justify-content-between">
                            <label for="minPrice">Min Price</label>
                            <label for="maxPrice">Max Price</label>
                        </div>
                        <div class="d-flex justify-content-between">
                            <input type="number" id="minPrice" v-model="filter.minPrice" class="form-control" min="0" />
                            <input type="number" id="maxPrice" v-model="filter.maxPrice" class="form-control" min="0" />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
        <div class="d-flex justify-content-center gap-3 px-3">
            <button type="button" class="btn clr-btn w-40" @click="clearFilters">
                Clear All
            </button>
            <button type="button" class="btn apply-btn w-40" @click="applyFilters">
                Apply
            </button>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const allCategories = computed(() => store.getters.allCategories);
const allBrands = computed(() => store.getters.allBrands);
const filter = store.state.filter;

const clearFilters = () => {
    store.dispatch("clearFilter");
};

const applyFilters = () => {
    store.dispatch("setFilter", filter);
};
</script>

<style scoped>
#filterSection {
    position: fixed;
    top: 0;
    left: 70%;
    width: 100%;
    height: 100%;
    background-color: rgb(255, 255, 255);
    width: 30%;
    z-index: 1000;
    overflow: auto;
    padding-top: 50px;
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

.search-container {
    width: 90%;
    padding-left: 150px;
}

.search-btn {
    color: white;
    background-color: rgb(212, 141, 7);
    width: 230px;
    border-radius: 0;
    border: none;
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

.filter-btn:hover {
    background-color: rgb(63, 92, 26);
    color: white;
}
</style>