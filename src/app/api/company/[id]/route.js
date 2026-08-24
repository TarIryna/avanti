import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Invoice from "@/models/invoice";
import Payment from "@/models/payment";
import { lastSeasonValue } from "@/data";
import { companies } from "@/data/companies";
// Не забудьте импортировать модель продукта, чтобы MongoDB знала о коллекции "products"
import Product from "@/models/product"; 

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const { id } = params;
    // Обязательно приводим id к числу, так как в схеме company: Number
    const companyId = Number(id); 
    
    // Преобразуем season к числу, так как в схеме season: Number
    const currentSeason = Number(lastSeasonValue); 

    const invoices = await Invoice.aggregate([
      // 1. Фильтруем по числам. Теперь типы данных совпадают на 100%
      { 
        $match: { 
          company: companyId, 
          season: currentSeason 
        } 
      },
      
      // 2. Разворачиваем массив товаров. Флаг гарантирует: инвойс не исчезнет, если items пуст
      { 
        $unwind: { 
          path: "$items", 
          preserveNullAndEmptyArrays: true 
        } 
      },
      
      // 3. Ищем товар в коллекции "products" по полю code
      {
        $lookup: {
          from: "products",         // Имя коллекции в вашей БД (обычно во множественном числе)
          localField: "items.productCode", 
          foreignField: "code",     
          as: "items.product"       
        }
      },
      
      // 4. Превращаем результат поиска товара из массива в один объект (или null)
      { 
        $unwind: { 
          path: "$items.product", 
          preserveNullAndEmptyArrays: true 
        } 
      },
      
      // 5. Группируем инвойс обратно, используя $$ROOT для сохранения абсолютно всех полей схемы
      {
        $group: {
          "_id": "$_id",
          "invoiceData": { $first: "$$ROOT" }, 
          "items": { $push: "$items" }
        }
      },

      // 6. Восстанавливаем оригинальную структуру инвойса, подменяя массив items
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: ["$invoiceData", { items: "$items" }] }
        }
      },
      
      // 7. Если инвойс изначально был без товаров, очищаем массив от искусственного пустого объекта {}
      {
        $addFields: {
          items: {
            $filter: {
              input: "$items",
              as: "item",
              cond: { $ne: ["$$item", {}] }
            }
          }
        }
      },
      
      // 8. Опционально: сортируем инвойсы по дате создания (как они шли бы при find)
      { $sort: { createdAt: -1 } }
    ]);

    const payments = await Payment.find({ company: companyId, season: currentSeason });
    const company = companies.find(i => i.id === companyId);

    return NextResponse.json({ company, invoices, payments }, { status: 200 });

  } catch (error) {
    console.error("GET /api/company/[id] error:", error);
    return NextResponse.json({ invoices: [], payments: [] }, { status: 500 });
  }
};
