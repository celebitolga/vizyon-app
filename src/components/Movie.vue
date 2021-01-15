<template>
  <div class="card mt-4">
    <router-link tag="a" :to="`/movie/${movie.id}`">
      <poster :posterName="movie.poster_path" :alt="movie.original_title" class="card-img-top"></poster>
    </router-link>
    <div class="card-body">
      <h5 class="card-title"> {{movie.original_title}} </h5>
      <p class="card-text"> {{movie.overview}} </p>
    </div>
    <div class="card-footer">
      <small class="text-muted"> Average rating: {{movie.vote_average.toFixed(1)}} </small>
    </div>
  </div>
</template>


<script>
import Poster from "./Poster";

export default {
  name: "Movie",
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  components: {
    Poster,
  },
}
</script>

<style>
  .card {
    min-width: 250px;
  }
</style>