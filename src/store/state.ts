import { Product } from "../interfaces/product"

export interface State {
  products: Product[]
  categories: string[]
  searchKeyword: string
  selectedCategory: string
  productsCart: Product[]
}
const state: State = {
  products: [],
  categories: [],
  searchKeyword: '',
  selectedCategory: '',
  productsCart: []
}

export default state
