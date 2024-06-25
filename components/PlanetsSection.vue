<template>
  <div v-if="planets.length" class="bg-gray-800 p-4 rounded-lg mb-4">
    <h2 class="text-2xl font-bold mb-4">Planets</h2>
    <div v-for="planet in planets" :key="planet.url" class="mb-4">
      <p class="mb-2">{{ planet.name }}</p>
      <NuxtLink :to="getPlanetLink(planet.url)">
        <v-btn color="secondary">View Planet</v-btn>
      </NuxtLink>
    </div>
  </div>
</template>
  <script setup lang="ts">
  interface Planet {
    name: string;
    url: string;
  }
  
  const props = defineProps<{ planets: Planet[] }>()
  
  const getPlanetLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/planets/${id}`
  }
  </script>
  