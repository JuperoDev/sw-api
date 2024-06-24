<template>
  <div class="planet-details">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <div v-if="loading" class="loading-container">
            <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
          </div>
          <div v-else-if="error">An error occurred: {{ error }}</div>
          <div v-else-if="planet">
            <h1>{{ planet.name }}</h1>
            <p><strong>Rotation Period:</strong> {{ planet.rotation_period }}</p>
            <p><strong>Orbital Period:</strong> {{ planet.orbital_period }}</p>
            <p><strong>Diameter:</strong> {{ planet.diameter }} km</p>
            <p><strong>Climate:</strong> {{ planet.climate }}</p>
            <p><strong>Gravity:</strong> {{ planet.gravity }}</p>
            <p><strong>Terrain:</strong> {{ planet.terrain }}</p>
            <p><strong>Surface Water:</strong> {{ planet.surface_water }}%</p>
            <p><strong>Population:</strong> {{ planet.population }}</p>

            <ResidentsSection :residents="residents" />
            <FilmSection :films="films" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'


// Define interfaces
interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  url: string;
}

interface Resident {
  name: string;
  url: string;
}

interface Film {
  title: string;
  url: string;
}

const route = useRoute()
const planet = ref<Planet | null>(null)
const residents = ref<Resident[]>([])
const films = ref<Film[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchPlanet = async (id: string) => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get<Planet>(`https://swapi.dev/api/planets/${id}/`)
    planet.value = response.data
    await fetchAdditionalDetails(response.data)
  } catch (err) {
    error.value = 'Failed to fetch planet details'
  } finally {
    loading.value = false
  }
}

const fetchAdditionalDetails = async (planet: Planet) => {
  await Promise.all([
    fetchResidents(planet.residents),
    fetchFilms(planet.films)
  ])
}

const fetchResidents = async (residentUrls: string[]) => {
  const residentPromises = residentUrls.map(url => axios.get<Resident>(url))
  try {
    const residentResponses = await Promise.all(residentPromises)
    residents.value = residentResponses.map(response => response.data)
  } catch (err) {
    console.error('Failed to fetch residents', err)
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
  fetchPlanet(id)
})
</script>

