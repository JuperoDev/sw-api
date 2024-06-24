<template>
  <div class="person-details">
    <v-container>
      <v-row justify="center">
       
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

            <HomeworldSection v-if="homeworld" :homeworld="homeworld" title="Homeworld" />
            <FilmSection :films="films" />
            <VehiclesSection :vehicles="vehicles" />
            <StarshipsSection :starships="starships" />
          </div>
       
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

// Import the components
import HomeworldSection from '~/components/HomeworldSection.vue'
import FilmSection from '~/components/FilmSection.vue'
import VehiclesSection from '~/components/VehiclesSection.vue'
import StarshipsSection from '~/components/StarshipsSection.vue'

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
  url: string;
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
