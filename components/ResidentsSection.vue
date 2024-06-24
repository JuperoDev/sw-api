<template>
    <div v-if="residents.length">
      <h2>Residents</h2>
      <div v-for="resident in residents" :key="resident.url">
        <p>{{ resident.name }}</p>
        <NuxtLink :to="getResidentLink(resident.url)">
          <v-btn color="primary">View Resident</v-btn>
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Resident {
    name: string;
    url: string;
  }
  
  const props = defineProps<{ residents: Resident[] }>()
  
  const getResidentLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/people/${id}`
  }
  </script>
  