<script setup>
import { ref } from 'vue'
import SearchAutocomplete from '@/components/search/SearchAutocomplete.vue'
import SearchFilters from '@/components/search/SearchFilters.vue'
import AnimeCard from '@/components/AnimeCard.vue'
import { animeApi } from '@/services/animeApi'

const searchResults = ref([])
const isLoading = ref(false)
const error = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)
const showFilters = ref(false)
const activeFilters = ref({})

const handleSearch = async (query, filters = {}) => {
  if (!query && !Object.keys(filters).length) {
    searchResults.value = []
    return
  }

  isLoading.value = true
  error.value = null

  try {
    const results = await animeApi.searchAnime(query, currentPage.value, 24, filters)
    searchResults.value = results
  } catch (err) {
    error.value = 'Произошла ошибка при поиске. Пожалуйста, попробуйте снова.'
    console.error('Search error:', err)
  } finally {
    isLoading.value = false
  }
}

const handleSelect = (anime) => {
  searchResults.value = [anime]
}

const clearResults = () => {
  searchResults.value = []
  error.value = null
}

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

const handleFiltersUpdate = (filters) => {
  activeFilters.value = filters
}

const applyFilters = (filters) => {
  activeFilters.value = filters
  handleSearch('', filters)
}
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8 text-gray-100">Поиск аниме</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- Сайдбар с фильтрами (десктоп) -->
      <div class="hidden md:block">
        <SearchFilters
          v-model:filters="activeFilters"
          @apply="applyFilters"
          class="bg-gray-800/50 border-gray-700"
        />
      </div>

      <!-- Основной контент -->
      <div class="md:col-span-3">
        <div class="mb-8">
          <div class="flex gap-4">
            <SearchAutocomplete
              class="flex-1"
              placeholder="Введите название аниме..."
              @search="query => handleSearch(query, activeFilters)"
              @select="handleSelect"
              @clear="clearResults"
            />
            <!-- Кнопка фильтров (мобильная) -->
            <button
              class="md:hidden px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
              @click="toggleFilters"
            >
              <i class="pi pi-filter"></i>
            </button>
          </div>
        </div>

        <!-- Мобильные фильтры -->
        <div
          v-if="showFilters"
          class="md:hidden mb-6"
        >
          <SearchFilters
            v-model:filters="activeFilters"
            @apply="applyFilters"
            class="bg-gray-800/50 border-gray-700"
          />
        </div>

        <!-- Результаты поиска -->
        <div v-if="isLoading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>

        <div v-else-if="error" class="text-center text-red-400 py-8">
          {{ error }}
        </div>

        <div v-else-if="searchResults.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimeCard
            v-for="anime in searchResults"
            :key="anime.id"
            :anime="anime"
          />
        </div>

        <div v-else class="text-center py-12">
          <i class="pi pi-search text-6xl mb-4 text-gray-700"></i>
          <p class="text-gray-500">Введите название аниме для поиска</p>
        </div>
      </div>
    </div>
  </div>
</template> 