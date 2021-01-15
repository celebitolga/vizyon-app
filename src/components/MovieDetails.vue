<template>
  <section>
    <loader v-if="isLoading"></loader>
    <section v-if="hasDetails">
      <back-drop-image :imageName="movie.backdrop_path"></back-drop-image>
      <div class="container pt-5">
        <div class="row">
          <div class="col-sm-4">
            <poster :posterName="movie.poster_path"></poster>
          </div>
          <div class="col-sm-8 details">
            <h2> {{movie.title}} </h2>
            <p> {{movie.overview}} </p>

            <keep-alive>
              <router-view></router-view>
            </keep-alive>
            
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Loader from "./Loader";
import BackDropImage from "./BackDropImage";
import Poster from "./Poster";

export default {
  data() {
    return {
      isLoading: true,
      hasDetails: false,
      movie: null,
    }
  },
  computed: {
    movieId() {
      return this.$route.params.id;
    }
  },
  created () {
    this.$store.dispatch("fetchMovieDetails", this.movieId)
      .then(() => {
        console.log("fetchMovieDetails");
        this.isLoading = false;
        this.hasDetails = true;
        this.movie = this.$store.state.movieDetails[this.movieId];
      });
  },
  components: {
    Loader,
    BackDropImage,
    Poster,
  }
}
</script>
<style>
  /* body {
    overflow: hidden;
  } */

  .details {
    color: #fff;
  }

  .cast-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid #fff;
    box-sizing: border-box;
    margin-right: 8px;
  }

  .trailer {
    width: 150px;
    height: 110px;
    display: inline-block;
    margin-right: 20px;
  }
  .trailer img {
    widows: 100%;
    height: 100%;
  }

  .ticket-button {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>