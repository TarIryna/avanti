export const getSortParam = (sort) => {
  switch (sort) {
    case "priceUp":
      return { price: 1 };
    case "priceDown":
      return { price: -1 };
    case "popular":
      return { pop: -1 };
    case "new":
      return { code: -1 };
    default:
      return { code: -1, pop: -1 };
  }
};


export const getSeasonPriorityByDate = () => {
  const month = new Date().getMonth() + 1;

  if ([12, 1, 2].includes(month)) {
    return ["winter", "autumn", "summer"];
  }

  if ([3, 4, 5, 6, 7, 8].includes(month)) {
    return ["summer", "autumn", "winter"];
  }

  return ["autumn", "winter", "summer"];
};
