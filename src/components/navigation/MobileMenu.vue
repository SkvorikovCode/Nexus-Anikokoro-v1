<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const navigation = [
  { name: 'Главная', path: '/', icon: 'pi-home' },
  { name: 'Категории', path: '/categories', icon: 'pi-list' },
  { name: 'Поиск', path: '/search', icon: 'pi-search' },
  { name: 'Избранное', path: '/favorites', icon: 'pi-heart' }
]

const closeMenu = () => {
  emit('close')
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 lg:hidden"
    :class="{ 'pointer-events-none': !isOpen }"
  >
    <!-- Затемнение фона -->
    <div
      class="fixed inset-0 bg-black/50 transition-opacity duration-300"
      :class="{ 'opacity-0': !isOpen }"
      @click="closeMenu"
    ></div>

    <!-- Меню -->
    <div
      class="fixed inset-y-0 right-0 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
      :class="{ 'translate-x-full': !isOpen }"
    >
      <!-- Хедер меню -->
      <div class="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-lg font-medium text-gray-900">Меню</h2>
        <button
          class="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          @click="closeMenu"
        >
          <i class="pi pi-times text-xl"></i>
        </button>
      </div>

      <!-- Навигация -->
      <nav class="px-2 py-4">
        <RouterLink
          v-for="item in navigation"
          :key="item.path"
          :to="item.path"
          class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          :class="{ 'bg-indigo-50 text-indigo-600': $route.path === item.path }"
          @click="closeMenu"
        >
          <i :class="['pi', item.icon, 'mr-3 text-lg']"></i>
          {{ item.name }}
        </RouterLink>
      </nav>

      <!-- Футер меню -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div class="flex items-center justify-center space-x-4">
          <a
            href="https://github.com/SkvorikovCode"
            target="_blank"
            class="p-2 text-gray-500 hover:text-gray-700"
          >
            <i class="pi pi-github text-xl"></i>
          </a>
          <a
            href="https://t.me/JustFW"
            class="p-2 text-gray-500 hover:text-gray-700"
          >
            <i class="pi pi-telegram text-xl"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template> 