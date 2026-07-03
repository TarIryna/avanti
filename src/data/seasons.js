export const seasonData = [
 {
   "id": 1,
   "value": "winter",
   "name": "Зима",
   "ukr": "Зима",
   "eng": "winter",
   "rozetka": "Зимняя",
   "code": '4'
 },
 {
   "id": 2,
   "value": "summer",
   "name": "Лето",
   "ukr": "Літо",
   "eng": "summer",
   "rozetka": "Летняя; Весенне-летняя",
   "code": '1'
 },
 {
   "id": 3,
   "value": "demi",
   "name": "Демисезон",
   "ukr": "Демісезон",
   "eng": "demi",
   "rozetka": "Осенне-зимняя; Осенняя",
   "code": '3'
 },
 {
   "id": 11,
   "value": "beach",
   "name": "Пляж",
   "ukr": "Пляж",
   "eng": "beach",
   "rozetka": "Летняя",
   "code": '6'
 },
 {
   "id": 12,
   "value": "flats",
   "name": "Тапочки",
   "ukr": "Тапочки",
   "eng": "flats",
   "rozetka": "",
   "code": '0'
 },
 {
   "id": 13,
   "value": "bags",
   "name": "Сумки",
   "ukr": "Сумки",
   "eng": "bags",
   "rozetka": "",
   "code": '7'
 },
 {
   "id": 14,
   "value": "autumn",
   "name": "Осень",
   "ukr": "Осінь-Весна",
   "eng": "autumn",
   "rozetka": "Весенне-летняя; Весенняя; Осенняя; Осенне-весенняя",
   "code": '2'
 },
 {
   "id": 15,
   "value": "accessories",
   "name": "Мелочь",
   "ukr": "Аксесуари",
   "eng": "accessories",
   "rozetka": "",
   "code": '8'
 },
 {
   "id": 16,
   "value": "textile",
   "name": "Текстиль",
   "ukr": "Текстиль",
   "eng": "autumn",
   "rozetka": "Весенняя; Весенне-летняя; Летняя",
   "code": '2'
 },
 {
   "id": 17,
   "value": "spring",
   "name": "Весна",
   "ukr": "Перфорація",
   "eng": "autumn",
   "rozetka": "Весенняя; Весенне-летняя; Летняя",
   "code": '2'
 },
 {
   "id": 18,
   "value": "autumn",
   "name": "Туфли классика",
   "ukr": "Осінь-Весна",
   "eng": "autumn",
   "rozetka": "",
   "code": '2'
 }
]

export const getCodePart = (value) => {
  return seasonData.find(i => value === i.value)?.code
}