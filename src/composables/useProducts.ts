import { useStore } from 'vuex'
import { getAllProducts, getAllCategories } from '../services/api'
import { computed } from 'vue'
import { Product } from '../interfaces/product'
import { useToast } from 'primevue/usetoast'

export default function useProducts () {
  const store = useStore()
  const toast = useToast()

  const fetchData = async () => {
    store.commit('loadProducts', await getAllProducts())
    store.commit('loadCategories', await getAllCategories())
  }

  const filterProducts = (keyword: string) => {
    store.commit('setSearchKeyword', keyword)
  }

  const handleCategoryChange = (category: string) => {
    store.commit('setSelectedCategory', category)
  }

  const filteredProducts = computed(() => {
    const keyword = store.state.searchKeyword.toLowerCase()
    const categoryFilter = store.state.selectedCategory.toLowerCase()

    return store.state.products.filter((product: Product) => {
      const isMatchingKeyword =
      product.title.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword)

      const isMatchingCategory = !categoryFilter || product.category.toLowerCase() === categoryFilter

      return isMatchingKeyword && isMatchingCategory
    })
  })

  const addToCart = (product: Product) => {
    store.commit('addToCart', product)
    toast.add({ severity: 'info', summary: 'Cart Updated', detail: 'Product added', life: 3000 })
  }

  const increment = (id: number) => {
    store.commit('incrementQuantity', id)
  }
  const decrement = (id: number) => {
    store.commit('decrementQuantity', id)
  }
  const productsCart = store.getters.allProducts

  const remove = (id: number) => {
    store.commit('removeProduct', id)
    toast.add({ severity: 'success', summary: 'Drop product', detail: 'Product removed', life: 3000 })
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }

  return {
    //! Methods
    searchKeyword: store.state.searchKeyword,
    selectedCategory: computed(() => store.state.selectedCategory),
    filterProducts,
    filteredProducts,
    handleCategoryChange,
    fetchData,
    addToCart,
    remove,
    increment,
    decrement,
    formatCurrency,

    //! Properties
    productsCart,
    products: computed(() => store.state.products),
    categories: computed(() => store.state.categories),
  }
}
