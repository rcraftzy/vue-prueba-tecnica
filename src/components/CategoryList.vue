<template>
  <div class="category-list">
    <div :key="''">
      <RadioButton v-model="selectedCategory" inputId="" class="category" name="dynamic" value="" @change='handleCategoryChange("")' />
      <label for="All" class="ml-2">{{ " " }}All</label>
    </div>
    <div v-for="category in categories" :key="category" class="category">
      <RadioButton v-model="selectedCategory" :inputId="category" name="dynamic" :value="category"
        @change="handleCategoryChange(category)" />
      <label :for="category.key" class="ml-2">{{ " " + category.charAt(0).toUpperCase() + category.slice(1) }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import RadioButton from 'primevue/radiobutton'
import useProducts from '../composables/useProducts'

const { selectedCategory, categories, handleCategoryChange } = useProducts()
</script>

<style>
.category-list {
  display: flex;
  margin: 20px 0;
}
.category {
  margin: 0 10px;
}
</style>
