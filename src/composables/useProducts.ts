import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { Product } from '../interfaces/product'
import { useToast } from 'primevue/usetoast'

export default function useProducts () {
  const store = useStore()
  const toast = useToast()
  const selectedCategory = ref(store.state.selectedCategory)

  const fetchData = async () => {
    await store.dispatch('loadProducts')
    await store.dispatch('loadCategories')
  }

  const filterProducts = (keyword: string) => {
    store.dispatch('setSearchKeyword', keyword)
  }

  const handleCategoryChange = (category: string) => {
    store.dispatch('setSelectedCategory', category)
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
    store.dispatch('addToCart', product)
    toast.add({ severity: 'info', summary: 'Cart Updated', detail: 'Product added', life: 3000 })
  }

  const increment = (id: number) => {
    store.dispatch('increment', id)
  }
  const decrement = (id: number) => {
    store.dispatch('decrement', id)
  }
  const productsCart = store.getters.allProducts

  const remove = (id: number) => {
    store.dispatch('remove', id)
    toast.add({ severity: 'success', summary: 'Drop product', detail: 'Product removed', life: 3000 })
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }

  return {
    //! Methods
    searchKeyword: store.state.searchKeyword,
    selectedCategory,
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
