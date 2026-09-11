import * as S from './styles'

const ProductResult = ({operations, invoices}) => {
  console.log(operations, invoices)
  
    return (
        <S.Wrapper>
            <S.Title>РЕЗУЛЬТАТЫ</S.Title>
                 <S.Table>
                 <thead>
                   <tr>
                     <th>Расходы USD</th>
                     <th>Выручка USD</th>
                     <th>Пар получено</th>
                     <th>Пар продано</th>
                     <th>Результат USD</th>
                     <th>% продажи</th>
                     <th>Рентабельность</th>
                   </tr>
                 </thead>
               
                 <tbody>
                     <tr>
                       <td>{invoices.totalUSD.toFixed(2)}</td>
                       <td>{operations.totalUSD.toFixed(2)}</td>
                       <td>{invoices.totalCount}</td>
                       <td>{Math.abs(operations.totalCount)}</td>
                       <td>{(operations.totalUSD - invoices.totalUSD).toFixed(2)}</td>
                       <td>{((Math.abs(operations.totalCount) / invoices.totalCount) ?? 0  * 100).toFixed(2)}%</td>
                       <td>{((Math.abs(operations.totalUSD) / invoices.totalUSD ?? 0) * 100).toFixed(2)}%</td>
                     </tr>
                 </tbody>
               </S.Table>
        </S.Wrapper>
    )
}

export default ProductResult