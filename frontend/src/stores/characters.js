import { defineStore } from 'pinia';
import axios from 'axios';

export const useCharacterStore = defineStore('characters', {
  state: () => ({
    characters: [],
    filters: { path: '', element: '' },
  }),
  getters: {
    filteredCharacters(state) {
      return state.characters.filter((char) => {
        return (
          (!state.filters.path || char.C_path === state.filters.path) &&
          (!state.filters.element || char.C_element === state.filters.element)
        );
      });
    },
  },
  actions: {
    async fetchCharacters() {
      const response = await axios.get('http://localhost:8800/api/v1/characters');
      this.characters = response.data;
    },
    updateFilter(type, value) {
      this.filters[type] = value;
    },
  },
});