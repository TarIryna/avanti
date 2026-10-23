import ButtonBack from './ButtonBack'
import ButtonClients from './ButtonClients'
import ButtonSpendings from './ButtonSpendings'
import Reports from './Reports/Reports'
import * as S from './styles'

const HeadButtons = ({isSale, shop, isMain}) => {
    return (
      <S.Flex>
        {!isMain && <ButtonBack/>}
        {(isSale || isMain) && <Reports shop={shop}/>}
        {isSale && <ButtonSpendings shop={shop}/>}
        <ButtonClients shop={shop}/>
      </S.Flex>
    )
}

export default HeadButtons