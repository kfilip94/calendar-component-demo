const isDateAvailable = (miliseconds, availableDates) => {
  return (
    !!availableDates.some(
      ({ from, to }) => miliseconds >= from && miliseconds <= to
    ) && miliseconds >= getTodayDate()
  );
};

const getDays = (startDate, endDate, availableDates) => {
  const startDateMs = Date.parse(startDate);
  const endDateMs = Date.parse(endDate);

  const daysArray = [];
  let currentDate = startDate;
 
  while (Date.parse(currentDate) <= endDateMs) {
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentDateMs = Date.parse(currentDate);

    const obj = {
      number: currentDay,
      key: `${currentDateMs}${startDateMs}${endDateMs}`,
      miliseconds: currentDateMs,
      date: currentDate,
      available: isDateAvailable(currentDateMs, availableDates)
    };

    daysArray.push(obj);
    currentDate = new Date(currentYear, currentMonth, currentDay + 1);
  }

  return daysArray;
};

export const getCalendarDays = (dateObj = new Date(), availableDates = []) => {
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();

  const lastDayInPrevMonth = new Date(year, month, 0);
  const numberInMonth = lastDayInPrevMonth.getDate();
  const numberInWeek = lastDayInPrevMonth.getDay();
  const startDay = numberInMonth - numberInWeek;
  const startDate = new Date(year, month - 1, startDay);

  const lastDayInCurrentMonth = new Date(year, month + 1, 0);
  const endDay = 6 - lastDayInCurrentMonth.getDay();
  const endDate = new Date(year, month + 1, endDay);

  const days = getDays(startDate, endDate, availableDates);
  return days;
};

export const getPreviousMonthDate = (dateObj) => {
  const month = dateObj.getMonth() - 1;
  const year = dateObj.getFullYear();
  return new Date(year, month, 1);
};

export const getNextMonthDate = (dateObj) => {
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return new Date(year, month, 1);
};

export const getTodayDate = () => {
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = dateNow.getMonth();
  const day = dateNow.getDate();
  return Date.parse(new Date(year, month, day));
};

export const EDIT_MODES = {
  CHECK_IN: "checkIn",
  CHECK_OUT: "checkOut",
}

export const editModeValidator = (value) => {
  const { CHECK_IN, CHECK_OUT } = EDIT_MODES;
  return [CHECK_IN, CHECK_OUT].includes(value);
}