import { parseDate } from '@/helpers/getDate'
import * as S from './styles'
import { getDestinationName, getOperationName, getStaffName } from '@/data'
import { getShortShopName } from '@/components/Shop/data'
import { OPERATION_TYPE } from '@/constants/constants'

const ProductOperations = ({operations, total}) => {
    const sizes = (sizesArray) => {
        return sizesArray
        .map(item => `${item.size}-${item.q}`)
        .join(', ');
    }


    return (
        <S.Wrapper>
            <S.Title>ОПЕРАЦИИ</S.Title>
                 <S.Table>
                 <thead>
                   <tr>
                     <th>Дата</th>
                     <th>Магазин</th>
                     <th>Название операции</th>
                     <th>Телефон</th>
                     <th>Количество</th>
                     <th>Размер</th>
                     <th>Сумма</th>
                     <th>Терминал</th>
                     <th>Работник</th>
                     <th>Куда</th>
                     <th>Комментарий</th>
                   </tr>
                 </thead>
               
                 <tbody>
                   {operations.map((item) => (
                     <tr key={item._id}>
                       <td>{parseDate(item.createdAt)}</td>
                       <td>{getShortShopName(item.shop)}</td>
                       <td>{getOperationName(item.type)}</td>
                       <td>{item.clientPhone ?? ""}</td>
                       <td>{item.quantity}</td>
                       <td>{sizes(item.size)}</td>
                       <td>{item.salePrice ?? ""}</td>
                       <td>{item.type === OPERATION_TYPE.SALE || item.type === OPERATION_TYPE.RETURN ? item.terminal : ""}</td>
                       <td>{getStaffName(item.staff)}</td>
                       <td>{getDestinationName(item.destination)}</td>
                       <td>{item.comment}</td>
                     </tr>
                   ))}
                 </tbody>
               </S.Table>
               <div>
               <S.Line/>
               <S.Title>{`Всього від продажу: ${total.totalUAH.toFixed(2)} грн. = ${total.totalUSD.toFixed(2)}$`}</S.Title>
              </div>
        </S.Wrapper>
    )
}

export default ProductOperations