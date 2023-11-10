import { createStore } from 'vuex'
import { Product } from '../interfaces/product'

export interface ProductState {
  products: Product[]
}

export interface ProductsCartState {
  productsCart: Product[]
}

export interface Categories {
  categories: string[]
}

export interface keyword {
  searchKeyword: string
}

interface selectedCategory {
  selectedCategory: string
}

const store = createStore({
  state: {
    products: [],
    categories: [],
    searchKeyword: "",
    selectedCategory: "",
    productsCart: [],
  },
  getters: {
    allProducts: (state: ProductsCartState) => state.productsCart,
  },
  mutations: {
    setSelectedCategory (state: selectedCategory, name: string) {
      state.selectedCategory = name
    },
    setSearchKeyword (state: keyword, keyword: string) {
      state.searchKeyword = keyword
    },
    loadProducts (state: ProductState, products: Product[]) {
      state.products = products
    },
    loadCategories(state: Categories, categories: string[]) {
      state.categories = categories
    },
    addToCart (state:ProductsCartState, product: Product) {
      const existingProduct = state.productsCart.find((p) => p.id === product.id)
      if (existingProduct) {
        existingProduct.quantity += 1
        existingProduct.totalPrice =
          existingProduct.quantity * existingProduct.price
      } else {
        state.productsCart.push({ ...product, quantity: 1, totalPrice: product.price })
      }
    },
    incrementQuantity (state: ProductState, productId: number) {
      const product = state.products.find((p) => p.id === productId)
      if (product) {
        product.quantity += 1
        product.totalPrice = product.quantity * product.price
      }
    },
    decrementQuantity (state: ProductState, productId: number) {
      const product = state.products.find((p) => p.id === productId)
      if (product && product.quantity > 1) {
        product.quantity -= 1
        product.totalPrice = product.quantity * product.price
      }
    },
    removeProduct (state: ProductsCartState, productId: number) {
      const index = state.productsCart.findIndex((p) => p.id === productId)
      if (index !== -1) {
        state.productsCart.splice(index, 1)
      }
    }
  },
  modules: {}
})
export default store
