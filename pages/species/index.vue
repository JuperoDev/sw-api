<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center relative">
    <v-container>
      <v-row justify="center">
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
              <div v-for="species in speciesList" :key="species.url" class="my-4 p-4 bg-gray-800 rounded-lg">
                <h2 class="text-2xl font-bold">{{ species.name }}</h2>
                <p><strong>Classification:</strong> {{ species.classification }}</p>
                <p><strong>Designation:</strong> {{ species.designation }}</p>
                <p><strong>Average Height:</strong> {{ species.average_height }} cm</p>
                <p><strong>Skin Colors:</strong> {{ species.skin_colors }}</p>
                <p><strong>Hair Colors:</strong> {{ species.hair_colors }}</p>
                <p><strong>Eye Colors:</strong> {{ species.eye_colors }}</p>
                <p><strong>Average Lifespan:</strong> {{ species.average_lifespan }} years</p>
                <p><strong>Language:</strong> {{ species.language }}</p>
                <NuxtLink :to="getSpeciesLink(species.url)">
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
import { Species } from '~/sw-types/general-interface'
import { ApiResponse } from '~/sw-types/apiResponse'

const page = ref(1)
const speciesList = ref<Species[]>([])
const loading = ref(false)
const totalPages = ref(0)

const fetchSpecies = async () => {
  loading.value = true
  try {
    const response = await axios.get<ApiResponse<Species>>(`https://swapi.dev/api/species/?page=${page.value}`)
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

<style scoped>
</style>
