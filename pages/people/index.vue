<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center relative">
    
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-w-full text-center mt-10 lg:text-left mb-8 lg:mb-0">
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
                <div v-for="person in people" :key="person.url" class="my-4 p-4 bg-gray-800 rounded-lg">
                  <h2 class="text-2xl  font-bold">{{ person.name }}</h2>
                  <p><strong>Height:</strong> {{ person.height }}</p>
                  <p><strong>Mass:</strong> {{ person.mass }}</p>
                  <p><strong>Hair Color:</strong> {{ person.hair_color }}</p>
                  <p><strong>Skin Color:</strong> {{ person.skin_color }}</p>
                  <p><strong>Eye Color:</strong> {{ person.eye_color }}</p>
                  <p><strong>Birth Year:</strong> {{ person.birth_year }}</p>
                  <p><strong>Gender:</strong> {{ person.gender }}</p>
                  <NuxtLink :to="getPersonLink(person.url)">
                    <v-btn color="teal" class="mt-2">More Information</v-btn>
                  </NuxtLink>
                  <hr class="my-4 border-gray-600">
                </div>
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

interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
}

const page = ref(1)
const people = ref<Person[]>([])
const loading = ref(false)
const totalPages = ref(0) 

const fetchData = async () => {
  loading.value = true
  try {
    const response = await axios.get<ApiResponse>(`https://swapi.dev/api/people/?page=${page.value}`)
    people.value = response.data.results
    totalPages.value = Math.ceil(response.data.count / 10) // Assuming 10 items per page
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

const initialize = async () => {
  loading.value = true
  try {
    const response = await axios.get<ApiResponse>('https://swapi.dev/api/people/?page=1')
    people.value = response.data.results
    totalPages.value = Math.ceil(response.data.count / 10) 
  } catch (error) {
    console.error('Error fetching initial data:', error)
  } finally {
    loading.value = false
  }
}

const getPersonLink = (url: string): string => {
  const id = url.split('/').filter(Boolean).pop() 
  return `/people/${id}`
}

onMounted(initialize)

watch(page, fetchData)
</script>

