export const years = [
 {
   "value": 1,
   "name": "2013-1 Весна-лето"
 },
 {
   "value": 2,
   "name": "2013-2 Осень-зима"
 },
 {
   "value": 3,
   "name": "2012-2 Осень-зима"
 },
 {
   "value": 4,
   "name": "2011-2 Осень зима"
 },
 {
   "value": 5,
   "name": "2012-1 Весна-лето"
 },
 {
   "value": 6,
   "name": "2010-1 Весна-лето"
 },
 {
   "value": 7,
   "name": "2010-2 Осень-зима"
 },
 {
   "value": 8,
   "name": "2011-1 Весна-лето"
 },
 {
   "value": 9,
   "name": "2009-1 Весна-лето"
 },
 {
   "value": 10,
   "name": "2009-2 Осень-зима"
 },
 {
   "value": 11,
   "name": "2008"
 },
 {
   "value": 12,
   "name": "2007"
 },
 {
   "value": 13,
   "name": "2006"
 },
 {
   "value": 14,
   "name": "2004"
 },
 {
   "value": 15,
   "name": "2014-1 Весна-лето"
 },
 {
   "value": 16,
   "name": "2014-2 Осень-зима"
 },
 {
   "value": 17,
   "name": "2015-1 Лето"
 },
 {
   "value": 18,
   "name": "2015-2 Осень"
 },
 {
   "value": 19,
   "name": "2016-1 Лето"
 },
 {
   "value": 20,
   "name": "2016-2 Зима"
 },
 {
   "value": 21,
   "name": "2017-1 Лето"
 },
 {
   "value": 22,
   "name": "2017-2 Зима"
 },
 {
   "value": 23,
   "name": "2018-1 Лето"
 },
 {
   "value": 24,
   "name": "2018-2 Зима"
 },
 {
   "value": 25,
   "name": "2019-1 Лето"
 },
 {
   "value": 26,
   "name": "2019-2 Зима"
 },
 {
   "value": 27,
   "name": "2020-1 Лето"
 },
 {
   "value": 28,
   "name": "2020-2 Зима"
 },
 {
   "value": 29,
   "name": "2021-1 Лето"
 },
 {
   "value": 30,
   "name": "2021-2 Зима"
 },
 {
   "value": 31,
   "name": "2022-1 Лето"
 },
 {
   "value": 32,
   "name": "2022-2 Зима"
 },
 {
   "value": 33,
   "name": "2023-1 Лето"
 },
 {
   "value": 34,
   "name": "2023-2 Зима"
 },
 {
   "value": 35,
   "name": "2024-1 Лето"
 },
 {
   "value": 36,
   "name": "2024-2 Зима"
 },
 {
   "value": 37,
   "name": "2025-1 Лето"
 },
 {
   "value": 38,
   "name": "2025-2 Зима"
 },
 {
   "value": 39,
   "name": "2026-1 Лето"
 },
  {
   "value": 40,
   "name": "2026-2 Лето"
 }
]

export const getDefaultYear = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const second = currentMonth <= 5 ? 1 : 2;
  const query = `${currentYear}-${second}`
  return years.find(i => i.name.includes(query))
}


export const getYearById = (id) => {
  return years.find(i => Number(i.value) === Number(id)).name
}