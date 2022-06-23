export const formatDateToISO = (dateStr) => {
  return new Date(dateStr).toISOString().slice(0, 10);
};
