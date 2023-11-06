<script setup>
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { getAllProducts, getAllCategories } from './services/api'
import { computed, onMounted, ref } from 'vue'
import SearchBar from './components/SearchBar.vue'
import CategoryList from './components/CategoryList.vue'
import ProductList from './components/ProductList.vue'
import ShoppingCart from './components/ShoppingCart.vue'

const products = ref([])
const categories = ref([])
const searchKeyword = ref('')
const selectedCategory = ref('')
const visible = ref(false)

const fetchData = async () => {
  const [productsData, categoriesData] = await Promise.all([
    getAllProducts(),
    getAllCategories()
  ])
  products.value = productsData
  categories.value = categoriesData
}

onMounted(() => {
  fetchData()
})

const columns = [
  { field: 'title', header: 'Nombre' },
  { field: 'price', header: 'Precio' },
  { field: 'category', header: 'Category' },
  { field: 'description', header: 'Descripcion' }
]

const filterProducts = (keyword) => {
  searchKeyword.value = keyword
}

const filteredProducts = computed(() => {
  const keyword = searchKeyword.value.toLowerCase()
  const categoryFilter = selectedCategory.value.toLowerCase()

  return products.value.filter(product => {
    const isMatchingKeyword =
      product.title.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword)

    const isMatchingCategory = !categoryFilter || product.category.toLowerCase() === categoryFilter

    return isMatchingKeyword && isMatchingCategory
  })
})

const handleCategoryChange = (category) => {
  selectedCategory.value = category
}
</script>
<template>
  <section class="homeContainer">
    <section class="content">
      <div class="headerTable">
        <div class="searchBar">
          <SearchBar :onFilter="filterProducts" />
        </div>
        <div>
          <Button icon="pi pi-shopping-cart" severity="secondary" aria-label="Bookmark" @click="visible = true" />
        </div>
      </div>
      <CategoryList :categories="categories" :onCategoryChange="handleCategoryChange" />
      <ProductList :products="filteredProducts" :columns="columns" />
    </section>
    <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <ShoppingCart />
    </Dialog>
  </section>
</template>

<style>
img {
  width: 6rem;
}

.homeContainer {
  max-width: 52rem;
  margin: 20px auto 0
}

.headerTable {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.searchBar {
  width: 70%;
}</style>
