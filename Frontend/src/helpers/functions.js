export const getDate = (date) => {
  date = new Date(date).toDateString();
  return date.substring(4, 7) + " " + date.substring(11, 16);
};
