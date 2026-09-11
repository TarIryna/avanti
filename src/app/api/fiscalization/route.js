// // // app/actions/fiscalize.js
// 'use server'

// // Конфигурация ключей для каждого ФОПа (переменные берутся из .env.local)
// const FOP_CONFIG = {
//   FOP_KIDS: { 
//     name: "ФОП Иванов (Детская обувь)", 
//     licenseKey: process.env.CHBK_KIDS_LICENSE, 
//     pin: process.env.CHBK_KIDS_PIN 
//   },
//   FOP_ADULT: { 
//     name: "ФОП Петрова (Взрослая обувь)", 
//     licenseKey: process.env.CHBK_ADULT_LICENSE, 
//     pin: process.env.CHBK_ADULT_PIN 
//   },
//   FOP_BAGS: { 
//     name: "ФОП Сидоров (Сумки)", 
//     licenseKey: process.env.CHBK_BAGS_LICENSE, 
//     pin: process.env.CHBK_BAGS_PIN 
//   }
// };

// /**
//  * Функция для получения Bearer токена кассира от Checkbox API
//  */
// async function getCheckboxToken(licenseKey, pin) {
//   const response = await fetch('https://checkbox.ua', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ pin, license_key: licenseKey })
//   });

//   if (!response.ok) {
//     throw new Error('Ошибка авторизации кассира в Checkbox');
//   }

//   const data = await response.json();
//   return data.access_token; // возвращает токен доступа
// }

// /**
//  * Основное действие: принимает массив товаров из корзины и тип оплаты
//  */
// export async function processSale(cartItems, paymentType) {
//   try {
//     // 1. Расщепляем (группируем) товары по полю fop_id
//     const groups = cartItems.reduce((acc, item) => {
//       if (!acc[item.fop_id]) {
//         acc[item.fop_id] = [];
//       }
//       acc[item.fop_id].push(item);
//       return acc;
//     }, {});

//     const receiptsResults = [];

//     // 2. Перебираем сгруппированные ФОПы
//     for (const [fopId, items] of Object.entries(groups)) {
//       const fopCredentials = FOP_CONFIG[fopId];
      
//       if (!fopCredentials) {
//         throw new Error(`Конфигурация для ФОП с ID "${fopId}" не найдена`);
//       }

//       // Шаг А: Получаем индивидуальный токен для этого ФОПа
//       const token = await getCheckboxToken(fopCredentials.licenseKey, fopCredentials.pin);
      
//       // Шаг Б: Считаем общую сумму по товарам этого ФОПа (в копейках)
//       const totalSum = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//       // Шаг В: Формируем тело запроса для Checkbox
//       const receiptBody = {
//         goods: items.map(item => ({
//           code: item.id,            // артикул товара
//           name: item.name,          // название товара
//           price: item.price,        // цена в копейках (например, 55000 вместо 550.00 грн)
//           quantity: item.quantity * 1000 // количество (у Checkbox 1 шт = 1000, 1.5 кг = 1500)
//         })),
//         payments: [{
//           type: paymentType, // "CASH" или "CARD"
//           value: totalSum
//         }]
//       };

//       // Шаг Г: Отправляем запрос на создание чека
//       const response = await fetch('https://checkbox.ua', {
//         method: 'POST',
//         headers: { 
//           'Authorization': `Bearer ${token}`, 
//           'Content-Type': 'application/json' 
//         },
//         body: JSON.stringify(receiptBody)
//       });

//       const receiptData = await response.json();
      
//       receiptsResults.push({
//         fopName: fopCredentials.name,
//         receiptId: receiptData.id,
//         pdfUrl: receiptData.pdf_url, // ссылка на PDF чека для печати
//         textUrl: receiptData.text_url // ссылка на текстовую версию чека
//       });
//     }

//     // Возвращаем фронтенду массив со всеми созданными чеками
//     return { success: true, receipts: receiptsResults };

//   } catch (error) {
//     console.error('Ошибка фискализации:', error.message);
//     return { success: false, error: error.message };
//   }
// }
