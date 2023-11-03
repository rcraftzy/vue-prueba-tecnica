<script setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import { ref, defineProps } from 'vue'

const searchKeyword = ref('')
const { onFilter } = defineProps(['onFilter'])

const filterItems = () => {
  onFilter(searchKeyword.value)
}
</script>
<template>
  <div class="p-inputgroup flex-1">
    <InputText placeholder="Keyword" v-model="searchKeyword" @input="filterItems" />
    <Button icon="pi pi-search" severity="warning" />
  </div>
</template>
