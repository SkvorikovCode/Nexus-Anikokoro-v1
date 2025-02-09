<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-md">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <RouterLink to="/" class="text-xl font-bold text-indigo-600">
              NexusAnikokoro
            </RouterLink>
            <div class="hidden md:flex space-x-4">
              <RouterLink to="/" class="text-gray-600 hover:text-indigo-600">
                Главная
              </RouterLink>
              <RouterLink to="/categories" class="text-gray-600 hover:text-indigo-600">
                Категории
              </RouterLink>
              <RouterLink to="/search" class="text-gray-600 hover:text-indigo-600">
                Поиск
              </RouterLink>
              <RouterLink to="/favorites" class="text-gray-600 hover:text-indigo-600">
                Избранное
              </RouterLink>
            </div>
          </div>
          <!-- Mobile menu button -->
          <button class="md:hidden">
            <i class="pi pi-bars text-gray-600"></i>
          </button>
        </div>
      </nav>
    </header>

    <!-- Main content -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="text-center md:text-left mb-4 md:mb-0">
            <p>&copy; 2024 NexusAnikokoro. Все права защищены.</p>
          </div>
          <div class="flex space-x-4">
            <a href="https://github.com/SkvorikovCode" target="_blank" class="hover:text-indigo-400">
              <i class="pi pi-github"></i>
            </a>
            <a href="#" class="hover:text-indigo-400">
              <i class="pi pi-telegram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-indigo-600 font-medium;
}
</style> 