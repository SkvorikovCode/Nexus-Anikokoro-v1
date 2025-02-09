<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Поиск -->
    <div class="mb-8">
      <div class="max-w-xl mx-auto">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Поиск аниме..."
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            @input="handleSearch"
          />
          <span
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
          >
            ✕
          </span>
        </div>
      </div>
    </div>

    <!-- Сетка аниме -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      <template v-if="!loading">
        <AnimeCard
          v-for="anime in animeList"
          :key="anime.id"
          :anime="anime"
        />
      </template>
      <template v-else>
        <!-- Скелетон загрузки -->
        <div
          v-for="n in 8"
          :key="n"
          class="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse"
        >
          <div class="aspect-[3/4] bg-gray-200"></div>
          <div class="p-4 space-y-2">
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </template>
    </div>

    <!-- Ошибка -->
    <div v-if="error" class="text-center text-red-500 mt-4">
      {{ error }}
      <button
        @click="retryLastOperation"
        class="ml-2 text-primary hover:underline"
      >
        Попробовать снова
      </button>
    </div>

    <!-- Пагинация -->
    <div v-if="!loading && !error" class="mt-8 flex justify-center gap-4">
      <button
        @click="prevPage"
        :disabled="!hasPrevPage"
        class="px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Назад
      </button>
      <span class="px-4 py-2">
        Страница {{ currentPage }} из {{ totalPages }}
      </span>
      <button
        @click="nextPage"
        :disabled="!hasNextPage"
        class="px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Вперед
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAnimeStore } from '../stores/animeStore';
import AnimeCard from './AnimeCard.vue';
import { useDebounce } from '@vueuse/core';

const store = useAnimeStore();
const searchQuery = ref('');
const debouncedSearch = useDebounce(searchQuery, 300);

// Получаем состояние из хранилища
const animeList = ref([]);
const loading = ref(true);
const error = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const hasNextPage = ref(false);
const hasPrevPage = ref(false);

// Загрузка данных при монтировании
onMounted(async () => {
  try {
    const data = await store.fetchAnimeList(1);
    animeList.value = data;
    loading.value = false;
  } catch (e) {
    error.value = 'Ошибка при загрузке списка аниме';
    loading.value = false;
  }
});

// Обработка поиска
const handleSearch = async () => {
  if (!debouncedSearch.value) {
    await store.fetchAnimeList(1);
    return;
  }

  loading.value = true;
  error.value = null;
  
  try {
    const data = await store.searchAnime(debouncedSearch.value);
    animeList.value = data;
  } catch (e) {
    error.value = 'Ошибка при поиске аниме';
  } finally {
    loading.value = false;
  }
};

// Очистка поиска
const clearSearch = async () => {
  searchQuery.value = '';
  await store.fetchAnimeList(1);
};

// Повтор последней операции при ошибке
const retryLastOperation = async () => {
  if (searchQuery.value) {
    await store.searchAnime(searchQuery.value);
  } else {
    await store.fetchAnimeList(currentPage.value);
  }
};

// Загрузка списка аниме
const fetchAnimeList = async (page) => {
  loading.value = true;
  error.value = null;
  
  try {
    const data = await store.fetchAnimeList(page);
    animeList.value = data;
    currentPage.value = page;
    updatePagination();
  } catch (e) {
    error.value = 'Ошибка при загрузке списка аниме';
  } finally {
    loading.value = false;
  }
};

// Обновление пагинации
const updatePagination = () => {
  hasNextPage.value = currentPage.value < totalPages.value;
  hasPrevPage.value = currentPage.value > 1;
};

// Пагинация
const nextPage = () => {
  if (hasNextPage.value) {
    fetchAnimeList(currentPage.value + 1);
  }
};

const prevPage = () => {
  if (hasPrevPage.value) {
    fetchAnimeList(currentPage.value - 1);
  }
};
</script> 