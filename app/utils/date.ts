export const isoDateToString = (isoDate: string | Date) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString();
};
