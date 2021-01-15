<template>
  <div class="container" v-if="selected">
    <loader v-if="isLoading"></loader>
    
    <div>
      {{selected}}
    </div>

  
    <div class="text-center mt-5 position-relative">
      <div v-for="(seating,key) in hall.seating" class="deneme">
        <span class="position-absolute left"> {{key}} </span>
        <span v-for="seat in seating">
          <button 
            @click="selectSeat(key,$event)"
            class="btn btn-sm btn-primary" 
            :class="{'btn-secondary': seat == '','mr-1 mb-1':true}"
            style="height: 40px; width: 40px;" 
            :disabled="seat == '' || seat == null"> {{seat}} </button>
        </span>
      </div>
    </div>
    <p class="text-center mt-2">Selected Seats: <span v-if="selectedSeat.length > 0"> {{selectedSeat}} </span> <span v-else>Nothing Selected</span></p>
    <div class="text-center">
      <button 
        @click="submitBuy" 
        class="btn btn-primary" 
        :disabled="selectedSeat.length <= 0 || selectedSeat.length != totalCount">Submit</button>
    </div>
  </div>
  <div class="container" v-else>
    <p class="mt-2">Seçim Yapmadınız!</p>
    <router-link tag="a" class="btn btn-primary"  :to="`/movie/${$route.params.id}`">Seçim yapmak için tıklayınız</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      hall: null,
      soldTickets: null,
      selectedSeat: [],
      isLoading: true,
    }
  },
  methods: {
    setHalls() {
      let getSoldTickets = this.$store.getters.getSoldTickets[this.movieId];
      this.hall = this.$store.getters.getHalls[this.selected.hallId];

      let soldTicketsSeats = [];
      for(let key in getSoldTickets){
        soldTicketsSeats[key] = getSoldTickets[key];
      }
      this.soldTickets = soldTicketsSeats[this.selected.selectedTime];

      if(this.soldTickets != undefined){
        var output = [];
        this.soldTickets.forEach(function (item) {
            output.push(item.replace(/\'/g, '').split(/(\d+)/).filter(Boolean));
        });

        output.forEach((item) => {
          this.hall.seating[item[0]][item[1]-1] = null;
        });
      }

      this.isLoading = false;
    },
    selectSeat(key, event) {
      let clickedSeat = key + event.target.innerHTML.trim();
      
      if(this.selectedSeat.length < this.totalCount){
        event.target.classList.toggle('btn-danger');
        if(this.selectedSeat.includes(clickedSeat)) {
          let index = this.selectedSeat.indexOf(clickedSeat);
          this.selectedSeat.splice(index,1);
        } else {
          this.selectedSeat.push(clickedSeat);
        }
      } else {
        if(this.selectedSeat.includes(clickedSeat)) {
          let index = this.selectedSeat.indexOf(clickedSeat);
          this.selectedSeat.splice(index,1);
          event.target.classList.toggle('btn-danger');
        }
      }

    },
    submitBuy() {
      console.log(this.selectedSeat);
    }
  },
  computed: {
    movieId() {
      return this.$route.params.id;
    },
    totalCount() {
      return this.selected.count.Adult + this.selected.count.Student + this.selected.count.Children;
    }
  },
  created() {
    this.selected = this.$route.params.selected;

    if(this.selected) {
      this.$store.dispatch("fetchHalls")
        .then(() => {
          console.log("Fetch halls");
        });

      this.$store.dispatch("fetchSoldTickets")
        .then(() => {
          console.log("Fetch sold tickets");
          this.setHalls();
        });
    }
  }
}
</script>

<style scoped="true">
 
 .left{
   left: 0;
 }

 .deneme {
   display: flex;
   justify-content: center;
   align-items: center;
 }
</style>