import * as S from './styles'
import { getCurrencySymbol } from '@/data/currencies'
import { getVendor} from '@/data'
import Image from 'next/image'

const List = ({items, rate}) => {

 return (
     <S.Table>
     <thead>
       <tr>
         <th>Фото</th>
         <th>Код</th>
         <th>Марка</th>
         <th>Модель</th>
         <th>Кількість</th>
         <th>Ціна</th>
         <th>Всього</th>
         <th>Ціна USD</th>
         <th>Всього USD</th>
       </tr>
     </thead>
   
     <tbody>
       {items.map((item) => item.product && (
          <tr key={item.product._id}>
           <td>
            <S.ImageInvoice>
             <Image src={item.product.small_image ?? item.product.images?.[0]} alt={item.product.code} fill/>
            </S.ImageInvoice></td>
           <td>{item.product.code}</td>
           <th>{getVendor(item.product.vendor)}</th>
           <th>{item.product.model ?? ""}</th>
           <td>{item.quantity}</td>
           <td>{item.price}</td>
           <td>{`${item.total} ${getCurrencySymbol(item.currency)}`}</td>
         
           <td>{(item.price / rate).toFixed(2)}</td>
           <td>{(item.total / rate).toFixed(2)}</td>
         </tr>
       ))}
     </tbody>
   </S.Table>
 )
}

export default List