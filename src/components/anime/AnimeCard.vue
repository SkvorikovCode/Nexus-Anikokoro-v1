<template>
  <RouterLink :to="{ name: 'anime-details', params: { id: anime.id } }" class="group block">
    <div
      class="card overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:ring-1 hover:ring-indigo-500/50"
    >
      <!-- Изображение -->
      <div class="relative aspect-[3/4] overflow-hidden">
        <img
          :src="anime.image?.preview || anime.image?.original"
          :alt="anime.russian || anime.name"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>

        <!-- Рейтинг -->
        <div
          v-if="anime.score"
          class="absolute top-3 right-3 px-3 py-1.5 bg-yellow-500/90 text-white text-sm font-medium rounded-md backdrop-blur-sm"
        >
          <i class="pi pi-star-fill mr-1"></i>
          {{ anime.score }}
        </div>

        <!-- Эпизоды -->
        <div
          class="absolute bottom-3 left-3 px-3 py-1.5 bg-gray-900/90 text-white text-sm font-medium rounded-md backdrop-blur-sm"
        >
          <i class="pi pi-video mr-1"></i>
          {{ episodesText }}
        </div>
      </div>

      <!-- Информация -->
      <div class="p-4">
        <div class="flex justify-between items-start gap-4 mb-2">
          <div>
            <h3
              class="text-lg font-medium text-gray-100 mb-1 line-clamp-1 group-hover:text-indigo-400 transition-colors"
            >
              {{ anime.russian || anime.name }}
            </h3>
            <p class="text-sm text-gray-400 line-clamp-1">
              {{ anime.name }}
            </p>
          </div>
          <button
            class="text-gray-500 hover:text-red-500 transition-colors p-1"
            @click.prevent="toggleFavorite"
            :title="isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'"
          >
            <i :class="['pi', isFavorite ? 'pi-heart-fill text-red-500' : 'pi-heart']"></i>
          </button>
        </div>

        <!-- Метки -->
        <div class="flex flex-wrap gap-2 mt-3">
          <span v-if="anime.kind" class="badge badge-primary text-xs">
            {{ anime.kind.toUpperCase() }}
          </span>
          <span v-if="anime.status" class="badge badge-secondary text-xs">
            {{ statusText }}
          </span>
          <span v-if="anime.aired_on" class="badge text-xs bg-gray-700 text-gray-300">
            {{ new Date(anime.aired_on).getFullYear() }}
          </span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  anime: {
    type: Object,
    required: true,
  },
})

const isFavorite = ref(false) // TODO: Реализовать состояние избранного

const episodesText = computed(() => {
  const { episodes, episodes_aired } = props.anime
  if (!episodes) return 'Неизвестно'
  return episodes_aired ? `${episodes_aired}/${episodes}` : episodes
})

const statusText = computed(() => {
  const statusMap = {
    released: 'Вышел',
    ongoing: 'Онгоинг',
    anons: 'Анонс',
  }
  return statusMap[props.anime.status] || props.anime.status
})

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  // TODO: Реализовать логику добавления/удаления из избранного
}
</script>
