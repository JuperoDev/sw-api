<template>
  <div v-if="starships.length" class="bg-gray-800 p-4 rounded-lg mb-4">
    <h2 class="text-2xl font-bold mb-4">Starships</h2>
    <div v-for="starship in starships" :key="starship.url" class="mb-4">
      <p class="mb-2">{{ starship.name }}</p>
      <NuxtLink :to="getStarshipLink(starship.url)">
        <v-btn color="secondary">View Starship</v-btn>
      </NuxtLink>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  interface Starship {
    name: string;
    url: string;
  }
  
  defineProps<{
    starships: Starship[]
  }>()
  
  const getStarshipLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/starships/${id}`
  }
  </script>
  