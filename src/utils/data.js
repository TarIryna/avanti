export const tabsData = [
  {
    name: "Для жінок",
    link: "/women",
    image: "https://i.ibb.co/9j0mFhN/women.jpg",
    query: "women",
    menu: "Жінки",
    filterName: "Жінки",
  },
  {
    name: "Для чоловіків",
    link: "/men",
    image: "https://i.ibb.co/SDQmrfXj/men.jpg",
    query: "men",
    menu: "Чоловіки",
    filterName: "Чоловіки",
  },
  {
    name: "Для дівчат",
    link: "/girls",
    image: "https://i.ibb.co/TqbYcghL/girls.jpg",
    query: "girls",
    menu: "Дівчата",
    filterName: "Дівчата",
  },
  {
    name: "Для хлопчиків",
    link: "/boys",
    image: "https://i.ibb.co/HDn9KfjC/boys.jpg",
    query: "boys",
    menu: "Хлопці",
    filterName: "Хлопці",
  },
];

export const menuData = {
  Жінки: {
    "Зимове взуття": {
      "Кросівки зимові": {
        gender: "women",
        season: "winter",
        view: "sneakers",
      },
      "Черевики на каблуках": {
        gender: "women",
        season: "winter",
        view: "heels",
      },
      "Черевики на низькому": {
        gender: "women",
        season: "winter",
        view: "boots",
      },
      Угги: { gender: "women", season: "winter", view: "uggs" },
      Чоботи: { gender: "women", season: "winter", view: "high" },
      Ботфорти: { gender: "women", season: "winter", view: "botforts" },
    },
    "Літнє взуття": {
      "Босоніжки і шльопанці на каблуках": {
        gender: "women",
        season: "summer",
        view: "heels",
      },
      Санділії: { gender: "women", season: "summer", view: "sandals" },
      "Шльопанці на низькому": {
        gender: "women",
        season: "summer",
        view: "flats",
      },
      "Пляжне взуття": { gender: "women", season: "summer", view: "beach" },
    },
    "Весна-осінь": {
      "Лофери, мокасини, сліпони": {
        gender: "women",
        season: "autumn",
        view: "lofers",
      },
      "Кросівки і кеди": {
        gender: "women",
        season: "autumn",
        view: "sneakers",
      },
      "Туфлі на каблуках": { gender: "women", season: "autumn", view: "heels" },
      "Туфлі закриті на шнурках": {
        gender: "women",
        season: "autumn",
        view: "shoes",
      },
    },
    "Демісезонне взуття": {
      "Черевики на каблуках": {
        gender: "women",
        season: "demi",
        view: "heels",
      },
      "Черевики на низькому": {
        gender: "women",
        season: "demi",
        view: "boots",
      },
      Чоботи: { gender: "women", season: "demi", view: "high" },
    },
  },
  Чоловіки: {
    "Зимове взуття": {
      "Черевики класичні": { gender: "men", season: "winter", view: "classic" },
      "Черевики спортивні": { gender: "men", season: "winter", view: "boots" },
      Угги: { gender: "men", season: "winter", view: "uggs" },
    },
    "Літнє взуття": {
      Санділії: { gender: "men", season: "summer", view: "sandals" },
      Шльопанці: { gender: "men", season: "summer", view: "flats" },
      "Пляжне взуття": { gender: "men", season: "summer", view: "beach" },
    },
    "Весна-осінь": {
      "Лофери, мокасини, сліпони": {
        gender: "men",
        season: "autumn",
        view: "lofers",
      },
      "Кросівки і кеди": { gender: "men", season: "autumn", view: "sneakers" },
      "Туфлі класичні": { gender: "men", season: "autumn", view: "shoes" },
      "Туфлі комфорт": { gender: "men", season: "autumn", view: "comfort" },
    },
    "Демісезонне взуття": {
      "Черевики класичні": { gender: "men", season: "demi", view: "classic" },
      "Черевики спортивні": { gender: "men", season: "demi", view: "boots" },
    },
  },
  Дівчата: {
    "Зимове взуття": {
      "Черевики класичні": {
        gender: "girls",
        season: "winter",
        view: "classic",
      },
      "Черевики спортивні": {
        gender: "girls",
        season: "winter",
        view: "boots",
      },
      Угги: { gender: "girls", season: "winter", view: "uggs" },
    },
    "Літнє взуття": {
      Санділії: { gender: "girls", season: "summer", view: "sandals" },
      Шльопанці: { gender: "girls", season: "summer", view: "flats" },
      "Пляжне взуття": { gender: "girls", season: "summer", view: "beach" },
    },
    "Весна-осінь": {
      "Лофери, мокасини, сліпони": {
        gender: "girls",
        season: "autumn",
        view: "lofers",
      },
      "Кросівки і кеди": {
        gender: "girls",
        season: "autumn",
        view: "sneakers",
      },
      Туфлі: { gender: "girls", season: "autumn", view: "shoes" },
    },
    "Демісезонне взуття": {
      "Черевики класичні": { gender: "girls", season: "demi", view: "classic" },
      "Черевики спортивні": { gender: "girls", season: "demi", view: "boots" },
    },
  },
  Хлопці: {
    "Зимове взуття": {
      Черевики: { gender: "boys", season: "winter", view: "boots" },
      Угги: { gender: "boys", season: "winter", view: "uggs" },
    },
    "Літнє взуття": {
      Санділії: { gender: "boys", season: "summer", view: "sandals" },
      "Пляжне взуття": { gender: "boys", season: "summer", view: "beach" },
    },
    "Весна-осінь": {
      "Кросівки і кеди": { gender: "boys", season: "autumn", view: "sneakers" },
      Туфлі: { gender: "boys", season: "autumn", view: "shoes" },
    },
    "Демісезонне взуття": {
      Черевики: { gender: "boys", season: "demi", view: "boots" },
    },
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

const getNameView = (item) => {
  const view = item?.view;
  const array = view?.split("-");
  const result = array?.length ? array[array.length - 1] : null;
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

export const limits = [
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
