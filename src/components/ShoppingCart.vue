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

<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import useProducts from '../composables/useProducts'

const { formatCurrency, increment, decrement, remove, productsCart: products } = useProducts()

</script>

<style>
.counter {
  display: flex;
  align-items: center;
  gap: 10px
}</style>
