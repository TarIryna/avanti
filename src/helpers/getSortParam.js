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

  if ([11, 12, 1].includes(month)) {
    return ["winter", "demi", "autumn"];
  }

  if ([2, 10].includes(month)) {
    return ["demi",  "winter", "autumn"];
  }

  if ([5, 6, 7 ].includes(month)) {
    return ["summer", "autumn"];
  }

   if ([3, 4 ].includes(month)) {
    return ["autumn", "summer" ];
  }

  return ["autumn", "winter"];
};
