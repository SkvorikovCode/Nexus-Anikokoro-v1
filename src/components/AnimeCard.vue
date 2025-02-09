<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    @click="navigateToDetails"
  >
    <!-- Изображение -->
    <div class="relative aspect-[3/4] overflow-hidden bg-gray-200">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="anime.name"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
      >
      <div
        v-else
        class="w-full h-full flex items-center justify-center text-gray-400"
      >
        <i class="pi pi-image text-4xl"></i>
      </div>
      
      <!-- Рейтинг -->
      <div
        v-if="score !== 'N/A'"
        class="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm font-medium"
      >
        <i class="pi pi-star-fill text-yellow-400 mr-1"></i>
        {{ score }}
      </div>

      <!-- Количество эпизодов -->
      <div class="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-sm">
        <i class="pi pi-video mr-1"></i>
        {{ episodesInfo }}
      </div>
    </div>

    <!-- Информация -->
    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-medium text-gray-900 line-clamp-2">
          {{ anime.russian || anime.name }}
        </h3>
        <button
          class="text-gray-400 hover:text-red-500 transition-colors"
          @click="addToFavorites"
          title="Добавить в избранное"
        >
          <i class="pi pi-heart"></i>
        </button>
      </div>
      
      <div class="flex items-center text-sm text-gray-600">
        <span>{{ anime.kind || 'TV Сериал' }}</span>
        <span class="mx-2">•</span>
        <span>{{ anime.aired_on?.slice(0, 4) || 'Неизвестно' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  anime: {
    type: Object,
    required: true
  }
})

const router = useRouter()

// Вычисляемые свойства
const imageUrl = computed(() => {
  return props.anime.image?.original || props.anime.image?.preview
})

const score = computed(() => {
  return props.anime.score ? props.anime.score.toFixed(1) : 'N/A'
})

const episodesInfo = computed(() => {
  const { episodes, episodes_aired } = props.anime
  if (!episodes) return 'Неизвестно'
  return episodes_aired ? `${episodes_aired}/${episodes}` : episodes
})

// Методы
const navigateToDetails = () => {
  router.push(`/anime/${props.anime.id}`)
}

const addToFavorites = (event) => {
  event.stopPropagation()
  // TODO: Реализовать добавление в избранное
  console.log('Add to favorites:', props.anime.id)
}
</script> 