<template>
    <div>
      <h2>Vehicles</h2>
      <div v-for="vehicle in vehicles" :key="vehicle.url">
        <p>{{ vehicle.name }}</p>
        <NuxtLink :to="getVehicleLink(vehicle.url)">
          <v-btn color="primary">View Vehicle</v-btn>
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
  