import * as S from './styles'
import CheckProductInfo from './CheckProductInfo';
import { useMemo } from 'react';
import {useModal} from "@ebay/nice-modal-react";
import { MODALS, OPERATION_TYPE } from '@/constants/constants';
import { registerDynamicModal } from '@/helpers/useDynamicModal';
import { useParams } from "next/navigation";
import { saleCheckTotal } from '@/utils/saleCheck';

registerDynamicModal(
  MODALS.CHECK,
  import("../modals/CheckModal/CheckModal")
);

const Check = ({check, type=OPERATION_TYPE.SALE, setDiscount, setComment, onRemove, reset, resetCheck}) => {
    const {show: showCheck} = useModal(MODALS.CHECK)
    const params = useParams();
    const shop = params.shop;
    const total = useMemo(() => 
        saleCheckTotal(check.items),
        [check.items]
    ); 

    const buttonText = type === OPERATION_TYPE.SALE ? "Провести продаж" : "Провести повернення"
       
    const onClick = () => {
        const checkData = {...check, total, shop}
            showCheck({check: checkData, type, resetCheck});
            reset()
    };

 return (
    <S.CheckContainer>
        <S.CheckTitle>Товари у чеку:</S.CheckTitle>
            <S.CheckList>
                {check.items.map((item, index) => <CheckProductInfo key={`${item.code}-${index}`} isImage data={item} setDiscount={setDiscount} setComment={setComment} onRemove={onRemove} index={index}/>)}
            </S.CheckList>
        <S.CheckTotal>Загальна сума: {total} грн</S.CheckTotal>
        <S.CheckButton onClick={onClick}>{buttonText}</S.CheckButton>
    </S.CheckContainer>
 )
}

export default Check
