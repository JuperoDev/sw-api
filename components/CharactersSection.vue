<template>
  <div v-if="characters.length" class="bg-gray-800 p-4 rounded-lg mb-4">
    <h2 class="text-2xl font-bold mb-4">Characters</h2>
    <div v-for="character in characters" :key="character.url" class="mb-4">
      <p class="mb-2">{{ character.name }}</p>
      <NuxtLink :to="getCharacterLink(character.url)">
        <v-btn color="secondary">View Character</v-btn>
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
  