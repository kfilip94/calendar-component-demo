import { shallowMount } from '@vue/test-utils'
import CalendarStars from '@/components/calendar/CalendarStars.vue';

describe('CalendarStars.vue', () => {
  const testData = [
    {
      description: 'return 0 checked stars when no "rate" prop passes',
      props: { rate: null },
      result: { count: 0, halfCheckedStar: null }
    },
    { 
      description: 'return no half-checked star when "rate" decimal < 0.25',
      props: { rate: 3.24 },
      result: { count: 3, halfCheckedStar: null }
    },
    {
      description: 'return half-checked star when "rate" decimal >= 0.25 && < 0.75',
      props: { rate: 3.25 },
      result: { count: 3, halfCheckedStar: 4 }
    },
    {
      description: 'return additional checked star when "rate" decimal >= 0.75',
      props: { rate: 3.75 },
      result: { count: 4, halfCheckedStar: null }
    },
    {
      description: 'return 0 checked stars when "rate" is out of "1 to 5" scale',
      props: { rate: 6 },
      result: { count: 0, halfCheckedStar: null }
    }
  ];

  testData.forEach(({ description, props, result }) => 
    it(description, () => {
      const wrapper = shallowMount(CalendarStars, {
        props
      })

      const checkedElements = wrapper.findAll('.checked');
      expect(checkedElements.length).toBe(result.count);

      if(result.halfCheckedStar === null) {
        expect(wrapper.find('.halfCheckedStar').exists()).toBe(false);
      } else {
        const startElements = wrapper.findAll('.star');
        expect(startElements[result.halfCheckedStar - 1].classes('halfChecked')).toBe(true)
      }
    })
  )
})