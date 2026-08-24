export const getDate = (date) => {
  if (!date) return null;

  const [day, month, year] = date.split(".");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );
}

export const parseDate = (date) => {
  return new Date(date).toLocaleDateString("uk-UA");
}