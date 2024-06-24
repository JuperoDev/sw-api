<template>
    <div class="species-details">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <div v-if="loading">Loading...</div>
            <div v-else-if="error">An error occurred: {{ error }}</div>
            <div v-else-if="species">
              <h1>{{ species.name }}</h1>
              <p><strong>Classification:</strong> {{ species.classification }}</p>
              <p><strong>Designation:</strong> {{ species.designation }}</p>
              <p><strong>Average Height:</strong> {{ species.average_height }} cm</p>
              <p><strong>Skin Colors:</strong> {{ species.skin_colors }}</p>
              <p><strong>Hair Colors:</strong> {{ species.hair_colors }}</p>
              <p><strong>Eye Colors:</strong> {{ species.eye_colors }}</p>
              <p><strong>Average Lifespan:</strong> {{ species.average_lifespan }} years</p>
              <p><strong>Language:</strong> {{ species.language }}</p>
              
              <!-- Render homeworld with a button -->
              <div v-if="homeworld">
                <h2>Homeworld</h2>
                <p>{{ homeworld.name }}</p>
                <NuxtLink :to="getHomeworldLink(species.homeworld)">
                  <v-btn color="primary">View Homeworld</v-btn>
                </NuxtLink>
              </div>
  
              <!-- Render people with buttons -->
              <div v-if="people.length">
                <h2>People</h2>
                <div v-for="person in people" :key="person.url">
                  <p>{{ person.name }}</p>
                  <NuxtLink :to="getPersonLink(person.url)">
                    <v-btn color="primary">View Person</v-btn>
                  </NuxtLink>
                </div>
              </div>
  
              <!-- Render films with buttons -->
              <div v-if="films.length">
                <h2>Films</h2>
                <div v-for="film in films" :key="film.url">
                  <p>{{ film.title }}</p>
                  <NuxtLink :to="getFilmLink(film.url)">
                    <v-btn color="primary">View Film</v-btn>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  
  // Define interfaces
  interface Species {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    skin_colors: string;
    hair_colors: string;
    eye_colors: string;
    average_lifespan: string;
    homeworld: string;
    language: string;
    people: string[];
    films: string[];
    url: string;
  }
  
  interface Person {
    name: string;
    url: string;
  }
  
  interface Film {
    title: string;
    url: string;
  }
  
  interface Homeworld {
    name: string;
  }
  
  const route = useRoute()
  const species = ref<Species | null>(null)
  const people = ref<Person[]>([])
  const films = ref<Film[]>([])
  const homeworld = ref<Homeworld | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)
  
  const fetchSpecies = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get<Species>(`https://swapi.dev/api/species/${id}/`)
      species.value = response.data
      await fetchAdditionalDetails(response.data)
    } catch (err) {
      error.value = 'Failed to fetch species details'
    } finally {
      loading.value = false
    }
  }
  
  const fetchAdditionalDetails = async (species: Species) => {
    await Promise.all([
      fetchHomeworld(species.homeworld),
      fetchPeople(species.people),
      fetchFilms(species.films)
    ])
  }
  
  const fetchHomeworld = async (homeworldUrl: string) => {
    if (homeworldUrl) {
      try {
        const response = await axios.get<Homeworld>(homeworldUrl)
        homeworld.value = response.data
      } catch (err) {
        console.error('Failed to fetch homeworld', err)
      }
    }
  }
  
  const fetchPeople = async (peopleUrls: string[]) => {
    const peoplePromises = peopleUrls.map(url => axios.get<Person>(url))
    try {
      const peopleResponses = await Promise.all(peoplePromises)
      people.value = peopleResponses.map(response => response.data)
    } catch (err) {
      console.error('Failed to fetch people', err)
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
  
  const getHomeworldLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/planets/${id}`
  }
  
  const getPersonLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/people/${id}`
  }
  
  const getFilmLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/films/${id}`
  }
  
  onMounted(() => {
    const id = route.params.id as string
    fetchSpecies(id)
  })
  </script>
  
  