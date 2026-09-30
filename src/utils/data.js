export const tabsData = [
  {
    name: "Жінки",
    link: "/women",
    image: "https://i.ibb.co/9j0mFhN/women.jpg",
    value: "women",
    menu: "Жінки",
    filterName: "Жінки",
  },
  {
    name: "Чоловіки",
    link: "/men",
    image: "https://i.ibb.co/SDQmrfXj/men.jpg",
    value: "men",
    menu: "Чоловіки",
    filterName: "Чоловіки",
  },
  {
    name: "Дівчата",
    link: "/girls",
    image: "https://i.ibb.co/TqbYcghL/girls.jpg",
    value: "girls",
    menu: "Дівчата",
    filterName: "Дівчата",
  },
  {
    name: "Хлопці",
    link: "/boys",
    image: "https://i.ibb.co/HDn9KfjC/boys.jpg",
    value: "boys",
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
        view: "winter-sneakers",
      },
      "Черевики на підборах": {
        gender: "women",
        season: "winter",
        view: "boots-heels",
      },
      "Черевики на низькому": {
        gender: "women",
        season: "winter",
        view: "boots",
      },
      Угги: { gender: "women", season: "winter", view: "uggs" },
      Чоботи: { gender: "women", season: "winter", view: "high" },
      Ботфорти: { gender: "women", season: "winter", view: "botforts"},
    },
    "Літнє взуття": {
      "Босоніжки і шльопанці на підборах": {
        gender: "women",
        season: "summer",
        view: "summer-heels",
      },
      Санділії: { gender: "women", season: "summer", view: "sandals" },
      Мюлі: { gender: "women", season: "summer", view: "muli-heels" },
      "Шльопанці на низькому": {
        gender: "women",
        season: "summer",
        view: "muli",
      },
      "Пляжне взуття": { gender: "women", season: "summer", view: "beach" },
    },
    "Весна-осінь": {
      "Лофери, мокасини": {
        gender: "women",
        season: "autumn",
        view: "lofers",
      },
    "Балетки, сліпони": {
        gender: "women",
        season: "autumn",
        view: "slippers",
      },
      "Кросівки і кеди": {
        gender: "women",
        season: "autumn",
        view: "sneakers",
      },
      "Туфлі на підборах": { gender: "women", season: "autumn", view: "heels" },
      "Туфлі закриті на шнурках": {
        gender: "women",
        season: "autumn",
        view: "shoes",
      },
       "Жіноче взуття комфорт": {
        gender: "women",
        season: "autumn",
        view: "comfort",
      },
        "Кімнатне взуття": {
        gender: "women",
        season: "autumn",
        view: "home",
      },
    },
    "Демісезонне взуття": {
      "Черевики на підборах": {
        gender: "women",
        season: "demi",
        view: "boots-heels",
      },
      "Черевики на низькому": {
        gender: "women",
        season: "demi",
        view: "boots",
      },
      Чоботи: { gender: "women", season: "demi", view: "high" },
      Ботфорти: { gender: "women", season: "demi", view: "botforts"},
    },
  },
  Чоловіки: {
    "Зимове взуття": {
      "Черевики класичні": { gender: "men", season: "winter", view: "boots-classic" },
      "Черевики спортивні": { gender: "men", season: "winter", view: "boots-sneakers" },
      "Черевики комфорт": { gender: "men", season: "winter", view: "boots-comfort" },
      Угги: { gender: "men", season: "winter", view: "uggs" },
    },
    "Літнє взуття": {
      Санділії: { gender: "men", season: "summer", view: "sandals" },
      Шльопанці: { gender: "men", season: "summer", view: "flats" },
      "Пляжне взуття": { gender: "men", season: "summer", view: "beach" },
    },
    "Весна-осінь": {
      "Лофери, мокасини": {
        gender: "men",
        season: "autumn",
        view: "lofers",
      },
       "Сліпони": {
        gender: "men",
        season: "autumn",
        view: "slippers",
      },
      "Кросівки і кеди": { gender: "men", season: "autumn", view: "sneakers" },
      "Туфлі класичні": { gender: "men", season: "autumn", view: "shoes" },
      "Туфлі комфорт": { gender: "men", season: "autumn", view: "comfort" },
      "Кімнатне взуття": {
        gender: "men",
        season: "autumn",
        view: "home",
      },
    },
    "Демісезонне взуття": {
      "Черевики класичні": { gender: "men", season: "demi", view: "boots-classic" },
      "Черевики спортивні": { gender: "men", season: "demi", view: "boots-sneakers" },
      "Черевики комфорт": { gender: "men", season: "demi", view: "boots-comfort" },
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
      "Лофери, мокасини": {
        gender: "girls",
        season: "autumn",
        view: "lofers",
      },
        "Балетки, сліпони": {
        gender: "girls",
        season: "autumn",
        view: "slippers",
      },
      "Кросівки і кеди": {
        gender: "girls",
        season: "autumn",
        view: "sneakers",
      },
        "Кімнатне взуття": {
        gender: "girls",
        season: "autumn",
        view: "home",
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
      Сліпони: { gender: "boys", season: "autumn", view: "slippers" },
      Лофери: { gender: "boys", season: "autumn", view: "lofers" },
      "Кімнатне взуття": {
        gender: "boys",
        season: "autumn",
        view: "home",
      },
    },
    "Демісезонне взуття": {
      Черевики: { gender: "boys", season: "demi", view: "boots" },
    },
  },
};

