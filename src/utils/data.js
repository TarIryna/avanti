export const tabsData = [
  {
    name: "Для жінок",
    link: "/women",
    image: "@/assets/images/women.jpg",
    query: "women",
    menu: "Жінки",
    filterName: "Жінки",
  },
  {
    name: "Для чоловіків",
    link: "/men",
    image: "@/assets/images/men.jpg",
    query: "men",
    menu: "Чоловіки",
    filterName: "Чоловіки",
  },
  {
    name: "Для дівчат",
    link: "/girls",
    image: "@/assets/images/girls.jpg",
    query: "girls",
    menu: "Дівчата",
    filterName: "Дівчата",
  },
  {
    name: "Для хлопчиків",
    link: "/boys",
    image: "@/assets/images/boys.jpg",
    query: "boys",
    menu: "Хлопці",
    filterName: "Хлопці",
  },
];

export const menuData = {
  Жінки: {
    "Зимове взуття": {
      "Кросівки зимові": "/women/winter-sneakers",
      "Черевики на каблуках": "/women/winter-heels",
      "Черевики на низькому": "/women/winter-boots",
      Угги: "/women/winter-uggs",
      Чоботи: "/women/winter-high",
      Ботфорти: "/women/winter-botforts",
    },
    "Літнє взуття": {
      "Босоніжки  і шльопанці на каблуках": "/women/summer-heels",
      Санділії: "/women/summer-sandals",
      "Шльопанці на низькому": "/women/summer-flats",
      "Пляжне взуття": "/women/summer-beach",
    },
    "Весна-осінь": {
      "Лофери, мокасини, сліпони": "/women/autumn-lofers",
      "Кросівки і кеди": "/women/autumn-sneakers",
      "Туфлі на каблуках": "/women/autumn-heels",
      "Туфлі закриті на шнурках": "/women/autumn-shoes",
    },
    "Демісезонне взуття": {
      "Черевики на каблуках": "/women/demi-heels",
      "Черевики на низькому": "/women/demi-boots",
      Чоботи: "women/demi-high",
    },
  },
  Чоловіки: {
    "Зимове взуття": {
      "Черевики класичні": "/men/winter-classic",
      "Черевики спортивні": "/men/winter-boots",
      Угги: "/men/winter-uggs",
    },
    "Літнє взуття": {
      Санділії: "/men/summer-sandals",
      Шльопанці: "/men/summer-flats",
      "Пляжне взуття": "/men/summer-beach",
    },
    "Весна-осінь": {
      "Лофери, мокасини, сліпони": "/men/autumn-lofers",
      "Кросівки і кеди": "/men/autumn-sneakers",
      "Туфлі класичні": "/men/autumn-shoes",
      "Туфлі комфорт": "/men/autumn-comfort",
    },
    "Демісезонне взуття": {
      "Черевики класичні": "/men/demi-classic",
      "Черевики спортивні": "/men/demi-boots",
    },
  },
  Дівчата: {
    "Зимове взуття": {
      "Черевики класичні": "/girls/winter-classic",
      "Черевики спортивні": "/girls/winter-boots",
      Угги: "/girls/winter-uggs",
    },
    "Літнє взуття": {
      Санділії: "/girls/summer-sandals",
      Шльопанці: "/girls/summer-flats",
      "Пляжне взуття": "/girls/summer-beach",
    },
    "Весна-осінь": {
      "Лофери, мокасини, сліпони": "/girls/autumn-lofers",
      "Кросівки і кеди": "/girls/autumn-sneakers",
      Туфлі: "/girls/autumn-shoes",
    },
    "Демісезонне взуття": {
      "Черевики класичні": "/girls/demi-classic",
      "Черевики спортивні": "/girls/demi-boots",
    },
  },
  Хлопці: {
    "Зимове взуття": {
      Черевики: "/boys/winter-boots",
      Угги: "/boys/winter-uggs",
    },
    "Літнє взуття": {
      Санділії: "/boys/summer-sandals",
      "Пляжне взуття": "/boys/summer-beach",
    },
    "Весна-осінь": {
      "Кросівки і кеди": "/boys/autumn-sneakers",
      Туфлі: "/boys/autumn-shoes",
    },
    "Демісезонне взуття": { Черевики: "/boys/demi-boots" },
  },
};

