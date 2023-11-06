<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useStore } from 'vuex'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

const store = useStore()
const toast = useToast()

const increment = (id) => {
  store.commit('incrementQuantity', id)
}
const decrement = (id) => {
  store.commit('decrementQuantity', id)
}
const products = store.getters.allProducts
const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}
const remove = (id) => {
  store.commit('removeProduct', id)
  toast.add({ severity: 'success', summary: 'Drop product', detail: 'Product removed', life: 3000 })
}
</script>

<template>
  <Toast />
  <DataTable :rows="10" :value="products" tableStyle="min-width: 50rem">
    <Column header="Imagen">
      <template #body="slotProps">
        <img :src="`${slotProps.data.image}`" :alt="slotProps.data.image" class="w-6rem shadow-2 border-round" />
      </template>
    </Column>
    <Column header="Precio">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.price) }}
      </template>
    </Column>
    <Column header="Cantidad">
      <template #body="slotProps">
        <div class="counter">
          <Button icon="pi pi-plus" outlined severity="success" rounded class="mr-2"
            @click="increment(slotProps.data.id)" />
          <div>{{ slotProps.data.quantity }}</div>
          <Button icon="pi pi-minus" outlined severity="warning" rounded class="mr-2"
            @click="decrement(slotProps.data.id)" />
        </div>
      </template>
    </Column>
    <Column header="Total">
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.totalPrice) }}
      </template>
    </Column>
    <Column>
    <template #body="slotProps">
      <Button icon="pi pi-times" severity="danger" rounded aria-label="Cancel" @click="remove(slotProps.data.id)"/>
    </template>
    </Column>
  </DataTable>
</template>

<style>
.counter {
  display: flex;
  align-items: center;
  gap: 10px
}</style>
