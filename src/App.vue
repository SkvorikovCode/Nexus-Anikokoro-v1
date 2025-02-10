<script setup>
import { RouterView } from 'vue-router'
import MainLayout from './components/layouts/MainLayout.vue'
</script>

<template>
  <MainLayout>
    <router-view v-slot="{ Component }">
      <transition
        name="page"
        mode="out-in"
        @before-leave="beforeLeave"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </MainLayout>
</template>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@import 'primeicons/primeicons.css';

:root {
  --color-primary: 129, 140, 248;
  --color-secondary: 139, 92, 246;
  --color-accent: 236, 72, 153;
  --color-background: 17, 24, 39;
  --color-surface: 31, 41, 55;
  --color-text: 243, 244, 246;
  --color-text-secondary: 156, 163, 175;
  --color-border: 55, 65, 81;
}

/* Базовые стили */
body {
  @apply bg-gray-900 text-gray-100;
  background-color: rgb(var(--color-background));
  color: rgb(var(--color-text));
  overflow-x: hidden;
}

/* Анимации переходов */
.page-enter-active,
.page-leave-active {
  transition: 0.3s ease all;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.page-move {
  transition: transform 0.3s ease-out;
}

/* Стили для плавного скрытия скроллбара */
body.page-transitioning {
  overflow: hidden;
}

/* Кастомные компоненты */
@layer components {
  .card {
    @apply bg-gray-800 rounded-xl shadow-lg border border-gray-700;
  }

  .btn-primary {
    @apply px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors;
  }

  .btn-secondary {
    @apply px-6 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors;
  }

  .input {
    @apply bg-gray-800 border border-gray-700 text-gray-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent;
  }

  .badge {
    @apply px-3 py-1 rounded-full text-sm font-medium;
  }

  .badge-primary {
    @apply bg-indigo-900 text-indigo-100;
  }

  .badge-secondary {
    @apply bg-purple-900 text-purple-100;
  }

  .heading-1 {
    @apply text-3xl font-bold text-gray-100 mb-4;
  }

  .heading-2 {
    @apply text-2xl font-semibold text-gray-200 mb-3;
  }

  .heading-3 {
    @apply text-xl font-medium text-gray-300 mb-2;
  }
}

/* Стили для скроллбара */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500;
}
</style>

<script>
// Методы для управления анимацией
function beforeLeave(element) {
  document.body.classList.add('page-transitioning')
}

function enter(element) {
  element.style.transform = 'translateX(10px)'
  element.style.opacity = '0'
  
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.style.transform = 'translateX(0)'
      element.style.opacity = '1'
    })
  })
}

function afterEnter() {
  document.body.classList.remove('page-transitioning')
}
</script>
