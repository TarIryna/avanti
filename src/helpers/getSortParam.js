export const getSortParam = (sort) => {
  switch (sort) {
    case "priceUp":
      return { price: 1 };
      break;
    case "priceDown":
      return { price: -1 };
      break;
    case "popular":
      return { pop: -1 };
      break;
    case "new":
      return { code: -1 };
      break;

    default:
      return {};
      break;
  }
};
