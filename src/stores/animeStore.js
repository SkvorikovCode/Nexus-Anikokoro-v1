import { defineStore } from 'pinia';
import { animeApi } from '../services/animeApi';
import { ref, computed } from 'vue';

export const useAnimeStore = defineStore('anime', () => {
  const animeList = ref([]);
  const currentAnime = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const currentPage = ref(1);
  const totalPages = ref(1);

  // Получение списка аниме
  async function fetchAnimeList(page = 1) {
    try {
      loading.value = true;
      error.value = null;
      const data = await animeApi.getAnimeList(page);
      animeList.value = data;
      currentPage.value = page;
      // Предполагаем, что API возвращает общее количество страниц
      totalPages.value = Math.ceil(data.total / 24);
    } catch (e) {
      error.value = 'Ошибка при загрузке списка аниме';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  // Получение деталей аниме
  async function fetchAnimeById(id) {
    try {
      loading.value = true;
      error.value = null;
      const data = await animeApi.getAnimeById(id);
      currentAnime.value = data;
    } catch (e) {
      error.value = 'Ошибка при загрузке информации об аниме';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  // Поиск аниме
  async function searchAnime(query) {
    try {
      loading.value = true;
      error.value = null;
      const data = await animeApi.searchAnime(query);
      animeList.value = data;
    } catch (e) {
      error.value = 'Ошибка при поиске аниме';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  // Вычисляемые свойства
  const hasNextPage = computed(() => currentPage.value < totalPages.value);
  const hasPrevPage = computed(() => currentPage.value > 1);

  return {
    animeList,
    currentAnime,
    loading,
    error,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    fetchAnimeList,
    fetchAnimeById,
    searchAnime
  };
}); 