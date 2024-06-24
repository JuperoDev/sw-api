<template>
    <div class="text-center">
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
                <div v-for="person in people" :key="person.url">
                  <p><strong>Name:</strong> {{ person.name }}</p>
                  <p><strong>Height:</strong> {{ person.height }}</p>
                  <p><strong>Mass:</strong> {{ person.mass }}</p>
                  <p><strong>Hair Color:</strong> {{ person.hair_color }}</p>
                  <p><strong>Skin Color:</strong> {{ person.skin_color }}</p>
                  <p><strong>Eye Color:</strong> {{ person.eye_color }}</p>
                  <p><strong>Birth Year:</strong> {{ person.birth_year }}</p>
                  <p><strong>Gender:</strong> {{ person.gender }}</p>
                  <hr>
                </div>
              </div>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import axios from 'axios'
  
  const page = ref(1)
  const people = ref([])
  const loading = ref(false)
  const totalPages = ref(0) // Initially set to 0 to be updated dynamically
  
  const fetchData = async () => {
    loading.value = true
    try {
      const response = await axios.get(`https://swapi.dev/api/people/?page=${page.value}`)
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
      const response = await axios.get('https://swapi.dev/api/people/?page=1')
      people.value = response.data.results
      totalPages.value = Math.ceil(response.data.count / 10) // Assuming 10 items per page
    } catch (error) {
      console.error('Error fetching initial data:', error)
    } finally {
      loading.value = false
    }
  }
  
  onMounted(initialize)
  
  watch(page, fetchData)
  </script>