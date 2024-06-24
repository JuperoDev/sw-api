<template>
    <div class="starship-details">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <div v-if="loading">Loading...</div>
            <div v-else-if="error">An error occurred: {{ error }}</div>
            <div v-else-if="starship">
              <h1>{{ starship.name }}</h1>
              <p><strong>Model:</strong> {{ starship.model }}</p>
              <p><strong>Manufacturer:</strong> {{ starship.manufacturer }}</p>
              <p><strong>Cost in Credits:</strong> {{ starship.cost_in_credits }}</p>
              <p><strong>Length:</strong> {{ starship.length }} meters</p>
              <p><strong>Max Atmosphering Speed:</strong> {{ starship.max_atmosphering_speed }} km/h</p>
              <p><strong>Crew:</strong> {{ starship.crew }}</p>
              <p><strong>Passengers:</strong> {{ starship.passengers }}</p>
              <p><strong>Cargo Capacity:</strong> {{ starship.cargo_capacity }} kg</p>
              <p><strong>Consumables:</strong> {{ starship.consumables }}</p>
              <p><strong>Starship Class:</strong> {{ starship.starship_class }}</p>
              <p><strong>Hyperdrive Rating:</strong> {{ starship.hyperdrive_rating }}</p>
              <p><strong>MGLT:</strong> {{ starship.MGLT }}</p>
  
              <!-- Render pilots with buttons -->
              <div v-if="pilots.length">
                <h2>Pilots</h2>
                <div v-for="pilot in pilots" :key="pilot.url">
                  <p>{{ pilot.name }}</p>
                  <NuxtLink :to="getPilotLink(pilot.url)">
                    <v-btn color="primary">View Pilot</v-btn>
                  </NuxtLink>
                </div>
              </div>
  
              <!-- Render films with buttons -->
              <div v-if="films.length">
                <h2>Films</h2>
                <div v-for="film in films" :key="film.url">
                  <p>{{ film.title }}</p>
                  <NuxtLink> :to="getFilmLink(film.url)">
                    <v-btn color="primary">View Film</v-btn>
                  </NuxtLink>>
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
  interface Starship {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    starship_class: string;
    hyperdrive_rating: string;
    MGLT: string;
    pilots: string[];
    films: string[];
    url: string;
  }
  
  interface Pilot {
    name: string;
    url: string;
  }
  
  interface Film {
    title: string;
    url: string;
  }
  
  const route = useRoute()
  const starship = ref<Starship | null>(null)
  const pilots = ref<Pilot[]>([])
  const films = ref<Film[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  
  const fetchStarship = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get<Starship>(`https://swapi.dev/api/starships/${id}/`)
      starship.value = response.data
      await fetchAdditionalDetails(response.data)
    } catch (err) {
      error.value = 'Failed to fetch starship details'
    } finally {
      loading.value = false
    }
  }
  
  const fetchAdditionalDetails = async (starship: Starship) => {
    await Promise.all([
      fetchPilots(starship.pilots),
      fetchFilms(starship.films)
    ])
  }
  
  const fetchPilots = async (pilotUrls: string[]) => {
    const pilotPromises = pilotUrls.map(url => axios.get<Pilot>(url))
    try {
      const pilotResponses = await Promise.all(pilotPromises)
      pilots.value = pilotResponses.map(response => response.data)
    } catch (err) {
      console.error('Failed to fetch pilots', err)
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
  
  const getPilotLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/people/${id}`
  }
  
  const getFilmLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/films/${id}`
  }
  
  onMounted(() => {
    const id = route.params.id as string
    fetchStarship(id)
  })
  </script>
 
  