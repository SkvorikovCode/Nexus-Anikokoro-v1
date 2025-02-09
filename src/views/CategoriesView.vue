<script setup>
const categories = [
  { id: 1, name: 'Сёнен', icon: 'pi-bolt', color: 'bg-blue-500' },
  { id: 2, name: 'Сёдзё', icon: 'pi-heart', color: 'bg-pink-500' },
  { id: 3, name: 'Меха', icon: 'pi-cog', color: 'bg-gray-500' },
  { id: 4, name: 'Спорт', icon: 'pi-flag', color: 'bg-green-500' },
  { id: 5, name: 'Фэнтези', icon: 'pi-star', color: 'bg-purple-500' },
  { id: 6, name: 'Романтика', icon: 'pi-heart-fill', color: 'bg-red-500' },
  { id: 7, name: 'Комедия', icon: 'pi-thumbs-up', color: 'bg-yellow-500' },
  { id: 8, name: 'Драма', icon: 'pi-eye', color: 'bg-indigo-500' }
]
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Категории аниме</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="category in categories"
        :key="category.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <a
          href="#"
          class="block p-6"
        >
          <div class="flex items-center space-x-4">
            <div
              :class="[category.color, 'w-12 h-12 rounded-full flex items-center justify-center']"
            >
              <i
                :class="['pi', category.icon, 'text-white text-xl']"
              ></i>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                {{ category.name }}
              </h3>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template> 