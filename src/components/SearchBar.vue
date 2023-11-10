<template>
  <div class="p-inputgroup flex-1">
    <InputText placeholder="Buscar..." v-model="searchKeyword" @input="filterProducts(searchKeyword)" />
    <Button icon="pi pi-search" severity="warning" />
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import useProducts from '../composables/useProducts'

const { searchKeyword, filterProducts } = useProducts()
</script>
