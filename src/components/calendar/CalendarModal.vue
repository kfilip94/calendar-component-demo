<template>
  <div class="modalContainer">
    <div class="modalArrow" :style="arrowPosition"></div>
    <div class="modal">
      <div class="header">
        <button data-id="prevMonthBtn" class="navButton" @click="prevMonth">
          &lt;
        </button>
        <span class="monthLabel">{{ monthName }}</span>
        <button data-id="nextMonthBtn" class="navButton" @click="nextMonth">
          &gt;
        </button>
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
          :lastAvailableEndDate="lastAvailableEndDate"
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
  EDIT_MODES,
  editModeValidator,
} from "./CalendarUtils";
import CalendarDayItem from "./CalendarDayItem.vue";

const { CHECK_IN, CHECK_OUT } = EDIT_MODES;

export default {
  name: "CalendarGrid",
  components: { CalendarDayItem },
  props: {
    startDate: Number,
    endDate: Number,
    editMode: {
      type: String,
      validator: editModeValidator,
    },
    availableDates: Array,
  },

  data() {
    return {
      todayDate: getTodayDate(),
      selectedMonthDate: this.resetSelectedMonthDate(this.startDate),
      dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      days: [],
    };
  },

  mounted() {
    this.updateCalendarDays();
  },

  computed: {
    lastAvailableEndDate() {
      const { startDate, availableDates, getLastAvailableEndDate } = this;
      return startDate
        ? getLastAvailableEndDate(startDate, availableDates)
        : null;
    },

    monthName() {
      const month = this.selectedMonthDate.toLocaleString("en-US", {
        month: "long",
      });
      const year = this.selectedMonthDate.getFullYear();
      return `${month} ${year}`;
    },

    arrowPosition() {
      const arrowSide = this.editMode === CHECK_IN ? "left" : "right";
      return { [arrowSide]: "32px" };
    },
  },

  watch: {
    selectedMonthDate() {
      this.updateCalendarDays();
    },
    editMode() {
      if (this.editMode) {
        this.resetSelectedMonthDate(this.startDate);
      }
    },
  },

  methods: {
    updateCalendarDays() {
      this.days = getCalendarDays(this.selectedMonthDate, this.availableDates);
    },

    prevMonth() {
      this.selectedMonthDate = getPreviousMonthDate(this.selectedMonthDate);
    },

    nextMonth() {
      this.selectedMonthDate = getNextMonthDate(this.selectedMonthDate);
    },

    getLastAvailableEndDate(startDate, availableDates) {
      const availableEndDates = availableDates.find(
        ({ from, to }) => from <= startDate && startDate <= to
      );
      return availableEndDates ? availableEndDates.to : null;
    },

    editReservationDays(selectedDay) {
      let startDate = this.startDate;
      let endDate = this.endDate;
      let editMode = this.editMode;

      if (this.editMode === CHECK_IN) {
        startDate = selectedDay.miliseconds;
        editMode = CHECK_OUT;

        const lastAvailableEndDate = this.getLastAvailableEndDate(
          startDate,
          this.availableDates
        );

        //reset endDate if needed
        if (
          endDate &&
          (startDate > endDate || endDate > lastAvailableEndDate)
        ) {
          endDate = null;
        }
      } else if (this.editMode === CHECK_OUT) {
        endDate = selectedDay.miliseconds;
        editMode = null;
      }

      this.$emit("on-reservation-change", { startDate, endDate, editMode });
    },

    resetSelectedMonthDate(startDate) {
      return startDate ? new Date(startDate) : new Date();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles.scss";

.modalContainer {
  position: relative;
  width: 100%;

  .modalArrow {
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
    width: 100%;
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