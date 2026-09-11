import * as S from './styles'
import { getCompanyName } from '@/data/companies'
import { parseDate } from '@/helpers/getDate'

const ProductInvoices = ({invoices, code, total}) => {
  const invoicesData = invoices.map(invoice => {
    return {...invoice, item: invoice.items.find(item => item.productCode === code)}
  })

    return (
            <S.Wrapper>
                <S.Title>НАКЛАДНЫЕ</S.Title>
                     <S.Table>
                     <thead>
                       <tr>
                         <th>Дата</th>
                         <th>Поставщик</th>
                         <th>Количество</th>
                         <th>Цена</th>
                         <th>Цена USD</th>
                         <th>Сумма</th>
                         <th>Курс</th>
                         <th>Сумма USD</th>
                       </tr>
                     </thead>
                   
                     <tbody>
                       {invoicesData.map((item) => (
                         <tr key={item._id}>
                           <td>{parseDate(item.date)}</td>
                           <td>{getCompanyName(item.company)}</td>
                           <td>{item.item?.quantity}</td>
                           <td>{item.item?.price}</td>
                           <td>{(item.item?.price / item.rate).toFixed(2)}</td>
                           <td>{item.item?.total}</td>
                           <td>{item.rate}</td>
                           {item.currency !== 1 && <th>{(item.item?.total / item.rate).toFixed(2)}</th>}
                         </tr>
                       ))}
                     </tbody>
                   </S.Table>
                   <div>
                   <S.Line/>
                  <S.Title>{`Всього за товар: ${total.totalUSD.toFixed(2)}$`}</S.Title>
                  </div>
            </S.Wrapper>
        )
}

export default ProductInvoices