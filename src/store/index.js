import { createStore } from 'vuex'

const store = createStore({
  state: {
    products: []
  },
  getters: {
    allProducts: state => state.products
  },
  mutations: {
    addToCart (state, value) {
      const existingProduct = state.products.find(p => p.id === value.id)
      if (existingProduct) {
        existingProduct.quantity += 1
        existingProduct.totalPrice = existingProduct.quantity * existingProduct.price
      } else {
        state.products.push({ ...value, quantity: 1, totalPrice: value.price })
      }
    },
    incrementQuantity (state, productId) {
      const product = state.products.find(p => p.id === productId)
      if (product) {
        product.quantity += 1
        product.totalPrice = product.quantity * product.price
      }
    },
    decrementQuantity (state, productId) {
      const product = state.products.find(p => p.id === productId)
      if (product && product.quantity > 1) {
        product.quantity -= 1
        product.totalPrice = product.quantity * product.price
      }
    },
    removeProduct (state, productId) {
      const index = state.products.findIndex(p => p.id === productId)
      if (index !== -1) {
        state.products.splice(index, 1)
      }
    }
  },
  modules: {
  }
})
export default store
