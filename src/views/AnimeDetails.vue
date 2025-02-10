<template>
  <div class="max-w-7xl mx-auto">
    <!-- Загрузка -->
    <div
      v-if="isLoading"
      class="flex justify-center items-center min-h-[60vh]"
    >
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
    </div>

    <!-- Ошибка -->
    <div
      v-else-if="error"
      class="text-center text-red-400 py-12"
    >
      {{ error }}
    </div>

    <!-- Контент -->
    <template v-else-if="anime">
      <!-- Хедер -->
      <div class="relative mb-8">
        <!-- Фоновое изображение с градиентом -->
        <div class="absolute inset-0 h-[400px] overflow-hidden -z-10">
          <div class="absolute inset-0 bg-gradient-to-b from-gray-900/0 to-gray-900"></div>
          <img
            :src="anime.image?.original"
            :alt="anime.name"
            class="w-full h-full object-cover blur-xl opacity-30"
          >
        </div>

        <div class="pt-8">
          <div class="flex flex-col md:flex-row gap-8">
            <!-- Постер -->
            <div class="w-full md:w-1/3 lg:w-1/4">
              <div class="aspect-[3/4] rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-800">
                <img
                  :src="anime.image?.original"
                  :alt="anime.name"
                  class="w-full h-full object-cover"
                >
              </div>
            </div>

            <!-- Основная информация -->
            <div class="flex-1">
              <h1 class="text-4xl font-bold text-gray-100 mb-2 leading-tight">
                {{ anime.russian || anime.name }}
              </h1>
              <h2 class="text-xl text-gray-400 mb-8">
                {{ anime.name }}
              </h2>

              <!-- Рейтинг и статистика -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                <div class="card p-4 text-center">
                  <div class="text-2xl font-bold text-yellow-400 mb-1">
                    {{ anime.score || '?' }}
                  </div>
                  <div class="text-sm text-gray-400">Рейтинг</div>
                </div>
                <div class="card p-4 text-center">
                  <div class="text-2xl font-bold text-indigo-400 mb-1">
                    {{ anime.episodes || '?' }}
                  </div>
                  <div class="text-sm text-gray-400">Эпизоды</div>
                </div>
                <div class="card p-4 text-center">
                  <div class="text-2xl font-bold text-purple-400 mb-1">
                    {{ anime.duration }}
                  </div>
                  <div class="text-sm text-gray-400">Минут</div>
                </div>
                <div class="card p-4 text-center">
                  <div class="text-2xl font-bold text-pink-400 mb-1">
                    #{{ anime.popularity || '?' }}
                  </div>
                  <div class="text-sm text-gray-400">Популярность</div>
                </div>
              </div>

              <!-- Жанры -->
              <div class="mb-8">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="genre in anime.genres"
                    :key="genre.id"
                    class="badge badge-primary"
                  >
                    {{ genre.russian || genre.name }}
                  </span>
                </div>
              </div>

              <!-- Кнопки действий -->
              <div class="flex gap-4">
                <button class="btn-primary">
                  <i class="pi pi-heart-fill mr-2"></i>
                  В избранное
                </button>
                <button class="btn-secondary">
                  <i class="pi pi-share-alt mr-2"></i>
                  Поделиться
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Табы -->
      <div class="mb-8">
        <div class="border-b border-gray-800">
          <nav class="flex space-x-8">
            <button
              v-for="tab in ['info', 'gallery', 'related']"
              :key="tab"
              class="px-1 py-4 text-sm font-medium border-b-2 transition-colors"
              :class="[
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-700'
              ]"
              @click="activeTab = tab"
            >
              {{ {
                info: 'Описание',
                gallery: 'Галерея',
                related: 'Связанное'
              }[tab] }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Контент табов -->
      <div class="prose prose-invert max-w-none">
        <!-- Описание -->
        <div v-if="activeTab === 'info'" class="space-y-8">
          <div v-if="anime.description_html" v-html="anime.description_html"></div>
          <div v-else class="text-gray-500">Описание отсутствует</div>

          <!-- Характеристики -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
            <div class="card p-6">
              <h3 class="heading-3 !mb-4">Информация</h3>
              <dl class="space-y-3">
                <div class="flex justify-between">
                  <dt class="text-gray-400">Тип</dt>
                  <dd class="text-gray-100">{{ anime.kind?.toUpperCase() }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-400">Эпизоды</dt>
                  <dd class="text-gray-100">{{ anime.episodes || 'Неизвестно' }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-400">Длительность эпизода</dt>
                  <dd class="text-gray-100">{{ anime.duration }} мин.</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-400">Статус</dt>
                  <dd class="text-gray-100">
                    {{ {
                      released: 'Вышел',
                      ongoing: 'Онгоинг',
                      anons: 'Анонс'
                    }[anime.status] || anime.status }}
                  </dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-400">Дата выхода</dt>
                  <dd class="text-gray-100">{{ formatDate(anime.aired_on) }}</dd>
                </div>
              </dl>
            </div>

            <div class="card p-6">
              <h3 class="heading-3 !mb-4">Рейтинг</h3>
              <dl class="space-y-3">
                <div class="flex justify-between">
                  <dt class="text-gray-400">Оценка</dt>
                  <dd class="text-yellow-400 font-medium">{{ anime.score || 'Нет оценок' }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-400">Рейтинг</dt>
                  <dd class="text-gray-100">{{ anime.rating?.toUpperCase() || 'Неизвестно' }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-400">Популярность</dt>
                  <dd class="text-pink-400 font-medium">#{{ anime.popularity || 'N/A' }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <!-- Галерея -->
        <div v-else-if="activeTab === 'gallery'" class="text-center py-12">
          <i class="pi pi-images text-6xl text-gray-700 mb-4"></i>
          <p class="text-gray-500">Галерея будет добавлена позже</p>
        </div>

        <!-- Связанное -->
        <div v-else-if="activeTab === 'related'" class="text-center py-12">
          <i class="pi pi-sitemap text-6xl text-gray-700 mb-4"></i>
          <p class="text-gray-500">Связанные аниме будут добавлены позже</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { animeApi } from '@/services/animeApi'

const route = useRoute()
const anime = ref(null)
const isLoading = ref(true)
const error = ref(null)
const activeTab = ref('info') // info, gallery, related

// Загрузка данных аниме
const fetchAnimeDetails = async () => {
  isLoading.value = true
  error.value = null
  
  try {
    const data = await animeApi.getAnimeById(route.params.id)
    anime.value = data
  } catch (err) {
    error.value = 'Произошла ошибка при загрузке информации об аниме'
    console.error('Error fetching anime details:', err)
  } finally {
    isLoading.value = false
  }
}

// Форматирование даты
const formatDate = (date) => {
  if (!date) return 'Неизвестно'
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(fetchAnimeDetails)
</script>

<style>
.prose {
  @apply text-gray-300;
}

.prose h1, .prose h2, .prose h3, .prose h4 {
  @apply text-gray-100;
}

.prose a {
  @apply text-indigo-400 no-underline hover:underline;
}

.prose img {
  @apply rounded-xl;
}

.prose strong {
  @apply text-gray-200;
}

.prose blockquote {
  @apply border-l-4 border-gray-700 text-gray-400;
}

.prose hr {
  @apply border-gray-800;
}

.prose table {
  @apply border-gray-800;
}

.prose thead {
  @apply border-b border-gray-800;
}

.prose tr {
  @apply border-b border-gray-800;
}

.prose td,
.prose th {
  @apply text-gray-300 p-2;
}

.prose code {
  @apply text-pink-400 bg-gray-800 rounded px-1;
}

.prose pre {
  @apply bg-gray-800 rounded-xl;
}

.prose pre code {
  @apply bg-transparent text-gray-300;
}
</style> 