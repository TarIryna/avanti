import * as S from './styles'
import CheckProductInfo from './CheckProductInfo';
import { useMemo } from 'react';
import {useModal} from "@ebay/nice-modal-react";
import { MODALS } from '@/constants/constants';
import { registerDynamicModal } from '@/helpers/useDynamicModal';
import { useParams } from "next/navigation";

registerDynamicModal(
  MODALS.CHECK,
  import("../modals/CheckModal/CheckModal")
);

const Check = ({check, type="sale"}) => {
    const {show: showCheck} = useModal(MODALS.CHECK)
    const params = useParams();
    const shop = params.shop;
    const total = useMemo(() => 
        check.items.reduce((sum, item) => sum + (item.salePrice * (item.quantity || 1)), 0),
        [check.items]
    ); 

    const buttonText = type === "sale" ? "Провести продаж" : "Провести повернення"
       
    const onClick = () => {
        const checkData = {...check, total, shop}
            showCheck({check: checkData, type});
    };

 return (
    <S.CheckContainer>
        <S.CheckTitle>Товари у чеку:</S.CheckTitle>
            <S.CheckList>
                {check.items.map(item => <CheckProductInfo isImage data={item}/>)}
            </S.CheckList>
        <S.CheckTotal>Загальна сума: {total} грн</S.CheckTotal>
        <S.CheckButton onClick={onClick}>{buttonText}</S.CheckButton>
    </S.CheckContainer>
 )
}

export default Check