<template>
    <div v-if="characters.length">
      <h2>Characters</h2>
      <div v-for="character in characters" :key="character.url">
        <p>{{ character.name }}</p>
        <NuxtLink :to="getCharacterLink(character.url)">
          <v-btn color="primary">View Character</v-btn>
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Character {
    name: string;
    url: string;
  }
  
  const props = defineProps<{ characters: Character[] }>()
  
  const getCharacterLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/people/${id}`
  }
  </script>
  