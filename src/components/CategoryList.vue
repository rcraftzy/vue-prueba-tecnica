<script setup>
import RadioButton from 'primevue/radiobutton'
import { ref } from 'vue'

const selectedCategory = ref('')

const { onCategoryChange } = defineProps({
  categories: {
    type: Object,
    default: () => ({})
  },
  onCategoryChange: Function
})

const emitCategoryChange = (category) => {
  selectedCategory.value = category
  onCategoryChange(category)
}
</script>
<template>
  <div class="category-list">
    <div :key="'All'">
      <RadioButton v-model="selectedCategory" inputId="" class="category" name="dynamic" value="" @change='emitCategoryChange("")' />
      <label for="All" class="ml-2">{{ " " }}All</label>
    </div>
    <div v-for="category in categories" :key="category" class="category">
      <RadioButton v-model="selectedCategory" :inputId="category" name="dynamic" :value="category"
        @change="emitCategoryChange(category)" />
      <label :for="category.key" class="ml-2">{{ " " + category.charAt(0).toUpperCase() + category.slice(1) }}</label>
    </div>
  </div>
</template>

<style>
.category-list {
  display: flex;
  margin: 20px 0;
}
.category {
  margin: 0 10px;
}
</style>
