import { useModal } from "@ebay/nice-modal-react";
import { Button } from "../ui";
import { MODALS } from "@/constants/constants";
import { registerDynamicModal } from "@/helpers/useDynamicModal";

registerDynamicModal(
  MODALS.CLIENTS,
  import("@/components/modals/ClientsModal/ClientsModal")
);

export const ButtonClients = ({ shop, client }) => {
  const { show } = useModal(MODALS.CLIENTS);
  return <Button onClick={() => show({ shop, client })}>{client ? "Клієнт" : "Додати клієнта"}</Button>;
};

export default ButtonClients;
