<template>
  <router-link
    :to="{ name: 'anime-details', params: { id: anime.id }}"
    class="group bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
  >
    <div class="relative aspect-[3/4]">
      <img
        :src="imageUrl"
        :alt="anime.name"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/80 to-transparent p-4">
        <h3 class="text-white font-semibold text-lg truncate">{{ anime.name }}</h3>
        <p class="text-light/80 text-sm">{{ anime.russian }}</p>
      </div>
    </div>
    <div class="p-4 space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-600">{{ anime.kind }}</span>
        <span class="text-sm font-medium text-primary">★ {{ anime.score }}</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <span>{{ anime.episodes }} эп.</span>
        <span>{{ anime.status }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  anime: {
    type: Object,
    required: true
  }
});

const imageUrl = computed(() => {
  return props.anime.image?.original || 
         props.anime.image?.preview || 
         'https://via.placeholder.com/225x318?text=No+Image';
});
</script> 