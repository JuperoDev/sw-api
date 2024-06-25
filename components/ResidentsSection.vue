<template>
  <div v-if="residents.length" class="bg-gray-800 p-4 rounded-lg mb-4">
    <h2 class="text-2xl font-bold mb-4">Residents</h2>
    <div v-for="resident in residents" :key="resident.url" class="mb-4">
      <p class="mb-2">{{ resident.name }}</p>
      <NuxtLink :to="getResidentLink(resident.url)">
        <v-btn color="secondary">View Resident</v-btn>
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
  