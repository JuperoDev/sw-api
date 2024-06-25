<template>
  <div v-if="species.length" class="bg-gray-800 p-4 rounded-lg mb-4">
    <h2 class="text-2xl font-bold mb-4">Species</h2>
    <div v-for="specie in species" :key="specie.url" class="mb-4">
      <p class="mb-2">{{ specie.name }}</p>
      <NuxtLink :to="getSpeciesLink(specie.url)">
        <v-btn color="secondary">View Species</v-btn>
      </NuxtLink>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  interface Specie {
    name: string;
    url: string;
  }
  
  const props = defineProps<{ species: Specie[] }>()
  
  const getSpeciesLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/species/${id}`
  }
  </script>
  