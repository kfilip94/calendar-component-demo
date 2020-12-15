<template>
  <div class="stars-container">
    <div
      v-for="star in stars"
      :key="star"
      :class="{
        checked: star <= selection.checkedStars,
        halfChecked: star === selection.halfChecked,
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
    selection: function ({ rate }) {
      if (rate >= 0 && rate <= 5) {
        let checkedStars = Math.floor(rate);
        const halfCheckedStar = Math.round((rate - checkedStars) * 2) / 2;

        if (halfCheckedStar === 1) {
          checkedStars++;
        }
        return {
          checkedStars,
          halfChecked: halfCheckedStar === 0.5 ? checkedStars + 1 : null,
        };
      } else {
        return { checkedStars: 0, halfChecked: null };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./styles.scss";

$star-size: 12px;
$star-checked-color: #369482;

.stars-container {
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