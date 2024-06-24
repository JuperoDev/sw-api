<template>
    <div v-if="pilots.length">
      <h2>Pilots</h2>
      <div v-for="pilot in pilots" :key="pilot.url">
        <p>{{ pilot.name }}</p>
        <NuxtLink :to="getPilotLink(pilot.url)">
          <v-btn color="primary">View Pilot</v-btn>
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
  