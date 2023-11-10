<template>
  <Toast />
  <DataTable paginator :rows="10" :value="products" tableStyle="min-width: 50rem">
    <Column header="Imagen">
      <template #body="slotProps">
        <img :src="`${slotProps.data.image}`" :alt="slotProps.data.image" class="w-6rem shadow-2 border-round" />
      </template>
    </Column>
    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
    <Column :exportable="false" style="min-width:8rem">
      <template #body="slotProps">
        <Button icon="pi pi-shopping-cart" label="Add" class="mr-2" @click="addToCart(slotProps.data)" />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import useProducts from '../composables/useProducts'

const { filteredProducts: products, addToCart } = useProducts()

defineProps({
  columns: Object
})
</script>
