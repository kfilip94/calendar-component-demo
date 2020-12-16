<template>
  <Calendar
    :price="price"
    :rate="rate"
    :reviewsCount="reviewsCount"
    :availableDates="availableDates"
    :checkInDate="new Date('2020-12-24')"
    :checkOutDate="new Date('2020-12-26')"
    @onReservationChange="onReservationChange"
  />
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
      checkInDate: null,
      checkOutDate: null,
      availableDates: [
        { from: new Date("2020-12-20"), to: new Date("2020-12-28") },
        { from: new Date("2020-12-30"), to: new Date("2021-1-4") },
        { from: new Date("2021-1-8"), to: new Date("2021-1-8") },
        { from: new Date("2021-1-10"), to: new Date("2021-1-23") },
      ],
    };
  },
  methods: {
    onReservationChange({ checkInDate, checkOutDate }) {
      this.checkInDate = checkInDate;
      this.checkOutDate = checkOutDate;
    },
  },
};
</script>

<style>
body {
  height: 100vh;
  width: 100vw;
}

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
