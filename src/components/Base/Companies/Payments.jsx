import * as S from './styles'
import { parseDate } from '@/helpers/getDate'
import { getCurrencySymbol } from '@/data/currencies'
import { getYearById } from '@/data'
import { registerDynamicModal } from '@/helpers/useDynamicModal'
import { MODALS } from '@/constants/constants'
import { useModal } from '@ebay/nice-modal-react'

registerDynamicModal(
  MODALS.PAYMENT_CHANGE,
  import("@/components/modals/PaymentModal/PaymentChangeModal")
);

const Payments = ({payments}) => {
    const {show: showDetails} = useModal(MODALS.PAYMENT_CHANGE)
    const openPayment = (item) => {
      showDetails({item})
    } 

 return (
  <S.Wrapper>
    <S.Title>Платежи</S.Title>
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
    {payments.map((item) => (
      <tr key={item._id} onClick={() => openPayment(item)}>
        <td>{parseDate(item.date)}</td>
        <td>{`${item.amount} ${getCurrencySymbol(item.currency)}`}</td>
        <td>{item.rate}</td>
        <td>{item.amountUSD}</td>
        <td>{getYearById(item.season)}</td>
        <td>{item.comment}</td>
      </tr>
    ))}
  </tbody>
</S.Table>
</S.Wrapper>
 )
}

export default Payments