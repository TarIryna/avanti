import { useEffect, useState } from 'react';
import * as S from './styles'
import { Button } from '@/components/ui';
import { registerDynamicModal } from '@/helpers/useDynamicModal';
import { MODALS } from '@/constants/constants';
import { useModal } from '@ebay/nice-modal-react';

registerDynamicModal(
  MODALS.REPORTS,
  import("@/components/modals/ReportsModal/ReportsModal")
);

const Reports = ({shop}) => {
    const [report, setReport] = useState(null)
    const {show} = useModal(MODALS.REPORTS)

    useEffect(() => {
        if (report) {
           show({report, shop})
        }
    }, [report])


    const onDayReport = async() => {
    try {
        const res = await fetch(`/api/shop/day/${shop}`);
        const result = await res.json();
        if (!result){
        toast.error("Сталась помилка! Даних не знайдено")
        return;
        }
        console.log(result)
        setReport(result);
    } catch (e) {
        console.error(e);
    }
    }

    return (
        <S.Wrapper>
           <Button onClick={onDayReport}>Звіт за день</Button>
        </S.Wrapper>
    )
}

export default Reports