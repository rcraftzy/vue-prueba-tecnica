import { Commit, GetterTree } from 'vuex/types/index.js'
import { State } from './state'

const getters: GetterTree<State, Commit> = {
  allProducts: (state) => state.productsCart
}

export default getters
