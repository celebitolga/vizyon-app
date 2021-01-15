<template>
  <section>
    <loader v-if="isLoading"></loader>
    <section class="container py-5">
      <div class="card-deck" v-for="(group,index) in groupedMovies" :key="index">
        <movie
          v-for="(movie,index) in group" 
          :key="index"
          :movie="movie"></movie>
      </div>
    </section>
    <!-- <section class="container py-5">
      <div class="card-deck">
        <movie
          v-for="movie in groupedMovies[1]" 
          :key="movie.id"
          :movie="movie"></movie>
      </div>
    </section> -->
  </section>
</template>

<script>
import Loader from "./Loader";
import Movie from './Movie.vue';

import { mapGetters } from 'vuex';

export default {
  name: "Home",
  data() {
    return {
      isLoading: true,
    };
  },
  components: {
    Loader,
    Movie
  },
  computed: {
    ...mapGetters(["movies","groupedMovies"])
  },
  created() {
    this.$store.dispatch("fetchMovies").then(() => {
      this.isLoading = false;
    });
  },
};
</script>

<style>
</style>