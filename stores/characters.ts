import { defineStore } from 'pinia'
import axios, { AxiosResponse } from 'axios'

interface Character {
  name: string;
  url: string;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [] as Character[],
    loading: false,
    error: null as string | null
  }),
  actions: {
    async fetchCharacters() {
      this.loading = true
      this.error = null
      let nextUrl: string | null = 'https://swapi.dev/api/people/'
      const allCharacters: Character[] = []

      try {
        while (nextUrl) {
          const response: AxiosResponse<ApiResponse> = await axios.get<ApiResponse>(nextUrl)
          allCharacters.push(...response.data.results)
          nextUrl = response.data.next
        }
        this.characters = allCharacters
      } catch (error) {
        this.error = 'Failed to fetch characters'
      } finally {
        this.loading = false
      }
    }
  }
})
