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
         <th>Номер накладной</th>
         <th>Год/сезон</th>
         <th>Сумма</th>
         <th>Курс</th>
         <th>Сумма USD</th>
         <th>Пар</th>
       </tr>
     </thead>
   
     <tbody>
       {invoices.map((item) => {
        return (
         <tr key={item._id} className="cursor" onClick={() => openInvoice(item)}>
           <td>{parseDate(item.date)}</td>
           <td>{item.comment}</td>
           <td>{getYearById(item.season)}</td>
           <td>{`${item.total?.toFixed(2)} ${getCurrencySymbol(item.currency)}`}</td>
           <td>{item.rate}</td>
           <td>{item.totalUSD?.toFixed(2)}</td>
           <td>{item.totalQuantity ?? 0}</td>
      </tr>
       )})}
     </tbody>
   </S.Table>
   </S.Wrapper>
 )
}

export default Invoices