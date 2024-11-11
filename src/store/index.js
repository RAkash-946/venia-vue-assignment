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
        setPage(state, page) {
            state.page = page;
        },
        setSearchQuery({ commit, dispatch }, query) {
            commit("setQuery", query);
            dispatch("fetchQuery");
        },
        setQuery(state, query) {
            state.query = query;
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
        setFilter(state, filter) {
            console.log('Setting filter:', filter);
            state.filter = filter;
            state.page = 0;
        },
        clearFilter(state) {
            state.filter = { ...state.oldFilter };
            state.page = 0;
        },
        addToCart(state, product) {
            const cartItem = state.cart.find((item) => item.id === product.id);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart(state, productId) {
            state.cart = state.cart.filter((item) => item.id !== productId);
        },
        clearCart(state) {
            state.cart = [];
        },
        incrementQuantity(state, productId) {
            const cartItem = state.cart.find((item) => item.id === productId);
            if (cartItem) {
                cartItem.quantity += 1;
            }
        },
        decrementQuantity(state, productId) {
            const cartItem = state.cart.find((item) => item.id === productId);
            if (cartItem) {
                if (cartItem.quantity > 1) {
                    cartItem.quantity -= 1;
                } else {
                    state.cart = state.cart.filter((item) => item.id !== productId);
                }
            }
        },
    },
    actions: {
        fetchData({ commit }) {
            fetch(`https://dummyjson.com/products?limit=194`)
                .then((res) => res.json())
                .then((data) => {
                    commit("setProductData", data.products);
                    commit("setTotalProduct", data.total);
                    const categories = [...new Set(data.products.map((product) => product.category))].filter(category => category);
                    const brands = [...new Set(data.products.map((product) => product.brand))].filter(brand => brand);

                    commit("setAllCategories", categories);
                    commit("setAllBrands", brands);
                })
                .catch((error) => console.error("Error fetching data:", error));
        },
        fetchQuery({ commit, state }) {
            fetch(`https://dummyjson.com/products/search?limit=194&q=${state.query}`)
                .then((res) => res.json())
                .then((data) => {
                    commit("setProductData", data.products);
                    commit("setTotalProduct", data.total);
                    commit("setFilteredProducts");
                    const categories = [...new Set(data.products.map((product) => product.category))].filter(category => category);
                    const brands = [...new Set(data.products.map((product) => product.brand))].filter(brand => brand);
                    commit('setPage', 0)
                    commit("setAllCategories", categories);
                    commit("setAllBrands", brands);
                })
                .catch((error) => console.error("Error fetching data:", error));
        },
        setFilter({ commit }, filter) {
            commit("setFilter", filter);
            commit('setPage', 0)
            commit("setFilteredProducts");
        },
        clearFilter({ commit }) {
            commit("clearFilter");
            commit("setFilteredProducts");
        },
        setSearchQuery({ commit, dispatch }, query) {
            commit("setQuery", query);
            dispatch("fetchQuery");
        },
        setPage({ commit }, page) {
            commit("setPage", page);
        },
        addToCart(state, product) {
            const cartItem = state.cart.find((item) => item.id === product.id);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart(state, productId) {
            state.cart = state.cart.filter((item) => item.id !== productId);
        },
        clearCart(state) {
            state.cart = [];
        },
        incrementQuantity(state, productId) {
            const cartItem = state.cart.find((item) => item.id === productId);
            if (cartItem) {
                cartItem.quantity += 1;
            }
        },
        decrementQuantity(state, productId) {
            const cartItem = state.cart.find((item) => item.id === productId);
            if (cartItem) {
                if (cartItem.quantity > 1) {
                    cartItem.quantity -= 1;
                } else {
                    state.cart = state.cart.filter((item) => item.id !== productId);
                }
            }
        },
        addProductToCart({ commit }, product) {
            commit("addToCart", product);
        },
        removeProductFromCart({ commit }, productId) {
            commit("removeFromCart", productId);
        },
        clearCart({ commit }) {
            commit("clearCart");
        },
        incrementProductQuantity({ commit }, productId) {
            commit("incrementQuantity", productId);
        },
        decrementProductQuantity({ commit }, productId) {
            commit("decrementQuantity", productId);
        },
    },
    getters: {
        filteredPageProducts: (state) => {
            const start = state.page * 30;
            const end = start + 30;
            return state.filteredProducts.slice(start, end);
        },
        totalPages: (state) => {
            return Math.ceil(state.filteredProducts.length / 30);
        },
        allCategories: (state) => {
            return state.allCategory;
        },
        allBrands: (state) => {
            return state.allBrands;
        },
        cartTotal: (state) => {
            const total = state.cart.reduce((acc, product) => {
                return acc + (product.price * product.quantity);
            }, 0);

            return total.toFixed(2);
        },
        totalItems: (state) => {
            const total = state.cart.reduce((acc, product) => {
                return acc + product.quantity
            }, 0);
            return total;
        }
    }
});
export default store;