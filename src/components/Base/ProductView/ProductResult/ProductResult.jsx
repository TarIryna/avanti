import * as S from './styles'

const ProductResult = ({product}) => {
  if (!product) return null;
  
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
                       <td>{product.start ?? 0}</td>
                       <td>{product.res ?? 0}</td>
                       <td>{product.totalGot ?? 0 }</td>
                       <td>{product.pop }</td>
                       <td>{(product.res - product.start).toFixed(2)}</td>
                       <td>{(((product.pop ?? 0) / (product.totalGot ?? 1) ?? 0)  * 100 ).toFixed(2)}%</td>
                       <td>{(( (product.res - product.start) / product.start ?? 0) * 100 ).toFixed(2)}%</td>
                     </tr>
                 </tbody>
               </S.Table>
        </S.Wrapper>
    )
}

export default ProductResult