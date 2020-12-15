<template>
  <button
    :key="day.key"
    :class="{
      startDay: isStartDay,
      endDay: isEndDay,
      reserved: isReserved,
      today: isToday,
      unavailable: isUnavailable,
    }"
    @click="selectDay"
    class="day"
  >
    <span class="dayNumber">{{ day.number }}</span>
  </button>
</template>

<script>
import { EDIT_MODES, editModeValidator } from "./CalendarUtils";
const { CHECK_OUT } = EDIT_MODES;

export default {
  name: "CalendarDayItem",
  props: {
    startDate: Number,
    endDate: Number,
    day: Object,
    editMode: {
      type: String,
      validator: editModeValidator,
    },
    lastAvailableEndDate: Number,
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

    isReserved() {
      const { day, startDate, endDate } = this;
      return day.miliseconds > startDate && day.miliseconds < endDate;
    },

    isToday() {
      return this.day.miliseconds === this.todayDate;
    },

    isUnavailable() {
      const { day, startDate, lastAvailableEndDate, editMode } = this;
      return (
        !day.available ||
        (startDate && editMode === CHECK_OUT && day.miliseconds < startDate) ||
        (lastAvailableEndDate &&
          editMode === CHECK_OUT &&
          lastAvailableEndDate < day.miliseconds)
      );
    },
  },
  methods: {
    selectDay() {
      if (!this.isUnavailable) {
        this.$emit("onDayClick", this.day);
      }
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

%reserved {
  background-color: $background-color;
  .dayNumber {
    background-color: $theme-color;
    color: white;
    border-radius: 50%;
    border-left: 50%;
  }
}

.startDay {
  @extend %reserved;
  background: linear-gradient(90deg, transparent 50%, #c3fef8 50%);
}

.endDay {
  @extend %reserved;
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

.reserved.today {
  background-color: #c3fef8;
}

.reserved {
  background-color: #c3fef8;
  color: $theme-color;
}

.unavailable {
  color: lightgrey;
  cursor: auto;
  pointer-events: none;
}
</style>