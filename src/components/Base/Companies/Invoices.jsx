import * as S from './styles'
import { parseDate } from '@/helpers/getDate'
import { getCurrencySymbol } from '@/data/currencies'
import { getYearById } from '@/data'
import { registerDynamicModal } from '@/helpers/useDynamicModal';
import { MODALS } from '@/constants/constants';
import { useModal } from '@ebay/nice-modal-react';

registerDynamicModal(
  MODALS.INVOICE_DETAILS,
  import("@/components/modals/InvoiceDetailsModal/InvoiceDetailsModal")
);

const Invoices = ({invoices}) => {
  if (!invoices || typeof invoices !== 'object' || !invoices?.length) {
  return <div>Нет данных по накладным</div>;
}
  const {show: showDetails} = useModal(MODALS.INVOICE_DETAILS)

  const openInvoice = (item) => {
    showDetails({item})
  } 


 return (
     <S.Wrapper>
      <S.Title>Накладные</S.Title>
     <S.Table>
     <thead>
       <tr>
         <th>Дата</th>
         <th>Сумма</th>
         <th>Курс</th>
         <th>Сумма USD</th>
         <th>Год/сезон</th>
         <th>Комментарий</th>
       </tr>
     </thead>
   
     <tbody>
       {invoices.map((item) => (
         <tr key={item._id} className="cursor" onClick={() => openInvoice(item)}>
           <td>{parseDate(item.date)}</td>
           <td>{`${item.total} ${getCurrencySymbol(item.currency)}`}</td>
           <td>{item.rate}</td>
           <td>{item.totalUSD}</td>
           <td>{getYearById(item.season)}</td>
           <td>{item.comment}</td>
         </tr>
       ))}
     </tbody>
   </S.Table>
   </S.Wrapper>
 )
}

export default Invoices