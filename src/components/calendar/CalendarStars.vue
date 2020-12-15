<template>
  <div class="starsContainer">
    <div
      v-for="star in stars"
      :key="star"
      :class="{
        checked: star <= checkedStars.count,
        halfChecked: star === checkedStars.halfCheckedStar,
      }"
      class="star"
    ></div>
  </div>
</template>

<script>
export default {
  name: "CalendarStars",
  props: {
    rate: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      stars: [1, 2, 3, 4, 5],
    };
  },

  computed: {
    checkedStars() {
      const { rate } = this;
      if (rate && rate >= 0 && rate <= 5) {
        let count = Math.floor(rate);
        const halfCheckedStar = Math.round((rate - count) * 2) / 2;

        if (halfCheckedStar === 1) {
          count++;
        }
        return {
          count,
          halfCheckedStar: halfCheckedStar === 0.5 ? count + 1 : null,
        };
      } else {
        return { count: 0, halfCheckedStar: null };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles.scss";

$star-size: 12px;
$star-checked-color: #369482;

.starsContainer {
  display: flex;
  margin-right: $padding;

  .star {
    background: lightgrey;
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
    display: block;
    height: $star-size;
    width: $star-size;
  }

  .halfChecked {
    &:after {
      content: "";
      background: $star-checked-color;
      display: block;
      clip-path: polygon(50% 0%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
      width: $star-size;
      height: $star-size;
    }
  }

  .checked {
    background: $star-checked-color;
  }
}
</style>