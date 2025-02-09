<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const isLoading = ref(false)
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Поиск аниме</h1>
    
    <div class="mb-8">
      <div class="flex gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Введите название аниме..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          @keyup.enter="search"
        >
        <button
          class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          :disabled="isLoading"
          @click="search"
        >
          <i class="pi pi-search mr-2"></i>
          Найти
        </button>
      </div>
    </div>

    <!-- Здесь будут результаты поиска -->
    <div class="space-y-4">
      <p class="text-gray-600 text-center">
        Введите название аниме для поиска
      </p>
    </div>
  </div>
</template>

<script>
function search() {
  // TODO: Реализовать поиск
  console.log('Search query:', searchQuery.value)
}
</script> 