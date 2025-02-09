<script setup>
import AnimeGrid from '../components/AnimeGrid.vue'
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <!-- Hero секция -->
    <section class="text-center py-12 px-4">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Добро пожаловать в NexusAnikokoro
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Откройте для себя мир аниме с нашей коллекцией
      </p>
      <div class="flex justify-center gap-4">
        <router-link
          to="/categories"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <i class="pi pi-list mr-2"></i>
          Категории
        </router-link>
        <router-link
          to="/search"
          class="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
        >
          <i class="pi pi-search mr-2"></i>
          Поиск
        </router-link>
      </div>
    </section>

    <!-- Сетка аниме -->
    <section class="py-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">
        Популярное аниме
      </h2>
      <AnimeGrid />
    </section>
  </div>
</template> 