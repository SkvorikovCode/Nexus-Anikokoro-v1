<script setup>
import { ref } from 'vue'

const favorites = ref([])
const isLoading = ref(true)

// Имитация загрузки данных
setTimeout(() => {
  isLoading.value = false
}, 1000)
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Избранное аниме</h1>
    
    <div v-if="isLoading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>

    <template v-else>
      <div v-if="favorites.length === 0" class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <i class="pi pi-heart text-6xl"></i>
        </div>
        <h3 class="text-xl font-medium text-gray-900 mb-2">
          Список избранного пуст
        </h3>
        <p class="text-gray-600 mb-6">
          Добавляйте аниме в избранное, чтобы они отображались здесь
        </p>
        <router-link
          to="/"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <i class="pi pi-home mr-2"></i>
          На главную
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Здесь будет список избранных аниме -->
      </div>
    </template>
  </div>
</template> 