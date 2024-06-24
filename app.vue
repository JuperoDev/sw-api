<template>
  <NuxtPage />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCharactersStore } from '~/stores/characters'

const charactersStore = useCharactersStore()

onMounted(() => {
  if (charactersStore.characters.length === 0) {
    charactersStore.fetchCharacters()
  }
})
</script>