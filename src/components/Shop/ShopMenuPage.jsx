import * as S from './styles'
import { shopMenuData } from './data'
import MenuItem from './MenuItem'

const ShopMenuPage = () => {
        return (
      <section className="container page">
        <S.Title>МАГАЗИН ОНЛАЙН</S.Title>
        <S.MenuList>
          {shopMenuData.map((i) => (
                  <MenuItem key={i.id} item={i}/>
                ))}
        </S.MenuList>
    </section>
    )
}
export default ShopMenuPage