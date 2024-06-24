<template>
    <div v-if="planets.length">
      <h2>Planets</h2>
      <div v-for="planet in planets" :key="planet.url">
        <p>{{ planet.name }}</p>
        <NuxtLink :to="getPlanetLink(planet.url)">
          <v-btn color="primary">View Planet</v-btn>
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
  