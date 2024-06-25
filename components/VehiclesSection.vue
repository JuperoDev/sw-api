<template>
  <div v-if="vehicles.length" class="bg-gray-800 p-4 rounded-lg mb-4">
    <h2 class="text-2xl font-bold mb-4">Vehicles</h2>
    <div v-for="vehicle in vehicles" :key="vehicle.url" class="mb-4">
      <p class="mb-2">{{ vehicle.name }}</p>
      <NuxtLink :to="getVehicleLink(vehicle.url)">
        <v-btn color="secondary">View Vehicle</v-btn>
      </NuxtLink>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
  interface Vehicle {
    name: string;
    url: string;
  }
  
  defineProps<{
    vehicles: Vehicle[]
  }>()
  
  const getVehicleLink = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop()
    return `/vehicles/${id}`
  }
  </script>
  