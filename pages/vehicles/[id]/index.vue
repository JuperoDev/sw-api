<template>
    <div class="vehicle-details">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
             <div v-if="loading" class="loading-container">
              <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
            </div>
            <div v-else-if="error">An error occurred: {{ error }}</div>
            <div v-else-if="vehicle">
              <h1>{{ vehicle.name }}</h1>
              <p><strong>Model:</strong> {{ vehicle.model }}</p>
              <p><strong>Manufacturer:</strong> {{ vehicle.manufacturer }}</p>
              <p><strong>Cost in Credits:</strong> {{ vehicle.cost_in_credits }}</p>
              <p><strong>Length:</strong> {{ vehicle.length }} meters</p>
              <p><strong>Max Atmosphering Speed:</strong> {{ vehicle.max_atmosphering_speed }} km/h</p>
              <p><strong>Crew:</strong> {{ vehicle.crew }}</p>
              <p><strong>Passengers:</strong> {{ vehicle.passengers }}</p>
              <p><strong>Cargo Capacity:</strong> {{ vehicle.cargo_capacity }} kg</p>
              <p><strong>Consumables:</strong> {{ vehicle.consumables }}</p>
              <p><strong>Vehicle Class:</strong> {{ vehicle.vehicle_class }}</p>
  
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
                  <NuxtLink :to="getFilmLink(film.url)">
                    <v-btn color="primary">View Film</v-btn>
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
  interface Vehicle {
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
    vehicle_class: string;
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
  const vehicle = ref<Vehicle | null>(null)
  const pilots = ref<Pilot[]>([])
  const films = ref<Film[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  
  const fetchVehicle = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get<Vehicle>(`https://swapi.dev/api/vehicles/${id}/`)
      vehicle.value = response.data
      await fetchAdditionalDetails(response.data)
    } catch (err) {
      error.value = 'Failed to fetch vehicle details'
    } finally {
      loading.value = false
    }
  }
  
  const fetchAdditionalDetails = async (vehicle: Vehicle) => {
    await Promise.all([
      fetchPilots(vehicle.pilots),
      fetchFilms(vehicle.films)
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
    fetchVehicle(id)
  })
  </script>
  
