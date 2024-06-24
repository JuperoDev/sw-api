<!-- pages/characters.vue -->
<template>
  <div class="p-4">
    <v-autocomplete
      v-model="search"
      :items="characterNames"
      :loading="loading"
      hide-no-data
      hide-selected
      label="Search for a character"
      @change="onCharacterSelect"
    ></v-autocomplete>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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

const onCharacterSelect = (url: string) => {
  const selectedCharacter = charactersStore.characters.find(character => character.name === url)
  if (selectedCharacter) {
    const id = selectedCharacter.url.split('/').filter(Boolean).pop()
    router.push(`/people/${id}`)
  }
}
</script>

