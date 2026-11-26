import * as S from './styles'
import SizesChange from './SizesChange/SizesChange';
import Image from "next/image";
import Sizes from '@/components/Product/Sizes';
import { getGenderName, getVendor, getColorNameById  } from '@/data/getData';
import { salePrice } from '@/utils/salePrice';
import { OPERATION_TYPE } from "@/constants/constants";

const SaleCard = ({client, product, addToCheck, shop, type}) => {
    const sizesForShop = (shopId) => {
        const sizes = product.sizes_all?.[shopId];
        if (!sizes || type !== OPERATION_TYPE.SALE) return sizes;
        return [...sizes].sort((a, b) =>
            String(a.size).localeCompare(String(b.size), undefined, { numeric: true })
        );
    };
    const sizesA1 = sizesForShop("1");
    const sizesA2 = sizesForShop("2");
    // const total = product?.total?.find(item => item.shop === Number(shop))?.q
    return (
        <S.SaleCardWrapper>
            <S.Flex>
          {product.images[0] && <S.ImageWrapper>
                <Image src={product.images[0]} fill />
            </S.ImageWrapper>}
         <S.Info>
                <S.Text>{getGenderName(product.gender)}</S.Text>
                <S.Text>{getVendor(product.vendor)}</S.Text>
                <S.Text>{product.model}</S.Text>
                <S.Text>{getColorNameById(product.color, "ukr")}</S.Text>
                {/* <S.Text>{`Кількість ${total}`}</S.Text> */}
         </S.Info>
         </S.Flex>
            {sizesA1 && <Sizes sizes={sizesA1} item={product} info isShop onSelect={addToCheck} shop="1"/>}
            {sizesA2 && <Sizes sizes={sizesA2} item={product} info isShop onSelect={addToCheck} shop="2"/>}
            {product.sizes_all && <SizesChange sizes={product.sizes_all[shop]} shop={shop.toString()} item={product} addToCheck={addToCheck} type={type}/>}

               <S.PriceContainer>
                {product.price2 && <S.Price red>{product.price2} грн</S.Price>}
                <S.Price>{product.price} грн</S.Price>
                </S.PriceContainer>
             {client &&  <S.SalePrice>{`Ціна продажу: ${salePrice(product, client)} грн`}</S.SalePrice>}    
       </S.SaleCardWrapper>
    )
}

export default SaleCard
