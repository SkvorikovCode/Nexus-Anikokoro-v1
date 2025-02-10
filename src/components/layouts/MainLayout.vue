<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import MobileMenu from '@/components/navigation/MobileMenu.vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-900">
    <!-- Header -->
    <header class="sticky top-0 z-40 backdrop-blur-lg bg-gray-900/80 border-b border-gray-800">
      <nav class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-12">
            <RouterLink
              to="/"
              class="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent hover:from-indigo-400 hover:to-purple-400 transition-all"
              @click="closeMobileMenu"
            >
              NexusAnikokoro
            </RouterLink>
            <div class="hidden md:flex space-x-8">
              <RouterLink
                v-for="link in [
                  { to: '/', label: 'Главная', icon: 'pi-home' },
                  { to: '/categories', label: 'Категории', icon: 'pi-list' },
                  { to: '/search', label: 'Поиск', icon: 'pi-search' },
                  { to: '/favorites', label: 'Избранное', icon: 'pi-heart' },
                ]"
                :key="link.to"
                :to="link.to"
                class="text-gray-400 hover:text-gray-100 transition-colors relative group py-2 flex items-center space-x-2"
                active-class="text-gray-100"
              >
                <i :class="['pi', link.icon]"></i>
                <span>{{ link.label }}</span>
                <span
                  class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                ></span>
              </RouterLink>
            </div>
          </div>

          <!-- Правая часть навигации -->
          <div class="hidden md:flex items-center space-x-6">
            <a
              href="https://github.com/SkvorikovCode"
              target="_blank"
              class="text-gray-400 hover:text-gray-100 transition-colors"
              title="GitHub"
            >
              <i class="pi pi-github text-xl"></i>
            </a>
            <a
              href="https://t.me/JustFW"
              class="text-gray-400 hover:text-gray-100 transition-colors"
              title="Telegram"
            >
              <i class="pi pi-telegram text-xl"></i>
            </a>
          </div>

          <!-- Mobile menu button -->
          <button
            class="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-gray-800 transition-colors"
            @click="toggleMobileMenu"
          >
            <i :class="['pi', isMobileMenuOpen ? 'pi-times' : 'pi-bars', 'text-xl']"></i>
          </button>
        </div>
      </nav>
    </header>

    <!-- Mobile menu -->
    <MobileMenu :is-open="isMobileMenuOpen" @close="closeMobileMenu" />

    <!-- Main content -->
    <main class="flex-grow container mx-auto px-6 py-8">
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800/50 border-t border-gray-800 mt-auto">
      <div class="container mx-auto px-6 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="text-center md:text-left">
            <h3 class="text-lg font-semibold text-gray-100 mb-2">NexusAnikokoro</h3>
            <p class="text-gray-400">&copy; 2024 Все права защищены</p>
          </div>
          <div class="flex items-center space-x-6">
            <a
              href="https://github.com/SkvorikovCode"
              target="_blank"
              class="text-gray-400 hover:text-gray-100 transition-colors"
              title="GitHub"
            >
              <i class="pi pi-github text-xl"></i>
            </a>
            <a
              href="https://t.me/JustFW"
              class="text-gray-400 hover:text-gray-100 transition-colors"
              title="Telegram"
            >
              <i class="pi pi-telegram text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-gray-100;
}

.router-link-active::after {
  content: '';
  @apply absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500;
}
</style>
