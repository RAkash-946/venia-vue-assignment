import { createStore } from "vuex";
const store = createStore({
    state: {
        productList: [],
        filteredProducts: [],
        totalProduct: 0,
        cart: [],
        query: "",
        page: 0,
        filter: {
            category: [],
            brand: [],
            minPrice: 0,
            maxPrice: 1000,
        },
        oldFilter: {
            category: [],
            brand: [],
            minPrice: 0,
            maxPrice: 1000,
        },
        allCategory: [],
        allBrands: [],
    },
    mutations: {
        setProductData(state, data) {
            state.productList = data;
            state.filteredProducts = data;
        },
        setTotalProduct(state, data) {
            state.totalProduct = data;
        },
        setFilteredProducts(state) {
            console.log('Applying filter...');
            state.filteredProducts = state.productList.filter((product) => {
                const matchesCategory = state.filter.category.length === 0 || state.filter.category.includes(product.category);
                const matchesBrand = state.filter.brand.length === 0 || state.filter.brand.includes(product.brand);
                const matchesPrice = product.price >= state.filter.minPrice && product.price <= state.filter.maxPrice;
                return matchesCategory && matchesBrand && matchesPrice;
            });
        },
        setAllCategories(state, categories) {
            state.allCategory = categories;
        },
        setAllBrands(state, brands) {
            state.allBrands = brands;
        },
    },
    actions: {
        fetchData({ commit }) {
            fetch(`https://dummyjson.com/products?limit=194`)
                .then((res) => res.json())
                .then((data) => {
                    commit("setProductData", data.products);
                    commit("setTotalProduct", data.total);
                    const categories = [...new Set(data.products.map((product) => product.category))];
                    const brands = [...new Set(data.products.map((product) => product.brand))];

                    commit("setAllCategories", categories);
                    commit("setAllBrands", brands);
                })
                .catch((error) => console.error("Error fetching data:", error));
        },
    },
    getters: {
            filteredPageProducts: (state) => {
              const start = state.page * 30;
              const end = start + 30;
              return state.filteredProducts.slice(start, end);
            },
    }
});
export default store;