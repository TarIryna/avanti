import NiceModal from "@ebay/nice-modal-react";
import dynamic from "next/dynamic";

const registeredModals = [];

export function registerDynamicModal(modalKey, dynamicImport) {
  if (!registeredModals.includes(modalKey)) {
    const dynamicModal = dynamic(() => dynamicImport, {
      ssr: false,
    });

    registeredModals.push(modalKey);
    NiceModal.register(modalKey, dynamicModal);
  }
}
