<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col  items-center justify-center">
    
    <v-container>
      
      <v-row justify="center">
       
          <v-container class="max-w-full text-center mt-10 lg:text-left mb-8 lg:mb-0">
            <div v-if="loading" class="flex justify-center items-center py-4">
              <v-progress-circular indeterminate color="teal" size="64"></v-progress-circular>
            </div>
            <div v-else>
              <div v-for="film in films" :key="film.url" class="my-4 p-4 bg-gray-800 rounded-lg">
                <h2 class="text-2xl font-bold">{{ film.title }}</h2>
                <p><strong>Episode:</strong> {{ film.episode_id }}</p>
                <p><strong>Director:</strong> {{ film.director }}</p>
                <p><strong>Producer:</strong> {{ film.producer }}</p>
                <p><strong>Release Date:</strong> {{ film.release_date }}</p>
                <NuxtLink :to="getFilmLink(film.url)">
                  <v-btn color="teal" class="mt-2">View Details</v-btn>
                </NuxtLink>
                <hr class="my-4 border-gray-600">
              </div>
            </div>
          </v-container>
       
      </v-row>
    </v-container>

    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Film {
  title: string;
  episode_id: number;
  director: string;
  producer: string;
  release_date: string;
  url: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
}

const films = ref<Film[]>([])
const loading = ref(false)

const fetchFilms = async () => {
  loading.value = true
  try {
    const response = await axios.get<ApiResponse>('https://swapi.dev/api/films/')
    films.value = response.data.results
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}

const getFilmLink = (url: string): string => {
  const id = url.split('/').filter(Boolean).pop()
  return `/films/${id}`
}

onMounted(fetchFilms)
</script>

