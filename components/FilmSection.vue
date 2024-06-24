<template>
    <div v-if="films.length">
      <h2>Films</h2>
      <div v-for="film in films" :key="film.url">
        <p>{{ film.title }}</p>
        <NuxtLink :to="getFilmLink(film.url)">
          <v-btn color="primary">View Film</v-btn>
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
  