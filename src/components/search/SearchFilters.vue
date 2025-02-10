<template>
  <div class="p-4 rounded-lg border border-gray-700">
    <div class="space-y-6">
      <!-- Заголовок -->
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-100">Фильтры</h3>
        <button
          class="text-sm text-indigo-400 hover:text-indigo-300"
          @click="resetFilters"
        >
          Сбросить
        </button>
      </div>

      <!-- Тип -->
      <div>
        <h4 class="text-sm font-medium text-gray-300 mb-3">Тип</h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="type in types"
            :key="type.value"
            class="px-3 py-1.5 rounded-lg text-sm transition-colors"
            :class="[
              filters.type === type.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            ]"
            @click="updateFilter('type', type.value)"
          >
            {{ type.label }}
          </button>
        </div>
      </div>

      <!-- Статус -->
      <div>
        <h4 class="text-sm font-medium text-gray-300 mb-3">Статус</h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="status in statuses"
            :key="status.value"
            class="px-3 py-1.5 rounded-lg text-sm transition-colors"
            :class="[
              filters.status === status.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            ]"
            @click="updateFilter('status', status.value)"
          >
            {{ status.label }}
          </button>
        </div>
      </div>

      <!-- Год выхода -->
      <div>
        <h4 class="text-sm font-medium text-gray-300 mb-3">Год выхода</h4>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-xs text-gray-400 mb-1 block">От</label>
            <input
              v-model="filters.yearFrom"
              type="number"
              class="input w-full"
              placeholder="1990"
            >
          </div>
          <div>
            <label class="text-xs text-gray-400 mb-1 block">До</label>
            <input
              v-model="filters.yearTo"
              type="number"
              class="input w-full"
              placeholder="2024"
            >
          </div>
        </div>
      </div>

      <!-- Минимальный рейтинг -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h4 class="text-sm font-medium text-gray-300">Минимальный рейтинг</h4>
          <span class="text-sm text-gray-400">{{ filters.minScore }}</span>
        </div>
        <input
          v-model="filters.minScore"
          type="range"
          min="1"
          max="10"
          step="0.1"
          class="w-full accent-indigo-500"
        >
      </div>

      <!-- Сортировка -->
      <div>
        <h4 class="text-sm font-medium text-gray-300 mb-3">Сортировка</h4>
        <select
          v-model="filters.sort"
          class="input w-full"
        >
          <option
            v-for="sort in sortOptions"
            :key="sort.value"
            :value="sort.value"
          >
            {{ sort.label }}
          </option>
        </select>
      </div>

      <!-- Кнопка применить -->
      <button
        class="w-full btn-primary"
        @click="applyFilters"
      >
        Применить фильтры
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['update:filters', 'apply'])

const currentYear = new Date().getFullYear()

const animeTypes = [
  { value: 'tv', label: 'TV Сериал' },
  { value: 'movie', label: 'Фильм' },
  { value: 'ova', label: 'OVA' },
  { value: 'ona', label: 'ONA' },
  { value: 'special', label: 'Спешл' }
]

const animeStatuses = [
  { value: 'released', label: 'Вышел' },
  { value: 'ongoing', label: 'Онгоинг' },
  { value: 'anons', label: 'Анонс' }
]

const sortOptions = [
  { value: 'popularity', label: 'По популярности' },
  { value: 'ranked', label: 'По рейтингу' },
  { value: 'name', label: 'По названию' },
  { value: 'aired_on', label: 'По дате выхода' }
]

const defaultFilters = {
  type: '',
  status: '',
  yearFrom: '',
  yearTo: '',
  minScore: 1,
  sort: 'popularity'
}

const filters = ref({ ...defaultFilters })

const updateFilter = (key, value) => {
  filters.value[key] = value
  emit('update:filters', filters.value)
}

const resetFilters = () => {
  filters.value = { ...defaultFilters }
  emit('update:filters', filters.value)
}

const applyFilters = () => {
  emit('apply', filters.value)
}
</script>

<style scoped>
/* Стилизация ползунка для рейтинга */
input[type='range'] {
  @apply appearance-none bg-gray-200 h-2 rounded-lg;
}

input[type='range']::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 bg-indigo-600 rounded-full cursor-pointer;
}

input[type='range']::-moz-range-thumb {
  @apply w-4 h-4 bg-indigo-600 border-0 rounded-full cursor-pointer;
}
</style> 