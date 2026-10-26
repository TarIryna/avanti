import ButtonBack from './ButtonBack'
import ButtonClients from './ButtonClients'
import ButtonSpendings from './ButtonSpendings'
import ButtonArrival from './ButtonArrival'
import Reports from './Reports/Reports'
import * as S from './styles'

const HeadButtons = ({isSale, shop, isMain, isArrival}) => {
    return (
      <S.Flex>
        {!isMain && <ButtonBack/>}
        {<Reports shop={shop}/>}
        {isSale && <ButtonSpendings shop={shop}/>}
        <ButtonClients shop={shop}/>
        {isArrival && <ButtonArrival shop={shop}/>}
      </S.Flex>
    )
}

export default HeadButtons