import Home from './../components/Home.vue';
import MovieDetails from './../components/MovieDetails.vue';
import MovieTrailers from './../components/MovieTrailers.vue';
import MovieTimes from './../components/MovieTimes.vue';
import Buy from './../components/Buy.vue';

export default {
  routes: [
    {
    path: '/',
    component: Home
    },
    {
      path: '/movie/:id',
      component: MovieDetails,
      children: [
        {
          path: '',
          component: MovieTrailers,
        },
        {
          path: 'movie-times',
          component: MovieTimes,
        }
      ]
    },
    {
      path: '/movie/:id/buy',
      component: Buy,
      name: 'buy',
    }
  ],
  mode: "history"
}
