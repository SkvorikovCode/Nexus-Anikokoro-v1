<script setup>
import { ref } from 'vue'
import AnimeGrid from '../components/AnimeGrid.vue'

const categories = [
  {
    id: 1,
    name: 'Сёнен',
    type: 'shounen',
    icon: 'pi-bolt',
    color: 'bg-blue-500/10 text-blue-400',
    count: '2,156 аниме',
  },
  {
    id: 2,
    name: 'Сёдзё',
    type: 'shoujo',
    icon: 'pi-heart',
    color: 'bg-pink-500/10 text-pink-400',
    count: '1,847 аниме',
  },
  {
    id: 3,
    name: 'Меха',
    type: 'mecha',
    icon: 'pi-cog',
    color: 'bg-gray-500/10 text-gray-400',
    count: '892 аниме',
  },
  {
    id: 4,
    name: 'Спорт',
    type: 'sports',
    icon: 'pi-flag',
    color: 'bg-green-500/10 text-green-400',
    count: '745 аниме',
  },
]
</script>

<template>
  <div>
    <!-- Hero секция -->
    <section class="relative min-h-[80vh] flex items-center mb-24 overflow-hidden">
      <!-- Фоновый градиент -->
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-gray-900 to-gray-900"
      ></div>

      <!-- Декоративные элементы -->
      <div class="absolute inset-0">
        <div
          class="absolute top-20 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute bottom-20 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"
          style="animation-delay: 2s"
        ></div>
      </div>

      <div class="relative container mx-auto px-6">
        <div class="max-w-3xl">
          <h1
            class="text-6xl md:text-7xl font-bold text-gray-100 mb-8 leading-tight tracking-tight"
          >
            Откройте для себя мир
            <span
              class="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"
            >
              аниме
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed">
            Исследуйте коллекцию аниме.
            <span class="text-gray-300">Находите новые истории.</span>
          </p>
          <div class="flex flex-col sm:flex-row gap-6">
            <RouterLink
              to="/categories"
              class="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white text-lg font-medium rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/20"
            >
              <i class="pi pi-compass text-xl"></i>
              <span>Начать просмотр</span>
              <i
                class="pi pi-arrow-right opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all"
              ></i>
            </RouterLink>
            <RouterLink
              to="/search"
              class="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-lg font-medium rounded-2xl transition-all duration-300"
            >
              <i class="pi pi-search text-xl"></i>
              <span>Поиск аниме</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Популярное аниме -->
    <section class="mb-24">
      <div class="container mx-auto px-6">
        <div class="flex justify-between items-center mb-12">
          <h2 class="text-3xl font-bold text-gray-100">Популярное сейчас</h2>
          <RouterLink
            to="/categories"
            class="group inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
          >
            <span>Смотреть все</span>
            <i class="pi pi-arrow-right transition-transform group-hover:translate-x-1"></i>
          </RouterLink>
        </div>
        <AnimeGrid />
      </div>
    </section>

    <!-- Категории -->
    <section class="mb-24">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-gray-100 mb-12">Категории</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <RouterLink
            v-for="category in categories"
            :key="category.id"
            :to="{ path: '/categories', query: { type: category.type } }"
            class="group"
          >
            <div
              class="relative p-6 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition-all duration-300 overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-gray-800/0 to-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative flex items-center gap-4">
                <div
                  :class="[
                    'w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110',
                    category.color,
                  ]"
                >
                  <i :class="['pi', category.icon, 'text-2xl']"></i>
                </div>
                <div>
                  <h3
                    class="text-lg font-medium text-gray-100 group-hover:text-white transition-colors"
                  >
                    {{ category.name }}
                  </h3>
                  <p class="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                    {{ category.count }}
                  </p>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Особенности -->
    <section class="mb-24">
      <div class="container mx-auto px-6">
        <div class="grid md:grid-cols-3 gap-8">
          <div
            class="group p-8 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition-all duration-300"
          >
            <div
              class="w-16 h-16 rounded-xl bg-indigo-500/10 group-hover:bg-indigo-500/20 flex items-center justify-center mb-6 transition-colors"
            >
              <i class="pi pi-search text-2xl text-indigo-400"></i>
            </div>
            <h3 class="text-xl font-medium text-gray-100 mb-4">Умный поиск</h3>
            <p class="text-gray-400 leading-relaxed">
              Находите аниме по названию, жанру, году выпуска и другим параметрам
            </p>
          </div>
          <div
            class="group p-8 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition-all duration-300"
          >
            <div
              class="w-16 h-16 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 flex items-center justify-center mb-6 transition-colors"
            >
              <i class="pi pi-heart text-2xl text-purple-400"></i>
            </div>
            <h3 class="text-xl font-medium text-gray-100 mb-4">Избранное</h3>
            <p class="text-gray-400 leading-relaxed">
              Сохраняйте любимые аниме и отслеживайте их в личном кабинете
            </p>
          </div>
          <div
            class="group p-8 rounded-2xl bg-gray-800/50 hover:bg-gray-800 transition-all duration-300"
          >
            <div
              class="w-16 h-16 rounded-xl bg-pink-500/10 group-hover:bg-pink-500/20 flex items-center justify-center mb-6 transition-colors"
            >
              <i class="pi pi-bell text-2xl text-pink-400"></i>
            </div>
            <h3 class="text-xl font-medium text-gray-100 mb-4">Уведомления</h3>
            <p class="text-gray-400 leading-relaxed">
              Получайте уведомления о новых сериях и релизах любимых аниме
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
