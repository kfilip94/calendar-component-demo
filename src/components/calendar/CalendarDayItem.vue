<template>
  <button
    :key="day.key"
    :class="{
      startDay: isStartDay,
      endDay: isEndDay,
      reservedDay: isReservedDay,
      today: isToday,
      unavailableDay: isUnavailableDay,
    }"
    @click="$emit('on-day-click', day)"
    class="day"
  >
    <span class="dayNumber">{{ day.number }}</span>
  </button>
</template>

<script>
export default {
  name: "CalendarDayItem",
  props: {
    startDate: Number,
    endDate: Number,
    day: Object,
    editMode: {
      type: String,
      validator: (value) => {
        return ["checkIn", "checkOut"].includes(value);
      },
    },
    lastAvailableDate: Number,
    todayDate: Number,
  },
  computed: {
    isStartDay() {
      return this.day.miliseconds === this.startDate;
    },

    isEndDay() {
      const { day, startDate, endDate } = this;
      return (
        day.miliseconds === endDate ||
        (day.miliseconds === startDate && !endDate)
      );
    },

    isReservedDay() {
      const { day, startDate, endDate } = this;
      return day.miliseconds > startDate && day.miliseconds < endDate;
    },

    isToday() {
      return this.day.miliseconds === this.todayDate;
    },

    isUnavailableDay() {
      const { day, startDate, lastAvailableDate, editMode } = this;
      return (
        !day.available ||
        (startDate && editMode === "checkOut" && day.miliseconds < startDate) ||
        (lastAvailableDate &&
          editMode === "checkOut" &&
          lastAvailableDate < day.miliseconds)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles.scss";

.day {
  height: 36px;
  border: 0;
  margin: 2px 0;
  background-color: transparent;
  padding: 0;

  .dayNumber {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
}

%reservedDay {
  background-color: $background-color;
  .dayNumber {
    background-color: $theme-color;
    color: white;
    border-radius: 50%;
    border-left: 50%;
  }
}

.startDay {
  @extend %reservedDay;
  background: linear-gradient(90deg, transparent 50%, #c3fef8 50%);
}

.endDay {
  @extend %reservedDay;
  background: linear-gradient(90deg, #c3fef8 50%, transparent 50%);
}

.startDay.endDay {
  background: none;
}

.today .dayNumber {
  border: 2px solid $theme-color;
  border-radius: 50%;
  box-sizing: border-box;
}

.reservedDay.today {
  background-color: #c3fef8;
}

.reservedDay {
  background-color: #c3fef8;
  color: #00dbb1;
}

.unavailableDay {
  color: lightgrey;
  cursor: auto;
  pointer-events: none;
}
</style>