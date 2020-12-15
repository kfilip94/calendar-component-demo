import { shallowMount } from '@vue/test-utils'
import CalendarPriceRate from '@/components/calendar/CalendarPriceRate.vue';

describe('CalendarPriceRate.vue', () => {
  const reviewsCount = '72';
  const price = '991zł'
  const wrapper = shallowMount(CalendarPriceRate, {
    props: { reviewsCount, price }
  })

  it('renders props.reviewsCount when passed', () => {
    expect(wrapper.text()).toContain(reviewsCount)
  })

  it('renders props.price when passed', () => {
    expect(wrapper.text()).toContain(price)
  })
})