<template>
    <div class="vehicle-list">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="page"
                :length="totalPages"
                class="my-4"
              ></v-pagination>
               <div v-if="loading" class="loading-container">
              <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
            </div>
              <div v-else>
                <div v-for="vehicle in vehicles" :key="vehicle.url">
                  <h2>{{ vehicle.name }}</h2>
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
                  <NuxtLink :to="getVehicleLink(vehicle.url)">
                    <v-btn color="primary">View Details</v-btn>
                  </NuxtLink>
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
    url: string;
  }
  
  interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Vehicle[];
  }
  
  const page = ref(1)
  const vehicles = ref<Vehicle[]>([])
  const loading = ref(false)
  const totalPages = ref(0)
  
  const fetchVehicles = async () => {
    loading.value = true
    try {
      const response = await axios.get<ApiResponse>(`https://swapi.dev/api/vehicles/?page=${page.value}`)
      vehicles.value = response.data.results
      totalPages.value = Math.ceil(response.data.count / 10) 
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      loading.value = false
    }
  }
  
  const getVehicleLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/vehicles/${id}`
  }
  
  onMounted(fetchVehicles)
  
  watch(page, fetchVehicles)
  </script>

  