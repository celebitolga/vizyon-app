<template>
  <div class="details">
    <div> Runtime: {{movie.runtime | runtime}} </div>
    <div>Averate rating: {{movie.vote_average.toFixed(1)}}</div>
    <div>Production Company: {{movie.production_companies[0].name}} </div>
    <div>Release Date: {{movie.release_date}} </div>
    <h4 class="my-2">Cast</h4>
    <img 
      src="https://via.placeholder.com/50"
      v-for="person in movie.cast"
      :key="person.cast_id"
      class="cast-avatar"
      />
      <h4 class="mt-3">Trailers</h4>
      <a :href="trailer.url"  v-for="trailer in trailers" :key="trailer.thumbnail" class="trailer" target="_blank">
        <img :src="trailer.thumbnail">
      </a>

      <router-link tag="a" :to="ticketsPath" class="btn btn-success ticket-button">Get Tickets</router-link>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      movie: null,
    }
  },
  computed: {
    movieId() {
      return this.$route.params.id;
    },
    trailers() {
      const trailers = [];
      this.movie.videos.results.forEach((video) => {
        if (video.type === 'Trailer') {
          trailers.push({
            thumbnail: `https://i.ytimg.com/vi/${video.key}/sddefault.jpg`,
            url: `https://youtube.com/watch?v=${video.key}`,
          });
        }
      });
      return trailers;
    },
    ticketsPath() {
      return `/movie/${ this.movieId }/movie-times`;
    }
  },
  created () {
    this.movie = this.$store.state.movieDetails[this.movieId];
  },
  filters: {
    runtime: function(value) {
      let hour = Math.floor(value / 60);
      let minute = (value - hour * 60);
      return `${ hour }h ${ minute }m`;
    }
  },
}
</script>

<style>

</style>