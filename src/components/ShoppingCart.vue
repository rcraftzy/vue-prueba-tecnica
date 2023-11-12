<template>
  <Toast />
  <DataTable :rows="10" :value="products" tableStyle="min-width: 40rem" :header="false">
    <Column>
      <template #body="slotProps">
        <img :src="`${slotProps.data.image}`" :alt="slotProps.data.image" />
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.price) }}
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        <div class="counter">
          <Button icon="pi pi-plus" size="small" severity="secondary" outlined class="mr-2"
            @click="increment(slotProps.data.id)" />
          <div>{{ slotProps.data.quantity }}</div>
          <Button icon="pi pi-minus" size="small" severity="secondary" outlined class="mr-2"
            @click="decrement(slotProps.data.id)" />
        </div>
      </template>
    </Column>
    <Column>
      <template #body="slotProps">
        {{ formatCurrency(slotProps.data.totalPrice) }}
      </template>
    </Column>
    <Column>
    <template #body="slotProps">
      <Button icon="pi pi-times" severity="danger" size="small" text rounded aria-label="Cancel" @click="remove(slotProps.data.id)"/>
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

<style scoped>
.counter {
  display: flex;
  align-items: center;
  gap: 10px
}
img {
  width: 3rem;
}
</style>
