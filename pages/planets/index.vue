<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center relative">
    <v-container>
      <v-row justify="center">
       
          <v-container class="max-w-full text-center lg:text-left mb-8 lg:mb-0">
            <div class="fixed top-0 left-1/2 transform -translate-x-1/2 bg-gray-900 py-4 w-full z-50">
              <v-pagination
                v-model="page"
                :length="totalPages"
                class="my-4"
                color="teal"
              ></v-pagination>
            </div>
            <div class="mt-24">
              <div v-if="loading" class="flex justify-center items-center py-4">
                <v-progress-circular indeterminate color="teal" size="64"></v-progress-circular>
              </div>
              <div v-else>
                <div v-for="planet in planets" :key="planet.url" class="my-4 p-4 bg-gray-800 rounded-lg">
                  <h2 class="text-2xl font-bold">{{ planet.name }}</h2>
                  <p><strong>Rotation Period:</strong> {{ planet.rotation_period }}</p>
                  <p><strong>Orbital Period:</strong> {{ planet.orbital_period }}</p>
                  <p><strong>Diameter:</strong> {{ planet.diameter }} km</p>
                  <p><strong>Climate:</strong> {{ planet.climate }}</p>
                  <p><strong>Gravity:</strong> {{ planet.gravity }}</p>
                  <p><strong>Terrain:</strong> {{ planet.terrain }}</p>
                  <p><strong>Surface Water:</strong> {{ planet.surface_water }}%</p>
                  <p><strong>Population:</strong> {{ planet.population }}</p>
                  <NuxtLink :to="getPlanetLink(planet.url)">
                    <v-btn color="teal" class="mt-2">View Details</v-btn>
                  </NuxtLink>
                  <hr class="my-4 border-gray-600">
                </div>
              </div>
            </div>
          </v-container>
       
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

