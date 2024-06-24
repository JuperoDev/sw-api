<template>
  <div class="species-details">
    <v-container>
      <v-row justify="center">
       
          <div v-if="loading" class="loading-container">
            <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
          </div>
          <div v-else-if="error">An error occurred: {{ error }}</div>
          <div v-else-if="species">
            <h1>{{ species.name }}</h1>
            <p><strong>Classification:</strong> {{ species.classification }}</p>
            <p><strong>Designation:</strong> {{ species.designation }}</p>
            <p><strong>Average Height:</strong> {{ species.average_height }} cm</p>
            <p><strong>Skin Colors:</strong> {{ species.skin_colors }}</p>
            <p><strong>Hair Colors:</strong> {{ species.hair_colors }}</p>
            <p><strong>Eye Colors:</strong> {{ species.eye_colors }}</p>
            <p><strong>Average Lifespan:</strong> {{ species.average_lifespan }} years</p>
            <p><strong>Language:</strong> {{ species.language }}</p>

            <HomeworldSection :homeworld="homeworld" title="Homeworld" />
            <CharactersSection :characters="people" />
            <FilmSection :films="films" />
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

// Define interfaces
interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  url: string;
}

interface Person {
  name: string;
  url: string;
}

interface Film {
  title: string;
  url: string;
}

interface Homeworld {
  name: string;
  url: string;
}

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
  await Promise.all([
    fetchHomeworld(species.homeworld),
    fetchPeople(species.people),
    fetchFilms(species.films)
  ])
}

const fetchHomeworld = async (homeworldUrl: string) => {
  if (homeworldUrl) {
    try {
      const response = await axios.get<Homeworld>(homeworldUrl)
      homeworld.value = response.data
    } catch (err) {
      console.error('Failed to fetch homeworld', err)
    }
  }
}

const fetchPeople = async (peopleUrls: string[]) => {
  const peoplePromises = peopleUrls.map(url => axios.get<Person>(url))
  try {
    const peopleResponses = await Promise.all(peoplePromises)
    people.value = peopleResponses.map(response => response.data)
  } catch (err) {
    console.error('Failed to fetch people', err)
  }
}

const fetchFilms = async (filmUrls: string[]) => {
  const filmPromises = filmUrls.map(url => axios.get<Film>(url))
  try {
    const filmResponses = await Promise.all(filmPromises)
    films.value = filmResponses.map(response => response.data)
  } catch (err) {
    console.error('Failed to fetch films', err)
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
