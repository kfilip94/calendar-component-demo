 <template>
  <div class="calendar-wrapper">
    <CalendarPriceRate
      :price="price"
      :rate="rate"
      :reviewsCount="reviewsCount"
    />
    <div v-click-outside="resetEditMode">
      <CalendarDates
        :startDate="startDate"
        :endDate="endDate"
        :editMode="editMode"
        @onEditModeChange="updateEditMode"
      />
      <CalendarModal
        v-show="!!editMode"
        :startDate="startDate"
        :endDate="endDate"
        :editMode="editMode"
        :availableDates="availableDatesInMs"
        @onReservationChange="updateReservationDates"
      />
    </div>
  </div>
</template>

<script>
import { convertDatesToMs, convertDateToMs } from "./CalendarUtils.js";
import CalendarModal from "./CalendarModal.vue";
import CalendarDates from "./CalendarDates.vue";
import CalendarPriceRate from "./CalendarPriceRate.vue";

export default {
  name: "Calendar",
  components: {
    CalendarModal,
    CalendarDates,
    CalendarPriceRate,
  },
  props: {
    price: String,
    rate: Number,
    reviewsCount: String,
    availableDates: Array,
    checkInDate: Date,
    checkOutDate: Date,
  },
  data() {
    return {
      startDate: convertDateToMs(this.checkInDate),
      endDate: convertDateToMs(this.checkOutDate),
      editMode: null,
    };
  },
  computed: {
    availableDatesInMs() {
      return convertDatesToMs(this.availableDates);
    },
  },
  methods: {
    resetEditMode() {
      this.editMode = null;
    },

    updateEditMode(editMode) {
      this.editMode = editMode;
    },

    updateReservationDates({ startDate, endDate, editMode }) {
      this.startDate = startDate;
      this.endDate = endDate;
      this.editMode = editMode;

      const checkInDate = new Date(startDate);
      const checkOutDate = new Date(endDate);

      this.$emit("on-reservation-change", { checkInDate, checkOutDate });
    },
  },
  directives: {
    "click-outside": {
      beforeMount(el, binding) {
        el.clickOutsideEvent = (event) => {
          if (el !== event.target && !el.contains(event.target)) {
            binding.value(event, el);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unmounted(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles.scss";

.calendar-wrapper {
  background-color: #ececec;
  border: 1px solid lightgray;
  border-radius: 2px;
  box-sizing: border-box;
  padding: $padding;
  width: 320px;

  > *:first-child {
    border-bottom: 1px solid lightgrey;
    margin-bottom: $padding;
  }
}
</style>