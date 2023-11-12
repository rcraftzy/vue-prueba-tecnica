import { ActionTree } from 'vuex/types/index.js'
import * as types from './mutations-types.ts'
import { State } from './state.ts'
import { Product } from '../interfaces/product.ts';
import { getAllCategories, getAllProducts } from '../services/api.ts';

interface Actions {
  setSelectedCategory ({ commit }: {commit:any}, category: string)  : void;
  setSearchKeyword ({ commit }: {commit:any}, keyword: string)  : void;
  loadProducts({commit}: {commit:any}) : Promise<void>;
  loadCategories({commit}: {commit:any}) : Promise<void>;
  addToCart ({commit}: {commit:any}, product: Product)  : void;
  increment ({commit}: {commit:any}, productId: number) : void;
  decrement ({commit}: {commit:any}, productId: number) : void;
  remove ({commit}: {commit:any}, productId: number) : void;
}

const actions: ActionTree<State, any> & Actions = {
  setSelectedCategory ({ commit }, category) {
    commit(types.SET_SELECTED_CATEGORY, category)
  },
  setSearchKeyword ({ commit }, keyword) {
    commit(types.SET_SEARCH_KEYWORD, keyword)
  },
  async loadProducts({commit}) {
    try {
      const products = await getAllProducts()
      commit(types.FETCH_PRODUCTS, products)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  async loadCategories({commit}) {
    try {
      const categories = await getAllCategories()
      commit(types.FETCH_CATEGORIES, categories)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  addToCart ({commit}, product) {
    commit(types.ADD_TO_CART, product)
  },
  increment ({commit}, productId) {
    commit(types.INCREMENT_QUANTITY, productId)
  },
  decrement ({commit}, productId) {
    commit(types.DECREMENT_QUANTITY, productId)
  },
  remove ({commit}, productId) {
    commit(types.REMOVE_PRODUCT, productId)
  }
}

export default actions