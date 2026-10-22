import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Invoice from "@/models/invoice";
import Product from "@/models/product"; // Если нужно обновлять что-то в продуктах

export async function PUT(req) {
  try {
    // 1. Подключаемся к базе данных
    await connectToDB();

    // 2. Получаем данные из тела запроса
    const body = await req.json();
    const { invoiceId, items, total, totalQuantity, totalUSD, rate, date, comment } = body;
    console.log('id', invoiceId)

    // Валидация: проверяем наличие ID накладной и массива товаров
    if (!invoiceId) {
      return NextResponse.json(
        { message: "Идентификатор накладной (invoiceId) обязателен" },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items)) {
      return NextResponse.json(
        { message: "Массив товаров (items) пуст или некорректен" },
        { status: 400 }
      );
    }

    // 3. Обновляем саму накладную в MongoDB Atlas
    // Используем { new: true }, чтобы метод вернул уже обновленный документ
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      {
        $set: {
          items: items, // Полностью перезаписываем массив товаров новыми данными (включая измененные цены, количество и новые позиции)
          total: Number(total ?? 0),
          totalQuantity: Number(totalQuantity ?? 0),
          totalUSD: Number(totalUSD ?? 0),
          rate: Number(rate ?? 1),
          ...(date ? { date: new Date(date) } : {}),
          comment: comment ?? "",
        },
      },
      { new: true, runValidators: true } 
    );

    // Если накладная с таким ID не найдена в базе
    if (!updatedInvoice) {
      return NextResponse.json(
        { message: "Накладная не найдена в базе данных" },
        { status: 404 }
      );
    }

    /* 
      4. ДОПОЛНИТЕЛЬНО (Опционально): 
      Если при изменении цены в накладной вам нужно также ОБНОВИТЬ поле priceOrder 
      в самой коллекции товаров (как мы делали в POST-запросе), раскомментируйте код ниже:
    */
    /*
    for (const item of items) {
      if (item.productCode) {
        await Product.findOneAndUpdate(
          { code: item.productCode },
          { 
            $set: { 
              priceOrder: { 
                price: Number(item.price ?? 0), 
                currency: updatedInvoice.currency 
              } 
            } 
          }
        );
      }
    }
    */

    // 5. Возвращаем успешный ответ на фронтенд
    return NextResponse.json(
      {
        message: "Накладная успешно обновлена",
        invoice: updatedInvoice,
        status: "success",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("PUT /api/invoice/update error:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error. Не удалось обновить накладную.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
