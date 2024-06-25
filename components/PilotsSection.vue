<template>
  <div v-if="pilots.length" class="bg-gray-800 p-4 rounded-lg mb-4">
    <h2 class="text-2xl font-bold mb-4">Pilots</h2>
    <div v-for="pilot in pilots" :key="pilot.url" class="mb-4">
      <p class="mb-2">{{ pilot.name }}</p>
      <NuxtLink :to="getPilotLink(pilot.url)">
        <v-btn color="secondary">View Pilot</v-btn>
      </NuxtLink>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  interface Pilot {
    name: string;
    url: string;
  }
  
  const props = defineProps<{ pilots: Pilot[] }>()
  
  const getPilotLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/people/${id}`
  }
  </script>
  