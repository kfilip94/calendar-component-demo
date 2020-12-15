 <template>
  <div class="dates-wrapper">
    <span class="label">Dates</span>
    <div class="dates-container">
      <button
        class="dates-button"
        @click="changeEditMode('checkIn')"
        :class="{
          active: editMode && editMode === 'checkIn',
        }"
      >
        {{ startDateLabel }}
      </button>
      <ArrowIcon class="arrowIcon" />
      <button
        class="dates-button"
        @click="changeEditMode('checkOut')"
        :class="{
          active: editMode && editMode === 'checkOut',
        }"
      >
        {{ endDateLabel }}
      </button>
    </div>
  </div>
</template>

<script>
import ArrowIcon from "./../icons/ArrowIcon.vue";

export default {
  name: "CalendarDates",
  components: {
    ArrowIcon,
  },
  props: {
    startDate: Number,
    endDate: Number,
    validator: (value) => {
      return ["checkIn", "checkOut"].includes(value);
    },
  },
  computed: {
    startDateLabel: function () {
      return this.startDate
        ? new Date(this.startDate).toLocaleDateString()
        : "Check In";
    },
    endDateLabel: function () {
      return this.endDate
        ? new Date(this.endDate).toLocaleDateString()
        : "Check Out";
    },
  },
  methods: {
    changeEditMode(mode) {
      this.$emit("on-edit-mode-change", mode);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles.scss";

.dates-wrapper {
  width: 100%;

  .dates-container {
    border: $border;
    border-radius: $border-radius;
    box-sizing: border-box;
    display: flex;
    padding: $padding-small;
    width: 100%;
  }

  .dates-button {
    background-color: transparent;
    border: 0;
    border-radius: $border-radius;
    flex: 1;
    padding: 4px;
    text-align: left;
    width: auto;
  }

  .active {
    background-color: rgba(0, 219, 177, 0.3);
  }

  .label {
    display: block;
    font-size: $font-size;
    font-weight: bold;
    margin-bottom: $padding-small;
    text-align: start;
    width: 100%;
  }
  .arrowIcon {
    display: block;
    width: 24px;
    padding: 0 8px;
  }
}
</style>