import ButtonBack from './ButtonBack'
import ButtonClients from './ButtonClients'
import ButtonSpendings from './ButtonSpendings'
import ButtonArrival from './ButtonArrival'
import Reports from './Reports/Reports'
import * as S from './styles'
import ButtonWorkDays from '@/components/Shop/ButtonWorkDays'
import ButtonProductView from '@/components/Shop/ButtonProductView'

const HeadButtons = ({isSale, shop, isMain, isArrival}) => {
    return (
      <S.Flex>
        {!isMain && <ButtonBack/>}
        {<Reports shop={shop}/>}
        {isSale && <ButtonSpendings shop={shop}/>}
        <ButtonWorkDays shop={shop}/>
        <ButtonClients shop={shop}/>
        {isArrival && <ButtonArrival shop={shop}/>}
        <ButtonProductView/>
      </S.Flex>
    )
}

export default HeadButtons