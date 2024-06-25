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
                <div v-for="starship in starships" :key="starship.url" class="my-4  p-4 bg-gray-800 rounded-lg">
                  <h2 class="text-2xl font-bold">{{ starship.name }}</h2>
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
                  <NuxtLink :to="getStarshipLink(starship.url)">
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
  url: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Starship[];
}

const page = ref(1)
const starships = ref<Starship[]>([])
const loading = ref(false)
const totalPages = ref(0) 

const fetchStarships = async () => {
  loading.value = true
  try {
    const response = await axios.get<ApiResponse>(`https://swapi.dev/api/starships/?page=${page.value}`)
    starships.value = response.data.results
    totalPages.value = Math.ceil(response.data.count / 10) 
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

const getStarshipLink = (url: string): string => {
  const id = url.split('/').filter(Boolean).pop()
  return `/starships/${id}`
}

onMounted(fetchStarships)

watch(page, fetchStarships)
</script>

<style scoped>
</style>
