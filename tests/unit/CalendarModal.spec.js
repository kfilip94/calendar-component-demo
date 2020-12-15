import { mount } from '@vue/test-utils'
import CalendarModal from '@/components/calendar/CalendarModal.vue';

describe('CalendarModal.vue', () => {
  const lastAvailableDate = Date.parse(new Date('2020-12-28'));
  const availableDates = [
    {
      from: Date.parse(new Date('2020-11-4')),
      to: Date.parse(new Date('2020-12-3'))
    }, {
      from: Date.parse(new Date('2020-12-12')),
      to: Date.parse(new Date('2020-12-16'))
    }, {
      from: Date.parse(new Date('2020-12-18')),
      to: lastAvailableDate
    }, {
      from: Date.parse(new Date('2020-12-30')),
      to: Date.parse(new Date('2021-1-24'))
    }
  ];
  
  const wrapper = mount(CalendarModal, {
    props: {
      selectedDate: new Date('2020-12-1'),
      availableDates
    }
  })

  it('select next month', async () => {
    await wrapper.find('[data-id="prevMonthBtn"]').trigger('click');
    expect(wrapper.element).toMatchSnapshot()
  })

  it('select previous month', async () => {
    await wrapper.setProps({
      selectedDate: new Date('2021-2-1')
    })
    await wrapper.find('[data-id="nextMonthBtn"]').trigger('click');
    expect(wrapper.element).toMatchSnapshot()
  })
});