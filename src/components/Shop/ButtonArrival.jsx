import { useModal } from "@ebay/nice-modal-react";
import { Button } from "../ui";
import { MODALS } from "@/constants/constants";
import { registerDynamicModal } from "@/helpers/useDynamicModal";
import { useParams } from "next/navigation";

registerDynamicModal(
  MODALS.ARRIVAL,
  import("@/components/modals/ArrivalAutoModal/ArrivalAutoModal")
);

export const ButtonArrival = ({ shop: shopProp, label = "Автоматичний прихід" }) => {
  const params = useParams();
  const shop = shopProp ?? params.shop;
  const { show } = useModal(MODALS.ARRIVAL);
  if (![1, 2].includes(Number(shop))) return null;
  return <Button onClick={() => show({ shop })}>{label}</Button>;
};

export default ButtonArrival;
