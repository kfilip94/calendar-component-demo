import { shallowMount } from '@vue/test-utils'
import CalendarDates from '@/components/calendar/CalendarDates.vue';
import { EDIT_MODES } from '@/components/calendar/CalendarUtils.js';

describe('CalendarDates.vue', () => {
  const wrapper = shallowMount(CalendarDates)

  it('enter check-in mode', async () => {
    await wrapper.find('[data-id="checkInBtn"]').trigger('click');
    expect(wrapper.emitted().onEditModeChange[0]).toEqual([EDIT_MODES.CHECK_IN])
  })

  it('enter check-out mode', async () => {
    await wrapper.find('[data-id="checkOutBtn"]').trigger('click');
    expect(wrapper.emitted().onEditModeChange[1]).toEqual([EDIT_MODES.CHECK_OUT])
  })
})