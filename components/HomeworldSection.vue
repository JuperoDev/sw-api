<template>
  <div v-if="homeworld" class="bg-gray-800 p-4 rounded-lg mb-4">
    <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
    <p class="mb-4">{{ homeworld.name }}</p>
    <NuxtLink :to="getHomeworldLink(homeworld.url)">
      <v-btn color="secondary">View Homeworld</v-btn>
    </NuxtLink>
  </div>
</template>
  
  <script setup lang="ts">
  interface Homeworld {
    name: string;
    url: string;
  }
  
  const props = defineProps<{ homeworld: Homeworld | null; title: string }>()
  
  const getHomeworldLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/planets/${id}`
  }
  </script>
  