<template>
    <div v-if="homeworld">
      <h2>{{ title }}</h2>
      <p>{{ homeworld.name }}</p>
      <NuxtLink :to="getHomeworldLink(homeworld.url)">
        <v-btn color="primary">View Homeworld</v-btn>
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
  