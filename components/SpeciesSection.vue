<template>
    <div v-if="species.length">
      <h2>Species</h2>
      <div v-for="specie in species" :key="specie.url">
        <p>{{ specie.name }}</p>
        <NuxtLink :to="getSpeciesLink(specie.url)">
          <v-btn color="primary">View Species</v-btn>
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
  