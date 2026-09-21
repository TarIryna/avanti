import { useEffect, useState } from 'react'
import * as S from './styles'
import { getColorById } from '@/data'
import { getShopAdress } from '../Shop/data'
import Info from "@/assets/icons/info-icon.svg";
import Image from "next/image";

const Size = ({sizes, item, size, sizesAll, isInfo, setSize, color}) => {
  const [isOpenInfo, setIsOpenInfo ] = useState(false)
  const [isOpenInfoIcon, setIsOpenInfoIcon ] = useState(false)

  const onIconClick = () => {
    setIsOpenInfo(true)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsOpenInfo(false)
    }, 5000);
  }, [isOpenInfo])

  const onSizeClick = (el) => {
    setSize(el)
    setTimeout(() => {
      setIsOpenInfoIcon(true)
    }, 1000);
  }
  


    const isDisabled = item?.q === 0;
    const isActive = item?.size === size?.size
    let text = "Даний розмір можна приміряти за адресою: "
    Object.entries(sizesAll).forEach(([index, data]) => {
        const size = data.find(i => i.size === item.size)
        const infoText = `${!!size ? getShopAdress(index): ""}`
           text += `${text.endsWith('адресою: ') ? "" : !!infoText ? " ;" : ""} ${infoText}`
         })  

          return (
              <S.SizeContainer
                  isOne={sizes?.length === 1} onClick={() => setIsOpenInfoIcon(true)}>
             {size && isActive && isOpenInfoIcon && ( 
              <S.Icon onClick={() => onIconClick()}>
                <Image src={Info} alt="info" width={20} height={20} />
              </S.Icon>)}
            {size && isActive &&  isOpenInfo && !!text && ( <S.Info href="/">
                {text}
              </S.Info>)}
                <S.SizesBlock
                  key={`${item.code}${item?.size}`}
                  isActive={isActive}
                  isDisabled={isDisabled}
                  onClick={() => !isDisabled && !isInfo && onSizeClick(item)}
                  color={color}
                >
                  {item.type ===  3 ? getColorById(item?.size, 'ukr') : item?.size}
                </S.SizesBlock>
                {isInfo && <S.SizesBlock color="grey">{item?.q}</S.SizesBlock>}
                </S.SizeContainer>
              );
}
export default Size