export const bagsData = [
  {name: "Кроссбоді", value: "bags-crossbody"},
  {name: "Сумки класичні жіночі", value: "bags-classic"},
  {name:"Дорожні сумки", value: "bags-travel"},
  {name: "Вечірні клатчі", value: "bags-clatch"},
  {name: "Гаманці", value: "bags-wallet"},
  {name: "Рюкзаки", value: "bags-backpack"},
  {name: "Сумки для ноутбуків", value: "bags-notebook"},
  ]

export const seasons = [
  {
    link: "winter",
    name: "Зимове взуття",
    value: "winter",
    filterName: "зима",
  },
  { link: "summer", name: "Літнє взуття", value: "summer", filterName: "літо" },
  {
    link: "autumn",
    name: "Весна-осінь",
    value: "autumn",
    filterName: "весна/осінь",
  },
  {
    link: "demi",
    name: "Демісезонне взуття",
    value: "demi",
    filterName: "демісезон",
  },
];

const getNameView = (item) => {
  const view = item?.view;
  const array = view?.split("-");

  const result =
    array?.length > 2 ? array[array.length - 1] : view;
  return result;
};


const makeUnique = (array) => {
  const newArray = [];
  array.map((item) => {
    if (newArray.find((newItem) => newItem.name === item.name)) return;
    else newArray.push(item);
  });
  return newArray;
};

export const views = (season, gender, type) => {
  if (type === "bags") return bagsData;
  let data = [];
  const filterByGender = gender
    ? tabsData.find((item) => item.value === gender)?.menu
    : null;
  const filterBySeason = season
    ? seasons.find((item) => item.link === season).name
    : null;
  if (filterByGender && filterBySeason) {
    const elements = menuData[filterByGender][filterBySeason];
    for (let i in elements) {
      data.push({
        name: i?.toString(),
        value: getNameView(menuData[filterByGender][filterBySeason][i]),
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
          value: getNameView(menuData[filterByGender][i][j]),
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
          value: getNameView(menuData[item][filterBySeason][i]),
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
          data.push({ name: j, value: getNameView(menuData[item][i][j]) });
        }
      }
    }
  }
  return makeUnique(data);
};

export const sizes = () => {
  // Генерируем массив из 34 элементов (от 16 до 49 включительно)
  return Array.from({ length: 50 - 16 }, (_, index) => {
    const sizeValue = (16 + index).toString();
    return {
      id: sizeValue,
      name: sizeValue
    };
  });
};

export const materialList = [
  {
    name: "Натуральна шкіра",
    value: "1",
    filterName: "Натуральна шкіра",
  },
  {
    name: "Екошкіра",
    value: "2",
    filterName: "Екошкіра",
  },
    {
    name: "Текстиль",
    value: "4",
    filterName: "Текстиль",
  },
];

export const colorsList = [
  {
    name: "білий",
    value: "2",
    filterName: "білий",
  },
  {
    name: "чорний",
    value: "41",
    filterName: "чорний",
  },
  {
    name: "бежевий",
    value: "1",
    filterName: "бежевий",
  },
  {
    name: "коричневий",
    value: "16",
    filterName: "коричневий",
  },
    {
    name: "сірий",
    value: "29",
    filterName: "сірий",
  },
];

export const sortList = [
  {
    name: "ціною з найменшої",
    value: "priceUp",
  },
  {
    name: "ціною з навищої",
    value: "priceDown",
  },
  { name: "популярністю", value: "popular"},
  { name: "новинки", value: "new" },
];

export const limits = [
  {
    name: "24",
    value: "24",
    filterName: "24",
  },
  {
    name: "48",
    value: "48",
    filterName: "48",
  },
  {
    name: "72",
    value: "72",
    filterName: "72",
  },
];
