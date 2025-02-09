import axios from 'axios';

// Используем относительный URL для проксирования через Vite
const BASE_URL = '/api';

// Создаем простой кэш для хранения результатов
const cache = new Map();
const CACHE_TIME = 5 * 60 * 1000; // 5 минут

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000 // Уменьшаем таймаут до 5 секунд
});

// Добавляем перехватчик ответов для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Функция для получения данных из кэша или API
const getCachedData = async (key, fetchFunction) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
    return cached.data;
  }

  const data = await fetchFunction();
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
  return data;
};

export const animeApi = {
  // Получение списка аниме с пагинацией
  getAnimeList: async (page = 1, limit = 12, order = 'popularity') => {
    const cacheKey = `list_${page}_${limit}_${order}`;
    try {
      return await getCachedData(cacheKey, async () => {
        const response = await api.get('/animes', {
          params: {
            page,
            limit,
            order,
            status: 'released',
            censored: true,
            score: 1 // Добавляем минимальный рейтинг для уменьшения выборки
          }
        });
        return response.data;
      });
    } catch (error) {
      console.error('Error fetching anime list:', error);
      throw error;
    }
  },

  // Получение информации об отдельном аниме
  getAnimeById: async (id) => {
    const cacheKey = `anime_${id}`;
    try {
      return await getCachedData(cacheKey, async () => {
        const response = await api.get(`/animes/${id}`);
        return response.data;
      });
    } catch (error) {
      console.error('Error fetching anime details:', error);
      throw error;
    }
  },

  // Поиск аниме
  searchAnime: async (query, page = 1, limit = 12) => {
    const cacheKey = `search_${query}_${page}_${limit}`;
    try {
      return await getCachedData(cacheKey, async () => {
        const response = await api.get('/animes', {
          params: {
            search: query,
            page,
            limit,
            order: 'popularity',
            censored: true,
            score: 1
          }
        });
        return response.data;
      });
    } catch (error) {
      console.error('Error searching anime:', error);
      throw error;
    }
  }
}; 