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
              <div v-for="vehicle in vehicles" :key="vehicle.url" class="my-4 p-4 bg-gray-800 rounded-lg">
                <h2 class="text-2xl font-bold">{{ vehicle.name }}</h2>
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
import { Vehicle } from '~/sw-types/general-interface'
import { ApiResponse } from '~/sw-types/apiResponse'

const page = ref(1)
const vehicles = ref<Vehicle[]>([])
const loading = ref(false)
const totalPages = ref(0)

const fetchVehicles = async () => {
  loading.value = true
  try {
    const response = await axios.get<ApiResponse<Vehicle>>(`https://swapi.dev/api/vehicles/?page=${page.value}`)
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
