import { Product } from "../interfaces/product"
import { MutationTree } from "vuex/types/index.js";
import { State } from "./state";
import * as types from "./mutations-types";

interface Mutations {
  [types.SET_SELECTED_CATEGORY](state: State, payload: string): void;
  [types.SET_SEARCH_KEYWORD](state: State, payload: string): void;
  [types.FETCH_PRODUCTS](state: State, payload: Product[]): void;
  [types.FETCH_CATEGORIES](state: State, payload: string[]): void;
  [types.ADD_TO_CART](state: State, payload: Product): void;
  [types.INCREMENT_QUANTITY](state: State, payload: number): void;
  [types.DECREMENT_QUANTITY](state: State, payload: number): void;
  [types.REMOVE_PRODUCT](state: State, payload: number): void;
}

const mutations: MutationTree<State> & Mutations = {
  [types.SET_SELECTED_CATEGORY] (state, name) {
    state.selectedCategory = name 
  },
  [types.SET_SEARCH_KEYWORD] (state, keyword) {
    state.searchKeyword = keyword
  },
  [types.FETCH_PRODUCTS] (state, products) {
    state.products = products
  },
  [types.FETCH_CATEGORIES] (state, categories) {
    state.categories = categories
  },
  [ types.ADD_TO_CART] (state, product) {
    const existingProduct = state.productsCart.find((p) => p.id === product.id)
    if (existingProduct) {
      existingProduct.quantity += 1
      existingProduct.totalPrice = existingProduct.quantity * existingProduct.price
    } else {
      state.productsCart.push({ ...product, quantity: 1, totalPrice: product.price })
    }
  },
  [ types.INCREMENT_QUANTITY ] (state, productId) {
    const product = state.productsCart.find((p) => p.id === productId)
    if (product) {
      product.quantity += 1
      product.totalPrice = product.quantity * product.price
    }
  },
  [types.DECREMENT_QUANTITY] (state, productId) {
    const product = state.productsCart.find((p) => p.id === productId)
    if (product && product.quantity > 1) {
      product.quantity -= 1
      product.totalPrice = product.quantity * product.price
    }
  },
  [types.REMOVE_PRODUCT] (state, productId) {
    const index = state.productsCart.findIndex((p) => p.id === productId)
    if (index !== -1) {
      state.productsCart.splice(index, 1)
    }
  }
}
export default mutations
