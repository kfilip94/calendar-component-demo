 <template>
  <div class="dates-wrapper">
    <span class="label">Dates</span>
    <div class="dates-container">
      <button
        data-id="checkInBtn"
        class="dates-button"
        @click="changeEditMode(CHECK_IN)"
        :class="{
          active: editMode && editMode === CHECK_IN,
        }"
      >
        {{ startDateLabel }}
      </button>
      <ArrowIcon class="arrowIcon" />
      <button
        data-id="checkOutBtn"
        class="dates-button"
        @click="changeEditMode(CHECK_OUT)"
        :class="{
          active: editMode && editMode === CHECK_OUT,
        }"
      >
        {{ endDateLabel }}
      </button>
    </div>
  </div>
</template>

<script>
import ArrowIcon from "@/components/icons/ArrowIcon.vue";
import { EDIT_MODES, editModeValidator } from './CalendarUtils.js';

const { CHECK_IN, CHECK_OUT } = EDIT_MODES;

export default {
  name: "CalendarDates",
  components: {
    ArrowIcon,
  },
  data() {
    return { CHECK_IN, CHECK_OUT }
  },
  props: {
    startDate: Number,
    endDate: Number,
    editMode: {
      type: String,
      validator: editModeValidator,
    }
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
      this.$emit("onEditModeChange", mode);
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