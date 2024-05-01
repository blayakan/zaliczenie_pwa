<template>
    <div class="flex flex-col py-10 bg-gradient-to-b from-gray-100 to-blue-100 min-h-screen">
        <div class="container mx-auto px-4">
            <h2 class="text-3xl font-bold text-center text-blue-800 mb-6">Aplikacja z filmami</h2>
            <div class="flex justify-center items-center mb-10">
                <input v-model="searchTerm" placeholder="Wyszukaj film" type="text" class="px-4 py-2 w-full max-w-md border border-blue-300 rounded-md shadow focus:outline-none focus:border-blue-500 transition duration-300">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                <MovieCard :movie="movie" v-for="movie in data?.results" :key="movie.id"/>
            </div>
            <div class="flex justify-center items-center space-x-4 mt-10">
                <button @click="previousPage" :disabled="page.value === 1" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">Poprzednia</button>
                <span class="text-lg text-gray-700">Strona {{ page }} z {{ data?.total_pages }}</span>
                <button @click="nextPage" :disabled="page.value === data?.total_pages" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">Następna</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { ApiResponse } from '~~/types/ApiResponse';
import MovieCard from '~/components/MovieCard.vue'; // Ensure the import path is correct
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
.bg-gradient-to-b {
    background-image: linear-gradient(to bottom, #f7fafc, #ebf8ff);
}

.shadow {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.hover\:bg-blue-700:hover {
    background-color: #2b6cb0;
}

.disabled\:opacity-50:disabled {
    opacity: 0.5;
}
</style>
