// characters.ts
import { defineStore } from 'pinia'
import axios, { AxiosResponse } from 'axios'

interface Character {
  name: string;
  url: string;
}

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [] as Character[],
    loading: false,
    error: null as string | null
  }),
  actions: {
    async fetchCharacters() {
      const storedCharacters = localStorage.getItem('characters')
      if (storedCharacters) {
        this.characters = JSON.parse(storedCharacters)
        return
      }

      this.loading = true
      this.error = null
      let nextUrl: string | null = 'https://swapi.dev/api/people/'
      const allCharacters: Character[] = []

      try {
        while (nextUrl) {
          const response: AxiosResponse<any> = await axios.get(nextUrl)
          allCharacters.push(...response.data.results)
          nextUrl = response.data.next
        }
        this.characters = allCharacters
        localStorage.setItem('characters', JSON.stringify(allCharacters))
      } catch (error) {
        this.error = 'Failed to fetch characters'
      } finally {
        this.loading = false
      }
    }
  }
})
