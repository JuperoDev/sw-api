<template>
    <div class="planet-list">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                :length="totalPages"
                class="my-4"
              ></v-pagination>
              <div v-if="loading">Loading...</div>
              <div v-else>
                <div v-for="planet in planets" :key="planet.url">
                  <h2>{{ planet.name }}</h2>
                  <p><strong>Rotation Period:</strong> {{ planet.rotation_period }}</p>
                  <p><strong>Orbital Period:</strong> {{ planet.orbital_period }}</p>
                  <p><strong>Diameter:</strong> {{ planet.diameter }} km</p>
                  <p><strong>Climate:</strong> {{ planet.climate }}</p>
                  <p><strong>Gravity:</strong> {{ planet.gravity }}</p>
                  <p><strong>Terrain:</strong> {{ planet.terrain }}</p>
                  <p><strong>Surface Water:</strong> {{ planet.surface_water }}%</p>
                  <p><strong>Population:</strong> {{ planet.population }}</p>
                  <nuxt-link :to="getPlanetLink(planet.url)">
                    <v-btn color="primary">View Details</v-btn>
                  </nuxt-link>
                  <hr>
                </div>
              </div>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, onMounted } from 'vue'
  import axios from 'axios'
  
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
    url: string;
  }
  
  interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Planet[];
  }
  
  const page = ref(1)
  const planets = ref<Planet[]>([])
  const loading = ref(false)
  const totalPages = ref(0) 
  
  const fetchPlanets = async () => {
    loading.value = true
    try {
      const response = await axios.get<ApiResponse>(`https://swapi.dev/api/planets/?page=${page.value}`)
      planets.value = response.data.results
      totalPages.value = Math.ceil(response.data.count / 10) 
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      loading.value = false
    }
  }
  
  const getPlanetLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop() 
    return `/planets/${id}`
  }
  
  onMounted(fetchPlanets)
  
  watch(page, fetchPlanets)
  </script>
