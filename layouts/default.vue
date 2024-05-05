<template>
    <nav class="flex justify-center mt-10">
        <NuxtLink class="nav-link" to="/">Strona główna</NuxtLink>
    </nav>
    <main class="mt-8">
        <slot />
    </main>
</template>

<style scoped>
.nav-link {
    padding: 0.75rem 1.5rem;
    border: 2px solid #3b82f6;
    border-radius: 0.375rem;
    color: #3b82f6;
    text-decoration: none;
    background-color: white; 
    transition: background-color 300ms, color 300ms;
}

.nav-link:hover {
    background-color: #3b82f6; 
    color: white; 
}
</style>
