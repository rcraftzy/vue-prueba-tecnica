<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { defineProps } from 'vue'
import Button from 'primevue/button'
import { useStore } from 'vuex'

const store = useStore()

const addToCart = (product) => {
  store.commit('addToCart', product)
}

defineProps({
  columns: Object,
  products: Object
})

</script>
<template>
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
