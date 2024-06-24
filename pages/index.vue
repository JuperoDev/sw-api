<template>
  <div class="p-4">
    <v-autocomplete
      v-model="search"
      :items="characterNames"
      :loading="loading"
      hide-no-data
      hide-selected
      label="Search for a character"
    ></v-autocomplete>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCharactersStore } from '~/stores/characters'

const search = ref('')
const router = useRouter()
const charactersStore = useCharactersStore()

onMounted(() => {
  if (charactersStore.characters.length === 0) {
    charactersStore.fetchCharacters()
  }
})

const loading = computed(() => charactersStore.loading)
const characterNames = computed(() =>
  charactersStore.characters.map(character => character.name)
)

watch(search, (newValue) => {
  const selectedCharacter = charactersStore.characters.find(character => character.name === newValue)
  if (selectedCharacter) {
    const id = selectedCharacter.url.split('/').filter(Boolean).pop()
    const targetUrl = `/people/${id}`
    router.push(targetUrl)
  }
})
</script>
