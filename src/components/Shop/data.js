export const shopMenuData = [
    { id: 1, name: "Продаж", value: "sale"},
    { id: 2, name: "Прихід", value: "arrival"},
    { id: 3, name: "Списання", value: "decrease"},
    { id: 4, name: "Повернення", value: "return"},
    { id: 5, name: "Ревізія", value: "audit"},
    { id: 6, name: "Внутрішня продажа", value: "inside"},
    { id: 7, name: "Переоцінка", value: "revaluation"},
    { id: 8, name: "Перекидка між кодами", value: "inside-redirect"},
]

export const shopsData = [
    {id: 1, short: "А1", name: "Аванті 1", isShop: true, adress: "вул.Корзо, 10"},
    {id: 2, short: "А2", name: "Аванті 2", isShop: true, adress: "вул.Заньковецької, 2"},
    {id: 3, short: "СКЛ", name: "Склад", isShop: false, adress: "Склад" },
    {id: 4, short: "Розетка", name: "В дорозі до клієнта Розетка", isShop: false, adress: "Розетка" },
    {id: 5, short: "Пром", name: "В дорозі до клієнта Пром", isShop: false, adress: "Пром" },
    {id: 6, short: "Сайт", name: "В дорозі до клієнта Сайт", isShop: false, adress: "Сайт" },
]

export const getOperationName = (value) => {
    return shopMenuData.find(i => i.value === value)?.name
}

export const getShortShopName = (id) => {
    return shopsData.find(i => i.id === Number(id))?.short
}

export const getShopAdress = (id) => {
    return shopsData.find(i => i.id === Number(id))?.adress ?? ""
}