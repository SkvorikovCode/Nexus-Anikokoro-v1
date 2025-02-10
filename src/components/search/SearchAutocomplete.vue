<template>
  <div class="relative">
    <!-- Поле поиска -->
    <div class="relative">
      <input
        ref="inputRef"
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        class="input w-full pl-10 pr-10"
        @input="handleInput"
        @keydown.down.prevent="handleArrowDown"
        @keydown.up.prevent="handleArrowUp"
        @keydown.enter="handleEnter"
        @keydown.esc="handleEscape"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <!-- Иконка поиска -->
      <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
      <!-- Кнопка очистки -->
      <button
        v-if="searchQuery"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
        @click="clearSearch"
        @mousedown.prevent
      >
        <i class="pi pi-times"></i>
      </button>
    </div>

    <!-- Выпадающий список -->
    <div
      v-if="showDropdown"
      class="absolute z-50 w-full mt-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden"
    >
      <!-- Загрузка -->
      <div
        v-if="isLoading"
        class="p-4 text-center text-gray-400"
      >
        <div class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
      </div>

      <!-- История поиска -->
      <div v-else-if="showHistory && searchHistory.length > 0">
        <div class="px-4 py-2 text-sm text-gray-400 bg-gray-800/50">История поиска</div>
        <div
          v-for="(item, index) in searchHistory"
          :key="index"
          class="px-4 py-2 cursor-pointer hover:bg-gray-700/50 flex items-center justify-between group"
          :class="{ 'bg-gray-700': activeIndex === index }"
          @mousedown.prevent="selectHistoryItem(item)"
        >
          <div class="flex items-center text-gray-300">
            <i class="pi pi-clock mr-2 text-gray-500"></i>
            {{ item }}
          </div>
          <button
            class="text-gray-500 hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
            @mousedown.prevent="removeHistoryItem(index)"
          >
            <i class="pi pi-times"></i>
          </button>
        </div>
      </div>

      <!-- Результаты поиска -->
      <template v-else-if="suggestions.length > 0">
        <div
          v-for="(item, index) in suggestions"
          :key="item.id"
          class="px-4 py-2 cursor-pointer hover:bg-gray-700/50 flex items-center space-x-3"
          :class="{ 'bg-gray-700': activeIndex === index }"
          @mousedown.prevent="selectItem(item)"
        >
          <img
            :src="item.image?.preview"
            :alt="item.name"
            class="w-10 h-10 rounded object-cover"
          >
          <div>
            <div class="text-gray-200" v-html="highlightMatch(item.russian || item.name)"></div>
            <div class="text-sm text-gray-400" v-html="highlightMatch(item.name)"></div>
          </div>
        </div>
      </template>

      <!-- Нет результатов -->
      <div
        v-else-if="searchQuery && !isLoading"
        class="p-4 text-center text-gray-400"
      >
        Ничего не найдено
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { animeApi } from '@/services/animeApi'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Поиск аниме...'
  },
  maxRecentSearches: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['search', 'select', 'clear'])

const searchQuery = ref('')
const suggestions = ref([])
const loading = ref(false)
const showSuggestions = ref(false)
const selectedIndex = ref(-1)
const recentSearches = useLocalStorage('recent-searches', [])

// Обработка ввода с debounce
let debounceTimeout
const handleInput = () => {
  clearTimeout(debounceTimeout)
  if (!searchQuery.value) {
    suggestions.value = []
    loading.value = false
    return
  }

  loading.value = true
  debounceTimeout = setTimeout(async () => {
    try {
      const results = await animeApi.searchAnime(searchQuery.value, 1, 5)
      suggestions.value = results
    } catch (error) {
      console.error('Ошибка при получении предложений:', error)
      suggestions.value = []
    } finally {
      loading.value = false
    }
  }, 300)
}

// Управление фокусом
const handleFocus = () => {
  showSuggestions.value = true
}

const handleBlur = () => {
  setTimeout(() => {
    showSuggestions.value = false
    selectedIndex.value = -1
  }, 200)
}

// Навигация по клавиатуре
const handleArrowDown = () => {
  if (selectedIndex.value < suggestions.value.length - 1) {
    selectedIndex.value++
  }
}

const handleArrowUp = () => {
  if (selectedIndex.value > -1) {
    selectedIndex.value--
  }
}

const handleEnter = () => {
  if (selectedIndex.value > -1 && suggestions.value[selectedIndex.value]) {
    selectSuggestion(suggestions.value[selectedIndex.value])
  } else if (searchQuery.value) {
    addToRecentSearches(searchQuery.value)
    emit('search', searchQuery.value)
  }
}

const handleEscape = () => {
  showSuggestions.value = false
  selectedIndex.value = -1
}

// Выбор предложения
const selectSuggestion = (suggestion) => {
  searchQuery.value = suggestion.name
  addToRecentSearches(suggestion.name)
  showSuggestions.value = false
  emit('select', suggestion)
}

// Выбор из недавних поисков
const selectRecentSearch = (search) => {
  searchQuery.value = search
  showSuggestions.value = false
  emit('search', search)
}

// Очистка поиска
const clearSearch = () => {
  searchQuery.value = ''
  suggestions.value = []
  showSuggestions.value = false
  selectedIndex.value = -1
  emit('clear')
}

// Добавление в историю поиска
const addToRecentSearches = (search) => {
  if (!search) return
  
  const index = recentSearches.value.indexOf(search)
  if (index > -1) {
    recentSearches.value.splice(index, 1)
  }
  
  recentSearches.value.unshift(search)
  if (recentSearches.value.length > props.maxRecentSearches) {
    recentSearches.value.pop()
  }
}

// Подсветка совпадений
const highlightMatch = (text) => {
  if (!searchQuery.value) return text
  
  const regex = new RegExp(`(${searchQuery.value})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>')
}

// Синхронизация с внешним значением
watch(searchQuery, (value) => {
  emit('search', value)
})
</script>

<style scoped>
.highlight {
  @apply text-indigo-400 font-medium;
}
</style> 