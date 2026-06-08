import * as S from './styles'
import SizesChange from './SizesChange/SizesChange';
import Image from "next/image";
import Sizes from '@/components/Product/Sizes';
import { getGenderName, getVendor } from '@/data/getData';
import { salePrice } from '@/utils/salePrice';

const SaleCard = ({client, product, addToCheck, shop, type}) => {
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
                <S.Text>{product.color}</S.Text>
         </S.Info>
         </S.Flex>
             <Sizes sizes={product.sizes_all["1"]} item={product} info onSelect={addToCheck} shop="1"/>
            <Sizes sizes={product.sizes_all["2"]} item={product} info onSelect={addToCheck} shop="2"/>
             <SizesChange sizes={product.sizes_all[shop]} shop={shop.toString()} item={product} addToCheck={addToCheck} type={type}/>  

               <S.PriceContainer>
                {product.price2 && <S.Price red>{product.price2} грн</S.Price>}
                <S.Price>{product.price} грн</S.Price>
                </S.PriceContainer>
             {client &&  <S.SalePrice>{`Ціна продажу: ${salePrice(product, client)} грн`}</S.SalePrice>}    
       </S.SaleCardWrapper>
    )
}

export default SaleCard