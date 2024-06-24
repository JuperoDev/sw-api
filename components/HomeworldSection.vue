<template>
    <div>
      <h2>Homeworld</h2>
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
  
  defineProps<{
    homeworld: Homeworld
  }>()
  
  const getHomeworldLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/planets/${id}`
  }
  </script>
  