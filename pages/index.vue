<template>
  <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
  
    <div class="max-w-lg text-center lg:text-left mb-8 lg:mb-0">
      <h1 class="text-4xl lg:text-5xl font-bold mb-4">Star Wars, reimagined</h1>
      <p class="text-gray-400 mb-4">
         <CharacterAutocomplete/> 
        Fast and reliable information about Star Wars
      </p>
    </div>

    <!-- Button Section -->
    <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl text-center px-8">
      <nuxt-link to="/films" class="bg-gray-800 p-6 rounded-lg hover:bg-teal-500 transition-colors duration-300">
        <h2 class="text-2xl font-bold">Films</h2>
      </nuxt-link>
      <nuxt-link to="/people" class="bg-gray-800 p-6 rounded-lg hover:bg-teal-500 transition-colors duration-300">
        <h2 class="text-2xl font-bold">People</h2>
      </nuxt-link>
      <nuxt-link to="/planets" class="bg-gray-800 p-6 rounded-lg hover:bg-teal-500 transition-colors duration-300">
        <h2 class="text-2xl font-bold">Planets</h2>
      </nuxt-link>
      <nuxt-link to="/species" class="bg-gray-800 p-6 rounded-lg hover:bg-teal-500 transition-colors duration-300">
        <h2 class="text-2xl font-bold">Species</h2>
      </nuxt-link>
      <nuxt-link to="/starships" class="bg-gray-800 p-6 rounded-lg hover:bg-teal-500 transition-colors duration-300">
        <h2 class="text-2xl font-bold">Starships</h2>
      </nuxt-link>
      <nuxt-link to="/vehicles" class="bg-gray-800 p-6 rounded-lg hover:bg-teal-500 transition-colors duration-300">
        <h2 class="text-2xl font-bold">Vehicles</h2>
      </nuxt-link>
    </div>
  </div>
</template>

