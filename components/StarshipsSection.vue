<template>
    <div>
      <h2>Starships</h2>
      <div v-for="starship in starships" :key="starship.url">
        <p>{{ starship.name }}</p>
        <NuxtLink :to="getStarshipLink(starship.url)">
          <v-btn color="primary">View Starship</v-btn>
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
  