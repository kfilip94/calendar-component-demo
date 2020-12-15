import { mount } from '@vue/test-utils'
import CalendarDayItem from '@/components/calendar/CalendarDayItem.vue';
import { EDIT_MODES } from '@/components/calendar/CalendarUtils.js';

describe('CalendarDayItem.vue', () => {
  const testDate = new Date('2020-12-20');
  const day = {
    number: 20,
    key: 'key',
    miliseconds: Date.parse(testDate),
    date: testDate,
    available: true
  };

  const wrapper = mount(CalendarDayItem, {
    props: {
      day,
      editMode: EDIT_MODES.CHECK_IN,
      startDate: Date.parse(new Date('2020-12-18')),
      lastAvailableEndDate: null
    }
  })

  it('unavailable to check when "booked" or lesser than today date', async () => {
    await wrapper.setProps({ day: {...day, available: false }});
    await wrapper.find('button').trigger('click');
    expect(!!wrapper.emitted().onDayClick).toBe(false)
  })

  it('unavailable as "check out" date when "startDate" is greater than current date', async () => {
    await wrapper.setProps({
      day,
      startDate: Date.parse(new Date('2020-12-21')),
      editMode: EDIT_MODES.CHECK_OUT
    });
    await wrapper.find('button').trigger('click');
    expect(!!wrapper.emitted().onDayClick).toBe(false)
  })

  it('unavailable as "check out" date when "last available date" is lesser than current date', async () => {
    await wrapper.setProps({
      day, startDate: Date.parse(new Date('2020-12-18')),
      lastAvailableEndDate: Date.parse(new Date('2020-12-19')),
      editMode: EDIT_MODES.CHECK_OUT
    });
    await wrapper.find('button').trigger('click');
    expect(!!wrapper.emitted().onDayClick).toBe(false)
  })

  it('available as "check in" date if "startDate" already exists', async () => {
    await wrapper.setProps({
      day,
      startDay: Date.parse(new Date('2020-12-21')),
      editMode: EDIT_MODES.CHECK_IN
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted().onDayClick[0]).toStrictEqual([day])
  })
})