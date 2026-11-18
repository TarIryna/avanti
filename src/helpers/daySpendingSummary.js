export const daySpendingSummary = (spendings = []) => {
  const staffHours = new Map();
  const expenses = [];
  let totalExpenses = 0;
  for (const item of spendings) {
    if (Number(item.type) === 13) {
      const staff = item.staff == null ? null : Number(item.staff);
      if (!staffHours.has(staff)) staffHours.set(staff, { staff, hours: null });
      const hours = Number(item.hours);
      if (item.hours != null && Number.isFinite(hours) && hours > 0) {
        const entry = staffHours.get(staff);
        entry.hours = (entry.hours || 0) + hours;
      }
    } else {
      const amount = Number(item.amount);
      expenses.push(item);
      if (Number.isFinite(amount)) totalExpenses += amount;
    }
  }
  return {
    workers: [...staffHours.values()],
    expenses,
    totalExpenses: Math.round(totalExpenses * 100) / 100,
  };
};
