<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const columns = [
  { field: 'code', header: 'Code' },
  { field: 'name', header: 'Name' },
  { field: 'category', header: 'Category' },
  { field: 'quantity', header: 'Quantity' }
]
</script>
<template>
  <DataTable :value="products" tableStyle="min-width: 50rem">
    <Column v-for="col of columns" :key="col.field" :header="col.header"></Column>
  </DataTable>
</template>
