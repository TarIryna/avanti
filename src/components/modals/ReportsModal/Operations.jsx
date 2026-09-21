import * as S from './styles'
import React from 'react';
import { getOperationName, getVendor } from '@/data';

const Operations = ({ operations }) => {
  if (!operations || !Array.isArray(operations) || !operations.length) {
    return <div>Нема списку операцій</div>;
  }

  // 1. Группируем операции по типу (например, item.operationType или item.productType)
  // Замените 'operationType' на точное имя поля из вашего объекта, по которому идет группировка
  const groupedOperations = operations.reduce((acc, item) => {
    const type = item.type || 'Інше'; 
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {});


  const getSizes = (sizes) => {
    return sizes.map(item => `${item.size}-${item.q}`).join(', ')
  }

  return (
    <div>
      <S.Title>Операції</S.Title>
      <S.Table>
        <thead>
          <tr>
            <th>Код товара</th>
            <th>Марка</th>
            <th>Модель</th>
            <th>Ціна 1</th>
            <th>Ціна 2</th>
            <th>Кількість</th>
            <th>Розмір</th>
            <th>Ціна продажу</th>
            <th>Термінал</th>
            <th>Коментар</th>
          </tr>
        </thead>
        
        <tbody>
          {Object.entries(groupedOperations).map(([type, items]) => {
            // Подсчитываем общее количество пар в текущей группе
            const totalQuantity = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

            return (
              <React.Fragment key={type}>
                {/* Строка-заголовок для группы */}
                <tr style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                  <td colSpan={10} style={{ textAlign: 'left', paddingLeft: '10px', fontSize: "12px" }}>
                    📦 {getOperationName(type, "ukr")}
                  </td>
                </tr>

                {/* Строки с товарами этой группы */}
                {items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.product.code}</td>
                    <td>{getVendor(item.product.vendor)}</td>
                    <td>{item.product.model}</td>
                    <td>{item.product.price2 ?? item.product.price}</td>
                    <td>{item.product.price2 ? item.product.price : ""}</td>
                    <td>{item.quantity}</td>
                    <td>{getSizes(item.size)}</td>
                    <td>{item.salePrice}</td>
                    <td>{item.terminal}</td>
                    <td>{item.comment}</td>
                  </tr>
                ))}

                {/* Строка подведения итогов по группе */}
                <tr style={{ fontWeight: 'bold', borderBottom: '2px solid #ccc' }}>
                  <td colSpan={5} style={{ textAlign: 'right' }}>Всього пар:</td>
                  <td>{totalQuantity}</td>
                  <td colSpan={4}></td> {/* Пустые ячейки для выравнивания */}
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </S.Table>
    </div>
  );
};

export default Operations;
