<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
    <v-container>
      <v-row justify="center">
        <div v-if="loading" class="flex justify-center mt-10 items-center py-4">
          <v-progress-circular indeterminate color="teal" size="64"></v-progress-circular>
        </div>
        <div v-else-if="error" class="text-red-500 text-center lg:text-left py-4">
          An error occurred: {{ error }}
        </div>
        <div v-else-if="person" class="my-4 p-4 bg-gray-800 rounded-lg w-full max-w-3xl">
          <h1 class="text-3xl lg:text-4xl font-bold mb-4">{{ person.name }}</h1>
          <p><strong>Height:</strong> {{ person.height }} cm</p>
          <p><strong>Mass:</strong> {{ person.mass }} kg</p>
          <p><strong>Hair Color:</strong> {{ person.hair_color }}</p>
          <p><strong>Skin Color:</strong> {{ person.skin_color }}</p>
          <p><strong>Eye Color:</strong> {{ person.eye_color }}</p>
          <p><strong>Birth Year:</strong> {{ person.birth_year }}</p>
          <p><strong>Gender:</strong> {{ person.gender }}</p>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div class="flex flex-col space-y-4">
              <HomeworldSection v-if="homeworld" :homeworld="homeworld" title="Homeworld" />
            </div>
            <div class="flex flex-col space-y-4">
              <FilmSection :films="films" />
            </div>
            <div class="flex flex-col space-y-4">
              <VehiclesSection :vehicles="vehicles" />
            </div>
            <div class="flex flex-col space-y-4">
              <StarshipsSection :starships="starships" />
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
import HomeworldSection from '~/components/HomeworldSection.vue'
import FilmSection from '~/components/FilmSection.vue'
import VehiclesSection from '~/components/VehiclesSection.vue'
import StarshipsSection from '~/components/StarshipsSection.vue'
import { Person } from '~/sw-types/person'
import { Film } from '~/sw-types/film'
import { Vehicle } from '~/sw-types/vehicle'
import { Starship } from '~/sw-types/starship'
import { Homeworld } from '~/sw-types/homeworld'

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
  const filmsPromise = fetchFilms(person.films);
  const vehiclesPromise = fetchVehicles(person.vehicles);
  const starshipsPromise = fetchStarships(person.starships);
  const homeworldPromise = person.homeworld ? fetchHomeworld(person.homeworld) : Promise.resolve();

  await Promise.all([filmsPromise, vehiclesPromise, starshipsPromise, homeworldPromise]);
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
    homeworld.value = { ...response.data, url: homeworldUrl }
  } catch (err) {
    console.error('Failed to fetch homeworld', err)
  }
}

onMounted(() => {
  const id = route.params.id as string
  fetchPerson(id)
})
</script>

<style scoped>


</style>
