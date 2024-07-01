<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
    <v-container>
      <v-row justify="center">
        <div v-if="loading" class="flex justify-center mt-10 items-center py-4">
          <v-progress-circular indeterminate color="teal" size="64"></v-progress-circular>
        </div>
        <div v-else-if="error" class="text-red-500 text-center lg:text-left py-4">
          An error occurred: {{ error }}
        </div>
        <div v-else-if="species" class="my-4 p-4 bg-gray-800 rounded-lg w-full max-w-3xl">
          <h1 class="text-3xl lg:text-4xl font-bold mb-4">{{ species.name }}</h1>
          <p><strong>Classification:</strong> {{ species.classification }}</p>
          <p><strong>Designation:</strong> {{ species.designation }}</p>
          <p><strong>Average Height:</strong> {{ species.average_height }} cm</p>
          <p><strong>Skin Colors:</strong> {{ species.skin_colors }}</p>
          <p><strong>Hair Colors:</strong> {{ species.hair_colors }}</p>
          <p><strong>Eye Colors:</strong> {{ species.eye_colors }}</p>
          <p><strong>Average Lifespan:</strong> {{ species.average_lifespan }} years</p>
          <p><strong>Language:</strong> {{ species.language }}</p>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div class="flex flex-col space-y-4">
              <HomeworldSection :homeworld="homeworld" title="Homeworld" />
            </div>
            <div class="flex flex-col space-y-4">
              <CharactersSection :characters="people" />
            </div>
            <div class="flex flex-col space-y-4">
              <FilmSection :films="films" />
            </div>
          </div>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import HomeworldSection from '~/components/HomeworldSection.vue'
import CharactersSection from '~/components/CharactersSection.vue'
import FilmSection from '~/components/FilmSection.vue'
import { Species } from '~/sw-types/species'
import { Person } from '~/sw-types/person'
import { Film } from '~/sw-types/film'
import { Homeworld } from '~/sw-types/homeworld'

const route = useRoute()
const species = ref<Species | null>(null)
const people = ref<Person[]>([])
const films = ref<Film[]>([])
const homeworld = ref<Homeworld | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchSpecies = async (id: string) => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get<Species>(`https://swapi.dev/api/species/${id}/`)
    species.value = response.data
    await fetchAdditionalDetails(response.data)
  } catch (err) {
    error.value = 'Failed to fetch species details'
  } finally {
    loading.value = false
  }
}

const fetchAdditionalDetails = async (species: Species) => {
  const homeworldPromise = species.homeworld ? fetchHomeworld(species.homeworld) : Promise.resolve();
  const peoplePromise = species.people ? fetchPeople(species.people) : Promise.resolve();
  const filmsPromise = species.films ? fetchFilms(species.films) : Promise.resolve();
  
  await Promise.all([homeworldPromise, peoplePromise, filmsPromise]);
}

const fetchHomeworld = async (homeworldUrl?: string) => {
  if (homeworldUrl) {
    try {
      const response = await axios.get<Homeworld>(homeworldUrl)
      homeworld.value = response.data
    } catch (err) {
      console.error('Failed to fetch homeworld', err)
    }
  }
}

const fetchPeople = async (peopleUrls?: string[]) => {
  if (peopleUrls) {
    const peoplePromises = peopleUrls.map(url => axios.get<Person>(url))
    try {
      const peopleResponses = await Promise.all(peoplePromises)
      people.value = peopleResponses.map(response => response.data)
    } catch (err) {
      console.error('Failed to fetch people', err)
    }
  }
}

const fetchFilms = async (filmUrls?: string[]) => {
  if (filmUrls) {
    const filmPromises = filmUrls.map(url => axios.get<Film>(url))
    try {
      const filmResponses = await Promise.all(filmPromises)
      films.value = filmResponses.map(response => response.data)
    } catch (err) {
      console.error('Failed to fetch films', err)
    }
  }
}

onMounted(() => {
  const id = route.params.id as string
  fetchSpecies(id)
})
</script>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
