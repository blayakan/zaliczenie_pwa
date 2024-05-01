export default defineNuxtConfig({
  modules: [
      'nuxt-windicss',
      '@vueuse/nuxt'
  ],
  runtimeConfig: {
      apiKey: process.env.NUXT_API_KEY, 
      apiBaseUrl: process.env.NUXT_API_BASE_URL, 
      public: {
          imgBaseUrl: 'https://image.tmdb.org/t/p/w500', 
      }
  }
})
