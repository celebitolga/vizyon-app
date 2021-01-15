<template>
  <div v-if="movieTimes != null" class="details">
    <loader v-if="isLoading"></loader>
    <!-- {{movieTimes}} -->
    <h4 class="mb-3"> {{movieTimes.hallName}} </h4>

      <div class="form-check form-check-inline" v-for="time in movieTimes.times" :key="time">
        <input class="form-check-input" type="radio" name="time" :id="time" :value="time">
        <label class="form-check-label label-change" :for="time" @click="selectTime"> {{time}} </label>
      </div>

      {{ticketPrices}}

      <div v-for="ticket in ticketPrices" :key="ticket.label" class="mb-2">
        <button class="btn btn-primary" :disabled="count[ticket.label] == 0" @click="count[ticket.label]--">-</button>
        {{ticket.label}}: {{ticket.price}} | {{count[ticket.label]}}
        <button class="btn btn-primary" @click="count[ticket.label]++" :disabled="count[ticket.label] >= 5">+</button>
      </div>

      <router-link  
        tag="button" 
        :to="{name: 'buy', params: {selected: {count,selectedTime, hallId: movieTimes.hallId }}}" 
        class="btn btn-success ticket-buy-button"
        :disabled="(count['Adult'] == 0 && count['Student'] == 0 && count['Children'] == 0) || selectedTime == null">Satın Al</router-link>

    <router-link tag="a" :to="ticketsPath" class="btn btn-success ticket-button">Back</router-link>
  </div>
</template>

<script>
import Loader from "./Loader";

export default {
  data() {
    return {
      isLoading: true,
      movieTimes: null,
      selectedTime: null,
      ticketPrices: null,
      count: {
        Adult: 0,
        Student: 0,
        Children: 0,
      }
    }
  },
  methods: {
    selectTime(e) {
      this.selectedTime = e.target.innerHTML.trim();
    },
  },
  computed: {
    movieId() {
      return this.$route.params.id;
    },
    ticketsPath() {
      return `/movie/${ this.movieId }`;
    },
    ticketsBuyPath() {
      return `/movie/${ this.movieId }/buy`;
    }
  },
  created () {
    this.$store.dispatch("fetchMovieTimes", this.movieId)
      .then(() => {
        console.log("fetchMovieTimes");
        this.isLoading = false;
        this.movieTimes = this.$store.state.movieTimes[this.movieId];
      });
      
    this.$store.dispatch("fetchTicketPrices")
    .then(() => {
      console.log("fetchTicketPrices");
      this.ticketPrices = this.$store.getters.getTicketPrices;
    });
  },
  components: {
    Loader,
  },
}
</script>

<style scoped="true">
  .form-check-input {
    position: absolute;
    left: -9999px;
  }

  .label-change {
    cursor: pointer;
    border: 2px solid white;
    padding: 3px 15px;
    border-radius: 5px;
  }

  input:checked + .label-change {
    border: 2px solid black;
    color: black;
  }
  

</style>