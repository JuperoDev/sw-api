<template>
  <div v-if="films.length" class="bg-gray-800 p-4 rounded-lg mb-4">
    <h2 class="text-2xl font-bold mb-4">Films</h2>
    <div v-for="film in films" :key="film.url" class="mb-4">
      <p class="mb-2">{{ film.title }}</p>
      <NuxtLink :to="getFilmLink(film.url)">
        <v-btn color="secondary">View Film</v-btn>
      </NuxtLink>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  
  interface Film {
    title: string;
    url: string;
  }
  
  const props = defineProps<{ films: Film[] }>()
  
  const getFilmLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/films/${id}`
  }
  </script>
  