import { useModal } from "@ebay/nice-modal-react"
import { Button } from "../ui"
import { MODALS } from "@/constants/constants"
import { registerDynamicModal } from "@/helpers/useDynamicModal";

registerDynamicModal(
  MODALS.WORK_DAYS,
  import("@/components/modals/WorkDaysModal/WorkDaysModal")
);

export const ButtonWorkDays = ({shop}) => {
    const {show} = useModal(MODALS.WORK_DAYS)

    return (
        <Button onClick={() => show({shop})}>Робочі дні</Button>
    )
}

export default ButtonWorkDays