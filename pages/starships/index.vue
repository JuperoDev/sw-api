<template>
    <div class="starship-list">
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
                <div v-for="starship in starships" :key="starship.url">
                  <h2>{{ starship.name }}</h2>
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
                  <nuxt-link :to="getStarshipLink(starship.url)">
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
 
  