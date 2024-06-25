<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center relative">
    <v-container>
      
      
        <v-container class="max-w-full text-center mt-10 lg:text-left mb-8 lg:mb-0">
          <div v-if="loading" class="flex justify-center items-center py-4">
            <v-progress-circular indeterminate color="teal" size="64"></v-progress-circular>
          </div>
          <div v-else-if="error" class="text-red-500 text-center lg:text-left py-4">
            An error occurred: {{ error }}
          </div>
          <div v-else-if="film" class="my-4 p-4 bg-gray-800 rounded-lg">
            <h1 class="text-3xl lg:text-4xl font-bold mb-4">{{ film.title }}</h1>
            <p><strong>Episode:</strong> {{ film.episode_id }}</p>
            <p><strong>Director:</strong> {{ film.director }}</p>
            <p><strong>Producer:</strong> {{ film.producer }}</p>
            <p><strong>Release Date:</strong> {{ film.release_date }}</p>
            <p><strong>Opening Crawl:</strong></p>
            <p class="mb-4">{{ film.opening_crawl }}</p>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="flex flex-col space-y-4">
                <CharactersSection :characters="characters" />
              </div>
              <div class="flex flex-col space-y-4">
                <PlanetsSection :planets="planets" />
                <VehiclesSection :vehicles="vehicles" />
              </div>
              <div class="flex flex-col space-y-4">
                <StarshipsSection :starships="starships" />
                <SpeciesSection :species="species" />
              </div>
            </div>
          </div>
        </v-container>
     
    </v-container>


  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'


// Define interfaces
interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  url: string;
}

interface Character {
  name: string;
  url: string;
}

interface Planet {
  name: string;
  url: string;
}

interface Starship {
  name: string;
  url: string;
}

interface Vehicle {
  name: string;
  url: string;
}

interface Specie {
  name: string;
  url: string;
}

const route = useRoute()
const film = ref<Film | null>(null)
const characters = ref<Character[]>([])
const planets = ref<Planet[]>([])
const starships = ref<Starship[]>([])
const vehicles = ref<Vehicle[]>([])
const species = ref<Specie[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const fetchFilm = async (id: string) => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get<Film>(`https://swapi.dev/api/films/${id}/`)
    film.value = response.data
    await fetchAdditionalDetails(response.data)
  } catch (err) {
    error.value = 'Failed to fetch film details'
  } finally {
    loading.value = false
  }
}

const fetchAdditionalDetails = async (film: Film) => {
  await Promise.all([
    fetchCharacters(film.characters),
    fetchPlanets(film.planets),
    fetchStarships(film.starships),
    fetchVehicles(film.vehicles),
    fetchSpecies(film.species)
  ])
}

const fetchCharacters = async (characterUrls: string[]) => {
  const characterPromises = characterUrls.map(url => axios.get<Character>(url))
  try {
    const characterResponses = await Promise.all(characterPromises)
    characters.value = characterResponses.map(response => response.data)
  } catch (err) {
    console.error('Failed to fetch characters', err)
  }
}

const fetchPlanets = async (planetUrls: string[]) => {
  const planetPromises = planetUrls.map(url => axios.get<Planet>(url))
  try {
    const planetResponses = await Promise.all(planetPromises)
    planets.value = planetResponses.map(response => response.data)
  } catch (err) {
    console.error('Failed to fetch planets', err)
  }
}

const fetchStarships = async (starshipUrls: string[]) => {
  const starshipPromises = starshipUrls.map(url => axios.get<Starship>(url))
  try {
    const starshipResponses = await Promise.all(starshipPromises)
    starships.value = starshipResponses.map(response => response.data)
  } catch (err) {
    console.error('Failed to fetch starships', err)
  }
}

const fetchVehicles = async (vehicleUrls: string[]) => {
  const vehiclePromises = vehicleUrls.map(url => axios.get<Vehicle>(url))
  try {
    const vehicleResponses = await Promise.all(vehiclePromises)
    vehicles.value = vehicleResponses.map(response => response.data)
  } catch (err) {
    console.error('Failed to fetch vehicles', err)
  }
}

const fetchSpecies = async (speciesUrls: string[]) => {
  const speciesPromises = speciesUrls.map(url => axios.get<Specie>(url))
  try {
    const speciesResponses = await Promise.all(speciesPromises)
    species.value = speciesResponses.map(response => response.data)
  } catch (err) {
    console.error('Failed to fetch species', err)
  }
}

onMounted(() => {
  const id = route.params.id as string
  fetchFilm(id)
})
</script>
