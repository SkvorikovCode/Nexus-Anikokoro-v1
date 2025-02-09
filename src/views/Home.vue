<template>
  <div class="min-h-screen bg-light">
    <!-- Хедер -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <router-link to="/" class="text-2xl font-bold text-primary">
            NexusAnikokoro
          </router-link>
          <nav class="space-x-4">
            <router-link
              to="/"
              class="text-gray-600 hover:text-primary transition-colors"
              active-class="text-primary"
            >
              Главная
            </router-link>
          </nav>
        </div>
      </div>
    </header>

    <!-- Основной контент -->
    <main>
      <AnimeGrid />
    </main>

    <!-- Футер -->
    <footer class="bg-white border-t mt-12">
      <div class="container mx-auto px-4 py-6">
        <div class="text-center text-gray-600">
          <p>© 2024 NexusAnikokoro. Все права защищены.</p>
          <p class="text-sm mt-2">
            Данные предоставлены
            <a
              href="https://shikimori.one/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary hover:underline"
            >
              Shikimori
            </a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import AnimeGrid from '../components/AnimeGrid.vue';
</script> 