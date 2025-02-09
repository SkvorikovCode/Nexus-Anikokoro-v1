<template>
  <div class="min-h-[60vh] flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-indigo-600 mb-4">404</h1>
      <h2 class="text-2xl font-medium text-gray-900 mb-4">
        Страница не найдена
      </h2>
      <p class="text-gray-600 mb-8">
        Извините, но страница, которую вы ищете, не существует или была перемещена
      </p>
      <router-link
        to="/"
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <i class="pi pi-home mr-2"></i>
        Вернуться на главную
      </router-link>
    </div>
  </div>
</template> 