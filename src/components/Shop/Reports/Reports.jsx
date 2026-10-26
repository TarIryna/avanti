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

    console.log(shop)


    const onDayReport = async() => {
      const dateParts = Object.fromEntries(new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Kyiv",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).formatToParts(new Date()).filter(({ type }) => type !== "literal").map(({ type, value }) => [type, value]));
      const date = `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
      const start = date;
      const end = date;
    try {
        const res = await fetch(`/api/shop/day/${shop}/?start=${start}&end=${end}`);
        const result = await res.json();
        if (!result){
        toast.error("Сталась помилка! Даних не знайдено")
        return;
        }
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
