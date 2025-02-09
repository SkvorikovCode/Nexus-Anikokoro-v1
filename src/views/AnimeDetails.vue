<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Загрузка -->
    <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>

    <!-- Контент -->
    <div v-else-if="currentAnime" class="grid md:grid-cols-[300px_1fr] gap-8">
      <!-- Левая колонка -->
      <div class="space-y-4">
        <img
          :src="imageUrl"
          :alt="currentAnime.name"
          class="w-full rounded-lg shadow-lg"
        />
        <div class="bg-white rounded-lg shadow p-4 space-y-2">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Рейтинг</span>
            <span class="text-primary font-semibold">★ {{ currentAnime.score }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Тип</span>
            <span>{{ currentAnime.kind }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Эпизоды</span>
            <span>{{ currentAnime.episodes }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Статус</span>
            <span>{{ currentAnime.status }}</span>
          </div>
        </div>
      </div>

      <!-- Правая колонка -->
      <div class="space-y-6">
        <div>
          <h1 class="text-3xl font-bold text-dark">{{ currentAnime.name }}</h1>
          <h2 class="text-xl text-gray-600">{{ currentAnime.russian }}</h2>
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold">Описание</h3>
          <p class="text-gray-700 leading-relaxed">{{ currentAnime.description }}</p>
        </div>

        <div v-if="currentAnime.genres?.length" class="space-y-4">
          <h3 class="text-xl font-semibold">Жанры</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="genre in currentAnime.genres"
              :key="genre.id"
              class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
            >
              {{ genre.russian }}
            </span>
          </div>
        </div>

        <div v-if="currentAnime.studios?.length" class="space-y-4">
          <h3 class="text-xl font-semibold">Студии</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="studio in currentAnime.studios"
              :key="studio.id"
              class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {{ studio.name }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Кнопка назад -->
    <div class="mt-8">
      <button
        @click="$router.back()"
        class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        ← Назад к списку
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAnimeStore } from '../stores/animeStore';

const route = useRoute();
const store = useAnimeStore();

const {
  currentAnime,
  loading,
  error,
  fetchAnimeById
} = store;

// Загрузка данных при монтировании
onMounted(() => {
  fetchAnimeById(route.params.id);
});

// Вычисляемое свойство для URL изображения
const imageUrl = computed(() => {
  return currentAnime.value?.image?.original || 
         currentAnime.value?.image?.preview || 
         'https://via.placeholder.com/300x424?text=No+Image';
});
</script> 