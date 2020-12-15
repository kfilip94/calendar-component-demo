<template>
  <Calendar
    :price="price"
    :rate="rate"
    :reviewsCount="reviewsCount"
    :availableDates="availableDates"
    @onReservationChange="onReservationChange"
  />
  <span>{{ checkIn }}</span>
  -
  <span>{{ checkOut }}</span>
</template>

<script>
import CalendarVue from "./components/calendar/Calendar.vue";

export default {
  name: "App",
  components: {
    Calendar: CalendarVue,
  },
  data() {
    return {
      price: "329 zł",
      rate: 3.27,
      reviewsCount: "47",
      checkIn: "",
      checkOut: "",
      availableDates: [
        { from: 1604185200000, to: 1605654000000 },
        { from: 1609542000000, to: 1609542000000 },
        { from: 1611442800000, to: 1611788400000 },
      ],
    };
  },
  methods: {
    onReservationChange({ startDate, endDate }) {
      this.checkIn = startDate;
      this.checkOut = endDate;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 32px;
}

button {
  cursor: pointer;
  display: block;
  outline: none;
}
</style>
