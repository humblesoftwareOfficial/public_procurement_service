export const isValidDate = (year: number, month: number, day: number) => {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

/**The date string must be in DD/MM/YYYY Format */
export const stringToDate = (date: string) => {
  try {
    const dateParts = date.split('/');
    if (!isValidDate(+dateParts[2], +dateParts[1], +dateParts[0])) {
      return null;
    }
    return new Date(`${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`);
  } catch (error) {
    return null;
  }
};

/**The date string must be in DD/MM/YYYY HH:MM:SS Format */
export const stringToFullDate = (date: string) => {
  try {
    const dateParts = date.split(' ');
    const day = dateParts[0];
    const time = dateParts[1];
    const dayParts = day.split('/');
    const timeParts = time.split(':');

    if (!isValidDate(+dayParts[2], +dayParts[1], +dayParts[0])) {
      console.log('not valid date')
      return null;
    }

    return new Date(
      `${dayParts[2]}-${dayParts[1]}-${dayParts[0]}T${timeParts[0]}:${timeParts[1]}:${timeParts[2]}`,
    );
  } catch (error) {
    console.log({ error })
    return null;
  }
};

export const formatIntervalDate = (startDate: Date, endDate: Date) => {
  const formatedEndDate = endDate;
  if (formatedEndDate) {
    formatedEndDate.setHours(23, 59, 59, 999);
  }
  const formatedOneDateFilter = endDate
    ? null
    : {
        startDate: new Date(startDate),
        endDate: new Date(startDate),
      };
  if (formatedOneDateFilter) {
    formatedOneDateFilter.startDate.setHours(0, 0, 0, 0);
    formatedOneDateFilter.endDate.setHours(23, 59, 59, 999);
  }
  return { formatedEndDate, formatedOneDateFilter };
};