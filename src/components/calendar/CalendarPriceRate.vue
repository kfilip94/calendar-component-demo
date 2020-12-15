<template>
  <div class="priceRateWrapper">
    <span class="price">{{ price }}</span>
    <div class="reviews">
      <CalendarStars :rate="rate" />
      <span class="reviewsCount">{{ reviewsCount }}</span>
    </div>
  </div>
</template>

<script>
import CalendarStars from "./CalendarStars";

export default {
  name: "CalendarPriceRate",
  components: {
    CalendarStars,
  },
  props: {
    price: String,
    rate: Number,
    reviewsCount: {
      type: String,
      default: "0",
    },
  },
};
</script>

<style lang="scss" scoped>
$star-size: 12px;
@import "./styles.scss";

.priceRateWrapper {
  box-sizing: border-box;
  display: block;
  padding-bottom: $padding;
  width: 100%;

  .reviews {
    display: flex;
  }

  .reviewsNumber {
    font-size: $font-size;
    font-weight: $font-weight-bold;
  }

  .price {
    display: block;
    font-size: $font-size-large;
    font-weight: $font-weight-bold;
    text-align: left;
    margin-bottom: $padding-small;
  }
}
</style>