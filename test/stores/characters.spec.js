// test/stores/characters.spec.js
import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCharactersStore } from '../../stores/characters';
import axios from 'axios';

vi.mock('axios');

describe('characters store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes with default values', () => {
    const store = useCharactersStore();
    expect(store.characters).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
  });

  it('fetches characters successfully', async () => {
    const store = useCharactersStore();
    const mockCharacters = [
      { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' },
      { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' },
    ];

    axios.get.mockResolvedValueOnce({
      data: {
        count: 2,
        next: null,
        previous: null,
        results: mockCharacters,
      },
    });

    await store.fetchCharacters();

    expect(store.characters).toEqual(mockCharacters);
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
  });

  it('handles fetch characters error', async () => {
    const store = useCharactersStore();
    
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    await store.fetchCharacters();

    expect(store.characters).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBe('Failed to fetch characters');
  });
});
