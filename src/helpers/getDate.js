export const getDate = (date) => {
  if (!date) {
    const today = new Date();
    // Вместо setHours используем setUTCHours, чтобы зафиксировать полночь по Гринвичу
    today.setUTCHours(0, 0, 0, 0); 
    return today;
  }

  const [day, month, year] = date.split(".");
  
  // При парсинге из строки "13.09.2026" также безопаснее использовать Date.UTC
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0, 0));
}


export const parseDate = (date) => {
  return new Date(date).toLocaleDateString("uk-UA");
}