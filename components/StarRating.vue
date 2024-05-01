<template>
    <div>
      <span v-for="star in 5" :key="star" class="star" @click="rate(star)" :class="{ 'filled': star <= rating }">
        &#9733;
      </span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      movieId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        rating: this.loadRating(),
      };
    },
    methods: {
      rate(star) {
        this.rating = star;
        localStorage.setItem(`rating-${this.movieId}`, star);
      },
      loadRating() {
        return Number(localStorage.getItem(`rating-${this.movieId}`)) || 0;
      }
    }
  }
  </script>
  
  <style scoped>
  .star {
    cursor: pointer;
    color: gold;
  }
  
  .filled {
    color: darkgoldenrod;
  }
  </style>
  