export const seasons = [
  {
    link: "winter",
    name: "Зимове взуття",
    query: "winter",
    filterName: "зима",
  },
  { link: "summer", name: "Літнє взуття", query: "summer", filterName: "літо" },
  {
    link: "autumn",
    name: "Весна-осінь",
    query: "autumn",
    filterName: "весна/осінь",
  },
  {
    link: "demi",
    name: "Демісезонне взуття",
    query: "demi",
    filterName: "демісезон",
  },
];

const getNameView = (string) => {
  const array = string.split("-");
  const result = array[array.length - 1];
  return result;
};

const makeUnique = (array) => {
  const newArray = [];
  array.map((item) => {
    if (newArray.find((newItem) => newItem.query === item.query)) return;
    else newArray.push(item);
  });
  return newArray;
};

export const views = (season, gender) => {
  let data = [];
  const filterByGender = gender
    ? tabsData.find((item) => item.query === gender).menu
    : null;
  const filterBySeason = season
    ? seasons.find((item) => item.link === season).name
    : null;
  if (filterByGender && filterBySeason) {
    const elements = menuData[filterByGender][filterBySeason];
    for (let i in elements) {
      data.push({
        name: i,
        query: getNameView(menuData[filterByGender][filterBySeason][i]),
      });
    }
  }
  if (filterByGender && !filterBySeason) {
    const elementsOfGender = menuData[filterByGender];
    for (let i in elementsOfGender) {
      const elements = menuData[filterByGender][i];
      for (let j in elements) {
        data.push({
          name: j,
          query: getNameView(menuData[filterByGender][i][j]),
        });
      }
    }
  }
  if (!filterByGender && filterBySeason) {
    for (let item in menuData) {
      const elementsOfSeason = menuData[item][filterBySeason];
      for (let i in elementsOfSeason) {
        data.push({
          name: i,
          query: getNameView(menuData[item][filterBySeason][i]),
        });
      }
    }
  }
  if (!filterByGender && !filterBySeason) {
    for (let item in menuData) {
      const elementsOfGender = menuData[item];
      for (let i in elementsOfGender) {
        const elementsOfSeason = menuData[item][i];
        for (let j in elementsOfSeason) {
          data.push({ name: j, query: getNameView(menuData[item][i][j]) });
        }
      }
    }
  }
  return makeUnique(data);
};

export const sizes = () => {
  const array = [];
  for (let i = 16; i < 50; i++) {
    array.push(i.toString());
  }
  return array;
};

export const materialList = [
  {
    name: "Натуральна шкіра",
    query: "natural",
    filterName: "Натуральна шкіра",
  },
  {
    name: "Екошкіра",
    query: "pu",
    filterName: "экокожа",
  },
];

export const colorsList = [
  {
    name: "білий",
    query: "Белый",
    filterName: "білий",
  },
  {
    name: "чорний",
    query: "Черный",
    filterName: "чорний",
  },
  {
    name: "бежевий",
    query: "Бежевый",
    filterName: "бежевий",
  },
  {
    name: "коричневий",
    query: "Коричневый",
    filterName: "коричневий",
  },
];

export const sortList = [
  {
    name: "ціною з найменшої",
    query: "priceUp",
    filterName: "ціною з найменшої",
  },
  {
    name: "ціною з навищої",
    query: "priceDown",
    filterName: "ціною з найвищої",
  },
  { name: "популярністю", query: "popular", filterName: "популярністю" },
  { name: "новинки", query: "new", filterName: "новинки" },
];

export const pageSizes = [
  {
    name: "24",
    query: "24",
    filterName: "24",
  },
  {
    name: "48",
    query: "48",
    filterName: "48",
  },
  {
    name: "72",
    query: "72",
    filterName: "72",
  },
];
