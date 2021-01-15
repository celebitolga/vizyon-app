import service from './../services/service';

const state = {
  movies: [],
  movieDetails: {},
  movieTimes: {},
  ticketPrices: {},
  halls: {},
  soldTickets: {},
};

const getters = {
  movies(state) {
    return state.movies;
  },
  groupedMovies(state) {
    const grouped = [];
    state.movies.forEach((movie, index) => {
      if (index % 3 === 0) {
        grouped.push([]);
      }
      grouped[grouped.length - 1].push(movie);
    })
    return grouped;
  },
  getTicketPrices(state) {
    return state.ticketPrices;
  },
  getHalls(state) {
    return state.halls;
  },
  getSoldTickets(state) {
    return state.soldTickets;
  }
};

const mutations = {
  setMovies(state, payload) {
    state.movies = payload;
  },
  setMovieDetails(state, payload) {
    const { id, data } = payload;
    state.movieDetails[id] = data;
  },
  setMovieTimes(state, payload) {
    const { id, data } = payload;
    state.movieTimes[id] = data;
  },
  setTicketPrices(state, payload) {
    state.ticketPrices = payload;
  },
  setHalls(state, payload) {
    state.halls = payload;
  },
  setSoldTickets(state, payload) {
    state.soldTickets = payload;
  }

};

const actions = {
  fetchMovies({ commit }) {
    return service.fetchMovies()
      .then((snapshot) => {
        commit("setMovies", snapshot.val());
      });
  },
  fetchMovieDetails({ commit }, id) {
    return service.fetchMovieDetails(id)
      .then((snapshot) => {
        commit("setMovieDetails", { id: id, data: snapshot.val() });
      });
  },
  fetchMovieTimes({ commit }, id) {
    return service.fetchMovieTimes(id)
      .then((snapshot) => {
        commit("setMovieTimes", { id: id, data: snapshot.val()});
      });
  },
  fetchTicketPrices({commit}) {
    return service.fetchTicketPrices()
      .then((snapshot) => {
        commit("setTicketPrices", snapshot.val());
      });
  },
  fetchHalls({ commit }) {
    return service.fetchHalls()
      .then((snapshot) => {
        commit("setHalls", snapshot.val());
      });
  },
  fetchSoldTickets({ commit }) {
    return service.fetchSoldTickets()
      .then((snapshot) => {
        commit("setSoldTickets", snapshot.val());
      });
  }
};


export default {
  state,
  getters,
  mutations,
  actions
}
