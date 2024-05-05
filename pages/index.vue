<template>
  <div class="app-container">
    <header class="header">
      <h1 class="title">Aplikacja z filmami</h1>
      <input v-model="searchTerm" placeholder="Wyszukaj film" type="text" class="search-input">
    </header>
    <main class="main-content">
      <div class="movies-display">
        <MovieCard :movie="movie" v-for="movie in data?.results" :key="movie.id"/>
      </div>
      <div class="pagination-controls">
        <button @click="previousPage" :disabled="page.value === 1" class="pagination-button">Poprzednia</button>
        <span class="page-info">Strona {{ page }} z {{ data?.total_pages }}</span>
        <button @click="nextPage" :disabled="page.value === data?.total_pages" class="pagination-button">Następna</button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ApiResponse } from '~~/types/ApiResponse';
import MovieCard from '~/components/MovieCard.vue';
import { useDebounce } from '@vueuse/core';

const searchTerm = ref('');
const page = ref(1);
const debouncedSearchTerm = useDebounce(searchTerm, 700);
const { data, execute } = useFetch<ApiResponse>(() => `api/movies/search?query=${debouncedSearchTerm.value}&page=${page.value}`, {
    immediate: false
});

function previousPage() {
    if (page.value > 1) {
        page.value--;
        execute();
    }
}

function nextPage() {
    if (data.value && page.value < data.value.total_pages) {
        page.value++;
        execute();
    }
}

onMounted(execute);
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-image: linear-gradient(to top right, #89cff0, #b6d0e2);
}

.header {
  padding: 2rem;
  width: 100%;
  text-align: center;
  background-color: #3b82f6;
  color: white;
}

.title {
  margin-bottom: 1rem;
  font-size: 2.5rem;
}

.search-input {
  width: 90%;
  max-width: 600px;
  padding: 0.8rem;
  border: none;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #333;
  background-color: white; 
}

.movies-display {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
}

.pagination-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
}

.pagination-button {
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 300ms;
}

.pagination-button:hover {
  background-color: #1d4ed8;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #4b5563;
  font-size: 1.2rem;
}
</style>
