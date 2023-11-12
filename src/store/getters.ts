import { GetterTree } from "vuex/types/index.js"
import { State } from "./state"

const getters: GetterTree<State, any> = {
  allProducts: (state) => state.productsCart,
}

export default getters
