<template>
    <div class="film-details">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
             <div v-if="loading" class="loading-container">
              <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
            </div>
            <div v-else-if="error">An error occurred: {{ error }}</div>
            <div v-else-if="film">
              <h1>{{ film.title }}</h1>
              <p><strong>Episode:</strong> {{ film.episode_id }}</p>
              <p><strong>Director:</strong> {{ film.director }}</p>
              <p><strong>Producer:</strong> {{ film.producer }}</p>
              <p><strong>Release Date:</strong> {{ film.release_date }}</p>
              <p><strong>Opening Crawl:</strong></p>
              <p>{{ film.opening_crawl }}</p>
  
              <!-- Render characters with buttons -->
              <div v-if="characters.length">
                <h2>Characters</h2>
                <div v-for="character in characters" :key="character.url">
                  <p>{{ character.name }}</p>
                  <NuxtLink :to="getCharacterLink(character.url)">
                    <v-btn color="primary">View Character</v-btn>
                  </NuxtLink>
                </div>
              </div>
  
              <!-- Render planets with buttons -->
              <div v-if="planets.length">
                <h2>Planets</h2>
                <div v-for="planet in planets" :key="planet.url">
                  <p>{{ planet.name }}</p>
                  <NuxtLink :to="getPlanetLink(planet.url)">
                    <v-btn color="primary">View Planet</v-btn>
                  </NuxtLink>
                </div>
              </div>
  
              <!-- Render starships with buttons -->
              <div v-if="starships.length">
                <h2>Starships</h2>
                <div v-for="starship in starships" :key="starship.url">
                  <p>{{ starship.name }}</p>
                  <NuxtLink :to="getStarshipLink(starship.url)">
                    <v-btn color="primary">View Starship</v-btn>
                  </NuxtLink>
                </div>
              </div>
  
              <!-- Render vehicles with buttons -->
              <div v-if="vehicles.length">
                <h2>Vehicles</h2>
                <div v-for="vehicle in vehicles" :key="vehicle.url">
                  <p>{{ vehicle.name }}</p>
                  <NuxtLink :to="getVehicleLink(vehicle.url)">
                    <v-btn color="primary">View Vehicle</v-btn>
                  </NuxtLink>
                </div>
              </div>
  
              <!-- Render species with buttons -->
              <div v-if="species.length">
                <h2>Species</h2>
                <div v-for="specie in species" :key="specie.url">
                  <p>{{ specie.name }}</p>
                  <NuxtLink :to="getSpeciesLink(specie.url)">
                    <v-btn color="primary">View Species</v-btn>
                  </NuxtLink>
                </div>
              </div>
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
  
  const getCharacterLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/people/${id}`
  }
  
  const getPlanetLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/planets/${id}`
  }
  
  const getStarshipLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/starships/${id}`
  }
  
  const getVehicleLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/vehicles/${id}`
  }
  
  const getSpeciesLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/species/${id}`
  }
  
  onMounted(() => {
    const id = route.params.id as string
    fetchFilm(id)
  })
  </script>
  
