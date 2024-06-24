<template>
    <div class="species-list">
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
                <div v-for="species in speciesList" :key="species.url">
                  <h2>{{ species.name }}</h2>
                  <p><strong>Classification:</strong> {{ species.classification }}</p>
                  <p><strong>Designation:</strong> {{ species.designation }}</p>
                  <p><strong>Average Height:</strong> {{ species.average_height }} cm</p>
                  <p><strong>Skin Colors:</strong> {{ species.skin_colors }}</p>
                  <p><strong>Hair Colors:</strong> {{ species.hair_colors }}</p>
                  <p><strong>Eye Colors:</strong> {{ species.eye_colors }}</p>
                  <p><strong>Average Lifespan:</strong> {{ species.average_lifespan }} years</p>
                  <p><strong>Language:</strong> {{ species.language }}</p>
                  <nuxt-link :to="getSpeciesLink(species.url)">
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
  
  interface Species {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    skin_colors: string;
    hair_colors: string;
    eye_colors: string;
    average_lifespan: string;
    language: string;
    url: string;
  }
  
  interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Species[];
  }
  
  const page = ref(1)
  const speciesList = ref<Species[]>([])
  const loading = ref(false)
  const totalPages = ref(0)
  
  const fetchSpecies = async () => {
    loading.value = true
    try {
      const response = await axios.get<ApiResponse>(`https://swapi.dev/api/species/?page=${page.value}`)
      speciesList.value = response.data.results
      totalPages.value = Math.ceil(response.data.count / 10)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      loading.value = false
    }
  }
  
  const getSpeciesLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/species/${id}`
  }
  
  onMounted(fetchSpecies)
  
  watch(page, fetchSpecies)
  </script>
  
