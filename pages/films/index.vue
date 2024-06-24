<template>
    <div class="film-list">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <div v-if="loading">Loading...</div>
              <div v-else>
                <div v-for="film in films" :key="film.url">
                  <h2>{{ film.title }}</h2>
                  <p><strong>Episode:</strong> {{ film.episode_id }}</p>
                  <p><strong>Director:</strong> {{ film.director }}</p>
                  <p><strong>Producer:</strong> {{ film.producer }}</p>
                  <p><strong>Release Date:</strong> {{ film.release_date }}</p>
                  <NuxtLink :to="getFilmLink(film.url)">
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
 
  