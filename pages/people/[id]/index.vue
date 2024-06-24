<template>
    <div class="person-details">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
             <div v-if="loading" class="loading-container">
              <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
            </div>
            <div v-else-if="error">An error occurred: {{ error }}</div>
            <div v-else-if="person">
              <h1>{{ person.name }}</h1>
              <p><strong>Height:</strong> {{ person.height }} cm</p>
              <p><strong>Mass:</strong> {{ person.mass }} kg</p>
              <p><strong>Hair Color:</strong> {{ person.hair_color }}</p>
              <p><strong>Skin Color:</strong> {{ person.skin_color }}</p>
              <p><strong>Eye Color:</strong> {{ person.eye_color }}</p>
              <p><strong>Birth Year:</strong> {{ person.birth_year }}</p>
              <p><strong>Gender:</strong> {{ person.gender }}</p>
              
              <!-- Render homeworld -->
              <div v-if="homeworld">
                <h2>Homeworld</h2>
                <p>{{ homeworld.name }}</p>
                <NuxtLink :to="getHomeworldLink(person.homeworld)">
                  <v-btn color="primary">View Homeworld</v-btn>
                </NuxtLink>
              </div>
  
              <!-- Render film titles with buttons -->
              <div v-if="films.length">
                <h2>Films</h2>
                <div v-for="film in films" :key="film.url">
                  <p>{{ film.title }}</p>
                  <NuxtLink :to="getFilmLink(film.url)">
                    <v-btn color="primary">View Film</v-btn>
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
  interface Person {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
  }
  
  interface Film {
    title: string;
    url: string;
  }
  
  interface Vehicle {
    name: string;
    url: string;
  }
  
  interface Starship {
    name: string;
    url: string;
  }
  
  interface Homeworld {
    name: string;
  }
  
  const route = useRoute()
  const person = ref<Person | null>(null)
  const films = ref<Film[]>([])
  const vehicles = ref<Vehicle[]>([])
  const starships = ref<Starship[]>([])
  const homeworld = ref<Homeworld | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)
  
  const fetchPerson = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get<Person>(`https://swapi.dev/api/people/${id}/`)
      person.value = response.data
      await fetchAdditionalDetails(response.data)
    } catch (err) {
      error.value = 'Failed to fetch person details'
    } finally {
      loading.value = false
    }
  }
  
  const fetchAdditionalDetails = async (person: Person) => {
    await Promise.all([
      fetchFilms(person.films),
      fetchVehicles(person.vehicles),
      fetchStarships(person.starships),
      fetchHomeworld(person.homeworld)
    ])
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
  
  const fetchVehicles = async (vehicleUrls: string[]) => {
    const vehiclePromises = vehicleUrls.map(url => axios.get<Vehicle>(url))
    try {
      const vehicleResponses = await Promise.all(vehiclePromises)
      vehicles.value = vehicleResponses.map(response => response.data)
    } catch (err) {
      console.error('Failed to fetch vehicles', err)
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
  
  const fetchHomeworld = async (homeworldUrl: string) => {
    try {
      const response = await axios.get<Homeworld>(homeworldUrl)
      homeworld.value = response.data
    } catch (err) {
      console.error('Failed to fetch homeworld', err)
    }
  }
  
  const getFilmLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/films/${id}`
  }
  
  const getVehicleLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/vehicles/${id}`
  }
  
  const getStarshipLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/starships/${id}`
  }
  
  const getHomeworldLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/planets/${id}`
  }
  
  onMounted(() => {
    const id = route.params.id as string
    fetchPerson(id)
  })
  </script>