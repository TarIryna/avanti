import * as S from './styles'
import { shopMenuData } from './data'
import MenuItem from './MenuItem'
import { useParams, useRouter } from "next/navigation";
import HeadButtons from './HeadButtons';

const ShopMenuPage = () => {
    const params = useParams();
    const shop = params.shop;

    const router = useRouter();
        return (
      <section className="container page">
        <S.Title>МАГАЗИН ОНЛАЙН</S.Title>
         <HeadButtons isMain shop={shop}/>
        <S.MenuList>
          {shopMenuData.map((i) => (
                  <MenuItem key={i.id} item={i}/>
                ))}
          <S.MenuButton onClick={() => router.push(`/shop/product`)}>ТОВАРИ</S.MenuButton>
          <S.MenuButton onClick={() => router.push(`/shop/catalog`)}>КАТАЛОГИ</S.MenuButton>
        </S.MenuList>
    </section>
    )
}
export default ShopMenuPage