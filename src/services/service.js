import firebase from 'firebase';

export default {
  fetchMovies() {

    return firebase.database().ref("/movies").once("value");
  },
  fetchMovieTimes(id) {
    return firebase.database().ref(`/movieTimes/${id}`).once("value");
  },
  fetchMovieDetails(id) {
    return firebase.database().ref(`/movieDetails/${id}`).once("value");
  },
  fetchTicketPrices() {
    return firebase.database().ref(`/ticketPrices`).once("value");
  },
  fetchHalls() {
    return firebase.database().ref(`/halls`).once("value");
  },
  fetchSoldTickets() {
    return firebase.database().ref(`/soldTickets`).once("value");
  },
}
