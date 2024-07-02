<template>
  <div
    class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center"
  >
    <v-container>
      <v-row justify="center">
        <div v-if="loading" class="flex justify-center mt-10 items-center py-4">
          <v-progress-circular
            indeterminate
            color="teal"
            size="64"
          ></v-progress-circular>
        </div>
        <div
          v-else-if="error"
          class="text-red-500 text-center lg:text-left py-4"
        >
          An error occurred: {{ error }}
        </div>
        <div
          v-else-if="planet"
          class="my-4 p-4 bg-gray-800 rounded-lg w-full max-w-3xl"
        >
          <h1 class="text-3xl lg:text-4xl font-bold mb-4">{{ planet.name }}</h1>
          <p><strong>Rotation Period:</strong> {{ planet.rotation_period }}</p>
          <p><strong>Orbital Period:</strong> {{ planet.orbital_period }}</p>
          <p><strong>Diameter:</strong> {{ planet.diameter }} km</p>
          <p><strong>Climate:</strong> {{ planet.climate }}</p>
          <p><strong>Gravity:</strong> {{ planet.gravity }}</p>
          <p><strong>Terrain:</strong> {{ planet.terrain }}</p>
          <p><strong>Surface Water:</strong> {{ planet.surface_water }}%</p>
          <p><strong>Population:</strong> {{ planet.population }}</p>

          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
          >
            <div class="flex flex-col space-y-4">
              <ResidentsSection :residents="residents" />
            </div>
            <div class="flex flex-col space-y-4">
              <FilmSection :films="films" />
            </div>
          </div>
        </div>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import { Planet, Resident, Film } from "~/sw-types/general-interface";

const route = useRoute();
const planet = ref<Planet | null>(null);
const residents = ref<Resident[]>([]);
const films = ref<Film[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchPlanet = async (id: string) => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get<Planet>(
      `https://swapi.dev/api/planets/${id}/`
    );
    planet.value = response.data;
    await fetchAdditionalDetails(response.data);
  } catch (err) {
    error.value = "Failed to fetch planet details";
  } finally {
    loading.value = false;
  }
};

const fetchAdditionalDetails = async (planet: Planet) => {
  const residentsPromise = planet.residents
    ? fetchResidents(planet.residents)
    : Promise.resolve();
  const filmsPromise = planet.films
    ? fetchFilms(planet.films)
    : Promise.resolve();

  await Promise.all([residentsPromise, filmsPromise]);
};

const fetchResidents = async (residentUrls?: string[]) => {
  if (residentUrls) {
    const residentPromises = residentUrls.map((url) =>
      axios.get<Resident>(url)
    );
    try {
      const residentResponses = await Promise.all(residentPromises);
      residents.value = residentResponses.map((response) => response.data);
    } catch (err) {
      console.error("Failed to fetch residents", err);
    }
  }
};

const fetchFilms = async (filmUrls?: string[]) => {
  if (filmUrls) {
    const filmPromises = filmUrls.map((url) => axios.get<Film>(url));
    try {
      const filmResponses = await Promise.all(filmPromises);
      films.value = filmResponses.map((response) => response.data);
    } catch (err) {
      console.error("Failed to fetch films", err);
    }
  }
};

onMounted(() => {
  const id = route.params.id as string;
  fetchPlanet(id);
});
</script>

<style scoped></style>
