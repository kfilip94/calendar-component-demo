<template>
  <div class="modalContainer">
    <div class="modaArrow" :style="arrowPosition"></div>
    <div class="modal">
      <div class="header">
        <button class="navButton" @click="prevMonth">&lt;</button>
        <span class="monthLabel">{{ monthName }}</span>
        <button class="navButton" @click="nextMonth">&gt;</button>
      </div>
      <div class="monthGrid">
        <div v-for="dayName in dayNames" :key="dayName" class="dayName">
          {{ dayName }}
        </div>
        <CalendarDayItem
          v-for="day in days"
          :key="day.key"
          :day="day"
          :startDate="startDate"
          :endDate="endDate"
          :lastAvailableDate="lastAvailableDate"
          :todayDate="todayDate"
          :editMode="editMode"
          @onDayClick="editReservationDays"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCalendarDays,
  getPreviousMonthDate,
  getNextMonthDate,
  getTodayDate,
} from "./CalendarUtils";
import CalendarDayItem from "./CalendarDayItem.vue";

export default {
  name: "CalendarGrid",
  components: { CalendarDayItem },
  props: {
    startDate: Number,
    endDate: Number,
    editMode: {
      type: String,
      validator: (value) => {
        return ["checkIn", "checkOut"].includes(value);
      },
    },
    availableDates: Array,
  },

  data() {
    return {
      todayDate: getTodayDate(),
      selectedDate: new Date(),
      dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      days: [],
    };
  },

  mounted() {
    this.updateCalendarDays();
  },

  computed: {
    lastAvailableDate() {
      if (this.startDate) {
        const availableDates = this.availableDates.find(
          ({ from, to }) => from <= this.startDate && this.startDate <= to
        );
        return availableDates ? availableDates.to : null;
      }
      return null;
    },

    monthName() {
      const month = this.selectedDate.toLocaleString("default", {
        month: "long",
      });
      const year = this.selectedDate.getFullYear();
      return `${month} ${year}`;
    },

    arrowPosition() {
      const arrowSide = this.editMode === "checkIn" ? "left" : "right";
      return { [arrowSide]: "32px" };
    },
  },

  watch: {
    selectedDate() {
      this.updateCalendarDays();
    },
  },

  methods: {
    updateCalendarDays() {
      this.days = getCalendarDays(this.selectedDate, this.availableDates);
    },

    prevMonth() {
      this.selectedDate = getPreviousMonthDate(this.selectedDate);
    },

    nextMonth() {
      this.selectedDate = getNextMonthDate(this.selectedDate);
    },

    editReservationDays(selectedDay) {
      let startDate = this.startDate;
      let endDate = this.endDate;
      let editMode = this.editMode;

      if (this.editMode === "checkOut") {
        endDate = selectedDay.miliseconds;
        editMode = null;
      } else if (this.editMode === "checkIn") {
        startDate = selectedDay.miliseconds;
        if (endDate && selectedDay.miliseconds > endDate) {
          endDate = null;
        }
        if (endDate > this.lastAvailableDate) {
          endDate = null;
        }
        editMode = "checkOut";
      }

      this.$emit("on-reservation-change", { startDate, endDate, editMode });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles.scss";

.modalContainer {
  position: relative;
  width: 100%;

  .modaArrow {
    box-shadow: 0px 0px 4px 0px rgba(122, 122, 122, 0.5);
    display: block;
    width: 12px;
    height: 12px;
    position: absolute;
    background: white;
    border: $border;
    transform: rotate(45deg);
    top: 1px;
  }

  .modal {
    background-color: white;
    top: 8px;
    border-radius: 2px;
    position: absolute;
    width: 100%;
    overflow: hidden;
    box-shadow: 0px 0px 4px 0px rgba(122, 122, 122, 0.5);
  }

  .monthGrid {
    background-color: white;
    box-sizing: border-box;
    color: grey;
    display: grid;
    font-size: $font-size;
    grid-template-columns: repeat(7, 1fr);
    padding: $padding;
    width: 100%;
  }

  .header {
    background-color: $theme-color;
    color: white;
    font-style: bold;
    padding: $padding;
    display: flex;
    justify-content: space-between;
    font-weight: $font-weight-bold;
  }

  .navButton {
    background: transparent;
    border: 0;
    font-weight: $font-weight-bold;
    cursor: pointer;
    text-decoration: underline;
    outline: none;
  }

  .monthLabel {
    text-transform: capitalize;
  }
}
</style>