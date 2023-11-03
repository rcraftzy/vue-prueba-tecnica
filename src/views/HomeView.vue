<script setup>
import DataTable from 'primevue/datatable'
import RadioButton from 'primevue/radiobutton'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { getAllProducts, getAllCategories } from '../services/api'
import { computed, onMounted, ref } from 'vue'
import SearchBar from '../components/SearchBar.vue'

const products = ref([])
const categories = ref([])
const searchKeyword = ref('')
const selectedCategory = ref('')

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
  searchKeyword.value = keyword // Actualiza searchKeyword con el valor del filtro
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

const handleCategoryChange = () => {
  filteredProducts.value = filteredProducts.value.slice
}
</script>
<template>
  <section class="homeContainer">
    <aside class="sidebar">
      <div class="card flex justify-content-center">
        <div class="flex flex-column gap-3">
          <div :key="'All'">
            <RadioButton v-model="selectedCategory" inputId="All" name="dynamic" value=""
              @change="handleCategoryChange" />
            <label for="All" class="ml-2">{{ " " }}All</label>
          </div>
          <div v-for="category in categories" :key="category.key" class="flex align-items-center">
            <RadioButton v-model="selectedCategory" :inputId="category" name="dynamic" :value="category"
              @change="handleCategoryChange" />
            <label :for="category.key" class="ml-2">{{ " " + category.charAt(0).toUpperCase() + category.slice(1) }}</label>
          </div>
        </div>
      </div>
    </aside>
    <section class="content">
      <div class="headerTable">
        <div class="searchBar">
          <SearchBar :onFilter="filterProducts" />
        </div>
        <div>
          <Button icon="pi pi-shopping-cart" severity="secondary" aria-label="Bookmark" />
        </div>
      </div>
      <DataTable paginator :rows="10" :value="filteredProducts" tableStyle="min-width: 50rem">
        <Column header="Imagen">
          <template #body="slotProps">
            <img :src="`${slotProps.data.image}`" :alt="slotProps.data.image" class="w-6rem shadow-2 border-round" />
          </template>
        </Column>
        <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
        <Column :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
          <Button icon="pi pi-shopping-cart" label="Add" class="mr-2" @click="editProduct(slotProps.data)" />
        </template>
    </Column>
      </DataTable>
    </section>
  </section>
</template>

<style>
img {
  width: 6rem;
}

.sidebar {
  margin-left: 20px;
  grid-row: span 3;
}

.content {
  margin-left: 120px;
  margin-right: 20px;
}

.homeContainer {
  display: grid;
  margin: 0;
  margin-top: 20px;
  grid-auto-flow: column;
}

.headerTable {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.searchBar {
  width: 70%;
}</style>
