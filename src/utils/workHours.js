// Whole hours within one work day; 24 means midnight at the end of that day.
export const calculateWorkHours = (start, end) => {
  if (start == null || end == null || String(start).trim() === '' || String(end).trim() === '') return null;
  const startHour = Number(start);
  const endHour = Number(end);
  if (!Number.isInteger(startHour) || !Number.isInteger(endHour) ||
      startHour < 0 || startHour > 23 || endHour < 1 || endHour > 24 || endHour <= startHour) return null;
  return endHour - startHour;
};
