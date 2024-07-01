<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
    <v-container>
      <v-row justify="center">
        <div v-if="loading" class="flex justify-center items-center py-4">
          <v-progress-circular indeterminate color="teal" size="64"></v-progress-circular>
        </div>
        <div v-else-if="error" class="text-red-500 text-center lg:text-left py-4">
          An error occurred: {{ error }}
        </div>
        <div v-else-if="vehicle" class="my-4 p-4 bg-gray-800 rounded-lg w-full max-w-3xl">
          <h1 class="text-3xl lg:text-4xl font-bold mb-4">{{ vehicle.name }}</h1>
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

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div class="flex flex-col space-y-4">
              <PilotsSection :pilots="pilots" />
            </div>
            <div class="flex flex-col space-y-4">
              <FilmSection :films="films" />
            </div>
          </div>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import FilmSection from '~/components/FilmSection.vue'
import PilotsSection from '~/components/PilotsSection.vue'
import { Vehicle } from '~/sw-types/vehicle'
import { Pilot } from '~/sw-types/pilot'
import { Film } from '~/sw-types/film'

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
    fetchPilots(vehicle.pilots ?? []),
    fetchFilms(vehicle.films ?? [])
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

onMounted(() => {
  const id = route.params.id as string
  fetchVehicle(id)
})
</script>
