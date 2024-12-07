export const formatDateToLocale = (date) => {
  const formattedDate = new Intl.DateTimeFormat(navigator.language).format(new Date(date));
  return formattedDate;
};