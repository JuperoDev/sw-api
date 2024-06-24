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
                  <nuxt-link :to="getPersonLink(person.url)">
                    <v-btn color="primary">More Information</v-btn>
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