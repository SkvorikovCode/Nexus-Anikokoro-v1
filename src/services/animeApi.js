import axios from 'axios'

// Используем относительный URL для проксирования через Vite
const BASE_URL = '/api'

// Создаем простой кэш для хранения результатов
const cache = new Map()
const CACHE_TIME = 5 * 60 * 1000 // 5 минут

// Создаем клиент axios с базовой конфигурацией
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 секунд
})

// Добавляем перехватчик запросов
api.interceptors.request.use(
  (config) => {
    // Удаляем проблемные заголовки
    delete config.headers['User-Agent']
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Добавляем перехватчик ответов
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    // Обработка специфических ошибок Shikimori API
    if (error.response?.status === 429) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(api(error.config))
        }, 1000)
      })
    }
    return Promise.reject(error)
  }
)

// Функция для получения данных из кэша или API
const getCachedData = async (key, fetchFunction) => {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TIME) {
    return cached.data
  }

  const data = await fetchFunction()
  cache.set(key, {
    data,
    timestamp: Date.now(),
  })
  return data
}

// Функция для формирования параметров запроса с фильтрами
const buildSearchParams = (query = '', page = 1, limit = 24, filters = {}) => {
  const params = {
    page,
    limit,
    censored: true,
  }

  if (query) {
    params.search = query
  }

  if (filters.type) {
    params.kind = filters.type
  }

  if (filters.status) {
    params.status = filters.status
  }

  if (filters.yearFrom) {
    params.season_year_gte = filters.yearFrom
  }

  if (filters.yearTo) {
    params.season_year_lte = filters.yearTo
  }

  if (filters.minScore) {
    params.score_gte = filters.minScore
  }

  if (filters.sort) {
    params.order = filters.sort
  }

  return params
}

export const animeApi = {
  // Получение списка аниме с пагинацией
  getAnimeList: async (page = 1, limit = 24, order = 'popularity') => {
    const cacheKey = `list_${page}_${limit}_${order}`
    try {
      return await getCachedData(cacheKey, async () => {
        const response = await api.get('/animes', {
          params: {
            page,
            limit,
            order,
            status: 'released',
            censored: true,
            score: 1,
          },
        })
        return response.data
      })
    } catch (error) {
      console.error('Error fetching anime list:', error)
      throw error
    }
  },

  // Получение информации об отдельном аниме
  getAnimeById: async (id) => {
    const cacheKey = `anime_${id}`
    try {
      return await getCachedData(cacheKey, async () => {
        const response = await api.get(`/animes/${id}`)
        return response.data
      })
    } catch (error) {
      console.error('Error fetching anime details:', error)
      throw error
    }
  },

  // Поиск аниме с фильтрами
  searchAnime: async (query = '', page = 1, limit = 24, filters = {}) => {
    const params = buildSearchParams(query, page, limit, filters)
    const cacheKey = `search_${JSON.stringify(params)}`

    try {
      return await getCachedData(cacheKey, async () => {
        const response = await api.get('/animes', { params })
        return response.data
      })
    } catch (error) {
      console.error('Error searching anime:', error)
      throw error
    }
  },
}
