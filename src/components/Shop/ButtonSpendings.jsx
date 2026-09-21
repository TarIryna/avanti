import { useModal } from "@ebay/nice-modal-react"
import { Button } from "../ui"
import { MODALS } from "@/constants/constants"
import { registerDynamicModal } from "@/helpers/useDynamicModal";

registerDynamicModal(
  MODALS.SPENDINGS_MODAL,
  import("@/components/modals/SpendingsModal/SpendingsModal")
);

export const ButtonSpendings = ({shop}) => {
    const {show} = useModal(MODALS.SPENDINGS_MODAL)
    return (
        <Button onClick={() => show({shop})}>Витрати</Button>
    )
}

export default ButtonSpendings