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


export const getSeasonPriorityByDate = (date = new Date()) => {
  const month = Number(new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Kyiv', month: 'numeric',
  }).format(date));

  if ([11, 12, 1].includes(month)) {
    return [1, 3, 14];
  }

  if ([2, 10].includes(month)) {
    return [3,  1, 14];
  }

  if ([5, 6, 7 ].includes(month)) {
    return [2, 16, 17, 14, 18];
  }

   if ([3, 4 ].includes(month)) {
    return [14, 16, 17, 2 ];
  }

  return [14, 16, 17, 18, 1];
};
