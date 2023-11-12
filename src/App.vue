<template>
  <section class="homeContainer">
    <section class="content">
      <div class="headerTable">
        <div class="searchBar">
          <SearchBar />
        </div>
        <div>
          <Button icon="pi pi-shopping-cart" severity="secondary" aria-label="Bookmark" @click="visible = true" />
        </div>
      </div>
      <CategoryList />
      <ProductList :columns="columns" />
    </section>
    <Dialog v-model:visible="visible" modal header="Shopping Cart" :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <ShoppingCart />
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'
import SearchBar from './components/SearchBar.vue'
import CategoryList from './components/CategoryList.vue'
import ProductList from './components/ProductList.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import useProducts from './composables/useProducts'

const visible = ref(false)

const { fetchData } = useProducts()

const columns = [
  { field: 'title', header: 'Nombre' },
  { field: 'price', header: 'Precio' },
  { field: 'category', header: 'Category' },
  { field: 'description', header: 'Descripcion' }
]

fetchData()
</script>

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
}
</style>
