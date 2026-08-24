import * as S from './styles'
import { parseDate } from '@/helpers/getDate'
import { getCompanyName } from '@/data/companies'
import { getCurrencySymbol } from '@/data/currencies'
import { getYearById } from '@/data'

const Payments = ({payments}) => {
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
      <tr key={item._id}>
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