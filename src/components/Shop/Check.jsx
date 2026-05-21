import * as S from './styles'
import CheckProductInfo from './CheckProductInfo';
import { useMemo } from 'react';
import {useModal} from "@ebay/nice-modal-react";
import { MODALS } from '@/constants/constants';
import { registerDynamicModal } from '@/helpers/useDynamicModal';

registerDynamicModal(
  MODALS.CHECK,
  import("../modals/CheckModal/CheckModal")
);

const Check = ({check}) => {
    const {show: showCheck} = useModal(MODALS.CHECK)
    const total = useMemo(() => 
        check.items.reduce((sum, item) => sum + (item.salePrice * (item.quantity || 1)), 0),
        [check.items]
    ); 
       
    const onClick = () => {
        const checkData = {...check, total}
            showCheck({check: checkData});
    };

 return (
    <S.CheckContainer>
        <S.CheckTitle>Товари у чеку:</S.CheckTitle>
            <S.CheckList>
                {check.items.map(item => <CheckProductInfo isImage data={item}/>)}
            </S.CheckList>
        <S.CheckTotal>Загальна сума: {total} грн</S.CheckTotal>
        <S.CheckButton onClick={onClick}>Провести продаж</S.CheckButton>
    </S.CheckContainer>
 )
}

export default Check